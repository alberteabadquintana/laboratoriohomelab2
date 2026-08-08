// app/components/LikeButton.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  postId: number;
  initialLikes: number;
  className?: string;
};

export default function LikeButton({ postId, initialLikes, className = "" }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setIsLiked(!!likedPosts[postId]);
  }, [postId]);

  const handleLike = () => {
    // Obtener estado actual de localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    
    if (!isLiked) {
      // Dar like
      const newLikedPosts = { ...likedPosts, [postId]: true };
      localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
      setLikes(likes + 1);
      setIsLiked(true);
      setIsAnimating(true);
      setShowConfetti(true);
      
      // Ocultar confeti después de 1 segundo
      setTimeout(() => setShowConfetti(false), 1000);
      
      // Quitar animación después de 300ms
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      // Quitar like
      const newLikedPosts = { ...likedPosts };
      delete newLikedPosts[postId];
      localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
        style={{
          background: isLiked 
            ? "linear-gradient(135deg, #fee2e2 0%, #ffc5c5 100%)" 
            : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
          boxShadow: isLiked 
            ? "0 4px 12px rgba(239, 68, 68, 0.3)" 
            : "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Corazón animado */}
        <motion.div
          animate={isAnimating ? {
            scale: [1, 1.5, 1],
            rotate: [0, 15, -15, 0],
          } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${
              isLiked 
                ? "fill-red-500 text-red-500" 
                : "text-gray-500 group-hover:text-red-400"
            }`}
          />
        </motion.div>

        {/* Contador de likes */}
        <motion.span
          key={likes}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`font-semibold ${
            isLiked ? "text-red-600" : "text-gray-600"
          }`}
        >
          {likes}
        </motion.span>

        {/* Efecto de confeti (partículas) */}
        <AnimatePresence>
          {showConfetti && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.sin(i) * 60 * (i % 2 === 0 ? 1 : -1),
                    y: -40 - Math.random() * 30,
                    scale: 1,
                    opacity: 0
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "#ef4444" : "#f97316",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip flotante */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
      >
        {isLiked ? "Te gusta este artículo" : "Me gusta este artículo"}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
      </motion.div>
    </div>
  );
}