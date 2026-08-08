"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function consultarEstadoDni(dni: string) {
  try {
    const res = await pool.query("SELECT estado FROM analisis WHERE dni = $1", [dni]);
    if (res.rows.length === 0) {
      return { data: null, error: null };
    }
    return { data: res.rows[0], error: null };
  } catch (error: any) {
    console.error("Error al consultar DNI:", error);
    return { data: null, error: error.message };
  }
}

export async function obtenerTodosLosAnalisis() {
  try {
    const res = await pool.query("SELECT * FROM analisis ORDER BY created_at DESC");
    return { data: res.rows, error: null };
  } catch (error: any) {
    console.error("Error al obtener análisis:", error);
    return { data: null, error: error.message };
  }
}

export async function registrarAnalisis(dni: string) {
  try {
    const res = await pool.query(
      "INSERT INTO analisis (dni, estado) VALUES ($1, 'pendiente') RETURNING *",
      [dni]
    );
    revalidatePath("/resultados/admin-dashboard");
    return { data: res.rows[0], error: null };
  } catch (error: any) {
    console.error("Error al registrar análisis:", error);
    return { data: null, error: error.message };
  }
}

export async function actualizarEstadoAnalisis(id: string, nuevoEstado: string) {
  try {
    const res = await pool.query(
      "UPDATE analisis SET estado = $1 WHERE id = $2 RETURNING *",
      [nuevoEstado, id]
    );
    revalidatePath("/resultados/admin-dashboard");
    return { data: res.rows[0], error: null };
  } catch (error: any) {
    console.error("Error al actualizar análisis:", error);
    return { data: null, error: error.message };
  }
}

export async function eliminarAnalisis(id: string) {
  try {
    await pool.query("DELETE FROM analisis WHERE id = $1", [id]);
    revalidatePath("/resultados/admin-dashboard");
    return { data: true, error: null };
  } catch (error: any) {
    console.error("Error al eliminar análisis:", error);
    return { data: null, error: error.message };
  }
}
