import type { Metadata } from "next";
import QuieroMiExamenClient from "./QuieroMiExamenClient";
import { obtenerExamenesCatalogo, obtenerPerfilesCatalogo } from "@/app/actions";

export const metadata: Metadata = {
  title: "Quiero mi Examen | HomeLab - Clínica Bello Horizonte Piura",
  description:
    "Reserva tu examen de laboratorio en nuestra sede o a domicilio. Elige tus análisis, fecha, horario y método de pago de forma rápida y segura.",
  keywords: ["examen laboratorio", "análisis clínicos", "HomeLab", "Piura", "domicilio", "sede"],
};

export const dynamic = "force-dynamic";

export default async function QuieroMiExamenPage() {
  const [examenesDB, perfilesDB] = await Promise.all([
    obtenerExamenesCatalogo(),
    obtenerPerfilesCatalogo(),
  ]);
  
  const catalogosMap = new Map<string, { nombre: string; precio: number | null }[]>();
  for (const ex of examenesDB) {
    if (!catalogosMap.has(ex.categoria)) {
      catalogosMap.set(ex.categoria, []);
    }
    catalogosMap.get(ex.categoria)!.push({
      nombre: ex.nombre,
      precio: ex.precio == null ? null : Number(ex.precio),
    });
  }
  
  const catalogos = Array.from(catalogosMap.entries()).map(([cat, exs]) => ({
    categoria: cat,
    examenes: exs,
  }));

  const perfiles = perfilesDB.map((perfil) => ({
    ...perfil,
    precio: perfil.precio == null ? null : Number(perfil.precio),
  }));

  return <QuieroMiExamenClient catalogos={catalogos} perfiles={perfiles} />;
}
