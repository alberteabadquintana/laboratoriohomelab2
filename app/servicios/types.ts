import { ReactNode } from "react";

export interface Servicio {
  title: string;
  description: string;
  examenes: string[]; // Ahora es una lista
  icon?: ReactNode;
}



export type TabOption = 'servicios' | 'especialidades';