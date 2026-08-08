"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
   
    if (username === "homelab" && password === "admin123") {
        router.push("/resultados/admin-dashboard");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="min-h-screen bg-[#333333] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#333333] uppercase tracking-tighter">
            Acceso <span className="text-[#D12E7B]">Administrativo</span>
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">HomeLab Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-2">Usuario:</label>
            <input 
              type="text" 
              
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D12E7B]/20 outline-none rounded-xl py-3 px-4 font-bold text-[#333333] placeholder:opacity-30"
              required
            />
          </div>

          <div>
            <label className="block text-[#D12E7B] font-black uppercase text-[10px] tracking-[0.2em] mb-2">Contraseña:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D12E7B]/20 outline-none rounded-xl py-3 px-4 font-bold"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#D12E7B] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#b02666] transition-all shadow-lg shadow-[#D12E7B]/20"
          >
            Entrar al sistema
          </button>
        </form>
        
        <div className="mt-8 text-center">
            
            <button 
              onClick={() => router.push("/")} 
              className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-[#333333] transition-colors"
            >
                ← Volver al Inicio
            </button>
        </div>
      </div>
    </section>
  );
}