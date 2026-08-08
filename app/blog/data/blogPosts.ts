// app/data/blogPosts.ts

export type BlogPost = {
  id: number;
  slug: string;
  titulo: string;
  excerpt: string;
  imagen: string;
  fecha: string;
  autor: string;
  likes: number;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "control-ginecologico-preventivo-importancia",
    titulo: "La importancia del control ginecológico preventivo en todas las edades",
    excerpt: "Las visitas regulares al ginecólogo son fundamentales para detectar a tiempo enfermedades y mantener una salud reproductiva óptima. Te contamos cada cuándo debes acudir y qué esperar en tu consulta.",
    imagen: "/images/bloggine1.png",
    fecha: "15 marzo, 2025",
    autor: "Dra. María López",
    likes: 28,
  },
  {
    id: 2,
    slug: "cuidados-digestivos-alimentacion-saludable",
    titulo: "Cuidados digestivos: cómo una alimentación saludable mejora tu calidad de vida",
    excerpt: "La salud gastrointestinal es clave para el bienestar general. Descubre los alimentos que protegen tu sistema digestivo y previenen enfermedades como reflujo, gastritis y colon irritable.",
    imagen: "/images/bloggas2.png",
    fecha: "3 marzo, 2025",
    autor: "Dr. Carlos Mendoza",
    likes: 32,
  },
  {
    id: 3,
    slug: "cuidados-bucales-prevencion-odontologica",
    titulo: "Cuidados bucales: la prevención odontológica que tu sonrisa necesita",
    excerpt: "Más allá del cepillado diario, existen hábitos y visitas regulares al odontólogo que pueden evitar caries, enfermedades de las encías y otros problemas. Aprende a mantener tu salud dental.",
    imagen: "/images/bloodon3.png",
    fecha: "18 febrero, 2025",
    autor: "Dra. Patricia Sánchez",
    likes: 45,
  },

  
];