"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function ContactoPage() {
  // Estado para capturar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    asunto: "",
    mensaje: ""
  });

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar a WhatsApp
  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numero = "51947052846"; 
    
    const mensajeTexto = `*Hola HOMELAB, soy:*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Teléfono:* ${formData.telefono}%0A` +
      `*Correo:* ${formData.correo}%0A` +
      `*Asunto:* ${formData.asunto}%0A` +
      `*Mensaje:* ${formData.mensaje}`;

    const url = `https://wa.me/${numero}?text=${mensajeTexto}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TÍTULO PRINCIPAL */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#333333] uppercase tracking-tighter">
            Contacta con <span className="text-[#D12E7B]">nosotros</span>
          </h2>
          <div className="w-24 h-1 bg-[#D12E7B] mx-auto mt-4"></div>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto font-medium">
            Déjanos tu mensaje y un asesor se pondrá en contacto contigo a la brevedad posible para brindarte la mejor atención.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* COLUMNA IZQUIERDA: ACCESOS DIRECTOS */}
          <div className="lg:col-span-4 space-y-4">
            <a 
              href="https://wa.me/51900000000?text=Hola%20HomeLab,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#D12E7B] p-6 rounded-xl text-white group hover:bg-[#333333] transition-all duration-300 shadow-lg shadow-[#D12E7B]/20"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.582 5.723l-.999 3.648 3.906-.972z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Escríbenos a nuestro</p>
                  <p className="font-black text-lg uppercase">WhatsApp</p>
                </div>
              </div>
              <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>

            <a 
              href="https://maps.app.goo.gl/N7XL2Du3xnLDdpHk6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#333333] p-6 rounded-xl text-white group hover:bg-[#D12E7B] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Ubícanos en</p>
                  <p className="font-black text-lg uppercase">Nuestra sede</p>
                </div>
              </div>
              <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>

            <div className="p-6">
              <p className="text-[#333333] font-black uppercase tracking-tighter text-2xl mb-4">síguenos:</p>
              <div className="flex gap-4">
                {[
                  { name: 'facebook', icon: Facebook, url: '#' },
                  { name: 'instagram', icon: Instagram, url: '#' },
                  { name: 'linkedin', icon: Linkedin, url: '#' }
                ].map((social) => {
                  const Icon = social.icon; 
                  return (
                    <a 
                      key={social.name} 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#333333] text-white rounded-full flex items-center justify-center hover:bg-[#D12E7B] hover:-translate-y-1 cursor-pointer transition-all shadow-md group"
                    >
                      <span className="sr-only">{social.name}</span>
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO */}
          <div className="lg:col-span-8">
            <form onSubmit={handleWhatsAppSend} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-widest mb-2">Nombres y Apellidos: *</label>
                <input 
                  required
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  type="text" 
                  placeholder="Ingresa sus nombres y Apellidos" 
                  className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-sm transition-colors font-medium text-[#333333] bg-transparent" 
                />
              </div>

              <div>
                <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-widest mb-2">Teléfono: *</label>
                <input 
                  required
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  type="tel" 
                  placeholder="Ingresa tu teléfono" 
                  className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-sm transition-colors font-medium bg-transparent" 
                />
              </div>

              <div>
                <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-widest mb-2">Correo electrónico: *</label>
                <input 
                  required
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  type="email" 
                  placeholder="Ingresa tu correo electrónico" 
                  className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-sm transition-colors font-medium bg-transparent" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-widest mb-2">Asunto: *</label>
                <input 
                  required
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  type="text" 
                  placeholder="Ingrese su asunto" 
                  className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-sm transition-colors font-medium bg-transparent" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-widest mb-2">Mensaje: *</label>
                <textarea 
                  required
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Ingresa tu mensaje" 
                  className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-sm transition-colors font-medium resize-none bg-transparent"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  className="flex items-center gap-3 bg-[#333333] text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#25D366] transition-all duration-300 shadow-xl shadow-black/10"
                >
                  Enviar a HOMELAB
                  
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}