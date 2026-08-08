'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MessageCircle } from 'lucide-react';

const specialties = [
    "Análisis de Rutina",
    "Chequeo Preventivo",
    "Pruebas Hormonales",
    "Marcadores Tumorales",
    "Exámenes de ADN",
    "Toxicología",
    "Microbiología",
    "Servicio a Domicilio"
];

const PHONE_NUMBER = "51947052846";

export default function WhatsAppFloat() {
    const [isOpen, setIsOpen] = useState(false);

    const handleWhatsAppClick = (specialty: string) => {
        const message = `Hola HomeLab, quisiera información sobre: ${specialty}`;
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-3xl shadow-2xl w-80 overflow-hidden border border-gray-100 mb-2"
                    >
                        {/* Header Estilo HomeLab */}
                        <div className="bg-[#333333] p-5 text-white relative">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#D12E7B] p-2 rounded-xl">
                                    <MessageCircle size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-widest">HomeLab Chat</h3>
                                    <p className="text-[10px] text-gray-300 uppercase tracking-tighter">¿En qué análisis te ayudamos?</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Lista de Servicios/Especialidades */}
                        <div className="p-3 max-h-[350px] overflow-y-auto bg-white">
                            <div className="grid gap-2">
                                {specialties.map((specialty) => (
                                    <motion.button
                                        key={specialty}
                                        whileHover={{ x: 5 }}
                                        onClick={() => handleWhatsAppClick(specialty)}
                                        className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 group text-left"
                                    >
                                        <span className="text-[#333333] text-xs font-bold uppercase tracking-tight group-hover:text-[#D12E7B] transition-colors">
                                            {specialty}
                                        </span>
                                        <ChevronRight size={14} className="text-[#D12E7B]" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 text-center">
                             <button 
                                onClick={() => handleWhatsAppClick("Información General")}
                                className="w-full bg-[#D12E7B] text-white text-[10px] font-black uppercase py-3 rounded-xl tracking-[0.2em] shadow-lg shadow-[#D12E7B]/20"
                             >
                                Consulta General
                             </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón Flotante Principal */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                    isOpen ? 'bg-[#333333]' : 'bg-[#25D366]'
                } text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center relative group`}
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                )}

                {/* Efecto Pulse */}
                {!isOpen && (
                    <span className="absolute -inset-1 rounded-full bg-green-500 opacity-20 animate-ping pointer-events-none"></span>
                )}
            </motion.button>
        </div>
    );
}