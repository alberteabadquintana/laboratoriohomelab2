import { Servicio } from "./types";
import {
  Beaker, Droplets, ShieldCheck, Microscope, Target, Activity,
  Syringe, Heart, FlaskConical, TestTube, ClipboardCheck, Baby,
  Venus, Search, Gauge, Droplet, Users, ShieldAlert, Filter, Wind
} from "lucide-react";
import React from "react";

// --- ESPECIALIDADES: exámenes individuales agrupados por área del laboratorio ---
const especialidades: Servicio[] = [
  {
    title: "Bioquímica",
    color: "#0173BC",
    description: "Evaluación metabólica y funcional de órganos vitales.",
    categoria: "especialidad",
    examenes: [
      "Ácido Úrico", "Amilasa", "Bilirrubinas", "BUN (Nitrógeno Ureico)",
      "Calcio / Ca Iónico", "Cálculo Renal", "Colesterol Total", "Colesterol HDL",
      "Colesterol LDL", "Colesterol VLDL", "Creatinina", "CPK", "CK-MB",
      "DHL (Deshidrogenasa Láctica)", "Dímero-D", "Depuración de Creatinina",
      "Electrolitos (Na-Cl-K)", "Fosfatasa Alcalina", "Fósforo", "G.G.T.P",
      "Glucosa", "Glucosa Post-Prandial", "Lipasa", "Lípidos Totales", "Magnesio",
      "Osmolaridad Sérica", "Proteínas Totales Fraccionadas", "Proteinograma",
      "Riesgo Coronario", "Tolerancia a la Glucosa", "Tolerancia a la Lactosa",
      "Transaminasa Oxalacética (TGO)", "Transaminasa Pirúvica (TGP)",
      "Triglicéridos", "Urea", "Vitamina D (25-Hidroxi)", "Vitamina D (1,25 Dihidroxi)"
    ],
    icon: React.createElement(Beaker, { size: 32 })
  },
  {
    title: "Hematología",
    color: "#DC2626",
    description: "Estudio integral de la sangre y sus componentes.",
    categoria: "especialidad",
    examenes: [
      "Ácido Fólico", "Ácido Fólico Intraeritrocitario", "Coagulación y Sangría",
      "Fenómeno LE", "Ferritina", "Fibrinógeno", "Gota Gruesa",
      "Hemoglobina / Hematocrito", "Hemograma Completo", "Hierro Sérico",
      "Plaquetas", "Reticulocitos", "Saturación de Transferrina", "Transferrina",
      "Trombina", "Tiempo de Protrombina (TP)", "Tiempo de Tromboplastina",
      "Velocidad de Sedimentación", "Vitamina B12", "Hemoglobina Glicosilada"
    ],
    icon: React.createElement(Droplets, { size: 32 })
  },
  {
    title: "Inmunología",
    color: "#059669",
    description: "Diagnóstico especializado de infecciones, alergias y defensas.",
    categoria: "especialidad",
    examenes: [
      "Anti Hbc Ag (Anti Core)", "Anti Hbc IgM", "Anti Hbe Ag (Anti E)",
      "Hbe Ag (Antígeno E)", "HVC - Hepatitis C", "HVD - Hepatitis D",
      "Ac. Chlamydia IgG", "Ac. Chlamydia IgM", "Ac. Cisticercosis",
      "Ac. Criptococosis", "Ac. Herpes I IgM", "Ac. Herpes I IgG",
      "Ac. Herpes II IgM", "Ac. Herpes II IgG", "Ac. Toxoplasma IgG",
      "Ac. Toxoplasma IgM", "Ac. Rubéola IgG", "Ac. Rubéola IgM",
      "Ac. Citomegalovirus IgM", "Ac. Citomegalovirus IgG", "Ac. H.I.V.",
      "Ac. H.I.V. (Western Blot)", "Coombs Directo", "Coombs Indirecto",
      "Crioglobulinas", "Crioaglutininas", "Complemento C3-C4",
      "Epstein Barr IgG (EBNA)", "Epstein Barr IgM (EBNA)", "FTA-ABS",
      "Factor Reumatoideo", "HCG Cuantitativo - Beta", "Hidatidosis (ELISA)",
      "Inmunoglobulinas (IgA, IgG, IgM)", "Inmunoglobulinas E",
      "Inmunoelectroforesis", "Paul Bunnel", "Proteína C Reactiva",
      "Proteína C Reactiva Ultrasensible", "PRO-BNP", "Serológica Semicuántica",
      "Waller Rose", "Test de Alergia", "Troponina T", "Tamizaje Neonatal x4",
      "Aglutinaciones en Lámina", "Aglutinaciones en Tubo", "Aglutinación Fenol Zona",
      "Aglutinación 2-M Etanol", "Anticuerpos Bloqueadores", "Anticuerpos Antinucleares",
      "Anticuerpos Antiestreptolisinas", "Anti-DNA-DS", "Antimitocondriales (AMA)",
      "Anti Músculo Liso", "Anti HAV IgG", "Anti HAV IgM",
      "Hbs Ag (Antígeno Australiano de Superficie)", "Anti Hbs Ag (Vacuna)"
    ],
    icon: React.createElement(ShieldCheck, { size: 32 })
  },
  {
    title: "Microbiología",
    color: "#7C3AED",
    description: "Identificación de bacterias, hongos y otros patógenos.",
    categoria: "especialidad",
    examenes: [
      "BK Directo", "Coprocultivo", "Cultivo BK", "Cultivo de Secreción Conjuntival",
      "Cultivo de Secreción Vaginal", "Cultivo de Hongos", "Frotis Directo (Gérmenes)",
      "Frotis Directo (Hongos)", "Hemocultivo", "Secreción Faríngea"
    ],
    icon: React.createElement(Microscope, { size: 32 })
  },
  {
    title: "Marcadores Tumorales",
    color: "#EA580C",
    description: "Pruebas de despistaje orientadas a la detección oportuna de cáncer.",
    categoria: "especialidad",
    examenes: [
      "AFP (Cáncer de Hígado)", "Beta-2 Microglobulina (Cáncer Renal)",
      "Calcitonina (Cáncer Óseo)", "CA 19-9 (Cáncer de Páncreas)",
      "CA 15-3 (Cáncer de Mama)", "CA 125 (Cáncer de Ovarios)",
      "CA 72-4 (Cáncer de Estómago)", "CEA (Cáncer de Pulmón y Colon)",
      "PSA (Antígeno Prostático)", "PSA Libre", "PSA Índice"
    ],
    icon: React.createElement(Target, { size: 32 })
  },
  {
    title: "Endocrinología",
    color: "#4F46E5",
    description: "Evaluación hormonal completa para tiroides, fertilidad y metabolismo.",
    categoria: "especialidad",
    examenes: [
      "Cortisol AM - PM", "DHEA-S", "Estradiol", "Estriol Libre", "FSH",
      "Hormona de Crecimiento", "Insulina", "LH", "Progesterona", "Prolactina",
      "Somatomedina (IGF1)", "Testosterona Total", "Testosterona Libre",
      "Tiroxina (T4)", "Tolerancia a la Insulina", "Triyodotironina (T3)",
      "TSH Ultrasensible", "T3 Libre", "T4 Libre"
    ],
    icon: React.createElement(Activity, { size: 32 })
  }
];

// --- PERFILES Y PAQUETES: combos de exámenes agrupados por situación clínica ---
const perfiles: Servicio[] = [
  {
    title: "Perfil de Coagulación",
    color: "#E11D48",
    description: "Evalúa la capacidad de la sangre para coagular correctamente.",
    categoria: "perfil",
    examenes: [
      "Plaquetas", "Tiempo de Protrombina", "Tiempo de Tromboplastina",
      "Fibrinógeno", "Tiempo de Coagulación y Sangría"
    ],
    icon: React.createElement(Syringe, { size: 32 })
  },
  {
    title: "Perfil Lipídico",
    color: "#DB2777",
    description: "Mide grasas en sangre para evaluar el riesgo cardiovascular.",
    categoria: "perfil",
    examenes: ["Colesterol Total", "HDL", "LDL", "VLDL", "Triglicéridos"],
    icon: React.createElement(Heart, { size: 32 })
  },
  {
    title: "Perfil Hepático",
    color: "#D97706",
    description: "Evalúa el funcionamiento del hígado.",
    categoria: "perfil",
    examenes: [
      "G.G.T.P", "TGO", "TGP", "TP - INR", "Proteínas",
      "Fosfatasa Alcalina", "Bilirrubina"
    ],
    icon: React.createElement(FlaskConical, { size: 32 })
  },
  {
    title: "Orina",
    color: "#0891B2",
    description: "Panel completo de análisis de orina.",
    categoria: "perfil",
    examenes: [
      "Urocultivo", "Ácido Úrico 24h", "Bence Jones Proteína", "Calcio 24h",
      "Creatinina", "Examen Completo", "Electrolitos 24h", "NTX (Orina Simple)",
      "Proteinuria 24h", "Depuración de Creatinina"
    ],
    icon: React.createElement(TestTube, { size: 32 })
  },
  {
    title: "Perfil Pre-operatorio",
    color: "#475569",
    description: "Batería de análisis requerida antes de una cirugía.",
    categoria: "perfil",
    examenes: [
      "Hemograma", "Glucosa", "Urea", "Creatinina", "HIV", "Grupo y RH",
      "TP - INR", "Tiempo de Coagulación", "Tiempo de Sangría", "Examen de Orina", "RPR"
    ],
    icon: React.createElement(ClipboardCheck, { size: 32 })
  },
  {
    title: "Perfil Pre-natal",
    color: "#9333EA",
    description: "Control de análisis recomendado durante el embarazo.",
    categoria: "perfil",
    examenes: [
      "Hemograma", "Glucosa", "Urea", "Examen de Orina", "Grupo y RH",
      "RPR (Sífilis)", "HIV"
    ],
    icon: React.createElement(Baby, { size: 32 })
  },
  {
    title: "Hormonal Femenino",
    color: "#C026D3",
    description: "Evaluación hormonal para salud reproductiva femenina.",
    categoria: "perfil",
    examenes: ["FSH", "LH", "Estradiol", "Prolactina", "Progesterona"],
    icon: React.createElement(Venus, { size: 32 })
  },
  {
    title: "Heces",
    color: "#92400E",
    description: "Análisis de parásitos y evaluación digestiva.",
    categoria: "perfil",
    examenes: [
      "Campylobacter", "Coprológico Funcional", "Estudio de Coccidios",
      "Reacción Inflamatoria / Leucocitos", "Parasitológico Especial",
      "Parasitológico Simple", "Parasitológico Seriado x3", "Rotavirus",
      "Test de Graham", "Thevenon"
    ],
    icon: React.createElement(Search, { size: 32 })
  },
  {
    title: "Perfil Tiroideo",
    color: "#0D9488",
    description: "Evaluación completa de la función tiroidea.",
    categoria: "perfil",
    examenes: ["T3 Total", "T3 Libre", "T4 Libre", "TSH"],
    icon: React.createElement(Gauge, { size: 32 })
  },
  {
    title: "Anemia",
    color: "#EF4444",
    description: "Panel orientado al diagnóstico y seguimiento de anemia.",
    categoria: "perfil",
    examenes: ["Hemograma", "Hierro Sérico", "Ferritina", "Vitamina B12", "Ácido Fólico"],
    icon: React.createElement(Droplet, { size: 32 })
  },
  {
    title: "Perfil Pediátrico",
    color: "#0EA5E9",
    description: "Análisis básicos orientados a la salud infantil.",
    categoria: "perfil",
    examenes: ["Parasitológico", "Hemoglobina", "Grupo Sanguíneo y RH"],
    icon: React.createElement(Users, { size: 32 })
  },
  {
    title: "TORCH",
    color: "#6D28D9",
    description: "Despistaje de infecciones congénitas (IgG / IgM).",
    categoria: "perfil",
    examenes: [
      "Citomegalovirus IgG / IgM", "Toxoplasma IgG / IgM",
      "Herpes I y II IgG / IgM", "Rubéola IgG / IgM"
    ],
    icon: React.createElement(ShieldAlert, { size: 32 })
  },
  {
    title: "Perfil Renal",
    color: "#2563EB",
    description: "Evaluación de la función de los riñones.",
    categoria: "perfil",
    examenes: ["Orina Completa", "Urea", "Creatinina", "Ácido Úrico", "Proteína de 24 horas"],
    icon: React.createElement(Filter, { size: 32 })
  },
  {
    title: "Despistaje Alérgico",
    color: "#65A30D",
    description: "Panel de alergias más comunes.",
    categoria: "perfil",
    examenes: ["Panel de Alergias"],
    icon: React.createElement(Wind, { size: 32 })
  }
];

export const servicios: Servicio[] = [...especialidades, ...perfiles];