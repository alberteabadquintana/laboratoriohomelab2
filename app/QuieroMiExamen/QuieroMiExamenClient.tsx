"use client";

import { useState } from "react";
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
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

// ─── CATÁLOGO DE ANÁLISIS ──────────────────────────────────────────────────────
const CATALOGOS = [
  {
    categoria: "Perfil de Coagulación",
    examenes: ["Plaquetas", "T. de Protrombina", "T. de Tromboplastina", "Fibrinógeno", "T. Coagulación y Sangría"],
  },
  {
    categoria: "Perfil Lipídico",
    examenes: ["Colesterol", "HDL", "LDL", "VLDL", "Triglicéridos"],
  },
  {
    categoria: "Perfil Hepático",
    examenes: ["G.G.T.P", "TP - INR", "Proteínas", "Fosfatasa Alcalina", "Bilirrubina", "TGO", "TGP"],
  },
  {
    categoria: "Orina",
    examenes: ["Urocultivo", "Ac. Úrico 24h", "Bence Jones Proteína", "Calcio 24h", "Creatinina", "Ex. Completo", "Electrolitos 24h", "NTX (Orina Simple)", "Proteinuria 24h", "Depuración de Creatinina"],
  },
  {
    categoria: "Perfil Pre-Operatorio",
    examenes: ["Hemograma", "Glucosa", "Urea", "Creatinina", "HIV", "Grupo y RH", "TP - INR", "TC", "TS", "Orina", "RPR"],
  },
  {
    categoria: "Perfil Pre-Natal",
    examenes: ["Hemograma", "Glucosa", "Urea", "Ex. Orina", "Grupo y RH", "RPR (Sífilis)", "HIV"],
  },
  {
    categoria: "Hormonal Femenino",
    examenes: ["FSH", "LH", "Estradiol", "Prolactina", "Progesterona"],
  },
  {
    categoria: "Heces",
    examenes: ["Campylobacter", "Coprológico Funcional", "Estudio de Coccidios", "RX Inflam. Leucocitos", "Parasitológico Especial", "Parasitológico Simple", "Parasitológico Seriado x3", "Rotavirus", "Test Graham", "Thevenon"],
  },
  {
    categoria: "Perfil Tiroideo 2",
    examenes: ["T3 Libre", "TCH", "T4 Libre"],
  },
  {
    categoria: "Anemia",
    examenes: ["Hemograma", "Hierro", "Sérico", "Ferritina", "B12", "Ácido Fólico"],
  },
  {
    categoria: "Perfil Pediátrico",
    examenes: ["Parasitológico", "Hemoglobina", "Grupo Sanguíneo y RH"],
  },
  {
    categoria: "TORCH",
    examenes: ["Citomegalovirus IgG", "Citomegalovirus IgM", "Toxoplasma IgG", "Toxoplasma IgM", "Herpes I y II IgG", "Herpes I y II IgM", "Rubeola IgG", "Rubeola IgM"],
  },
  {
    categoria: "Perfil Renal",
    examenes: ["Orina Completa", "Urea", "Creatinina", "Ácido Úrico", "Proteína de 24 horas"],
  },
  {
    categoria: "Perfil Tiroideo 1",
    examenes: ["T3 Total", "TSH", "T4 Libre"],
  },
  {
    categoria: "Despistaje Alérgico",
    examenes: ["Panel de Alergias"],
  },
  {
    categoria: "Hematología",
    examenes: ["Ac. Fólico", "Ac. Fólico Intraeritrocitario", "Coag y Sangría", "Fenómeno LE", "Ferritina", "Fibrinógeno", "Gota Gruesa", "Hemoglobina / HTO", "Hemograma", "Hierro Sérico", "Plaquetas", "Reticulocitos", "Saturación de Transferrina", "Transferrina", "Trombina", "T. Protrombina", "T. Tromboplastina", "Veloc. Sedimentación", "Vit. B12", "Hemoglobina Glicosilada"],
  },
  {
    categoria: "Bioquímica",
    examenes: ["Ac. Úrico", "Amilasa", "Bilirrubinas", "BUN (Nitrógeno Ureico)", "Calcio / Ca Iónico", "Cálculo Renal", "Colesterol Total", "Colesterol HDL", "Colesterol LDL", "Colesterol VLDL", "Creatinina", "CPK", "CK - MB", "DHL (Deshidrogenasa Láctica)", "Dímero - D.", "DEP Creatinina", "Electrolitos (Na - Cl - K)", "Fosf. Alcalina", "Fosforo", "G.G.T.P", "Glucosa", "Glucosa P.P", "Lipasa", "Lípidos Totales", "Magnesio", "Osmolaridad Sérica", "Prot. Tot. Fracc.", "Proteinograma", "Riesgo Coronario", "Tolerancia Glucosa", "Tolerancia Lactosa", "Transaminasa Oxalacética", "Transaminasa Pirúvica", "Triglicéridos", "Urea", "Vit. D (25-Hidroxi)", "Vit. D (1.25 Dihidroxi)"],
  },
  {
    categoria: "Inmunología",
    examenes: ["Anti Hbc. Ag. (Anti Core)", "Anti Hbc IgM", "Anti Hbe Ag (Anti E)", "Hbe Ag. (Antígeno E)", "HVC - Hepatitis C", "HVD - Hepatitis D", "Ac. Chlamydia IgG", "Ac. Chlamydia IgM", "Ac. Cisticercosis", "Ac. Criptococosis", "Ac. Herpes I IgM", "Ac. Herpes I IgG", "Ac. Herpes II IgM", "Ac. Herpes II IgG", "Ac. Toxoplasma IgG", "Ac. Toxoplasma IgM", "Ac. Rubeola IgG", "Ac. Rubeola IgM", "Ac. Citomegalovirus IgM", "Ac. Citomegalovirus IgG", "Ac. H.I.V.", "Ac. H.I.V (Western Blot)", "Coombs Directo", "Coombs Indirecto", "Crioglobulinas", "Crioglutininas", "Complemento C3-C4", "Epstein Barr IgG (EBNA)", "Epstein Barr IgM (EBNA)", "FTA - ABS", "Factor Rematoideo", "Grupo y RH", "HCG Cuantitativo - Beta", "Hidatidosis (Elisa)", "Inmunoglob. (IgA, IgG, IgM)", "Inmunoglobulinas E", "Inmunoelectroforesis", "Paul Bunnel", "Proteína C Reactiva", "Prot. C Reac. Ultrasensible", "Pro - BNP", "Serológica Semicuántica", "Waller Rose", "Test de Alergia", "Troponina T", "Tamizaje Neonatal x4", "Aglutinaciones Lámina", "Aglutinaciones en Tubo", "Aglut. Fen. Zona", "Aglut. 2-M Etanol", "Antic. Bloqueadores", "Antic. Antinucleares", "Antic. Estreptolisinas", "Anti - DNA - DS", "Antimitocondriales (AMA)", "Anti Músculo Liso", "Anti HAV IgG", "Anti HAV IgM", "Hbs. Ag (Australiano Superficie)", "Anti Hbs Ag (Vacuna)"],
  },
  {
    categoria: "Microbiología",
    examenes: ["BK Directo", "Coprocultivo", "Cultivo BK", "Cultivo Sec. Conjunt.", "Cultivo Sec. Vaginal", "Cultivo de Hongos", "Frotis Directo (Gérmenes)", "Frotis Directo (Hongos)", "Hemocultivo", "Secreción Faríngea"],
  },
  {
    categoria: "Marcadores Tumorales",
    examenes: ["AFP (Cáncer de Hígado)", "Beta-2 Microglobulina (Cáncer Renal)", "Calcitonina (Ca Óseo)", "CA 19-9 (Cáncer de Páncreas)", "CA 15-3 (Cáncer de Mama)", "CA 125 (Cáncer de Ovarios)", "CA 72-4 (Cáncer de Estómago)", "CEA (Cáncer de Pulmón y Colon)", "PSA (Ag. Prostático)", "PSA Libre", "PSA Indica"],
  },
  {
    categoria: "Endocrinología",
    examenes: ["Cortisol AM - PM", "DHE - S", "Estradiol", "Estriol Libre", "FSH", "Hormona Crecimiento", "Insulina", "LH", "Progesterona", "Prolactina", "Somatomedina (IGF1)", "Testosterona Total", "Testosterona Libre", "Tiroxina (T4)", "Tolerancia Insulina", "Triyodotironina (T3)", "TSH Ultrasensible", "T3 Libre", "T4 Libre"],
  },
];

// ─── HORARIOS DISPONIBLES ─────────────────────────────────────────────────────
const HORARIOS = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type Modalidad = "sede" | "domicilio" | null;
type FormaPago = "pagar_ahora" | "pagar_sede" | null;

interface FormData {
  modalidad: Modalidad;
  dni: string;
  nombrePaciente: string;
  analisesSeleccionados: string[];
  fecha: string;
  horario: string;
  direccion: string;
  referencia: string;
  distrito: string;
  formaPago: FormaPago;
}

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────
const pasos = ["Modalidad", "Paciente", "Análisis", "Fecha & Hora", "Resumen", "Pago"];

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
export default function QuieroMiExamenClient() {
  const [paso, setPaso] = useState(0);
  const [codigoReserva, setCodigoReserva] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [otroExamen, setOtroExamen] = useState("");
  const [form, setForm] = useState<FormData>({
    modalidad: null,
    dni: "",
    nombrePaciente: "",
    analisesSeleccionados: [],
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

  // Filtrado de exámenes
  const catalogoFiltrado = CATALOGOS.map((cat) => ({
    ...cat,
    examenes: cat.examenes.filter((e) =>
      e.toLowerCase().includes(busqueda.toLowerCase())
    ),
  })).filter((cat) => cat.examenes.length > 0);

  const toggleAnalisis = (examen: string) => {
    setForm((prev) => ({
      ...prev,
      analisesSeleccionados: prev.analisesSeleccionados.includes(examen)
        ? prev.analisesSeleccionados.filter((a) => a !== examen)
        : [...prev.analisesSeleccionados, examen],
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

  const generarCodigo = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "HL-";
    for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const handleConfirmar = () => {
    const codigo = generarCodigo();
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
            DNI del Paciente *
          </label>
          <input
            type="text"
            maxLength={8}
            value={form.dni}
            onChange={(e) => setForm((p) => ({ ...p, dni: e.target.value.replace(/\D/g, "") }))}
            placeholder="Ej: 12345678"
            className="w-full border-b-2 border-gray-200 focus:border-[#D12E7B] outline-none py-3 text-base font-bold text-[#333333] bg-transparent transition-colors placeholder:font-normal placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
            Nombre completo del Paciente *
          </label>
          <input
            type="text"
            value={form.nombrePaciente}
            onChange={(e) => setForm((p) => ({ ...p, nombrePaciente: e.target.value }))}
            placeholder="Nombres y Apellidos"
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
                <div>
                  <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-3">
                    Distrito *
                  </label>
                  <input
                    type="text"
                    value={form.distrito}
                    onChange={(e) => setForm((p) => ({ ...p, distrito: e.target.value }))}
                    placeholder="Ej: Piura, Castilla, Catacaos..."
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
          !form.dni || form.dni.length < 8 || !form.nombrePaciente ||
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
        Selecciona uno o más exámenes. Puedes buscar por nombre.
      </p>

      {/* Seleccionados */}
      {form.analisesSeleccionados.length > 0 && (
        <div className="mb-6 p-4 bg-[#D12E7B]/5 rounded-2xl border border-[#D12E7B]/15">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D12E7B] mb-3">
            Seleccionados ({form.analisesSeleccionados.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {form.analisesSeleccionados.map((a) => (
              <span
                key={a}
                className="flex items-center gap-1.5 bg-white border border-[#D12E7B]/20 text-[#D12E7B] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm"
              >
                {a}
                <button onClick={() => toggleAnalisis(a)} className="hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar examen..."
          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#D12E7B] focus:bg-white outline-none text-sm font-medium text-[#333333] transition-all"
        />
      </div>

      {/* Catálogo */}
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
                const sel = form.analisesSeleccionados.includes(examen);
                return (
                  <button
                    key={examen}
                    onClick={() => toggleAnalisis(examen)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 ${sel
                        ? "bg-[#D12E7B] text-white shadow-md shadow-[#D12E7B]/20"
                        : "bg-gray-50 text-[#333333] hover:bg-[#D12E7B]/8 hover:text-[#D12E7B]"
                      }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${sel ? "border-white bg-white" : "border-gray-300"
                        }`}
                    >
                      {sel && <div className="w-2 h-2 rounded-full bg-[#D12E7B]" />}
                    </div>
                    {examen}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sección Otros */}
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

      <NavButtons
        onBack={() => setPaso(1)}
        onNext={() => setPaso(3)}
        nextDisabled={form.analisesSeleccionados.length === 0}
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
              Análisis ({form.analisesSeleccionados.length})
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.analisesSeleccionados.map((a) => (
                <span key={a} className="text-[10px] font-bold bg-[#D12E7B]/10 text-[#D12E7B] px-2.5 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
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

      <NavButtons
        onBack={() => setPaso(4)}
        onNext={handleConfirmar}
        nextLabel="Confirmar Reserva"
        nextDisabled={!form.formaPago}
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
        Tu cita ha sido registrada con éxito. Guarda tu código de reserva.
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
            setForm({ modalidad: null, dni: "", nombrePaciente: "", analisesSeleccionados: [], fecha: "", horario: "", direccion: "", referencia: "", distrito: "", formaPago: null });
            setPaso(0);
            setCodigoReserva("");
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
