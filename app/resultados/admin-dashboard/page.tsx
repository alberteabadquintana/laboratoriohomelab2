"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { obtenerTodosLosAnalisis, registrarAnalisis, eliminarAnalisis, actualizarEstadoAnalisis } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Search, Trash2, CheckCircle, Clock, List, LogOut, Plus, AlertCircle } from "lucide-react";

interface Analisis {
  id: string;
  dni: string;
  estado: "pendiente" | "terminado";
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tabActual, setTabActual] = useState<"todos" | "pendientes" | "terminados">("todos");
  const [analisis, setAnalisis] = useState<Analisis[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [errorDni, setErrorDni] = useState<string | null>(null);
  const [nuevoDni, setNuevoDni] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchAnalisis = async () => {
    setLoading(true);
    const { data, error } = await obtenerTodosLosAnalisis();
    if (!error) setAnalisis(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAnalisis(); }, []);

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de 8 dígitos
    if (nuevoDni.length !== 8) {
      setErrorDni("El DNI debe tener exactamente 8 dígitos");
      return;
    }
    
    setErrorDni(null);
    setIsSaving(true);
    const { error } = await registrarAnalisis(nuevoDni);

    if (!error) {
      setNuevoDni("");
      setIsModalOpen(false);
      fetchAnalisis();
    }
    setIsSaving(false);
  };

  const confirmarEliminacion = async () => {
    if (!deleteModal.id) return;
    const { error } = await eliminarAnalisis(deleteModal.id);
    if (!error) fetchAnalisis();
    setDeleteModal({ open: false, id: null });
  };

  const toggleEstado = async (id: string, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'pendiente' ? 'terminado' : 'pendiente';
    const { error } = await actualizarEstadoAnalisis(id, nuevoEstado);
    if (!error) fetchAnalisis();
  };

  const handleLogout = async () => {
    router.push("/resultados");
  };

  const listaFiltrada = analisis.filter(a => {
    const coincideTab = tabActual === "todos" ? true : a.estado === tabActual.slice(0, -1);
    const coincideBusqueda = a.dni.includes(busqueda);
    return coincideTab && coincideBusqueda;
  });

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col md:flex-row h-screen bg-[#F8FAFC] overflow-hidden font-sans text-[#1A1A1A]">
      
      <aside className="w-full md:w-72 bg-[#1E1E1E] text-white p-3 sm:p-4 md:p-8 flex flex-row md:flex-col items-center md:items-stretch flex-shrink-0 shadow-2xl overflow-x-auto no-scrollbar md:overflow-visible z-20">
        <div className="md:mb-12 flex items-center md:block flex-shrink-0 mr-4 md:mr-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D12E7B] rounded-xl flex items-center justify-center text-lg md:text-xl font-black md:mb-4">HL</div>
          <div className="hidden md:block">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D12E7B] mb-1">Control Interno</h2>
            <p className="text-lg font-bold tracking-tight">HomeLab Admin</p>
          </div>
        </div>
        <nav className="flex flex-row md:flex-col gap-2 md:space-y-3 flex-1 flex-shrink-0">
          {[{ id: "todos", label: "Todos", icon: <List className="w-4 h-4" /> },
            { id: "pendientes", label: "Pendientes", icon: <Clock className="w-4 h-4" /> },
            { id: "terminados", label: "Terminados", icon: <CheckCircle className="w-4 h-4" /> }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setTabActual(tab.id as any)} 
              className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-4 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${tabActual === tab.id ? 'bg-[#D12E7B] text-white shadow-lg' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="ml-2 md:ml-0 md:mt-auto md:pt-8 md:border-t border-white/5 flex items-center gap-2 md:gap-3 text-gray-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest transition-colors flex-shrink-0">
          <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Salir</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white p-4 md:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-gray-100 shadow-sm relative z-10 gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-10">
            <h1 className="text-lg sm:text-xl font-black uppercase tracking-tighter hidden sm:block">Gestión de <span className="text-[#D12E7B]">Pacientes</span></h1>
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input type="text" placeholder="Filtrar por DNI..." value={busqueda} onChange={(e) => setBusqueda(e.target.value.replace(/\D/g, "").slice(0, 8))} className="w-full sm:w-96 bg-gray-50 border border-gray-200 focus:border-[#D12E7B]/30 outline-none rounded-2xl py-3 pl-12 pr-6 text-sm font-bold transition-all" />
            </div>
          </div>
          <button onClick={() => { setIsModalOpen(true); setErrorDni(null); }} className="justify-center bg-[#D12E7B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#D12E7B]/20 flex items-center gap-2 active:scale-95 transition-all">
            <Plus className="w-4 h-4" /> Registrar Nuevo
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <StatCard label="Total General" val={analisis.length} color="text-gray-800" />
            <StatCard label="Pendientes" val={analisis.filter(a=>a.estado==='pendiente').length} color="text-amber-500" />
            <StatCard label="Listos" val={analisis.filter(a=>a.estado==='terminado').length} color="text-[#D12E7B]" />
          </div>

          <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black uppercase text-gray-400">Identificación (DNI)</th>
                  <th className="px-5 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                  <th className="px-5 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black uppercase text-gray-400 text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={3} className="text-center py-24 text-gray-300 font-bold animate-pulse tracking-widest text-xs">SINCRONIZANDO...</td></tr>
                ) : listaFiltrada.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-24 text-gray-400 font-bold uppercase text-[10px] tracking-widest">No hay registros</td></tr>
                ) : (
                  listaFiltrada.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 sm:px-10 py-5 sm:py-8">
                        <p className="font-black text-gray-800 text-sm sm:text-base mb-1">{item.dni}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wider">{new Date(item.created_at).toLocaleDateString('es-PE')}</p>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <p className="text-[9px] sm:text-[10px] text-[#D12E7B] font-black tracking-wider uppercase">{new Date(item.created_at).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        </div>
                      </td>
                      <td className="px-5 sm:px-10 py-5 sm:py-8 text-center">
                        <button onClick={() => toggleEstado(item.id, item.estado)} className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${item.estado === 'terminado' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                          {item.estado === 'terminado' ? 'terminado' : 'pendiente'}
                        </button>
                      </td>
                      <td className="px-5 sm:px-10 py-5 sm:py-8 text-right">
                        <button onClick={() => setDeleteModal({ open: true, id: item.id })} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center ml-auto">
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL REGISTRO*/}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSaving && setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 shadow-2xl relative z-10">
              <h2 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 uppercase tracking-tighter">Nuevo <span className="text-[#D12E7B]">Análisis</span></h2>
              <form onSubmit={handleRegistrar} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Ingrese DNI:</label>
                  <input 
                    type="text" 
                    maxLength={8} 
                    value={nuevoDni} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setNuevoDni(val);
                      if (val.length === 8) setErrorDni(null); 
                    }} 
                    placeholder="Ingrese DNI a registrar" 
                    className={`w-full bg-gray-50 border ${errorDni ? 'border-red-500' : 'border-gray-200'} outline-none rounded-2xl py-5 px-6 font-black text-lg transition-all`} 
                    required 
                    autoFocus 
                  />
                  
                  {errorDni && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-2 ml-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {errorDni}
                    </motion.p>
                  )}
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black uppercase text-[10px] text-gray-400">Cancelar</button>
                  <button type="submit" disabled={isSaving} className="flex-[2] bg-[#D12E7B] text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg shadow-[#D12E7B]/20">{isSaving ? "Guardando..." : "Registrar"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal.open && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModal({ open: false, id: null })} className="absolute inset-0 bg-[#1E1E1E]/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl relative z-10 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-[#1A1A1A]">¿Eliminar Registro?</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">Esta acción no se puede deshacer.</p>
              <div className="flex flex-col gap-3">
                <button onClick={confirmarEliminacion} className="w-full bg-red-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-500/20 active:scale-95">Confirmar Eliminación</button>
                <button onClick={() => setDeleteModal({ open: false, id: null })} className="w-full py-4 font-black uppercase text-[10px] text-gray-400">Mantener Registro</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ label, val, color }: { label: string, val: number, color: string }) {
  return (
    <div className="bg-white p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
      <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1 sm:mb-2">{label}</p>
      <p className={`text-3xl sm:text-4xl font-black ${color}`}>{val}</p>
    </div>
  );
}