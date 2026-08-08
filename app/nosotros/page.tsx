"use client";

import { ShieldCheck, Target, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Datos de los valores para facilitar cambios futuros
const VALORES = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Precisión Total",
    desc: "Controles de calidad diarios internos y externos en todos nuestros equipos."
  },
  {
    icon: <Zap size={32} />,
    title: "Rapidez Digital",
    desc: "Resultados disponibles en nuestra plataforma web apenas son validados."
  },
  {
    icon: <Target size={32} />,
    title: "Alta Tecnología",
    desc: "Equipamiento automatizado de última generación para minimizar errores."
  },
  {
    icon: <Award size={32} />,
    title: "Personal Experto",
    desc: "Tecnólogos médicos y especialistas altamente capacitados a tu servicio."
  }
];

export default function Nosotros() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero de Nosotros con Fade In */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D12E7B] font-bold tracking-[0.3em] text-xs uppercase mb-4 block"
          >
            Nuestra Esencia
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#333333] tracking-tight"
          >
            Comprometidos con tu <span className="text-[#D12E7B]">certeza médica</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            En HomeLab, no solo entregamos resultados; entregamos tranquilidad a través de procesos rigurosos y tecnología de vanguardia.
          </motion.p>
        </div>
      </section>

      {/* Sección Sobre HomeLab - Diseño Moderno */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src="/images/imagen1.jpg" 
                  alt="Equipo de HomeLab" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
            </div>
            {/* Elemento decorativo detrás de la imagen */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#D12E7B]/5 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#333333]/5 rounded-full blur-2xl -z-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#333333] mb-4">Sobre HomeLab</h2>
              <div className="w-16 h-1 bg-[#D12E7B] rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Nacimos con la visión de transformar el diagnóstico clínico en Piura. Entendemos que detrás de cada muestra hay una persona esperando respuestas para cuidar su salud o la de su familia.
              </p>
              <p>
                Nuestro laboratorio está diseñado bajo estándares internacionales, asegurando que cada análisis sea procesado con la mayor exactitud.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#D12E7B]/30 transition-all shadow-sm">
                <h4 className="font-extrabold text-[#333333] text-lg mb-2 group-hover:text-[#D12E7B] transition-colors">Misión</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Proveer diagnósticos precisos con rapidez y ética profesional absoluta.</p>
              </div>
              <div className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#333333]/30 transition-all shadow-sm">
                <h4 className="font-extrabold text-[#333333] text-lg mb-2">Visión</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Ser el laboratorio referente por innovación y confianza en todo el norte del país.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Valores - Versión Blanca Modernizada */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#333333]">
                ¿Por qué confiar en <span className="text-[#D12E7B]">HomeLab</span>?
            </h2>
            <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-xs">Excelencia garantizada</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALORES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#D12E7B]/10 text-[#D12E7B] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D12E7B] group-hover:text-white transition-all duration-300">
                  {val.icon}
                </div>
                <h3 className="text-xl font-extrabold text-[#333333] mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}