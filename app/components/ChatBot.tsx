'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ChevronRight, Phone, MapPin, MessageCircle, Loader2 } from 'lucide-react';

// ─── INFO DEL LABORATORIO ──────────────────────────────────────────────────────
const LAB_INFO = {
  nombre: 'HomeLab – Clínica Bello Horizonte',
  telefono: '931 758 558',
  whatsapp: '51931758558',
  whatsappAlt: '51931758558',
  direccion: 'Av. Los Diamantes con Av. Ramón Romero, Piura, Piura',
  horario: 'Lunes a Sábado: 7:00 am – 1:00 pm',
};

// ─── PREGUNTAS FRECUENTES ─────────────────────────────────────────────────────
const FAQS: { pregunta: string; respuesta: string }[] = [
  {
    pregunta: '¿Cuál es su ubicación?',
    respuesta: `📍 Nos encontramos en:\n**${LAB_INFO.direccion}**\n\nEstamos en el corazón de Piura, de fácil acceso. Si necesitas indicaciones más precisas, llámanos al 📞 **${LAB_INFO.telefono}**.`,
  },
  {
    pregunta: '¿Cuáles son sus horarios de atención?',
    respuesta: `🕖 Nuestro horario de atención es:\n**${LAB_INFO.horario}**\n\nTe recomendamos llegar temprano para una mejor atención.`,
  },
  {
    pregunta: '¿Cómo puedo saber el precio de un análisis?',
    respuesta: `💰 Para consultar precios específicos, comunícate con nosotros:\n\n📞 Llámanos al **${LAB_INFO.telefono}**\n💬 O escríbenos por WhatsApp al mismo número\n\nTe informaremos el precio exacto según el análisis que necesites.`,
  },
  {
    pregunta: '¿Qué análisis realizan?',
    respuesta: `🔬 Realizamos una amplia variedad de análisis, entre ellos:\n\n• Perfil de Coagulación y Lipídico\n• Hematología y Bioquímica\n• Inmunología y Serología\n• Marcadores Tumorales\n• Endocrinología y Microbiología\n• Perfiles Pre-Operatorio y Pre-Natal\n• TORCH, Renal, Tiroideo y más\n\nVe todos nuestros análisis en la sección **"Quiero mi Examen"**.`,
  },
  {
    pregunta: '¿Tienen servicio a domicilio?',
    respuesta: `🏠 ¡Sí! Ofrecemos **atención a domicilio** en Piura y distritos cercanos.\n\nNuestro personal capacitado va a tu dirección para tomar las muestras.\n\n👉 Agenda en la sección **"Quiero mi Examen"** o escríbenos al **${LAB_INFO.telefono}**.`,
  },
  {
    pregunta: '¿Cómo puedo agendar una cita?',
    respuesta: `📅 Puedes agendar tu cita de dos formas:\n\n1️⃣ **Online:** En nuestra sección **"Quiero mi Examen"** en la web.\n\n2️⃣ **Por WhatsApp/Llamada:** Contáctanos al **${LAB_INFO.telefono}** y te ayudamos a reservar.`,
  },
  {
    pregunta: '¿Cuánto demoran los resultados?',
    respuesta: `⏱ El tiempo varía según el análisis:\n\n• Análisis de rutina: **mismo día o al día siguiente**\n• Análisis especiales: **2 a 5 días hábiles**\n• Cultivos: **3 a 7 días hábiles**\n\nTe notificamos cuando estén listos. También puedes verlos en la sección **Resultados** de nuestra web.`,
  },
  {
    pregunta: '¿Cómo obtengo mis resultados?',
    respuesta: `📋 Puedes obtener tus resultados de estas formas:\n\n1️⃣ **En nuestra web:** Sección "Resultados" con tu código.\n2️⃣ **En sede:** Retiro personal en nuestra clínica.\n3️⃣ **Por WhatsApp:** Para algunos análisis los enviamos digitalmente.\n\n¿Necesitas ayuda? Llámanos al **${LAB_INFO.telefono}**.`,
  },
  {
    pregunta: '¿Necesito ayuno para los análisis?',
    respuesta: `🍽 Depende del análisis:\n\n• **Glucosa, lípidos, triglicéridos:** 8 a 12 horas de ayuno.\n• **Hemograma y análisis generales:** No requiere ayuno.\n• **Examen de orina:** Primera orina del día (mejor resultado).\n\n💡 Ante la duda, consúltanos al **${LAB_INFO.telefono}**.`,
  },
  {
    pregunta: '¿Cuáles son sus métodos de pago?',
    respuesta: `💳 Aceptamos:\n\n• 💵 **Efectivo** (en sede)\n• 📱 **Yape / Plin** al **${LAB_INFO.telefono}**\n• 🏦 **Transferencia bancaria**\n• 💳 **Tarjeta** (en sede)\n\nPara pagos online, el número Yape/Plin es el mismo que nuestro WhatsApp.`,
  },
  {
    pregunta: '¿Atienden niños?',
    respuesta: `👶 ¡Sí! Contamos con personal capacitado para **atención pediátrica**.\n\nRealizamos:\n• Parasitológico\n• Hemoglobina\n• Grupo Sanguíneo y RH\n• Y más análisis para niños\n\nPara programar la atención, llámanos al **${LAB_INFO.telefono}**.`,
  },
  {
    pregunta: '¿Cómo contactarlos?',
    respuesta: `📞 Contáctanos por:\n\n📲 **Llamadas y WhatsApp:** ${LAB_INFO.telefono}\n📍 **Visítanos:** ${LAB_INFO.direccion}\n🕖 **Horario:** ${LAB_INFO.horario}\n\n¡Estamos para ayudarte!`,
  },
];

// ─── TIPOS ────────────────────────────────────────────────────────────────────
interface Mensaje {
  id: number;
  tipo: 'bot' | 'usuario';
  texto: string;
}

const SALUDO_INICIAL: Mensaje = {
  id: 0,
  tipo: 'bot',
  texto: `👋 ¡Hola! Soy el **Asistente Virtual** de **HomeLab**.\n\n¿En qué puedo ayudarte hoy? Elige una pregunta o escríbeme directamente. 😊`,
};

function renderTexto(texto: string) {
  const lineas = texto.split('\n');
  return lineas.map((linea, i) => {
    const partes = linea.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {partes.map((p, j) =>
          p.startsWith('**') && p.endsWith('**') ? (
            <strong key={j}>{p.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{p}</span>
          )
        )}
        {i < lineas.length - 1 && <br />}
      </span>
    );
  });
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO_INICIAL]);
  const [input, setInput] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [mostrarFAQ, setMostrarFAQ] = useState(true);
  const [tieneNuevo, setTieneNuevo] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
      setTieneNuevo(false);
    }
  }, [mensajes, isOpen]);

  useEffect(() => {
    const t = setTimeout(() => { if (!isOpen) setTieneNuevo(true); }, 5000);
    return () => clearTimeout(t);
  }, []);

  const agregarMensaje = (msg: Omit<Mensaje, 'id'>) =>
    setMensajes((prev) => [...prev, { ...msg, id: Date.now() }]);

  const buscarRespuesta = (texto: string): string | null => {
    const lower = texto.toLowerCase();
    if (lower.includes('ubica') || lower.includes('direc') || lower.includes('donde') || lower.includes('dónde')) return FAQS[0].respuesta;
    if (lower.includes('horario') || lower.includes('hora') || lower.includes('atiend')) return FAQS[1].respuesta;
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuánto') || lower.includes('cuanto') || lower.includes('valor')) return FAQS[2].respuesta;
    if (lower.includes('análisis') || lower.includes('examen') || lower.includes('prueba') || lower.includes('realiz')) return FAQS[3].respuesta;
    if (lower.includes('domicilio') || lower.includes('casa') || lower.includes('hogar')) return FAQS[4].respuesta;
    if (lower.includes('cita') || lower.includes('reserva') || lower.includes('agendar')) return FAQS[5].respuesta;
    if (lower.includes('demora') || lower.includes('tiempo') || lower.includes('cuándo') || lower.includes('listo')) return FAQS[6].respuesta;
    if (lower.includes('resultado') || lower.includes('obtener') || lower.includes('recog')) return FAQS[7].respuesta;
    if (lower.includes('ayuno') || lower.includes('comer') || lower.includes('alimenta')) return FAQS[8].respuesta;
    if (lower.includes('pago') || lower.includes('pagar') || lower.includes('yape') || lower.includes('tarjeta') || lower.includes('transferencia')) return FAQS[9].respuesta;
    if (lower.includes('niño') || lower.includes('bebe') || lower.includes('bebé') || lower.includes('pediatric') || lower.includes('infan')) return FAQS[10].respuesta;
    if (lower.includes('contact') || lower.includes('teléfono') || lower.includes('telefono') || lower.includes('llamar') || lower.includes('whatsapp')) return FAQS[11].respuesta;
    if (lower.includes('hola') || lower.includes('buenas') || lower.includes('buenos') || lower.includes('saludos'))
      return `¡Hola! 😊 Soy el **Asistente Virtual de HomeLab**. ¿En qué puedo ayudarte?`;
    if (lower.includes('gracias') || lower.includes('ok') || lower.includes('perfecto') || lower.includes('entendido') || lower.includes('listo'))
      return `¡Con mucho gusto! 😊 Si tienes más preguntas, aquí estaré. También puedes llamarnos al 📞 **${LAB_INFO.telefono}**.`;
    return null;
  };

  const enviarMensaje = async (texto: string) => {
    if (!texto.trim() || escribiendo) return;
    setMostrarFAQ(false);
    agregarMensaje({ tipo: 'usuario', texto: texto.trim() });
    setInput('');
    setEscribiendo(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 500));
    const respuesta = buscarRespuesta(texto);
    setEscribiendo(false);
    agregarMensaje({
      tipo: 'bot',
      texto: respuesta ?? `Gracias por tu consulta. 🙏 Para una respuesta más precisa contáctanos:\n\n📞 **Llamadas y WhatsApp:** ${LAB_INFO.telefono}\n📍 **Sede:** ${LAB_INFO.direccion}\n\n¡Nuestro equipo con gusto te ayudará!`,
    });
  };

  const handleFAQ = (faq: (typeof FAQS)[0]) => {
    setMostrarFAQ(false);
    agregarMensaje({ tipo: 'usuario', texto: faq.pregunta });
    setEscribiendo(true);
    setTimeout(() => {
      setEscribiendo(false);
      agregarMensaje({ tipo: 'bot', texto: faq.respuesta });
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="bg-white rounded-3xl shadow-2xl w-[340px] sm:w-[380px] flex flex-col overflow-hidden border border-gray-100 mb-2"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
          >
            {/* HEADER */}
            <div className="bg-[#333333] px-5 py-4 flex items-center gap-3 relative flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-[#D12E7B] flex items-center justify-center shadow-lg shadow-[#D12E7B]/30 flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm uppercase tracking-widest leading-none">Asistente Virtual</p>
                <p className="text-gray-400 text-[10px] font-medium mt-0.5">HomeLab · En línea ahora</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a href={`https://wa.me/${LAB_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors" title="WhatsApp">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </a>
                <a href={`tel:931758558`} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" title="Llamar">
                  <Phone className="w-4 h-4 text-white" />
                </a>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* INFO RÁPIDA */}
            <div className="bg-[#D12E7B]/5 border-b border-[#D12E7B]/10 px-4 py-2 flex items-center gap-2 flex-shrink-0">
              <MapPin className="w-3 h-3 text-[#D12E7B] flex-shrink-0" />
              <p className="text-[10px] text-[#D12E7B] font-bold truncate">{LAB_INFO.direccion}</p>
            </div>

            {/* MENSAJES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
              {mensajes.map((msg) => (
                <div key={msg.id} className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                  {msg.tipo === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[#D12E7B] flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 shadow-sm shadow-[#D12E7B]/20">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.tipo === 'usuario'
                      ? 'bg-[#D12E7B] text-white rounded-tr-sm shadow-md shadow-[#D12E7B]/20'
                      : 'bg-white text-[#333333] rounded-tl-sm shadow-sm border border-gray-100'
                  }`}>
                    {renderTexto(msg.texto)}
                  </div>
                </div>
              ))}

              {/* Indicador de escritura */}
              {escribiendo && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#D12E7B] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ sugeridas */}
              {mostrarFAQ && !escribiendo && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Preguntas frecuentes</p>
                  {FAQS.slice(0, 6).map((faq, i) => (
                    <button key={i} onClick={() => handleFAQ(faq)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-white rounded-xl border border-gray-100 hover:border-[#D12E7B]/30 hover:bg-[#D12E7B]/5 transition-all text-left group shadow-sm">
                      <span className="text-[11px] font-bold text-[#333333] group-hover:text-[#D12E7B] transition-colors leading-tight">{faq.pregunta}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D12E7B] flex-shrink-0 ml-2" />
                    </button>
                  ))}
                  <button onClick={() => setMostrarFAQ(false)}
                    className="w-full text-[10px] text-gray-400 font-bold py-1 hover:text-[#D12E7B] transition-colors">
                    Escríbeme directamente ↓
                  </button>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* ACCIONES RÁPIDAS */}
            {!mostrarFAQ && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-gray-100 bg-white scrollbar-none">
                {['Precios', 'Ubicación', 'Horarios', 'Cita', 'Domicilio', 'Resultados'].map((tema) => (
                  <button key={tema} onClick={() => enviarMensaje(tema)}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-wide text-[#333333] hover:bg-[#D12E7B]/10 hover:border-[#D12E7B]/30 hover:text-[#D12E7B] transition-all">
                    {tema}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 focus-within:border-[#D12E7B] focus-within:bg-white transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && enviarMensaje(input)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-transparent outline-none text-xs font-medium text-[#333333] placeholder:text-gray-400"
                  disabled={escribiendo}
                />
                <button onClick={() => enviarMensaje(input)} disabled={!input.trim() || escribiendo}
                  className="w-7 h-7 rounded-xl bg-[#D12E7B] flex items-center justify-center disabled:opacity-40 hover:bg-[#b02666] transition-colors shadow-sm shadow-[#D12E7B]/20 flex-shrink-0">
                  {escribiendo ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Send className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>
              <p className="text-center text-[9px] text-gray-400 mt-1.5 font-medium">
                Asistente Virtual · <span className="text-[#D12E7B] font-bold">{LAB_INFO.telefono}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÓN FLOTANTE */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(!isOpen); setTieneNuevo(false); }}
        className={`relative w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-[#333333]' : 'bg-[#D12E7B] shadow-[#D12E7B]/40'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && <span className="absolute -inset-1 rounded-2xl bg-[#D12E7B] opacity-25 animate-ping pointer-events-none" />}

        {tieneNuevo && !isOpen && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
            1
          </motion.span>
        )}
      </motion.button>

      {/* TOOLTIP */}
      {!isOpen && tieneNuevo && (
        <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-[68px] right-0 bg-[#333333] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl">
          💬 ¿Tienes alguna duda?
          <span className="absolute -bottom-1 right-6 w-2 h-2 bg-[#333333] rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
