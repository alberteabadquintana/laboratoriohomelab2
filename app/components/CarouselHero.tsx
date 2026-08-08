"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/carrusel1.jpeg",
    title: "Precisión en cada análisis",
    subtitle: "Equipos de alta gama para resultados en los que puedes confiar.",
  },
  {
    id: 2,
    image: "/images/carrusel3.jpeg",
    title: "Tu salud en buenas manos",
    subtitle: "Contamos con profesionales certificados comprometidos con tu bienestar.",
  },
  {
    id: 3,
    image: "/images/carrusel2.jpeg",
    title: "Cuidamos a los más pequeños",
    subtitle: "Atención especializada y humana para que los niños se sientan tranquilos.",
  },
  {
    id: 4,
    image: "/images/carrusel4.jpg",
    title: "Tecnología de vanguardia",
    subtitle: "Innovación constante en nuestros procesos de laboratorio.",
  }
];

export default function CarouselHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-[500px] w-full bg-[#fdfdfd] overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col lg:flex-row items-center gap-12">
        
        {/* TEXTO (LADO IZQUIERDO) */}
        <div className="flex-1 z-10 text-center lg:text-left pt-12 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-[#D12E7B]/10 text-[#D12E7B] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                HomeLab Laboratorio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-tight uppercase tracking-tighter mb-4">
                {slides[current].title}
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* CONTROLES INTEGRADOS BAJO EL TEXTO */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
            <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#D12E7B] hover:border-[#D12E7B] transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? "w-6 bg-[#D12E7B]" : "w-1.5 bg-gray-200"}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#D12E7B] hover:border-[#D12E7B] transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* IMAGEN (LADO DERECHO - RECUADRO ESTILIZADO) */}
        <div className="flex-1 w-full h-[300px] lg:h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full relative"
            >
              {/* Elemento decorativo detrás */}
              <div className="absolute -inset-4 bg-gray-100 rounded-[2rem] -rotate-3 z-0"></div>
              
              {/* Contenedor de imagen */}
              <div 
                className="w-full h-full bg-cover bg-center rounded-[2rem] shadow-2xl relative z-10 border-4 border-white"
                style={{ backgroundImage: `url(${slides[current].image})` }}
              >
                {/* Brillo sutil sobre la foto */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#333333]/20 to-transparent rounded-[2rem]" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}