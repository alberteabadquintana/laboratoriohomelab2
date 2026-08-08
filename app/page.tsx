// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "HomeLab, laboratorio clínico en Piura. Análisis de alta complejidad con resultados rápidos, tecnología de vanguardia y atención de calidad.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HomeLab - Laboratorio Clínico",
    description: "Análisis de alta complejidad con resultados rápidos y tecnología de vanguardia.",
    url: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}