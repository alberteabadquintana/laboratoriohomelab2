"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, Search, Lock, CheckCircle2, AlertCircle, MessageCircle, Loader2, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ResultadosPage() {
  const [dni, setDni] = useState("");
  const [status, setStatus] = useState<"idle" | "ready" | "not_ready" | "not_found">("idle");
  const [loading, setLoading] = useState(false);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni || dni.length < 7) return;

    setLoading(true);
    setStatus("idle");

    const { data, error } = await supabase
      .from('analisis')
      .select('estado')
      .eq('dni', dni)
      .maybeSingle();

    setLoading(false);

    if (error) {
      console.error("Error:", error.message);
      return;
    }

    if (!data) {
      setStatus("not_found");
    } else if (data.estado === "terminado") {
      setStatus("ready");
    } else {
      setStatus("not_ready");
    }
  };

  return (
    <section className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">
      
      {/* ACCESO STAFF DISCRETO - REUBICADO */}
      <div className="absolute top-24 right-6 md:right-16 z-50">
        <Link href="/resultados/admin-login">
          <button 
            title="Acceso Administrativo" 
            className="flex items-center gap-3 text-gray-400 hover:text-[#D12E7B] transition-all group active:scale-95"
          >
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-lg hover:shadow-md transition-shadow">
              <Lock className="w-5 h-5 text-gray-500 group-hover:text-[#D12E7B]" />
            </div>
            {/* Opcional: Un texto muy sutil que solo aparece en hover */}
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              Personal autorizado
            </span>
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#333333] uppercase tracking-tighter mb-4">
            Consulta tus <span className="text-[#D12E7B]">Resultados</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Ingresa tu número de documento para verificar el estado de tus análisis clínicos.
          </p>

          {/* MENSAJE DE TIEMPO DE ENTREGA */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl"
          >
            <Clock className="w-4 h-4 text-[#D12E7B] animate-pulse" />
            <p className="text-[#333333] text-[11px] font-black uppercase tracking-widest">
              Tus resultados están terminados de <span className="text-[#D12E7B]">3 - 5 días hábiles</span>
            </p>
          </motion.div>
        </div>

        <motion.div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#D12E7B]"></div>

          <form onSubmit={handleConsultar} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[#333333] font-black uppercase text-[11px] tracking-widest ml-1">
                Número de DNI:
              </label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D12E7B] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Ingrese DNI"
                  maxLength={12}
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D12E7B]/20 focus:bg-white outline-none rounded-2xl py-4 pl-14 pr-6 transition-all font-bold text-[#333333]"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#333333] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>Buscando... <Loader2 className="w-5 h-5 animate-spin" /></>
              ) : (
                <>Verificar Resultados <Search className="w-5 h-5" /></>
              )}
            </button>
          </form>

          {/* MENSAJES DE ESTADO */}
          <AnimatePresence mode="wait">
            {status === "ready" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-green-50 rounded-3xl border border-green-100 text-center space-y-4"
              >
                <div className="flex justify-center"><CheckCircle2 className="text-green-500 w-12 h-12" /></div>
                <div>
                  <h3 className="text-green-800 font-black uppercase text-sm tracking-tight">¡Tu análisis está listo!</h3>
                  <p className="text-green-600 text-xs mt-1 font-medium">Ya puedes solicitar el envío de tus resultados por WhatsApp.</p>
                </div>
                <a 
                  href={`https://wa.me/51900000000?text=Hola%20HomeLab,%20mi%20resultado%20con%20DNI%20${dni}%20figura%20como%20LISTO%20en%20la%20web.%20Solicito%20el%20envío%20de%20mi%20informe.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest py-4 px-8 rounded-full hover:bg-[#128C7E] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" /> Solicitar PDF vía WhatsApp
                </a>
              </motion.div>
            )}

            {status === "not_ready" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center space-y-3"
              >
                <div className="flex justify-center"><AlertCircle className="text-amber-500 w-12 h-12" /></div>
                <h3 className="text-amber-800 font-black uppercase text-sm tracking-tight">Análisis en proceso</h3>
                <p className="text-amber-600 text-xs font-medium">Tus muestras aún están siendo procesadas. Por favor, vuelve a consultar más tarde.</p>
              </motion.div>
            )}

            {status === "not_found" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center space-y-3"
              >
                <div className="flex justify-center"><Search className="text-gray-400 w-12 h-12" /></div>
                <h3 className="text-gray-800 font-black uppercase text-sm tracking-tight">DNI no registrado</h3>
                <p className="text-gray-500 text-xs font-medium">No encontramos ningún análisis asociado a este documento. Verifica el número e intenta nuevamente.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}