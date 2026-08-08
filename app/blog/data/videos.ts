// app/data/videos.ts

export type Video = {
  id: number;
  titulo: string;
  descripcion: string;
  youtubeId: string; // Aquí guardamos el ID para construir la URL fácilmente
  duracion: string;
  fecha: string;
  especialista: string;
  especialidad: string;
  thumbnail: string;
  vistas: number;
};

export const videos: Video[] = [
  {
    id: 1,
    titulo: "Un nuevo horizonte para su salud - Clínica Bello Horizonte",
    descripcion: "Video institucional que presenta los servicios y la filosofía de la Clínica Bello Horizonte, mostrando nuestro compromiso con la salud integral.",
    youtubeId: "dWmgTSfxow0", 
    duracion: "1:16",
    fecha: "hace 6 años",
    especialista: "Clínica Bello Horizonte",
    especialidad: "Institucional",
    thumbnail: "/images/videos/institucional.jpg",
    vistas: 734,
  },
  {
    id: 2,
    titulo: "Vocación, empatía y experiencia al cuidado de cada mujer",
    descripcion: "Conoce nuestro enfoque en ginecología y obstetricia, donde la vocación y la experiencia se unen para brindar el mejor cuidado a nuestras pacientes.",
    youtubeId: "MxZBcTYpdRU", // ID actualizado
    duracion: "0:21",
    fecha: "hace 6 años",
    especialista: "Clínica Bello Horizonte",
    especialidad: "Ginecología",
    thumbnail: "/images/videos/ginecologia.jpg",
    vistas: 1048,
  },
  {
    id: 3,
    titulo: "Recorrido por la Clínica Bello Horizonte",
    descripcion: "Te invitamos a un recorrido por nuestras modernas instalaciones en Piura, preparadas para tu atención integral.",
    youtubeId: "8y8t7HRwIfw", // ID actualizado
    duracion: "1:34",
    fecha: "hace 1 año",
    especialista: "Clínica Bello Horizonte",
    especialidad: "Infraestructura",
    thumbnail: "/images/videos/recorrido.jpg",
    vistas: 310,
  },
  {
    id: 4,
    titulo: "Testimonio 1 - Clínica Bello Horizonte",
    descripcion: "Pacientes comparten sus experiencias positivas y la calidad de atención recibida en nuestras instalaciones.",
    youtubeId: "9Xcx_JHB3tw", // ID actualizado
    duracion: "0:58",
    fecha: "hace 6 años",
    especialista: "Clínica Bello Horizonte",
    especialidad: "Testimonios",
    thumbnail: "/images/videos/testimonio1.jpg",
    vistas: 110,
  },
  
];