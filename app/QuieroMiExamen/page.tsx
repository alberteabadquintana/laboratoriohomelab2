import type { Metadata } from "next";
import QuieroMiExamenClient from "./QuieroMiExamenClient";

export const metadata: Metadata = {
  title: "Quiero mi Examen | HomeLab - Clínica Bello Horizonte Piura",
  description:
    "Reserva tu examen de laboratorio en nuestra sede o a domicilio. Elige tus análisis, fecha, horario y método de pago de forma rápida y segura.",
  keywords: ["examen laboratorio", "análisis clínicos", "HomeLab", "Piura", "domicilio", "sede"],
};

export default function QuieroMiExamenPage() {
  return <QuieroMiExamenClient />;
}
