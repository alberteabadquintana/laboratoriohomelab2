// app/resultados/page.tsx
import type { Metadata } from "next";
import ResultadosClient from "./ResultadosClient";

export const metadata: Metadata = {
  title: "Consulta tus Resultados",
  description:
    "Consulta el estado de tus análisis clínicos en HomeLab ingresando tu número de DNI. Resultados listos en 3 a 5 días hábiles.",
  alternates: {
    canonical: "/resultados",
  },
  openGraph: {
    title: "Consulta tus Resultados | HomeLab Laboratorio Clínico",
    description: "Verifica el estado de tus análisis clínicos ingresando tu DNI.",
    url: "/resultados",
  },
};

export default function ResultadosPage() {
  return <ResultadosClient />;
}