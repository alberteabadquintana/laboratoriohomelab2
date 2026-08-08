// app/blog/page.tsx
"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/app/blog/data/blogPosts";
import { videos } from "@/app/blog/data/videos";
import BlogCard from "@/app/blog/BlogCard";
import VideoCard from "@/app/blog/VideoCard";
import VideoModal from "@/app/blog/VideoModal";
import { Search, Sparkles, TrendingUp, Youtube } from "lucide-react";

export default function BlogPage() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState<"reciente" | "popular">("reciente");
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  const postsFiltrados = useMemo(() => {
    let filtrados = blogPosts.filter((post) =>
      post.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (orden === "popular") {
      filtrados = [...filtrados].sort((a, b) => b.likes - a.likes);
    } else {
      filtrados = [...filtrados].sort((a, b) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return fechaB - fechaA;
      });
    }

    return filtrados;
  }, [busqueda, orden]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0173BC] to-[#10b5c5] opacity-90" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/grid-pattern.svg')",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-black">
              <span className="text-white">Blog </span>{" "}

            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Artículos escritos por nuestros especialistas
            </p>

            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Onda inferior */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              d="M0 120L60 105C120 90 240 60 360 48C480 36 600 42 720 54C840 66 960 84 1080 90C1200 96 1320 90 1380 87L1440 84V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Barra de búsqueda y filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full py-4 bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOrden("reciente")}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${orden === "reciente"
                  ? "bg-gradient-to-r from-[#0173BC] to-[#10b5c5] text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <Sparkles size={18} />
                Más recientes
              </button>
              <button
                onClick={() => setOrden("popular")}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${orden === "popular"
                  ? "bg-gradient-to-r from-[#0173BC] to-[#10b5c5] text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                <TrendingUp size={18} />
                Más populares
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid de artículos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {postsFiltrados.length > 0 ? (
          <div className="space-y-8">
            {postsFiltrados.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No encontramos artículos
            </h3>
            <p className="text-gray-500 mb-6">
              Intenta con otras palabras clave
            </p>
            <button
              onClick={() => setBusqueda("")}
              className="px-8 py-3 bg-gradient-to-r from-[#0173BC] to-[#10b5c5] text-white rounded-full font-semibold shadow-lg"
            >
              Limpiar búsqueda
            </button>
          </motion.div>
        )}
      </section>

      {/* SECCIÓN DE VIDEOS - NUEVA */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Encabezado de la sección */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-[#0173BC]/10 px-6 py-3 rounded-full mb-4">
              <Youtube size={24} className="text-[#0173BC]" />
              <span className="text-[#0173BC] font-semibold">Videoteca Médica</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Aprende con nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0173BC] to-[#10b5c5]">
                videos educativos
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Especialistas explican de forma clara y visual temas importantes para tu salud
            </p>
          </motion.div>

          {/* Grid de videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onPlay={setVideoSeleccionado}
              />
            ))}
          </div>

          {/* Botón ver más videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://www.youtube.com/@clinicabellohorizonte9825"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white border-2 border-[#0173BC] text-[#0173BC] font-bold rounded-full hover:bg-[#0173BC] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver todos los videos en YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal de video */}
      <VideoModal
        video={videoSeleccionado}
        onClose={() => setVideoSeleccionado(null)}
      />
    </main>
  );
}