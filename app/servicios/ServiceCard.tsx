"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { Servicio } from "./types";

export default function ServiceCard({ servicio }: { servicio: Servicio }) {
  const [isOpen, setIsOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const examenesFiltrados = useMemo(() => {
    if (!busqueda.trim()) return servicio.examenes;
    const q = busqueda.toLowerCase();
    return servicio.examenes.filter((e) => e.toLowerCase().includes(q));
  }, [busqueda, servicio.examenes]);

  const cerrar = () => {
    setIsOpen(false);
    setBusqueda("");
  };

  // Bloquea el scroll del fondo y permite cerrar con Escape mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const etiquetaCategoria = servicio.categoria === "especialidad" ? "Especialidad" : "Paquete";

  return (
    <>
      {/* --- TARJETA (siempre del mismo tamaño, no crece) --- */}
      <motion.div
        layout
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-shadow duration-300 w-full max-w-md h-fit group flex flex-col"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: `${servicio.color}15`, color: servicio.color }}
        >
          {servicio.icon}
        </div>

        <h3 className="text-xl font-black text-[#333333] uppercase tracking-tighter mt-6 mb-2">
          {servicio.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {servicio.description}
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-auto flex items-center justify-between rounded-2xl px-5 py-4 transition-colors group/btn"
          style={{ backgroundColor: `${servicio.color}0D` }}
        >
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: servicio.color }}>
            Ver {servicio.examenes.length} exámenes
          </span>
          <svg
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
            style={{ color: servicio.color }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>

      {/* --- MODAL CON LA LISTA COMPLETA --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${servicio.title}`}
              className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header fijo */}
              <div className="p-6 md:p-8 pb-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${servicio.color}15`, color: servicio.color }}
                    >
                      {servicio.icon}
                    </div>
                    <div>
                      <span
                        className="inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5"
                        style={{ backgroundColor: `${servicio.color}18`, color: servicio.color }}
                      >
                        {etiquetaCategoria}
                      </span>
                      <h3 id={`modal-title-${servicio.title}`} className="text-xl md:text-2xl font-black text-[#333333] uppercase tracking-tighter">
                        {servicio.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{servicio.examenes.length} exámenes disponibles</p>
                    </div>
                  </div>
                  <button
                    onClick={cerrar}
                    className="text-gray-400 hover:text-[#333333] hover:bg-gray-100 p-2 rounded-full transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Buscador */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar un examen..."
                    className="w-full bg-gray-50 focus:bg-white border-2 border-transparent outline-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-[#333333] transition-all"
                    style={{ borderColor: busqueda ? `${servicio.color}33` : undefined }}
                  />
                </div>
              </div>

              {/* Lista con scroll */}
              <div className="overflow-y-auto p-6 md:p-8 pt-5">
                {examenesFiltrados.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">
                    No encontramos exámenes que coincidan con "{busqueda}".
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {examenesFiltrados.map((examen, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 py-2.5 border-b border-gray-50 sm:border-none"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: servicio.color }}
                        />
                        <span className="text-[#333333] text-sm font-medium leading-snug">
                          {examen}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-6 text-xs text-gray-400 italic">
                  * Realizamos más de 150 tipos de análisis. Consulte por otros exámenes.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}