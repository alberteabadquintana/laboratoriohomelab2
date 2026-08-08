"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setIsLoading(true);

        // Aumentamos a 1.5 segundos para que el usuario llegue a ver la animación
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }} // Salida más suave
                    className="fixed inset-0 z-[9999] bg-[#333333] flex flex-col items-center justify-center"
                >
                    <div className="text-center">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6"
                        >
                            HOME<span className="text-[#D12E7B]">LAB</span>
                        </motion.h1>
                        
                        {/* Barra de progreso más lenta */}
                        <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
                            <motion.div 
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ 
                                    duration: 1.2, // La barra ahora tarda más en llenarse
                                    ease: "anticipate" // Movimiento más orgánico
                                }}
                                className="w-full h-full bg-[#D12E7B]"
                            />
                        </div>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-[11px] uppercase tracking-[0.6em] text-gray-400 font-medium"
                        >
                            Cargando Experiencia
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}