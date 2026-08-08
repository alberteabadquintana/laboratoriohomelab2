// app/servicios/page.tsx
import type { Metadata } from "next";
import ServiciosClient from "./ServiciosClient";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conoce la gama completa de servicios de laboratorio clínico de HomeLab: análisis hematológicos, bioquímicos, microbiológicos y más, con resultados confiables.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios | HomeLab Laboratorio Clínico",
    description:
      "Conoce la gama completa de servicios de laboratorio clínico de HomeLab.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return <ServiciosClient />;
}