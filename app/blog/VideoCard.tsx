// app/components/VideoCard.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Eye, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";

type VideoCardProps = {
  video: {
    id: number;
    titulo: string;
    descripcion: string;
    youtubeId: string;
    duracion: string;
    fecha: string;
    especialista: string;
    especialidad: string;
    thumbnail: string;
    vistas: number;
  };
  index: number;
  onPlay: (video: any) => void;
};

export default function VideoCard({ video, index, onPlay }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
    >
      {/* Miniatura del video */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onPlay(video)}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.titulo}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Duración */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
          <Clock size={12} />
          {video.duracion}
        </div>

        {/* Especialidad */}
        <div className="absolute top-3 left-3 bg-[#0173BC] text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {video.especialidad}
        </div>

        {/* Botón de play con animación */}
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.9
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-16 h-16 bg-[#0173BC] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
            <Play size={32} className="text-white ml-1" />
          </div>
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#0173BC] transition-colors">
          {video.titulo}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {video.descripcion}
        </p>

        {/* Metadatos */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {video.fecha}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {video.especialista}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {video.vistas} vistas
          </span>
        </div>

        {/* Botón ver video */}
        <button
          onClick={() => onPlay(video)}
          className="w-full py-3 bg-gradient-to-r from-[#0173BC] to-[#10b5c5] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <Play size={16} className="group-hover/btn:scale-110 transition-transform" />
          Ver video
        </button>
      </div>
    </motion.div>
  );
}