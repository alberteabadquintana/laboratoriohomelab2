import { ReactNode } from "react";

export interface Servicio {
  title: string;
  description: string;
  examenes: string[];
  icon?: ReactNode;
  categoria: "especialidad" | "perfil";
  color: string; //añadi esto en color 
}

export type TabOption = 'servicios' | 'especialidades';