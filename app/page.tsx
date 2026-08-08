"use client";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import ServiciosFlip from "@/app/components/ServiciosFlip"; 
import Estadisticas from "@/app/components/Estadisticas";
import DoctorsSection from "@/app/components/ResultadoSection";
import TeamSection from "@/app/components/TeamSection";
import Link from "next/link";
import CarouselHero from "./components/CarouselHero";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - Versión Laboratorio */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            // Cambia esta imagen por una de un laboratorio moderno o microscopio
            backgroundImage: "url('/images/fondo1.avif')", 
            filter: "brightness(0.35)",
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.p
            animate={{ x: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-[#FFFFFF] font-semibold tracking-[0.3em] uppercase mb-4 text-sm md:text-lg"
          >
            Tecnología y Precisión en Piura
          </motion.p>

          {/* Título con gradiente inspirado en HomeLab (Magenta a Blanco) */}
          <motion.h1
            className="text-5xl md:text-8xl font-black tracking-tighter"
            style={{
              backgroundImage: "linear-gradient(90deg, #D12E7B, white, #D12E7B)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0px 0px 30px rgba(209, 46, 123, 0.4)",
            }}
            animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            HOME <br className="md:hidden" /> LAB
          </motion.h1>

          <p className="text-white/80 mt-6 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Resultados de alta complejidad con la rapidez que tu bienestar exige.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-1.5 bg-[#D12E7B] mx-auto mt-8 rounded-full shadow-lg shadow-[#D12E7B]/50"
          />
          
          {/* Barra de Acciones Rápidas - HomeLab (Posición Ajustada) */}
          <div className="relative z-20 mt-6 md:mt-10 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4">
              
              {/* Acción 1: Resultados */}
            <Link href="/resultados" className="flex-1 flex flex-col items-center group cursor-pointer">
              <div className="mb-4 text-[#333333] group-hover:text-[#D12E7B] transition-colors duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="w-6 h-1 bg-[#D12E7B] mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#333333] text-center group-hover:text-[#D12E7B] transition-colors">
                Resultados Online
              </span>
            </Link>

            {/* Divisor Desktop */}
            <div className="hidden md:block w-px h-16 bg-gray-200" />

            {/* Acción 2: Cotizador (WhatsApp) */}
            <a 
              href="https://wa.me/51947052846?text=Hola%20HomeLab,%20me%20gustaría%20cotizar%20un%20análisis%20clínico." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center group cursor-pointer"
            >
              <div className="mb-4 text-[#D12E7B] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="w-10 h-1 bg-[#D12E7B] mb-3" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#D12E7B] text-center">
                Cotiza tu análisis
              </span>
            </a>

            {/* Divisor Desktop */}
            <div className="hidden md:block w-px h-16 bg-gray-200" />

            {/* Acción 3: Domicilio (Sin cambios de funcionalidad aún) */}
            <Link 
                href="/contactanos" 
                className="flex-1 flex flex-col items-center group cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 text-[#333333] group-hover:text-[#D12E7B] transition-colors duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                
                <div className="w-6 h-1 bg-[#D12E7B] mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#333333] text-center group-hover:text-[#D12E7B] transition-colors">
                  Servicio a domicilio
                </span>
              </Link>

            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-white/50 text-sm flex flex-col items-center"
        >
          <span className="font-light tracking-widest">DESCUBRE MÁS</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D12E7B] to-transparent mt-2" />
        </motion.div>
      </section>

      {/* Sección de Estadísticas - (Ej: +500 pruebas, 24h entrega, etc) */}
      <div className="bg-[#F9F9F9]">
        <Estadisticas />
      </div>

      {/* Sección de Servicios - (Ahora categorías de laboratorio) */}
      <section id="servicios">
        <ServiciosFlip />

      </section>

      <CarouselHero />

      {/* Sección de resultados */}
      <TeamSection />

      

      {/* Sección de Tecnología / Equipos */}
      <DoctorsSection />

      
      
    </main>
  );
}