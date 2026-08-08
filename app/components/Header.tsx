"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Globe } from "lucide-react"; // Importamos icono sutil

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lang, setLang] = useState("ES"); // Estado para el idioma
    const pathname = usePathname(); 

    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const headerStyle = !isHomePage || isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5';

    const textStyle = !isHomePage || isScrolled 
        ? 'text-[#333333]' 
        : 'text-white';

    const buttonStyle = !isHomePage || isScrolled
        ? 'bg-[#D12E7B] text-white hover:bg-[#b02666]'
        : 'bg-white text-[#333333] hover:bg-[#D12E7B] hover:text-white';

    // Estilo para el separador de idiomas |
    const dividerStyle = !isHomePage || isScrolled ? 'bg-gray-300' : 'bg-white/30';

    return (
        <header className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${headerStyle}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
                
                {/* LOGO */}
                <div className="flex items-center z-50 relative">
                    <Link href="/" onClick={closeMenu} className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2">
                        <Image 
                            src="/images/logo-trans2.png" 
                            alt="HomeLab Logo"
                            width={150} 
                            height={40}  
                            className="object-contain w-auto h-8 md:h-10" 
                            priority     
                        />
                    </Link>
                </div>

                {/* BOTÓN HAMBURGUESA */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`md:hidden z-50 relative p-2 focus:outline-none transition-colors ${isMenuOpen ? 'text-white' : (isHomePage && !isScrolled ? 'text-white' : 'text-[#D12E7B]')}`}
                    aria-label="Toggle Menu"
                >
                    <div className="space-y-2">
                        <span className={`block w-8 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
                    </div>
                </button>

                {/* NAVEGACIÓN */}
                <nav className={`
                    fixed inset-0 w-full h-[100dvh] bg-[#333333]/95 backdrop-blur-xl transition-transform duration-500 ease-in-out flex flex-col items-center justify-start pt-32 overflow-y-auto z-40
                    md:static md:bg-transparent md:backdrop-blur-none md:flex-row md:translate-x-0 md:h-auto md:w-auto md:pt-0 md:justify-end md:overflow-visible
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}>
                    <ul className={`flex flex-col md:flex-row gap-8 items-center text-xl md:text-[13px] font-bold tracking-wider transition-colors ${textStyle} ${isMenuOpen ? '!text-white' : ''}`}>
                        <li>
                            <Link href="/" onClick={closeMenu} className="hover:text-[#D12E7B] transition-colors uppercase">Inicio</Link>
                        </li>
                        <li>
                            <Link href="/nosotros" onClick={closeMenu} className="hover:text-[#D12E7B] transition-colors uppercase">Nosotros</Link>
                        </li>
                        <li>
                            <Link href="/servicios" onClick={closeMenu} className="hover:text-[#D12E7B] transition-colors uppercase">Servicios</Link>
                        </li>
                        <li>
                            <Link href="/resultados" onClick={closeMenu} className="hover:text-[#D12E7B] transition-colors uppercase">Resultados</Link>
                        </li>

                        
                        
                        <li className="mt-4 md:mt-0">
                            <Link
                                href="/contactanos" 
                                onClick={closeMenu}
                                className={`px-6 py-2.5 rounded-full transition-all text-center font-black text-xs uppercase tracking-widest shadow-md ${buttonStyle}`}
                            >
                                Contáctanos
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}