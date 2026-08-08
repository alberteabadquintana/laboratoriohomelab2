"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const pasosResultados = [
    {
        id: 1,
        titulo: "Seguridad de Laboratorio",
        descripcion:
            "Implementamos estándares internacionales de bioseguridad y protección de datos médicos. Tus muestras y resultados son procesados bajo estricta confidencialidad y rigor científico.",
        imagen: "/images/seguridad.png",
        etiqueta: "Confianza"
    },
    {
        id: 2,
        titulo: "Resultados Online",
        descripcion:
            "Accede a tus informes clínicos de manera instantánea. Nuestra plataforma te permite visualizar y descargar tus análisis con total claridad, eliminando la necesidad de traslados físicos.",
        imagen: "/images/resultados.avif",
        etiqueta: "Agilidad"
    },
    {
        id: 3,
        titulo: "Disponibilidad 24/7",
        descripcion:
            "Tu salud no tiene horario. El portal de HomeLab permanece activo las 24 horas del día, permitiéndote consultar tu historial médico en el momento exacto en que tú o tu médico lo necesiten.",
        imagen: "/images/disponibilidad.jpeg",
        etiqueta: "Acceso Total"
    },
];

export default function ResultsGrid() {
    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            {/* Fondo decorativo HomeLab */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#D12E7B] rounded-full mix-blend-multiply filter blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D12E7B] font-black tracking-[0.3em] uppercase mb-4 block text-sm">
                        Plataforma Digital
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#333333] mb-4 uppercase tracking-tighter">
                        Gestiona tus <span className="text-[#D12E7B]">Resultados</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#D12E7B] mx-auto rounded-full" />
                </motion.div>

                {/* Grid de tarjetas de beneficios */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 auto-rows-fr">
                    {pasosResultados.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group h-full"
                        >
                            <div className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative p-8">
                                
                                {/* Etiqueta Flotante Superior */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="bg-[#D12E7B] text-white text-[9px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                                        {item.etiqueta}
                                    </span>
                                </div>

                                {/* CONTENEDOR DE IMAGEN CENTRADA (Estilo Referencia) */}
                                <div className="relative w-full aspect-square max-h-[220px] bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 overflow-hidden border border-gray-50">
                                    <img
                                        src={item.imagen}
                                        alt={item.titulo}
                                        className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Contenido de Texto */}
                                <div className="flex flex-col flex-grow text-center items-center">
                                    <h3 className="text-xl font-black text-[#333333] mb-4 uppercase tracking-tight leading-tight">
                                        {item.titulo}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                        {item.descripcion}
                                    </p>
                                    
                                    {/* Indicador de número inferior */}
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#D12E7B] font-black border border-gray-100 text-xs mt-auto">
                                        0{item.id}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Botón Central de Acción */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <Link href="/resultados">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative inline-flex items-center justify-center px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white bg-[#333333] rounded-full shadow-2xl transition-all duration-300 overflow-hidden group"
                        >
                            <span className="relative z-10">Ver resultados y solicitarlos</span>
                            <span className="absolute inset-0 bg-[#D12E7B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}