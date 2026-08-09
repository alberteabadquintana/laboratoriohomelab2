// app/servicios/ServiciosClient.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { servicios } from "./data";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { Servicio } from "./types";

type Categoria = Servicio["categoria"];

export default function ServiciosClient() {
  const [categoria, setCategoria] = useState<Categoria>("especialidad");

  const serviciosFiltrados = servicios.filter((s) => s.categoria === categoria);

  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION REUTILIZADO --- */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Fondo decorativo sutil (el que tenías en el home) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D12E7B] rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-black text-[#333333] mb-4 uppercase tracking-tighter">
              Nuestros <span className="text-[#D12E7B]">Servicios</span>
            </h1>
            <div className="w-24 h-1.5 bg-[#D12E7B] mx-auto rounded-full" />
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Explora nuestra gama completa de servicios de laboratorio clínico.
              Haz clic en cada tarjeta para conocer el detalle de nuestras pruebas.
            </p>
          </motion.div>

          {/* --- SELECTOR DE CATEGORÍA --- */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex bg-gray-50 border border-gray-100 rounded-full p-1.5">
              <button
                onClick={() => setCategoria("especialidad")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  categoria === "especialidad"
                    ? "bg-[#D12E7B] text-white shadow-lg shadow-[#D12E7B]/20"
                    : "text-gray-500 hover:text-[#333333]"
                }`}
              >
                Por especialidad
              </button>
              <button
                onClick={() => setCategoria("perfil")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  categoria === "perfil"
                    ? "bg-[#D12E7B] text-white shadow-lg shadow-[#D12E7B]/20"
                    : "text-gray-500 hover:text-[#333333]"
                }`}
              >
                Perfiles y paquetes
              </button>
            </div>
          </div>

          {/* --- GRID DE SERVICIOS --- */}
          <div className="flex flex-wrap justify-center gap-10">
            {serviciosFiltrados.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 70, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  delay: (index % 3) * 0.12,
                }}
                className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] flex justify-center"
              >
                <ServiceCard servicio={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección adicional opcional (Pie de página o Llamado a la acción) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 py-20 text-center"
      >
        <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-medium">Resultados confiables</p>
        <h2 className="text-2xl md:text-3xl font-black text-[#333333] mt-2 uppercase tracking-tighter">
          ¿Necesitas una prueba a domicilio?
        </h2>

        <Link href="/contactanos" className="inline-block">
          <button className="mt-8 bg-[#333333] text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#D12E7B] hover:shadow-xl hover:shadow-[#D12E7B]/20 transition-all duration-300 transform hover:-translate-y-1">
            Contáctanos ahora
          </button>
        </Link>
      </motion.section>
    </main>
  );
}