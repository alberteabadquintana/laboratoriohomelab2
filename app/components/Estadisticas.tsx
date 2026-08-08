"use client";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const statsHomeLab = [
    { count: "500", text: "TIPOS DE", subtext: "EXÁMENES", suffix: "+" },
    { count: "24", text: "HORAS", subtext: "RESULTADOS", suffix: "" },
    { count: "100", text: "EFECTIVIDAD", subtext: "DIAGNÓSTICA", suffix: "%" },
];

function Counter({ value }: { value: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const numericValue = parseInt(value, 10);
    const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) spring.set(numericValue);
    }, [isInView, numericValue, spring]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Estadisticas() {
    return (
        <div className="relative w-full bg-white py-24 overflow-hidden">
            {/* FONDO*/}
            <div className="absolute inset-0 z-0 opacity-[0.05]" 
                 style={{ backgroundImage: `linear-gradient(#D12E7B 0.5px, transparent 0.5px), linear-gradient(90deg, #D12E7B 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {statsHomeLab.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative flex flex-col items-center group"
                        >
                            {/* Círculo de Brillo (Glow) Detrás del número */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#D12E7B] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                            {/* Contenedor del Número */}
                            <div className="relative mb-4">
                                <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D12E7B] to-[#9b1b56] leading-none tracking-tighter drop-shadow-sm">
                                    <Counter value={item.count} />
                                    <span className="text-4xl md:text-5xl font-bold align-top mt-4 inline-block text-[#D12E7B]">
                                        {item.suffix}
                                    </span>
                                </span>
                            </div>

                            {/* Textos con línea lateral */}
                            <div className="relative pl-6 border-l-2 border-[#D12E7B]/20 group-hover:border-[#D12E7B] transition-colors duration-500 text-left w-fit">
                                <h4 className="text-xl font-black text-gray-900 leading-none">
                                    {item.text}
                                </h4>
                                <p className="text-xs font-bold text-[#D12E7B] tracking-[0.4em] uppercase mt-2">
                                    {item.subtext}
                                </p>
                            </div>

                            {/* Decoración: Barra de carga pequeña */}
                            <div className="mt-8 flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div 
                                        key={i} 
                                        className={`h-1 w-6 rounded-full transition-all duration-500 ${i <= 2 ? 'bg-[#D12E7B]' : 'bg-gray-100 group-hover:bg-[#D12E7B]/30'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}