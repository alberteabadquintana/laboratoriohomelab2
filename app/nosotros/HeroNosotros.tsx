"use client";
import { motion } from "framer-motion";

export default function HeroNosotros() {
  return (
    <>
      {/* Hero con fondo degradado y altura reducida */}
      <div className="relative w-full h-[180px] md:h-[220px] lg:h-[260px] flex flex-col justify-center items-center px-4 overflow-hidden bg-gradient-to-b from-[#005a9e] to-[#0072BC]">
        {/* Contenido centrado */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="inline-block text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-[0.15em] uppercase drop-shadow-2xl"
          >
            NOSOTROS
          </motion.span>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="h-1 bg-white/70 rounded-full mx-auto mt-3 shadow-xl"
          />
        </div>
      </div>

      {/* Onda inferior */}
      <div className="w-full overflow-hidden leading-[0] bg-white">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] md:h-[50px] fill-[#0072BC]"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </>
  );
}