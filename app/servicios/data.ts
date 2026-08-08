import { Servicio } from "./types";
import { Beaker, Droplets, ShieldCheck, Microscope, Search } from "lucide-react";
import React from "react";

export const servicios: Servicio[] = [
  {
    title: "Bioquímica",
    description: "Evaluación metabólica y funcional de órganos vitales.",
    examenes: [
      "Glucosa Basal", "Colesterol Total", "Colesterol HDL / LDL", 
      "Triglicéridos", "Creatinina Sérica", "Urea / Bun Ureico", 
      "Ácido Úrico", "Perfil Hepático completo", "Perfil Lipídico",
      "Electrolitos Séricos (Na, K, Cl)", "Proteínas Totales", "Amilasa / Lipasa"
    ],
    icon: React.createElement(Beaker, { size: 32 })
  },
  {
    title: "Hematología",
    description: "Estudio integral de la sangre y sus componentes.",
    examenes: [
      "Hemograma Completo", "Hemoglobina Glicosilada", "Grupo Sanguíneo y Factor RH",
      "Perfil de Coagulación", "Tiempo de Protrombina (TP)", "Ferritina / Hierro Sérico",
      "Vitamina B12", "Ácido Fólico", "Lámina Periférica",
      "Saturación de Transferrina", "Recuento de Plaquetas", "Velocidad de Sedimentación"
    ],
    icon: React.createElement(Droplets, { size: 32 })
  },
  {
    title: "Inmunología",
    description: "Diagnóstico especializado de hormonas y defensas.",
    examenes: [
      "Perfil Tiroideo (T3, T4, TSH)", "Marcadores Tumorales (PSA, CEA)", "Prueba de Dengue (NS1, IgG/IgM)",
      "VIH 4ta Generación", "Hepatitis B y C", "Perfil Prenatal completo",
      "Proteína C Reactiva (PCR)", "Factor Reumatoideo", "Beta HCG (Embarazo)",
      "Hormonas (FSH, LH, Prolactina)", "Insulina Basal", "Perfil TORCH"
    ],
    icon: React.createElement(ShieldCheck, { size: 32 })
  },
  {
    title: "Microbiología",
    description: "Identificación de bacterias, hongos y otros patógenos.",
    examenes: [
      "Examen de Orina Completo", "Urocultivo + Antibiograma", "BK en Esputo / Orina",
      "Cultivo de Secreciones", "Papanicolaou (PAP)", "Estudio de Anatomía Patológica",
      "Tinta China (Tinciones)", "Micológico Directo", "BK Jugo Gástrico"
    ],
    icon: React.createElement(Microscope, { size: 32 })
  },
  {
    title: "Parasitología / Coprología",
    description: "Análisis de parásitos y evaluación digestiva.",
    examenes: [
      "Examen Parasitológico Serial", "Thevenon en Heces", "Test de Graham",
      "Coprofuncional", "BK en Heces", "Sustancias Reductoras",
      "Rotavirus / Adenovirus", "Reacción Inflamatoria", "Calprotectina Fecal"
    ],
    icon: React.createElement(Search, { size: 32 })
  }
];