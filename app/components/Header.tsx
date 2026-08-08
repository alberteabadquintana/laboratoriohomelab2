"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Phone, Copy, Check } from "lucide-react";

const TELEFONO = "947052846";
const TELEFONO_DISPLAY = "+51 947 052 846";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPhonePopover, setShowPhonePopover] = useState(false);
    const [copied, setCopied] = useState(false);
    const pathname = usePathname(); 
    const popoverRef = useRef<HTMLLIElement>(null);

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

    // Cerrar popover al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setShowPhonePopover(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleCopyPhone = () => {
        navigator.clipboard.writeText(TELEFONO_DISPLAY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const headerStyle = !isHomePage || isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-5';

    const textStyle = !isHomePage || isScrolled 
        ? 'text-[#333333]' 
        : 'text-white';

    const buttonStyle = !isHomePage || isScrolled
        ? 'bg-[#D12E7B] text-white hover:bg-[#b02666]'
        : 'bg-white text-[#333333] hover:bg-[#D12E7B] hover:text-white';

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
                    <ul className={`flex flex-col md:flex-row gap-6 items-center text-xl md:text-[13px] font-bold tracking-wider transition-colors ${textStyle} ${isMenuOpen ? '!text-white' : ''}`}>
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
                        <li>
                            <Link href="/contactanos" onClick={closeMenu} className="hover:text-[#D12E7B] transition-colors uppercase">Contáctanos</Link>
                        </li>

                        {/* ---- BOTÓN QUIERO MI EXAMEN ---- */}
                        <li className="mt-2 md:mt-0">
                            <Link
                                href="/QuieroMiExamen"
                                onClick={closeMenu}
                                id="quiero-mi-examen-btn"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-md transition-all duration-300 bg-[#D12E7B] text-white hover:bg-[#b02666] hover:shadow-lg hover:shadow-[#D12E7B]/30 hover:-translate-y-0.5 active:scale-95"
                            >
                                Quiero mi examen
                            </Link>
                        </li>


                        {/* ---- BOTÓN TELÉFONO CON POPOVER ---- */}
                        <li className="mt-4 md:mt-0 relative" ref={popoverRef}>
                            <button
                                id="phone-button"
                                onClick={() => setShowPhonePopover(!showPhonePopover)}
                                aria-label="Llamar a HomeLab"
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                    isHomePage && !isScrolled
                                        ? 'border-white/60 text-white hover:bg-white hover:text-[#D12E7B]'
                                        : 'border-[#D12E7B]/30 text-[#D12E7B] hover:bg-[#D12E7B] hover:text-white'
                                } ${showPhonePopover ? (isHomePage && !isScrolled ? 'bg-white text-[#D12E7B]' : 'bg-[#D12E7B] text-white') : ''}`}
                            >
                                <Phone className="w-4 h-4" />
                            </button>

                            {/* POPOVER */}
                            {showPhonePopover && (
                                <div className="absolute top-14 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* Flechita superior */}
                                    <div className="absolute -top-2 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
                                    
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Contacto directo</p>
                                    <p className="text-[#333333] font-black text-lg mb-4 tracking-tight">{TELEFONO_DISPLAY}</p>
                                    
                                    <div className="flex flex-col gap-2">
                                        {/* Botón Llamar */}
                                        <a
                                            href={`tel:+51${TELEFONO}`}
                                            id="call-button"
                                            className="flex items-center gap-3 bg-[#D12E7B] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#b02666] transition-all shadow-lg shadow-[#D12E7B]/20 active:scale-95"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Llamar ahora
                                        </a>
                                        
                                        {/* Botón Copiar */}
                                        <button
                                            onClick={handleCopyPhone}
                                            id="copy-phone-button"
                                            className="flex items-center gap-3 bg-gray-50 text-[#333333] px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-200 active:scale-95"
                                        >
                                            {copied ? (
                                                <><Check className="w-4 h-4 text-green-500" /><span className="text-green-600">¡Copiado!</span></>
                                            ) : (
                                                <><Copy className="w-4 h-4" />Copiar número</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}