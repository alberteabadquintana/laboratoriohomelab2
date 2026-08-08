// app/components/VideoModal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type VideoModalProps = {
  video: {
    titulo: string;
    youtubeId: string;
  } | null;
  onClose: () => void;
};

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Título del video */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-40 pointer-events-none">
            <h3 className="text-white font-bold text-lg pr-12">{video.titulo}</h3>
          </div>

          {/* Reproductor de YouTube */}
          <div className="relative pt-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}