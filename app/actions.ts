"use server";

import { z } from "zod";
import pool from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { getServerApiUrl } from "@/lib/env";

// ─── SANITIZACIÓN ────────────────────────────────────────────────────────────
// Elimina caracteres HTML/JS peligrosos de campos de texto libre.
function sanitizarTexto(texto: string): string {
  return texto
    .replace(/[<>"'`\\]/g, "")   // elimina caracteres de inyección HTML/JS
    .replace(/\s+/g, " ")         // colapsa espacios múltiples
    .trim()
    .substring(0, 500);           // límite de longitud
}

// ─── SCHEMAS ZOD ─────────────────────────────────────────────────────────────

const SchemaDni = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9]{7,15}$/, "Formato de documento inválido");

const SchemaCodigo = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z0-9-]{4,30}$/, "Código inválido");

const SchemaReserva = z.object({
  dni: z
    .string()
    .trim()
    .regex(/^\d{7,15}$/, "DNI inválido: solo dígitos, entre 7 y 15 caracteres."),
  nombrePaciente: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(150, "El nombre es demasiado largo.")
    .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "El nombre solo debe contener letras."),
  telefono: z
    .string()
    .trim()
    .regex(/^\d{7,15}$/, "Teléfono inválido.")
    .optional()
    .or(z.literal("")),
  modalidad: z.enum(["sede", "domicilio"]),
  examenes: z
    .array(z.string().trim().min(1).max(200))
    .max(50, "Demasiados exámenes seleccionados."),
  perfiles: z
    .array(z.string().trim().min(1).max(100))
    .max(30, "Demasiados perfiles seleccionados.")
    .optional()
    .default([]),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido."),
  horario: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato de horario inválido."),
  direccion: z.string().trim().max(300).optional().or(z.literal("")),
  referencia: z.string().trim().max(300).optional().or(z.literal("")),
  distrito: z.string().trim().max(100).optional().or(z.literal("")),
  formaPago: z.enum(["pagar_ahora", "pagar_sede"]),
}).refine(
  (data) => data.examenes.length > 0 || data.perfiles.length > 0,
  {
    message: "Debes seleccionar al menos un examen o perfil.",
    path: ["examenes"],
  }
);

// ─── CONSULTAR ESTADO POR DNI + CÓDIGO (página /resultados) ───────────────────
// SEGURIDAD: el DNI por sí solo NO revela datos. Se exige además el código de
// atención o de reserva del paciente para evitar enumeración de datos de salud.
export async function consultarEstadoDni(dni: string, codigo: string) {
  try {
    const dniParse = SchemaDni.safeParse(dni);
    const codigoParse = SchemaCodigo.safeParse(codigo);
    if (!dniParse.success || !codigoParse.success) {
      return { data: null, error: "Documento o código con formato inválido." };
    }
    const dniSeguro = dniParse.data;
    const codigoSeguro = codigoParse.data;

    // Límite de consultas por documento para frenar fuerza bruta de códigos.
    const permitido = await checkRateLimit({
      key: `consulta:${dniSeguro}`,
      max: 20,
      windowMs: 60 * 60 * 1000,
    });
    if (!permitido) {
      return {
        data: null,
        error: "Demasiadas consultas. Espera un momento antes de intentarlo de nuevo.",
      };
    }

    // Solo devolvemos datos si el código pertenece a ese documento.
    const res = await pool.query(
      `SELECT
         p.nombres,
         p.apellidos,
         CASE
           WHEN a.estado = 'COMPLETADA' THEN 'terminado'
           ELSE 'pendiente'
         END AS estado
       FROM pacientes p
       JOIN atenciones a ON a.paciente_id = p.id
       LEFT JOIN reservas r ON r.atencion_id = a.id
       WHERE p.numero_documento = $1
         AND (a.codigo = $2 OR r.codigo = $2)
         AND a.estado <> 'ANULADA'
       ORDER BY a.fecha_atencion DESC NULLS LAST
       LIMIT 1`,
      [dniSeguro, codigoSeguro]
    );

    if (res.rows.length === 0) {
      return { data: null, error: null };
    }
    return { data: res.rows[0], error: null };
  } catch (error: unknown) {
    // ⚠️ SEGURIDAD: Nunca exponer error.message de DB al cliente
    console.error("Error al consultar DNI:", error instanceof Error ? error.message : error);
    return { data: null, error: "Error al procesar la consulta. Intenta nuevamente." };
  }
}

// ─── DESCARGAR INFORME POR DNI Y CÓDIGO ───────────────────────────────────────
export async function descargarInforme(dni: string, codigo: string) {
  try {
    const parse = SchemaDni.safeParse(dni);
    if (!parse.success) return { data: null, error: "Formato de documento inválido" };
    
    const dniSeguro = parse.data;

    const codigoParse = SchemaCodigo.safeParse(codigo);
    if (!codigoParse.success) {
      return { data: null, error: "Código inválido" };
    }
    const codigoSeguro = codigoParse.data;

    const res = await pool.query(
      `SELECT 
         i.id
       FROM atenciones a
       JOIN pacientes p ON a.paciente_id = p.id
       LEFT JOIN reservas r ON r.atencion_id = a.id
       LEFT JOIN informes i ON i.atencion_id = a.id AND i.activo = true
       WHERE p.numero_documento = $1
         AND (a.codigo = $2 OR r.codigo = $2)
         AND a.estado = 'COMPLETADA'
       ORDER BY i.version DESC, i.generado_en DESC
       LIMIT 1`,
      [dniSeguro, codigoSeguro]
    );

    if (res.rows.length === 0) {
      return { data: null, error: "No se encontró el código brindado asociado a este DNI." };
    }

    if (!res.rows[0].id) {
      return { data: null, error: "Tus resultados ya están listos, pero falta generar el PDF del informe en el sistema." };
    }

    const baseUrl = getServerApiUrl();
    if (!baseUrl) {
      console.error("Falta configurar HOMELAB_API_URL (o NEXT_PUBLIC_HOMELAB_API_URL) para descargar informes.");
      return {
        data: null,
        error: "La descarga de informes no está disponible en este momento. Comunícate con el laboratorio.",
      };
    }

    const url = `${baseUrl}/public/resultados/pdf?documento=${encodeURIComponent(dniSeguro)}&codigo=${encodeURIComponent(codigoSeguro)}`;

    return { data: { url }, error: null };
  } catch (error: unknown) {
    console.error("Error al descargar informe:", error instanceof Error ? error.message : error);
    return { data: null, error: "Error al procesar la solicitud. Intenta nuevamente." };
  }
}

// ─── CREAR RESERVA DESDE EL FORMULARIO WEB ────────────────────────────────────
export interface DatosReserva {
  dni: string;
  nombrePaciente: string;   // "Nombres Apellidos" en un solo campo
  telefono?: string;
  modalidad: "sede" | "domicilio";
  examenes: string[];
  perfiles?: string[];
  fecha: string;            // "YYYY-MM-DD"
  horario: string;          // "HH:MM"
  direccion?: string;
  referencia?: string;
  distrito?: string;
  formaPago: "pagar_ahora" | "pagar_sede";
}

export async function crearReservaDesdeWeb(datos: DatosReserva) {
  try {
    // ── 1. Validación completa con Zod ──────────────────────────────────────
    const parse = SchemaReserva.safeParse(datos);
    if (!parse.success) {
      const primerError = parse.error.issues[0]?.message ?? "Datos inválidos.";
      return { codigo: null, error: primerError };
    }
    const d = parse.data;

    // ── 2. Rate limiting: máx. 10 reservas/hora por DNI ────────────────────
    const permitido = await checkRateLimit({
      key: `reserva:${d.dni}`,
      max: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (!permitido) {
      return {
        codigo: null,
        error: "Demasiadas solicitudes. Espera un momento antes de intentarlo de nuevo.",
      };
    }

    // ── 3. Sanitizar campos de texto libre ──────────────────────────────────
    const nombreSanitizado = sanitizarTexto(d.nombrePaciente);
    const direccionSanitizada = d.direccion ? sanitizarTexto(d.direccion) : undefined;
    const referenciaSanitizada = d.referencia ? sanitizarTexto(d.referencia) : undefined;
    const distritoSanitizado = d.distrito ? sanitizarTexto(d.distrito) : undefined;

    // ── 4. Validar que la fecha no sea en el pasado ─────────────────────────
    const fechaSolicitada = new Date(`${d.fecha}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaSolicitada <= hoy) {
      return { codigo: null, error: "La fecha debe ser a partir de mañana." };
    }

    // ── 5. Buscar exámenes en BD usando parámetros (ya protege SQL injection) ──
    const nombresExamenes = [...new Set(d.examenes.map((e) => e.trim()).filter(Boolean))];
    const normalizados = nombresExamenes.map((e) => e.toLowerCase());

    const examenesResult = await pool.query(
      `SELECT DISTINCT ON (LOWER(nombre))
         id, nombre
       FROM examenes_catalogo
       WHERE activo = true
         AND LOWER(nombre) = ANY($1::text[])
       ORDER BY LOWER(nombre), categoria NULLS LAST, orden ASC`,
      [normalizados]
    );

    const encontrados = new Set(
      examenesResult.rows.map((item: { nombre: string }) => item.nombre.toLowerCase())
    );
    const faltantes = nombresExamenes.filter((e) => !encontrados.has(e.toLowerCase()));

    if (faltantes.length > 0) {
      return {
        codigo: null,
        error: `Algunos exámenes no se encontraron en el catálogo: ${faltantes.join(", ")}.`,
      };
    }

    const perfilesIds = [...new Set(d.perfiles.map((p) => p.trim()).filter(Boolean))];
    const perfilesResult = perfilesIds.length > 0
      ? await pool.query(
        `SELECT id, nombre
         FROM perfiles_examen
         WHERE activo = true
           AND id = ANY($1::text[])`,
        [perfilesIds]
      )
      : { rows: [] };

    if (perfilesResult.rows.length !== perfilesIds.length) {
      return {
        codigo: null,
        error: "Uno o más perfiles seleccionados ya no están disponibles.",
      };
    }

    const examenesPerfilResult = perfilesIds.length > 0
      ? await pool.query(
        `SELECT DISTINCT e.id, e.nombre
         FROM perfiles_examen_detalle pd
         JOIN examenes_catalogo e ON e.id = pd.examen_id AND e.activo = true
         WHERE pd.perfil_id = ANY($1::text[])
         ORDER BY e.nombre`,
        [perfilesIds]
      )
      : { rows: [] };

    const examenesIds = [
      ...new Set([
        ...examenesResult.rows.map((item: { id: string }) => item.id),
        ...examenesPerfilResult.rows.map((item: { id: string }) => item.id),
      ]),
    ];

    if (examenesIds.length === 0) {
      return {
        codigo: null,
        error: "No se encontraron exámenes disponibles para la reserva.",
      };
    }

    const nombresPerfiles = perfilesResult.rows.map((item: { nombre: string }) => item.nombre);
    const nombresExamenesPerfil = examenesPerfilResult.rows.map((item: { nombre: string }) => item.nombre);

    // ── 6. Llamar a la API interna ─────────────────────────────────────────
    const apiUrl = getServerApiUrl();
    if (!apiUrl) {
      console.error("Falta configurar HOMELAB_API_URL (o NEXT_PUBLIC_HOMELAB_API_URL) para crear reservas.");
      return {
        codigo: null,
        error: "El servicio de reservas no está disponible en este momento. Comunícate con el laboratorio.",
      };
    }

    const respuesta = await fetch(`${apiUrl}/reservas/publicas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        modalidad: d.modalidad === "sede" ? "SEDE" : "DOMICILIO",
        tipoDocumento: "DNI",
        numeroDocumento: d.dni,
        nombreCompleto: nombreSanitizado,
        telefono: d.telefono || undefined,
        fechaPreferida: d.fecha,
        horaPreferida: d.horario,
        direccion: direccionSanitizada,
        referencia: referenciaSanitizada,
        distrito: distritoSanitizado,
        sede: d.modalidad === "sede" ? "Clínica Bello Horizonte" : undefined,
        examenesIds,
        perfilesIds,
        observaciones: [
          `Forma de pago: ${d.formaPago === "pagar_ahora" ? "Pago online" : "Pago en sede"}`,
          nombresExamenes.length > 0 ? `Exámenes solicitados desde web: ${nombresExamenes.join(", ")}` : "",
          nombresPerfiles.length > 0 ? `Perfiles solicitados desde web: ${nombresPerfiles.join(", ")}` : "",
          nombresExamenesPerfil.length > 0 ? `Exámenes incluidos por perfil: ${nombresExamenesPerfil.join(", ")}` : "",
        ].filter(Boolean).join("\n"),
      }),
      cache: "no-store",
    });

    const contenido = await respuesta.json().catch(() => null);
    if (!respuesta.ok) {
      // ⚠️ SEGURIDAD: Solo pasar mensajes explícitos de la API, no stack traces
      const mensaje = Array.isArray(contenido?.message)
        ? contenido.message[0]
        : contenido?.message;
      return {
        codigo: null,
        error: mensaje || "No se pudo guardar la reserva. Intenta nuevamente.",
      };
    }

    const codigoAPI = contenido?.codigo || contenido?.data?.codigo;
    if (!codigoAPI) {
      // No inventamos un código: uno generado aquí no existiría en la BD.
      console.error("La API de reservas no devolvió un código:", contenido);
      return {
        codigo: null,
        error: "No pudimos confirmar el código de tu reserva. Comunícate con el laboratorio antes de acercarte.",
      };
    }
    return { codigo: String(codigoAPI), error: null };

  } catch (error: unknown) {
    // ⚠️ SEGURIDAD: Registrar el error real en server logs, pero NO enviarlo al cliente
    console.error("Error al crear reserva:", error instanceof Error ? error.message : error);
    return { codigo: null, error: "Ocurrió un error al guardar la reserva. Por favor intenta nuevamente." };
  }
}


// ─── CATÁLOGO DE EXÁMENES Y PERFILES ─────────────────────────────────────────
export interface ExamenCatalogo {
  nombre: string;
  precio: number | null;
  categoria: string;
}

export interface PerfilCatalogo {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  examenes: string[];
}

/**
 * Devuelve todos los exámenes activos, opcionalmente filtrados por categoría.
 * Usado por la página QuieroMiExamen para listar opciones y precios.
 */
export async function obtenerExamenesCatalogo(
  categoria?: string
): Promise<ExamenCatalogo[]> {
  try {
    let query = `
      SELECT nombre, precio, categoria
      FROM examenes_catalogo
      WHERE activo = true
    `;
    const params: string[] = [];
    if (categoria) {
      query += ` AND UPPER(categoria) = UPPER($1)`;
      params.push(categoria);
    }
    query += ` ORDER BY categoria, nombre`;

    const res = await pool.query(query, params);
    return res.rows as ExamenCatalogo[];
  } catch (error: unknown) {
    console.error("Error al obtener catálogo de exámenes:", error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Devuelve todos los perfiles/paquetes activos con sus exámenes incluidos.
 */
export async function obtenerPerfilesCatalogo(): Promise<PerfilCatalogo[]> {
  try {
    const res = await pool.query(`
      SELECT
        p.id,
        p.nombre,
        p.descripcion,
        p.precio,
        COALESCE(
          json_agg(e.nombre ORDER BY e.nombre) FILTER (WHERE e.nombre IS NOT NULL),
          '[]'
        ) AS examenes
      FROM perfiles_examen p
      LEFT JOIN perfiles_examen_detalle pd ON pd.perfil_id = p.id
      LEFT JOIN examenes_catalogo e ON e.id = pd.examen_id AND e.activo = true
      WHERE p.activo = true
      GROUP BY p.id, p.nombre, p.descripcion, p.precio
      ORDER BY p.orden, p.nombre
    `);
    return res.rows as PerfilCatalogo[];
  } catch (error: unknown) {
    console.error("Error al obtener perfiles:", error instanceof Error ? error.message : error);
    return [];
  }
}
