"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, KeyRound, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Aggiungere logica di convalida JWT o Supabase Admin
    console.log("Admin Login tentato");
    // Mock di redirect alla dashboard
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm bg-neutral-900/80 border border-white/5 backdrop-blur-xl rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/50 border border-red-500/20">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Accesso Amministratore</h1>
          <p className="text-neutral-500 text-center text-xs uppercase tracking-widest font-semibold">
            Solo personale autorizzato
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passkey di Sicurezza"
                required
                className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-center tracking-[0.3em] font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-neutral-200 font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 group"
          >
            Verifica Accesso
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
