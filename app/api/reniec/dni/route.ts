import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function resolveReniecUrl(template: string, dni: string) {
  if (template.includes("{dni}")) {
    return template.replaceAll("{dni}", encodeURIComponent(dni));
  }

  return `${template.replace(/\/$/, "")}/${encodeURIComponent(dni)}`;
}

function getRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function pickString(...values: unknown[]) {
  return values.find((value) => typeof value === "string" && value.trim()) as string | undefined;
}

function normalizeReniecPayload(payload: unknown) {
  const root = getRecord(payload);
  const nested = getRecord(root.data ?? root.resultado ?? root.response);
  const source = Object.keys(nested).length > 0 ? nested : root;

  const nombres = pickString(
    source.nombres,
    source.nombres_completos,
    source.name,
    source.nombre
  );
  const apellidoPaterno = pickString(
    source.apellidoPaterno,
    source.apellido_paterno,
    source.paterno
  );
  const apellidoMaterno = pickString(
    source.apellidoMaterno,
    source.apellido_materno,
    source.materno
  );
  const apellidos = pickString(source.apellidos);
  const nombreCompleto =
    pickString(
      source.nombreCompleto,
      source.nombre_completo,
      source.fullName,
      source.full_name
    ) ||
    [nombres, apellidoPaterno, apellidoMaterno].filter(Boolean).join(" ").trim() ||
    [nombres, apellidos].filter(Boolean).join(" ").trim();

  return {
    nombres: nombres ?? "",
    apellidoPaterno: apellidoPaterno ?? "",
    apellidoMaterno: apellidoMaterno ?? "",
    nombreCompleto,
  };
}

export async function GET(request: Request) {
  const dni = new URL(request.url).searchParams.get("dni")?.trim() ?? "";

  if (!/^\d{8}$/.test(dni)) {
    return NextResponse.json({ error: "Ingresa un DNI válido de 8 dígitos." }, { status: 400 });
  }

  const reniecUrl = process.env.RENIEC_API_URL?.trim();

  if (!reniecUrl) {
    return NextResponse.json(
      { error: "Falta configurar RENIEC_API_URL para autocompletar datos." },
      { status: 501 }
    );
  }

  const token = process.env.RENIEC_API_TOKEN?.trim();
  const authScheme = process.env.RENIEC_API_AUTH_SCHEME?.trim() || "Bearer";
  const headers: Record<string, string> = { Accept: "application/json" };

  if (token) {
    headers.Authorization = `${authScheme} ${token}`;
  }

  try {
    const response = await fetch(resolveReniecUrl(reniecUrl, dni), {
      cache: "no-store",
      headers,
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("RENIEC API error", payload);
      return NextResponse.json(
        { error: "No se pudo consultar RENIEC. Ingresa el nombre manualmente." },
        { status: 502 }
      );
    }

    const data = normalizeReniecPayload(payload);

    if (!data.nombreCompleto) {
      return NextResponse.json(
        { error: "RENIEC no devolvió nombres para este DNI." },
        { status: 404 }
      );      
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("RENIEC request failed", error);
    return NextResponse.json(
      { error: "No se pudo conectar con RENIEC. Ingresa el nombre manualmente." },
      { status: 502 }
    );
  }
}
