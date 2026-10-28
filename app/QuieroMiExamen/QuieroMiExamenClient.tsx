"use client";

import { useEffect, useState } from "react";
import { crearReservaDesdeWeb } from "@/app/actions";
import {
  Home,
  Building2,
  User,
  FlaskConical,
  Calendar,
  MapPin,
  ClipboardList,
  CreditCard,
  Landmark,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

// ─── HORARIOS DISPONIBLES ─────────────────────────────────────────────────────
const HORARIOS = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type Modalidad = "sede" | "domicilio" | null;
type FormaPago = "pagar_ahora" | "pagar_sede" | null;
type TipoCatalogo = "examenes" | "perfiles";

interface ExamenOpcion {
  nombre: string;
  precio: number | null;
}

interface CatalogoCategoria {
  categoria: string;
  examenes: ExamenOpcion[];
}

interface PerfilOpcion {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  examenes: string[];
}

interface FormData {
  modalidad: Modalidad;
  dni: string;
  nombrePaciente: string;
  telefono: string;
  analisesSeleccionados: string[];
  perfilesSeleccionados: string[];
  fecha: string;
  horario: string;
  direccion: string;
  referencia: string;
  distrito: string;
  formaPago: FormaPago;
}

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────
const pasos = ["Modalidad", "Paciente", "Análisis", "Fecha & Hora", "Resumen", "Pago"];
const DISTRITOS_DISPONIBLES = [
  "Castilla",
  "Catacaos",
  "Cura Mori",
  "El Tallán",
  "La Arena",
  "La Unión",
  "Veintiséis de Octubre",
];

function StepIndicator({ paso, total }: { paso: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {pasos.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 ${i < paso
                  ? "bg-[#D12E7B] text-white shadow-lg shadow-[#D12E7B]/30"
                  : i === paso
                    ? "bg-[#D12E7B] text-white ring-2 sm:ring-4 ring-[#D12E7B]/20 shadow-lg shadow-[#D12E7B]/30"
                    : "bg-gray-100 text-gray-400"
                }`}
            >
              {i < paso ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : i + 1}
            </div>
            <span
              className={`text-[9px] font-bold mt-1 uppercase tracking-wider hidden sm:block ${i <= paso ? "text-[#D12E7B]" : "text-gray-400"
                }`}
            >
              {label}
            </span>
          </div>
          {i < total - 1 && (
            <div
              className={`w-3 sm:w-14 h-0.5 mx-1 mb-4 sm:mb-4 transition-all duration-500 ${i < paso ? "bg-[#D12E7B]" : "bg-gray-200"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── BOTONES NAV ─────────────────────────────────────────────────────────────
function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continuar",
  nextDisabled = false,
  showBack = true,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
      {showBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#333333] font-black text-xs uppercase tracking-widest transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Atrás
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 ${nextDisabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-[#D12E7B] text-white hover:bg-[#b02666] shadow-lg shadow-[#D12E7B]/25 hover:-translate-y-0.5 active:scale-95"
          }`}
      >
        {nextLabel} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function QuieroMiExamenClient({
  catalogos = [],
  perfiles = [],
}: {
  catalogos?: CatalogoCategoria[];
  perfiles?: PerfilOpcion[];
}) {
  const [paso, setPaso] = useState(0);
  const [codigoReserva, setCodigoReserva] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [tipoCatalogo, setTipoCatalogo] = useState<TipoCatalogo>("examenes");
  const [otroExamen, setOtroExamen] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [reniecLoading, setReniecLoading] = useState(false);
  const [reniecMsg, setReniecMsg] = useState("");
  const [reniecAutocompletado, setReniecAutocompletado] = useState(false);
  const [form, setForm] = useState<FormData>({
    modalidad: null,
    dni: "",
    nombrePaciente: "",
    telefono: "",
    analisesSeleccionados: [],
    perfilesSeleccionados: [],
    fecha: "",
    horario: "",
    direccion: "",
    referencia: "",
    distrito: "",
    formaPago: null,
  });

  // Mínima fecha posible = mañana
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const minFecha = manana.toISOString().split("T")[0];

  useEffect(() => {
    if (form.dni.length !== 8) {
      const resetTimer = window.setTimeout(() => {
        setReniecLoading(false);
        setReniecMsg("");
        setReniecAutocompletado(false);
      }, 0);

      return () => window.clearTimeout(resetTimer);
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setReniecLoading(true);
      setReniecMsg("");

      try {
        const response = await fetch(`/api/reniec/dni?dni=${encodeURIComponent(form.dni)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.nombreCompleto) {
          setReniecMsg(data?.error || "No se pudo consultar RENIEC. Ingresa el nombre manualmente.");
          setReniecAutocompletado(false);
          return;
        }

        setForm((prev) =>
          prev.dni === form.dni
            ? { ...prev, nombrePaciente: data.nombreCompleto }
            : prev
        );
        setReniecAutocompletado(true);
        setReniecMsg("Datos autocompletados desde RENIEC.");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setReniecMsg("No se pudo consultar RENIEC. Ingresa el nombre manualmente.");
          setReniecAutocompletado(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setReniecLoading(false);
        }
      }
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [form.dni]);

  const examenesMap = new Map(
    catalogos.flatMap((cat) => cat.examenes.map((examen) => [examen.nombre, examen] as const))
  );
  const examenesCategoriaMap = new Map(
    catalogos.flatMap((cat) => cat.examenes.map((examen) => [examen.nombre, cat.categoria] as const))
  );
  const perfilesMap = new Map(perfiles.map((perfil) => [perfil.id, perfil] as const));
  const esHemograma = (nombre: string) => nombre.toLowerCase().includes("hemograma");
  const esCategoriaHemograma = (categoria: string) => esHemograma(categoria);
  const perfilHemogramaCompleto = perfiles.find((perfil) => esHemograma(perfil.nombre));
  const terminoBusqueda = busqueda.trim().toLowerCase();
  const busquedaCoincideConPerfilHemograma = Boolean(
    perfilHemogramaCompleto &&
    (!terminoBusqueda ||
      perfilHemogramaCompleto.nombre.toLowerCase().includes(terminoBusqueda) ||
      "hemograma".includes(terminoBusqueda))
  );
  const obtenerPerfilCompletoParaExamen = (nombreExamen: string, categoria?: string) =>
    (esHemograma(nombreExamen) || (esCategoriaHemograma(categoria ?? examenesCategoriaMap.get(nombreExamen) ?? "") && busquedaCoincideConPerfilHemograma))
      ? perfilHemogramaCompleto
      : undefined;

  // Filtrado de exámenes
  const catalogoFiltrado = catalogos.map((cat) => {
    if (esCategoriaHemograma(cat.categoria) && perfilHemogramaCompleto) {
      return {
        ...cat,
        examenes: busquedaCoincideConPerfilHemograma
          ? [{ nombre: perfilHemogramaCompleto.nombre, precio: perfilHemogramaCompleto.precio }]
          : cat.examenes.filter((e) => e.nombre.toLowerCase().includes(terminoBusqueda)),
      };
    }

    return {
      ...cat,
      examenes: cat.examenes.filter((e) =>
        e.nombre.toLowerCase().includes(terminoBusqueda)
      ),
    };
  }).filter((cat) => cat.examenes.length > 0);

  const perfilesFiltrados = perfiles.filter((perfil) => {
    return perfil.nombre.toLowerCase().includes(terminoBusqueda);
  });
  const examenesSeleccionados = form.analisesSeleccionados.map(
    (nombre) => examenesMap.get(nombre) ?? { nombre, precio: null }
  );
  const perfilesSeleccionados = form.perfilesSeleccionados
    .map((id) => perfilesMap.get(id))
    .filter((perfil): perfil is PerfilOpcion => Boolean(perfil));
  const totalEstimado = [...examenesSeleccionados, ...perfilesSeleccionados].reduce(
    (total, item) => total + (item.precio ?? 0),
    0
  );
  const totalSeleccionados = examenesSeleccionados.length + perfilesSeleccionados.length;
  const hayPreciosPendientes = [...examenesSeleccionados, ...perfilesSeleccionados].some(
    (item) => item.precio == null || item.precio === 0
  );

  const formatPrecio = (precio: number | null) => {
    if (precio == null || precio === 0) return "Consultar";
    return `S/ ${precio.toFixed(2)}`;
  };

  const toggleAnalisis = (examen: string) => {
    const perfilCompleto = obtenerPerfilCompletoParaExamen(examen);
    if (perfilCompleto) {
      setForm((prev) => ({
        ...prev,
        analisesSeleccionados: prev.analisesSeleccionados.filter((item) => !esHemograma(item)),
        perfilesSeleccionados: prev.perfilesSeleccionados.includes(perfilCompleto.id)
          ? prev.perfilesSeleccionados.filter((id) => id !== perfilCompleto.id)
          : [...prev.perfilesSeleccionados, perfilCompleto.id],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      analisesSeleccionados: prev.analisesSeleccionados.includes(examen)
        ? prev.analisesSeleccionados.filter((a) => a !== examen)
        : [...prev.analisesSeleccionados, examen],
    }));
  };

  const togglePerfil = (perfilId: string) => {
    const perfil = perfilesMap.get(perfilId);
    setForm((prev) => ({
      ...prev,
      analisesSeleccionados: perfil && esHemograma(perfil.nombre)
        ? prev.analisesSeleccionados.filter((item) => !esHemograma(item))
        : prev.analisesSeleccionados,
      perfilesSeleccionados: prev.perfilesSeleccionados.includes(perfilId)
        ? prev.perfilesSeleccionados.filter((id) => id !== perfilId)
        : [...prev.perfilesSeleccionados, perfilId],
    }));
  };

  const agregarOtroExamen = () => {
    if (otroExamen.trim()) {
      const nuevo = otroExamen.trim();
      if (!form.analisesSeleccionados.includes(nuevo)) {
        setForm((prev) => ({
          ...prev,
          analisesSeleccionados: [...prev.analisesSeleccionados, nuevo],
        }));
      }
      setOtroExamen("");
    }
  };

  const handleConfirmar = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg("");

    const { codigo, error } = await crearReservaDesdeWeb({
      dni: form.dni,
      nombrePaciente: form.nombrePaciente,
      telefono: form.telefono || undefined,
      modalidad: form.modalidad as "sede" | "domicilio",
      examenes: form.analisesSeleccionados,
      perfiles: form.perfilesSeleccionados,
      fecha: form.fecha,
      horario: form.horario,
      direccion: form.direccion || undefined,
      referencia: form.referencia || undefined,
      distrito: form.distrito || undefined,
      formaPago: form.formaPago as "pagar_ahora" | "pagar_sede",
    });

    setSubmitting(false);

    if (error || !codigo) {
      setErrorMsg(error || "No se pudo guardar la reserva. Intenta nuevamente.");
      return;
    }

    setCodigoReserva(codigo);
    setPaso(6); // paso final
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoReserva);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // ─── PASO 0: MODALIDAD ──────────────────────────────────────────────────────
  const PasoModalidad = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        ¿Dónde quieres <span className="text-[#D12E7B]">atenderte?</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-10">Selecciona la modalidad de atención de tu preferencia.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* SEDE */}
        <button
          onClick={() => setForm((p) => ({ ...p, modalidad: "sede" }))}
          className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${form.modalidad === "sede"
              ? "border-[#D12E7B] bg-[#D12E7B]/5 shadow-xl shadow-[#D12E7B]/10"
              : "border-gray-200 bg-white hover:border-[#D12E7B]/40 hover:shadow-lg"
            }`}
        >
          {form.modalidad === "sede" && (
            <span className="absolute top-4 right-4">
              <CheckCircle2 className="w-6 h-6 text-[#D12E7B]" />
            </span>
          )}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all ${form.modalidad === "sede" ? "bg-[#D12E7B]" : "bg-gray-100 group-hover:bg-[#D12E7B]/10"
              }`}
          >
            <Building2 className={`w-7 h-7 ${form.modalidad === "sede" ? "text-white" : "text-gray-400"}`} />
          </div>
          <p className="font-black text-lg text-[#333333] uppercase tracking-tighter mb-1">Atención en Sede</p>
          <p className="text-sm text-gray-500 font-medium">
            Ven a nuestra Clínica Bello Horizonte en Piura y recibe atención presencial.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#D12E7B]/10 text-[#D12E7B]">
              Pagar Ahora
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-500">
              Pagar en Sede
            </span>
          </div>
        </button>

        {/* DOMICILIO */}
        <button
          onClick={() => setForm((p) => ({ ...p, modalidad: "domicilio" }))}
          className={`group relative p-8 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${form.modalidad === "domicilio"
              ? "border-[#D12E7B] bg-[#D12E7B]/5 shadow-xl shadow-[#D12E7B]/10"
              : "border-gray-200 bg-white hover:border-[#D12E7B]/40 hover:shadow-lg"
            }`}
        >
          {form.modalidad === "domicilio" && (
            <span className="absolute top-4 right-4">
              <CheckCircle2 className="w-6 h-6 text-[#D12E7B]" />
            </span>
          )}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all ${form.modalidad === "domicilio" ? "bg-[#D12E7B]" : "bg-gray-100 group-hover:bg-[#D12E7B]/10"
              }`}
          >
            <Home className={`w-7 h-7 ${form.modalidad === "domicilio" ? "text-white" : "text-gray-400"}`} />
          </div>
          <p className="font-black text-lg text-[#333333] uppercase tracking-tighter mb-1">Atención a Domicilio</p>
          <p className="text-sm text-gray-500 font-medium">
            Nuestro personal va a tu dirección para tomar las muestras en la comodidad de tu hogar.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#D12E7B]/10 text-[#D12E7B]">
              Solo Pagar Ahora
            </span>
          </div>
        </button>
      </div>

      <NavButtons
        showBack={false}
        onNext={() => setPaso(1)}
        nextDisabled={!form.modalidad}
      />
    </div>
  );

  // ─── PASO 1: DATOS PACIENTE ──────────────────────────────────────────────────
  const PasoPaciente = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        Datos del <span className="text-[#D12E7B]">Paciente</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-10">Ingresa la información del paciente a atender.</p>

      <div className="space-y-8 max-w-lg">
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
            Número de Documento (DNI / CE): *
          </label>
          <input
            type="text"
            maxLength={9}
            value={form.dni}
            onChange={(e) => {
              const dniLimpio = e.target.value.replace(/\D/g, "");
              setForm((p) => ({
                ...p,
                dni: dniLimpio,
                nombrePaciente: reniecAutocompletado ? "" : p.nombrePaciente,
              }));
              if (reniecAutocompletado) {
                setReniecAutocompletado(false);
              }
            }}
            placeholder="Ej: 123456789"
            className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
          />
          {(reniecLoading || reniecMsg) && (
            <p
              className={`mt-2 text-xs font-bold ${
                reniecLoading
                  ? "text-[#D12E7B]"
                  : reniecAutocompletado
                    ? "text-green-600"
                    : "text-amber-600"
              }`}
            >
              {reniecLoading ? "Consultando RENIEC..." : reniecMsg}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
            Nombre completo del Paciente *
          </label>
          <input
            type="text"
            value={form.nombrePaciente}
            onChange={(e) => {
              setForm((p) => ({ ...p, nombrePaciente: e.target.value }));
              setReniecAutocompletado(false);
            }}
            placeholder="Nombres y Apellidos"
            className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
            Teléfono / Celular <span className="text-gray-400 normal-case font-medium">(opcional)</span>
          </label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value.replace(/\D/g, "") }))}
            placeholder="Ej: 987654321"
            maxLength={9}
            className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
          />
        </div>

        {/* Domicilio: dirección adicional */}
        {form.modalidad === "domicilio" && (
          <>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-[#D12E7B]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#D12E7B]" />
                </div>
                <p className="font-black text-sm text-[#333333] uppercase tracking-tighter">Dirección de Atención</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
                    Distrito *
                  </label>
                  <div className="relative">
                    <select
                      value={form.distrito}
                      onChange={(e) => setForm((p) => ({ ...p, distrito: e.target.value }))}
                      className="w-full cursor-pointer appearance-none border-b-2 border-gray-200 bg-transparent py-3 pr-10 text-base font-bold text-[#333333] outline-none transition-colors focus:border-[#D12E7B]"
                    >
                      <option value="" disabled>Selecciona tu distrito</option>
                      {DISTRITOS_DISPONIBLES.map((distrito) => (
                        <option key={distrito} value={distrito}>{distrito}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D12E7B]" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={form.direccion}
                    onChange={(e) => setForm((p) => ({ ...p, direccion: e.target.value }))}
                    placeholder="Calle, número, urbanización..."
                    className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
                    Referencia *
                  </label>
                  <input
                    type="text"
                    value={form.referencia}
                    onChange={(e) => setForm((p) => ({ ...p, referencia: e.target.value }))}
                    placeholder="Ej: frente al parque, casa verde..."
                    className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <NavButtons
        onBack={() => setPaso(0)}
        onNext={() => setPaso(2)}
        nextDisabled={
          !form.dni || (form.dni.length !== 8 && form.dni.length !== 9) || !form.nombrePaciente ||
          (form.modalidad === "domicilio" && (!form.direccion || !form.referencia || !form.distrito))
        }
      />
    </div>
  );

  // ─── PASO 2: ANÁLISIS ────────────────────────────────────────────────────────
  const PasoAnalisis = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        Elige tus <span className="text-[#D12E7B]">Análisis</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-6">
        Selecciona exámenes individuales o perfiles. Los precios se calculan desde la base de datos.
      </p>

      {/* Seleccionados */}
      {totalSeleccionados > 0 && (
        <div className="mb-6 p-4 bg-[#D12E7B]/5 rounded-2xl border border-[#D12E7B]/15">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D12E7B]">
              Seleccionados ({totalSeleccionados})
            </p>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total estimado</p>
              <p className="text-lg font-black text-[#333333]">
                S/ {totalEstimado.toFixed(2)}
                {hayPreciosPendientes && <span className="ml-2 text-[10px] text-amber-600">+ consultar</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {perfilesSeleccionados.map((perfil) => (
              <span key={perfil.id} className="flex items-center gap-1.5 bg-white border border-[#D12E7B]/20 text-[#D12E7B] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                Perfil: {perfil.nombre} · {formatPrecio(perfil.precio)}
                <button onClick={() => togglePerfil(perfil.id)} className="hover:text-red-500 transition-colors" aria-label={`Quitar ${perfil.nombre}`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {examenesSeleccionados.map((examen) => (
              <span key={examen.nombre} className="flex items-center gap-1.5 bg-white border border-[#D12E7B]/20 text-[#D12E7B] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                {examen.nombre} · {formatPrecio(examen.precio)}
                <button onClick={() => toggleAnalisis(examen.nombre)} className="hover:text-red-500 transition-colors" aria-label={`Quitar ${examen.nombre}`}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5 inline-flex w-full sm:w-auto rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setTipoCatalogo("examenes")}
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${tipoCatalogo === "examenes"
              ? "bg-[#333333] text-white shadow-sm"
              : "text-gray-500 hover:text-[#333333]"
            }`}
        >
          Exámenes
        </button>
        <button
          type="button"
          onClick={() => setTipoCatalogo("perfiles")}
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${tipoCatalogo === "perfiles"
              ? "bg-[#333333] text-white shadow-sm"
              : "text-gray-500 hover:text-[#333333]"
            }`}
        >
          Perfiles
        </button>
      </div>

      {/* Búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder={tipoCatalogo === "examenes" ? "Buscar examen..." : "Buscar perfil o examen incluido..."}
          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#D12E7B] focus:bg-white outline-none text-sm font-medium text-[#333333] transition-all"
        />
      </div>

      {/* Catálogo */}
      {tipoCatalogo === "examenes" ? (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
          {catalogoFiltrado.map((cat) => (
            <div key={cat.categoria} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#333333] px-5 py-3">
                <p className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5 text-[#D12E7B]" />
                  {cat.categoria}
                </p>
              </div>
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {cat.examenes.map((examen) => {
                  const perfilCompleto = obtenerPerfilCompletoParaExamen(examen.nombre, cat.categoria);
                  const sel = perfilCompleto
                    ? form.perfilesSeleccionados.includes(perfilCompleto.id)
                    : form.analisesSeleccionados.includes(examen.nombre);
                  return (
                    <button
                      key={examen.nombre}
                      onClick={() => toggleAnalisis(examen.nombre)}
                      className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 ${sel
                          ? "bg-[#D12E7B] text-white shadow-md shadow-[#D12E7B]/20"
                          : "bg-gray-50 text-[#333333] hover:bg-[#D12E7B]/8 hover:text-[#D12E7B]"
                        }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${sel ? "border-white bg-white" : "border-gray-300"}`}>
                        {sel && <div className="w-2 h-2 rounded-full bg-[#D12E7B]" />}
                      </div>
                      <span className="min-w-0 leading-snug">{examen.nombre}</span>
                      <span className={`text-[11px] font-black whitespace-nowrap ${sel ? "text-white" : "text-[#D12E7B]"}`}>
                        {perfilCompleto ? `Perfil ${formatPrecio(perfilCompleto.precio)}` : formatPrecio(examen.precio)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
          {perfilesFiltrados.length > 0 ? (
            perfilesFiltrados.map((perfil) => {
              const sel = form.perfilesSeleccionados.includes(perfil.id);
              return (
                <button
                  key={perfil.id}
                  onClick={() => togglePerfil(perfil.id)}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${sel
                      ? "border-[#D12E7B] bg-[#D12E7B]/5 shadow-lg shadow-[#D12E7B]/10"
                      : "border-gray-100 bg-white hover:border-[#D12E7B]/35 hover:shadow-md"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${sel ? "border-[#D12E7B] bg-[#D12E7B]" : "border-gray-300"}`}>
                        {sel && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-[#333333] text-sm uppercase tracking-tight">{perfil.nombre}</p>
                        {perfil.descripcion && <p className="mt-1 text-xs text-gray-500 font-medium">{perfil.descripcion}</p>}
                      </div>
                    </div>
                    <p className="text-sm font-black text-[#D12E7B] whitespace-nowrap">{formatPrecio(perfil.precio)}</p>
                  </div>
                  {perfil.examenes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pl-8">
                      {perfil.examenes.slice(0, 8).map((examen) => (
                        <span key={examen} className="text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full">
                          {examen}
                        </span>
                      ))}
                      {perfil.examenes.length > 8 && (
                        <span className="text-[10px] font-bold text-[#D12E7B] bg-[#D12E7B]/10 px-2 py-1 rounded-full">
                          +{perfil.examenes.length - 8} más
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
              <p className="text-sm font-black text-[#333333] uppercase tracking-widest">No hay perfiles disponibles</p>
              <p className="mt-2 text-xs font-medium text-gray-500">Activa o registra perfiles en el sistema para mostrarlos aquí.</p>
            </div>
          )}
        </div>
      )}

      {/* Sección Otros */}
      {tipoCatalogo === "examenes" && (
      <div className="mt-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <p className="text-[#333333] font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#D12E7B]" />
          Otros Análisis
        </p>
        <p className="text-xs text-gray-500 font-medium mb-3">Si no encuentras tu análisis en la lista, escríbelo aquí:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={otroExamen}
            onChange={(e) => setOtroExamen(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarOtroExamen()}
            placeholder="Ej: PCR, Prueba de Embarazo..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#D12E7B] focus:bg-white outline-none text-sm font-medium text-[#333333] transition-all"
          />
          <button
            onClick={agregarOtroExamen}
            disabled={!otroExamen.trim()}
            className="px-5 py-2.5 bg-[#D12E7B] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#b02666] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#D12E7B]/20"
          >
            Agregar
          </button>
        </div>
      </div>
      )}

      <NavButtons
        onBack={() => setPaso(1)}
        onNext={() => setPaso(3)}
        nextDisabled={totalSeleccionados === 0}
      />
    </div>
  );

  // ─── PASO 3: FECHA Y HORA ────────────────────────────────────────────────────
  const PasoFechaHora = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        Fecha y <span className="text-[#D12E7B]">Horario</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-10">Selecciona cuándo deseas realizar tu atención.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-2xl">
        {/* Fecha */}
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Fecha *
          </label>
          <input
            type="date"
            min={minFecha}
            value={form.fecha}
            onChange={(e) => setForm((p) => ({ ...p, fecha: e.target.value }))}
            className="w-full border-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 px-4 text-sm font-bold text-[#333333] bg-white rounded-xl transition-colors"
          />
        </div>

        {/* Horario */}
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-4">
            Horario *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {HORARIOS.map((h) => (
              <button
                key={h}
                onClick={() => setForm((p) => ({ ...p, horario: h }))}
                className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all duration-200 ${form.horario === h
                    ? "bg-[#D12E7B] border-[#D12E7B] text-white shadow-md shadow-[#D12E7B]/20"
                    : "bg-white border-gray-200 text-[#333333] hover:border-[#D12E7B]/50"
                  }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavButtons
        onBack={() => setPaso(2)}
        onNext={() => setPaso(4)}
        nextDisabled={!form.fecha || !form.horario}
      />
    </div>
  );

  // ─── PASO 4: RESUMEN ─────────────────────────────────────────────────────────
  const PasoResumen = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        Resumen del <span className="text-[#D12E7B]">Pedido</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-8">Revisa los detalles antes de continuar al pago.</p>

      <div className="space-y-4 max-w-2xl">
        {/* Fila: Modalidad */}
        <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#D12E7B] flex items-center justify-center flex-shrink-0">
            {form.modalidad === "sede" ? (
              <Building2 className="w-5 h-5 text-white" />
            ) : (
              <Home className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Modalidad</p>
            <p className="font-black text-[#333333] text-sm mt-0.5 uppercase">
              {form.modalidad === "sede" ? "Atención en Sede" : "Atención a Domicilio"}
            </p>
          </div>
        </div>

        {/* Fila: Paciente */}
        <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#D12E7B] flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Paciente</p>
            <p className="font-black text-[#333333] text-sm mt-0.5">{form.nombrePaciente}</p>
            <p className="text-xs text-gray-500 font-medium">DNI: {form.dni}</p>
          </div>
        </div>

        {/* Fila: Análisis */}
        <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#D12E7B] flex items-center justify-center flex-shrink-0 mt-0.5">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Análisis y perfiles ({totalSeleccionados})
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {perfilesSeleccionados.map((perfil) => (
                <span key={perfil.id} className="text-[10px] font-bold bg-[#333333]/10 text-[#333333] px-2.5 py-1 rounded-full">
                  Perfil: {perfil.nombre} · {formatPrecio(perfil.precio)}
                </span>
              ))}
              {examenesSeleccionados.map((examen) => (
                <span key={examen.nombre} className="text-[10px] font-bold bg-[#D12E7B]/10 text-[#D12E7B] px-2.5 py-1 rounded-full">
                  {examen.nombre} · {formatPrecio(examen.precio)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fila: Total */}
        <div className="flex items-start gap-4 p-5 bg-[#333333] rounded-2xl border border-[#333333]">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Total estimado</p>
            <p className="font-black text-white text-xl mt-0.5">
              S/ {totalEstimado.toFixed(2)}
              {hayPreciosPendientes && <span className="ml-2 text-[10px] text-amber-300">+ precios por consultar</span>}
            </p>
          </div>
        </div>

        {/* Fila: Fecha/Hora */}
        <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#D12E7B] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha y Horario</p>
            <p className="font-black text-[#333333] text-sm mt-0.5">
              {new Date(form.fecha + "T12:00:00").toLocaleDateString("es-PE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-xs text-gray-500 font-medium">Hora: {form.horario} hrs.</p>
          </div>
        </div>

        {/* Fila: Dirección (solo domicilio) */}
        {form.modalidad === "domicilio" && (
          <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#D12E7B] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección</p>
              <p className="font-black text-[#333333] text-sm mt-0.5">{form.direccion}</p>
              <p className="text-xs text-gray-500 font-medium">Ref: {form.referencia}</p>
              <p className="text-xs text-gray-500 font-medium">Distrito: {form.distrito}</p>
            </div>
          </div>
        )}
      </div>

      <NavButtons
        onBack={() => setPaso(3)}
        onNext={() => setPaso(5)}
        nextLabel="Continuar al Pago"
      />
    </div>
  );

  // ─── PASO 5: FORMA DE PAGO ───────────────────────────────────────────────────
  const PasoPago = () => (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        Forma de <span className="text-[#D12E7B]">Pago</span>
      </h2>
      <p className="text-gray-500 text-sm font-medium mb-3">
        {form.modalidad === "domicilio"
          ? "Para atención a domicilio, el pago se realiza de forma anticipada."
          : "Elige cómo prefieres pagar tu atención."}
      </p>

      {/* Info del modo */}
      <div className={`mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold ${form.modalidad === "domicilio" ? "bg-amber-50 border border-amber-200 text-amber-700" : "bg-blue-50 border border-blue-200 text-blue-700"
        }`}>
        {form.modalidad === "domicilio" ? (
          <><Home className="w-4 h-4 flex-shrink-0" /> Atención a domicilio — pago online requerido</>
        ) : (
          <><Building2 className="w-4 h-4 flex-shrink-0" /> Atención en sede — elige tu forma de pago</>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
        {/* PAGAR AHORA */}
        <button
          onClick={() => setForm((p) => ({ ...p, formaPago: "pagar_ahora" }))}
          className={`group relative p-7 rounded-2xl border-2 text-left transition-all duration-300 ${form.formaPago === "pagar_ahora"
              ? "border-[#D12E7B] bg-[#D12E7B]/5 shadow-xl shadow-[#D12E7B]/10"
              : "border-gray-200 bg-white hover:border-[#D12E7B]/40 hover:shadow-lg"
            }`}
        >
          {form.formaPago === "pagar_ahora" && (
            <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-[#D12E7B]" />
          )}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${form.formaPago === "pagar_ahora" ? "bg-[#D12E7B]" : "bg-gray-100"}`}>
            <CreditCard className={`w-6 h-6 ${form.formaPago === "pagar_ahora" ? "text-white" : "text-gray-400"}`} />
          </div>
          <p className="font-black text-base text-[#333333] uppercase tracking-tighter mb-1">Pagar Ahora</p>
          <p className="text-xs text-gray-500 font-medium">Realiza el pago vía transferencia o Yape/Plin y envíanos el comprobante por WhatsApp.</p>
        </button>

        {/* PAGAR EN SEDE */}
        {form.modalidad === "sede" ? (
          <button
            onClick={() => setForm((p) => ({ ...p, formaPago: "pagar_sede" }))}
            className={`group relative p-7 rounded-2xl border-2 text-left transition-all duration-300 ${form.formaPago === "pagar_sede"
                ? "border-[#333333] bg-[#333333]/5 shadow-xl"
                : "border-gray-200 bg-white hover:border-[#333333]/40 hover:shadow-lg"
              }`}
          >
            {form.formaPago === "pagar_sede" && (
              <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-[#333333]" />
            )}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${form.formaPago === "pagar_sede" ? "bg-[#333333]" : "bg-gray-100"}`}>
              <Landmark className={`w-6 h-6 ${form.formaPago === "pagar_sede" ? "text-white" : "text-gray-400"}`} />
            </div>
            <p className="font-black text-base text-[#333333] uppercase tracking-tighter mb-1">Pagar en Sede</p>
            <p className="text-xs text-gray-500 font-medium">Paga directamente cuando llegues a la Clínica Bello Horizonte en Piura.</p>
          </button>
        ) : (
          <div className="p-7 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed flex flex-col justify-center items-center text-center">
            <Landmark className="w-10 h-10 text-gray-300 mb-3" />
            <p className="font-black text-sm text-gray-400 uppercase tracking-tighter">Pagar en Sede</p>
            <p className="text-xs text-gray-400 font-medium mt-1">No disponible para atención a domicilio</p>
          </div>
        )}
      </div>

      {/* Instrucciones PAGAR AHORA */}
      {form.formaPago === "pagar_ahora" && (
        <div className="mt-8 max-w-2xl p-6 bg-[#D12E7B]/5 rounded-2xl border border-[#D12E7B]/20 animate-fadeIn">
          <p className="font-black text-sm text-[#D12E7B] uppercase tracking-widest mb-4">Instrucciones de Pago</p>
          <div className="space-y-3 text-sm text-[#333333] font-medium">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#D12E7B] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">1</span>
              <p>Realiza la transferencia o pago por <strong>Yape / Plin</strong> al número <strong>931 758 558</strong>.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#D12E7B] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">2</span>
              <p>Toma una captura de pantalla o foto del comprobante.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#D12E7B] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">3</span>
              <p>Envíala a nuestro WhatsApp junto con tu código de reserva para confirmar tu cita.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error al guardar */}
      {errorMsg && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
          <p className="text-red-700 text-sm font-bold">{errorMsg}</p>
        </div>
      )}

      <NavButtons
        onBack={() => { setPaso(4); setErrorMsg(""); }}
        onNext={handleConfirmar}
        nextLabel={submitting ? "Guardando..." : "Confirmar Reserva"}
        nextDisabled={!form.formaPago || submitting}
      />
    </div>
  );

  // ─── PASO 6: RESERVA CREADA ───────────────────────────────────────────────────
  const PasoConfirmacion = () => (
    <div className="animate-fadeIn text-center py-8">
      <div className="w-24 h-24 rounded-3xl bg-[#D12E7B] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#D12E7B]/30">
        <CheckCircle2 className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-3xl font-black text-[#333333] uppercase tracking-tighter mb-2">
        ¡Reserva <span className="text-[#D12E7B]">Creada!</span>
      </h2>
      <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
        Tu cita ha sido registrada con éxito. Guarda este código de reserva: te servirá para descargar tu examen desde la sección Resultados de esta página web.
      </p>

      {/* Código */}
      <div className="inline-flex items-center gap-4 bg-[#333333] rounded-2xl px-8 py-5 mb-8 shadow-2xl shadow-black/20">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1">Código de Reserva</p>
          <p className="text-white font-black text-2xl tracking-[0.3em]">{codigoReserva}</p>
        </div>
        <button
          onClick={copiarCodigo}
          className={`p-3 rounded-xl transition-all ${copiado ? "bg-green-500" : "bg-white/10 hover:bg-white/20"}`}
        >
          {copiado ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Resumen pequeño */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
        {[
          { icon: form.modalidad === "sede" ? Building2 : Home, label: "Modalidad", value: form.modalidad === "sede" ? "Sede" : "Domicilio" },
          { icon: User, label: "Paciente", value: form.nombrePaciente.split(" ")[0] },
          { icon: Calendar, label: "Fecha", value: form.fecha ? new Date(form.fecha + "T12:00:00").toLocaleDateString("es-PE", { day: "2-digit", month: "short" }) : "" },
          { icon: form.formaPago === "pagar_ahora" ? CreditCard : Landmark, label: "Pago", value: form.formaPago === "pagar_ahora" ? "Online" : "En Sede" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <Icon className="w-5 h-5 text-[#D12E7B] mb-2 mx-auto" />
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-black text-[#333333] mt-0.5">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Botones finales */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {form.formaPago === "pagar_ahora" && (
          <a
            href={`https://wa.me/51931758558?text=Hola%20HomeLab!%20Tengo%20mi%20reserva%20*${codigoReserva}*%20y%20adjunto%20el%20comprobante%20de%20pago%20para%20confirmar%20mi%20cita%20del%20${form.fecha}%20a%20las%20${form.horario}%20hrs.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1da851] transition-all shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" /> Enviar Comprobante por WhatsApp
          </a>
        )}
        <button
          onClick={() => {
            setForm({ modalidad: null, dni: "", nombrePaciente: "", telefono: "", analisesSeleccionados: [], perfilesSeleccionados: [], fecha: "", horario: "", direccion: "", referencia: "", distrito: "", formaPago: null });
            setPaso(0);
            setCodigoReserva("");
            setErrorMsg("");
          }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-gray-100 text-[#333333] hover:bg-gray-200 transition-all active:scale-95"
        >
          Nueva Reserva
        </button>
      </div>
    </div>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  const renderPaso = () => {
    switch (paso) {
      case 0: return PasoModalidad();
      case 1: return PasoPaciente();
      case 2: return PasoAnalisis();
      case 3: return PasoFechaHora();
      case 4: return PasoResumen();
      case 5: return PasoPago();
      case 6: return PasoConfirmacion();
      default: return null;
    }
  };

  return (
    <section className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="inline-block bg-[#D12E7B]/10 text-[#D12E7B] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4">
            Laboratorio HomeLab
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#333333] uppercase tracking-tighter">
            Quiero mi <span className="text-[#D12E7B]">Examen</span>
          </h1>
          <div className="w-20 h-1 bg-[#D12E7B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Step Indicator (oculto en confirmación) */}
        {paso < 6 && <StepIndicator paso={paso} total={pasos.length} />}

        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/5 border border-gray-100 p-5 sm:p-8 md:p-12">
          {renderPaso()}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #D12E7B30;
          border-radius: 99px;
        }
      `}</style>
    </section>
  );
}
