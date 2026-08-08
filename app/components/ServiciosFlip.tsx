"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { servicios } from "@/app/data/servicio";

export default function ServiciosFlip() {
    const router = useRouter();

    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#D12E7B] rounded-full mix-blend-multiply filter blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-[#333333] mb-4 uppercase tracking-tighter">
                        Nuestros <span className="text-[#D12E7B]">Servicios</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#D12E7B] mx-auto rounded-full" />
                    <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        Análisis clínicos con tecnología de última generación para resultados precisos en el menor tiempo posible.
                    </p>
                </motion.div>

                {/* Contenedor Flex para manejar el centrado de los últimos elementos */}
                <div className="flex flex-wrap justify-center gap-10">
                    {servicios.map((servicio, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            // Ajustamos el ancho para que quepan 3 en desktop (lg)
                            className="group w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[320px] aspect-square [perspective:1200px]"
                        >
                            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                                
                                {/* FRONTAL */}
                                <div
                                    className="absolute inset-0 rounded-[2.5rem] shadow-xl overflow-hidden bg-cover bg-center [backface-visibility:hidden] flex items-end p-8"
                                    style={{ backgroundImage: `url(${servicio.image})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/30 to-transparent" />
                                    <h3 className="relative z-10 text-white text-xl font-bold tracking-tight uppercase">
                                        {servicio.title}
                                    </h3>
                                </div>

                                {/* POSTERIOR (Magenta) */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-[#D12E7B] p-8 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center">
                                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">
                                        {servicio.title}
                                    </h3>
                                    <p className="text-white/90 text-sm leading-relaxed mb-8">
                                        {servicio.description}
                                    </p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push('/servicios');
                                        }}
                                        className="bg-[#333333] hover:bg-black text-white font-bold py-2 px-6 rounded-full transition-all text-[10px] uppercase tracking-[0.2em]"
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/servicios')}
                        className="relative inline-flex items-center justify-center px-12 py-5 text-xs font-black uppercase tracking-[0.3em] text-white bg-[#333333] rounded-full shadow-2xl transition-all duration-300 overflow-hidden group"
                    >
                        <span className="relative z-10">Explorar servicios</span>
                        <span className="absolute inset-0 bg-[#D12E7B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}