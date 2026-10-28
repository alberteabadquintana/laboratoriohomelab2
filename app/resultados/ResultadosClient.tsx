// app/resultados/ResultadosClient.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { User, Search, CheckCircle2, AlertCircle, Download, Loader2, Clock, KeyRound } from "lucide-react";
import { consultarEstadoDni, descargarInforme } from "@/app/actions";

export default function ResultadosClient() {
  const [dni, setDni] = useState("");
  const [codigo, setCodigo] = useState("");
  const [status, setStatus] = useState<"idle" | "ready" | "not_ready" | "not_found">("idle");
  const [loading, setLoading] = useState(false);
  const [loadingDescarga, setLoadingDescarga] = useState(false);
  const [paciente, setPaciente] = useState<{ nombres: string; apellidos: string } | null>(null);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    const documentoLimpio = dni.trim();
    if (!documentoLimpio || (documentoLimpio.length !== 8 && documentoLimpio.length !== 9)) {
      alert("El documento debe tener 8 dígitos (DNI) o 9 dígitos (CE).");
      return;
    }
    if (!codigo.trim()) {
      alert("Ingresa el código de atención o de reserva que te brindamos.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setPaciente(null);

    // Por seguridad, el DNI solo no revela datos: se exige el código.
    const { data, error } = await consultarEstadoDni(documentoLimpio, codigo.trim());

    setLoading(false);

    if (error) {
      const mensajeError = typeof error === 'string' ? error : "Error al procesar la consulta.";
      console.error("Error:", mensajeError);
      alert(mensajeError);
      return;
    }

    if (!data) {
      setStatus("not_found");
    } else {
      setPaciente({ nombres: data.nombres, apellidos: data.apellidos });
      if (data.estado === "terminado") {
        setStatus("ready");
      } else {
        setStatus("not_ready");
      }
    }
  };

  const handleDescargar = async () => {
    if (!codigo.trim()) {
      alert("Por favor, ingresa tu código de atención o reserva.");
      return;
    }
    
    setLoadingDescarga(true);
    const { data, error } = await descargarInforme(dni.trim(), codigo.trim());
    setLoadingDescarga(false);

    if (error) {
      alert(error);
      return;
    }

    if (data && data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">



      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#333333] uppercase tracking-tighter mb-4">
            Consulta tus <span className="text-[#D12E7B]">Resultados</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Ingresa tu número de documento y el código de atención o reserva para verificar tus análisis.
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

          <form onSubmit={handleConsultar} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[#333333] font-black uppercase text-[11px] tracking-widest ml-1">
                Número de Documento (DNI / CE):
              </label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D12E7B] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ingrese su número"
                  maxLength={9}
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D12E7B]/20 focus:bg-white outline-none rounded-2xl py-4 pl-14 pr-6 transition-all font-bold text-[#333333]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#333333] font-black uppercase text-[11px] tracking-widest ml-1">
                Código de atención o reserva:
              </label>
              <div className="relative">
                <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D12E7B] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ej. AT-2026-000001 o RW-2026-000001"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D12E7B]/20 focus:bg-white outline-none rounded-2xl py-4 pl-14 pr-6 transition-all font-bold text-[#333333] uppercase placeholder:font-normal placeholder:normal-case"
                />
              </div>
              <p className="text-[11px] text-gray-500 ml-1">
                Lo encuentras en tu comprobante. Es necesario para proteger tus datos.
              </p>
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
                  {paciente && (
                    <p className="text-green-700 text-xs font-bold uppercase tracking-widest mb-1">
                      Paciente: {paciente.nombres} {paciente.apellidos}
                    </p>
                  )}
                  <h3 className="text-green-800 font-black uppercase text-sm tracking-tight">¡Tu análisis está listo!</h3>
                  <p className="text-green-700 text-xs mt-2 font-medium">
                    Descarga tu informe con el código que ingresaste.
                  </p>
                </div>

                <div className="mt-4 pt-5 border-t border-green-200/60 max-w-sm mx-auto">
                  <button
                    onClick={handleDescargar}
                    disabled={loadingDescarga}
                    className="bg-[#D12E7B] text-white font-black text-xs uppercase tracking-widest py-3.5 px-8 rounded-full hover:bg-[#b02566] transition-all shadow-lg w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingDescarga ? (
                      <>Validando <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Descargar Resultados <Download className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {status === "not_ready" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center space-y-3"
              >
                <div className="flex justify-center"><AlertCircle className="text-amber-500 w-12 h-12" /></div>
                {paciente && (
                  <p className="text-amber-700 text-xs font-bold uppercase tracking-widest">
                    Paciente: {paciente.nombres} {paciente.apellidos}
                  </p>
                )}
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
                <h3 className="text-gray-800 font-black uppercase text-sm tracking-tight">Sin coincidencias</h3>
                <p className="text-gray-500 text-xs font-medium">No encontramos una atención con ese documento y código. Verifica ambos datos e intenta nuevamente.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
