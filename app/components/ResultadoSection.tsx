// components/AsesorSection.tsx
'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function AsesorSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white py-16 md:py-24 opacity-0 transition-opacity duration-700 overflow-hidden"
            style={{ willChange: 'opacity, transform' }}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    
                    {/* Columna izquierda: Texto y Botones alineados a la marca */}
                    <div className="w-full md:w-1/2 text-center md:text-left z-10">
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="h-1 w-10 bg-[#D12E7B] rounded-full"></span>
                            <span className="text-xs font-bold tracking-[0.2em] text-[#D12E7B] uppercase">Atención Inmediata</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333333] leading-tight mb-8 uppercase tracking-tighter">
                            Hablar con un asesor <br /> 
                            <span className="text-[#D12E7B]">especializado</span>
                        </h2>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                           {/* Botón WhatsApp Estilo HomeLab con Mensaje Predeterminado */}
                            <a 
                                href="https://wa.me/51947052846?text=Hola%20HomeLab,%20deseo%20obtener%20más%20información%20para%20realizarme%20analisis." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block" // Para que el enlace respete el tamaño del botón
                            >
                                <button className="flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-black text-xs tracking-widest py-4 px-9 rounded-full transition-all duration-300 shadow-xl transform hover:-translate-y-1 uppercase">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.549 2.012 2.057-.54c.952.518 1.989.814 3.241.815 3.179 0 5.765-2.586 5.766-5.766 0-3.18-2.586-5.771-5.766-5.771zm3.374 8.204c-.161.451-.93.822-1.291.876-.361.055-.81.082-2.324-.523-1.834-.732-3.033-2.593-3.124-2.714-.091-.121-.741-.983-.741-1.87 0-.887.466-1.322.632-1.503.166-.181.362-.226.482-.226s.241.002.346.006c.11.004.258-.041.405.318.151.365.511 1.248.556 1.339.045.09.075.195.015.315-.06.12-.09.195-.181.301-.09.105-.19.233-.27.315-.089.091-.183.189-.078.368.105.179.467.77.999 1.241.685.607 1.261.796 1.441.886.18.09.285.075.39.195.105.12.451.526.571.706.12.18.24.285.451.33.21.045.722.255.822.465.1.21.1.391.04.571z"/>
                                    </svg>
                                    Contactar
                                </button>
                            </a>
                            {/* Botón Secundario 
                            <button className="border-2 border-gray-200 hover:border-[#D12E7B] text-[#333333] font-black text-xs tracking-widest py-4 px-9 rounded-full transition-all duration-300 uppercase">
                                Cotizar en web
                            </button>*/}
                        </div>
                    </div>

                    {/* Columna derecha: Corazón Magenta + Especialista */}
                    <div className="w-full md:w-1/2 relative flex justify-center items-center">
                        {/* Corazón Magenta de HomeLab */}
                        <div 
                            className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] bg-[#D12E7B] flex items-center justify-center overflow-hidden transition-all duration-700 group"
                            style={{ 
                                clipPath: 'path("M225 435c-5.1 0-10.2-1.7-14.4-5.1C163.5 393.1 45 296 45 172.5 45 102.1 102.1 45 172.5 45c34.8 0 66.8 14 90 38.6 23.2-24.6 55.2-38.6 90-38.6 70.4 0 127.5 57.1 127.5 127.5 0 123.5-118.5 220.6-165.6 257.4-4.2 3.4-9.3 5.1-14.4 5.1z")',
                                transform: 'scale(1.1)'
                            }}
                        >
                            {/* Imagen de la especialista (Debe ser PNG transparente) */}
                            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                                <div className="relative w-[85%] h-[90%] flex items-end justify-center">
                                    <Image
                                        src="/images/especialista1.png" 
                                        alt="Asesor Especializado HomeLab"
                                        width={700} // Aumentamos un poco el ancho base para mejor resolución
                                        height={700}
                                        className="object-contain w-full h-full transition-transform duration-700 hover:scale-105 select-none"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Icono decorativo de corazón flotante con color de marca */}
                        <div className="absolute -bottom-6 right-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-gray-50 animate-bounce-slow">
                             <div className="text-[#D12E7B]">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .animate-bounce-slow {
                    animation: bounce 4s infinite ease-in-out;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
            `}</style>
        </section>
    );
}