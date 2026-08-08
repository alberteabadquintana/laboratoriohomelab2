// app/components/BlogCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, Clock } from "lucide-react";
import LikeButton from "./LikeButton"; // Importamos el nuevo componente

type BlogCardProps = {
  post: {
    id: number;
    slug: string;
    titulo: string;
    excerpt: string;
    imagen: string;
    fecha: string;
    autor: string;
    likes: number;
  };
  index: number;
};

export default function BlogCard({ post, index }: BlogCardProps) {
  // Tiempo de lectura estimado (1 minuto cada 200 palabras aprox)
  const tiempoLectura = Math.ceil(post.excerpt.split(" ").length / 200) + 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Efecto de glow 3D */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0173BC] to-[#10b5c5] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      
      {/* Tarjeta principal */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-500">
        
        <div className="flex flex-col md:flex-row">
          {/* Columna izquierda - Imagen */}
          <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden bg-gradient-to-br from-[#0173BC] to-[#10b5c5]">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              <Image
                src={post.imagen}
                alt={post.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
            
            {/* Badge de tiempo de lectura */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1 border border-white/10">
                <Clock size={14} />
                {tiempoLectura} min lectura
              </span>
            </div>
          </div>

          {/* Columna derecha - Contenido */}
          <div className="md:w-3/5 p-8 flex flex-col justify-center relative">
            {/* Línea decorativa */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#0173BC] to-[#10b5c5] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <motion.span 
                whileHover={{ x: 2 }}
                className="flex items-center gap-1.5"
              >
                <Calendar size={14} className="text-[#0173BC]" />
                {post.fecha}
              </motion.span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <span className="text-[#0173BC]">👤</span>
                {post.autor}
              </span>
            </div>

            {/* Título */}
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight hover:text-[#0173BC] transition-colors cursor-pointer">
                {post.titulo}
              </h3>
            </Link>

            {/* Extracto */}
            <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Footer con acciones */}
            <div className="flex items-center justify-between">
              {/* Botón de Like */}
              <LikeButton 
                postId={post.id} 
                initialLikes={post.likes} 
              />

              {/* Vistas aproximadas (simuladas) */}
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Eye size={16} />
                <span>{Math.floor(post.likes * 2.5)} vistas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso animada */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
          <motion.div
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-[#0173BC] to-[#10b5c5]"
          />
        </div>
      </div>
    </motion.article>
  );
}