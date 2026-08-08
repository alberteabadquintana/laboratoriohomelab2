"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Servicio } from "./types";

export default function ServiceCard({ servicio }: { servicio: Servicio }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-[#D12E7B]/10 transition-all duration-300 w-full max-w-md h-fit group"
    >
      <div className="flex items-start justify-between">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D12E7B] text-white' : 'bg-gray-50 text-[#333333] group-hover:bg-[#D12E7B]/10'}`}>
          {servicio.icon}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#D12E7B] hover:bg-[#D12E7B]/10 p-2 rounded-full transition-colors"
        >
          <motion.svg 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      <h3 className="text-xl font-black text-[#333333] uppercase tracking-tighter mt-6 mb-2">
        {servicio.title}
      </h3>
      
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {servicio.description}
      </p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-gray-100">
              <p className="text-[#D12E7B] text-[10px] font-black uppercase tracking-widest mb-4">Pruebas Frecuentes:</p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {servicio.examenes.map((examen, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#D12E7B] mt-1 flex-shrink-0" />
                    <span className="text-[#333333] text-[10px] font-bold uppercase leading-tight">
                      {examen}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="mt-6 text-[9px] text-gray-400 italic">
                * Realizamos más de 150 tipos de análisis. Consulte por otros exámenes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="mt-6 flex items-center text-[#D12E7B] text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
        >
          Ver lista de exámenes 
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}