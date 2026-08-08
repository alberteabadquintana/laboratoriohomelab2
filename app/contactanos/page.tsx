// app/contactanos/page.tsx
import type { Metadata } from "next";
import ContactanosClient from "./ContactanosClient";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Ponte en contacto con HomeLab. Escríbenos por WhatsApp, visita nuestra sede o déjanos tu mensaje y un asesor te responderá a la brevedad.",
  alternates: {
    canonical: "/contactanos",
  },
  openGraph: {
    title: "Contáctanos | HomeLab Laboratorio Clínico",
    description: "Ponte en contacto con HomeLab por WhatsApp, en nuestra sede o por formulario.",
    url: "/contactanos",
  },
};

export default function ContactoPage() {
  return <ContactanosClient />;
}