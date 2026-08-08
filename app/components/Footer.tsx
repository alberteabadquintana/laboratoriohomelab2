'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ChevronRight, Microscope, Linkedin, Youtube, Beaker } from 'lucide-react';
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#333333] text-white pt-32 pb-0 overflow-hidden font-sans">

            {/* Separador de Onda Blanca */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" fillOpacity="1"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">

                    {/* Brand Section - HomeLab */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/10 rounded-xl p-1">
                                <div className="bg-white rounded-lg p-2 w-16 h-16 flex items-center justify-center shadow-lg overflow-hidden">
                                    {/* Logo de HomeLab en Imagen */}
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/logoPrincipal.jpg"
                                            alt="Logo HomeLab"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-2xl font-bold tracking-tighter leading-none">HOME<span className="text-[#D12E7B]">LAB</span></h2>
                                <h2 className="text-xs font-light tracking-[0.2em] text-gray-400 leading-none mt-1 uppercase">Laboratorio Clínico</h2>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Especialistas en diagnóstico clínico de alta precisión. Innovación tecnológica y calidez humana al servicio de tu salud en Piura.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-2 mt-4 lg:mt-0">
                        <h3 className="text-lg font-bold mb-6 relative">
                            Enlaces
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#D12E7B] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: 'Inicio', path: '/' },
                                { name: 'Nosotros', path: '/nosotros' },
                                { name: 'Resultados', path: '/medicos' },
                                { name: 'Servicios', path: '/servicios' },
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.path} className="group flex items-center text-gray-400 hover:text-[#D12E7B] transition-all duration-300">
                                        <ChevronRight size={14} className="mr-2 text-[#D12E7B] group-hover:translate-x-1 transition-transform" />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Servicios de Laboratorio */}
                    <div className="lg:col-span-3 mt-4 lg:mt-0">
                        <h3 className="text-lg font-bold mb-6 relative text-white">
                            Laboratorio clínico
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#D12E7B] rounded-full"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {['Hematología', 'Bioquímica', 'Inmunología', 'Microbiología', 'Parasitología', 'Coprología'].map((service, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={`/servicios`} 
                                        className="flex items-center text-gray-400 hover:text-white group transition-all duration-300 ease-in-out transform hover:translate-x-1 cursor-pointer"
                                    >
                                        <Beaker 
                                            size={14} 
                                            className="mr-2 text-[#D12E7B] fill-[#D12E7B]/20 group-hover:scale-110 transition-transform" 
                                        />
                                        <span>{service}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3 mt-4 lg:mt-0">
                        <h3 className="text-lg font-bold mb-6 relative">
                            Contacto
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#D12E7B] rounded-full"></span>
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                <MapPin className="mr-3 mt-1 text-[#D12E7B] flex-shrink-0" size={18} />
                                <span className="text-gray-300 text-xs leading-relaxed">
                                    Av. Los Diamantes Cruce con Av. Ramón Romero,<br /> Piura - Perú
                                </span>
                            </div>

                            <div className="flex items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                <Phone className="mr-3 text-[#D12E7B] flex-shrink-0" size={18} />
                                <span className="text-white text-sm font-semibold tracking-wide">+51 947 052 846</span>
                            </div>

                            <div className="flex items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                <Mail className="mr-3 text-[#D12E7B] flex-shrink-0" size={18} />
                                <span className="text-gray-300 text-xs">informes@homelab.com.pe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Redes Sociales - Estilo HomeLab */}
            <div className="w-full bg-[#2a2a2a] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="w-full flex justify-center items-center divide-x divide-white/10">
                            {[
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Youtube, href: "#" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="flex-1 flex justify-center items-center h-12 text-gray-500 hover:text-[#D12E7B] transition-all duration-300 group"
                                >
                                    <social.Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-[#1a1a1a] py-3">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
                        &copy; {currentYear} HOME LAB. Precisión y Confianza. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}