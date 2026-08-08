// app/nosotros/page.tsx
import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a HomeLab: nuestra misión, visión y valores. Comprometidos con diagnósticos clínicos precisos, tecnología de vanguardia y atención cercana en Piura.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | HomeLab Laboratorio Clínico",
    description:
      "Conoce a HomeLab: nuestra misión, visión y valores como laboratorio clínico.",
    url: "/nosotros",
  },
};

export default function Nosotros() {
  return <NosotrosClient />;
}