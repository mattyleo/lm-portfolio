"use client";

import { motion } from "framer-motion";
import { Users, FileText, Ticket, TrendingUp, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
            <p className="text-neutral-400 mt-1">Bentornato. Ecco un riepilogo delle tue attività.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blog/new" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:from-blue-500 hover:to-indigo-500 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
              <Plus className="w-5 h-5" />
              Nuovo Post
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Visite Uniche", value: "24.5k", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Post Pubblicati", value: "42", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { label: "Ticket Aperti", value: "7", icon: Ticket, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "Conversioni", value: "3.2%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-neutral-400">{stat.label}</div>
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${stat.bg} blur-3xl group-hover:scale-150 transition-transform duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* Layout a 2 colonne per le liste */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sezione Ticket Recenti */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" /> Ticket Recenti
              </h2>
              <button className="text-sm text-neutral-400 hover:text-white transition-colors">Vedi tutti</button>
            </div>
            <div className="space-y-4">
              {[
                { client: "Mario Rossi", title: "Richiesta assistenza server", status: "nuovo", time: "2h fa" },
                { client: "Luigi Verdi", title: "Integrazione API esterne", status: "in corso", time: "5h fa" },
                { client: "Acme SPA", title: "Aggiornamento design", status: "nuovo", time: "1g fa" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-colors border border-white/5">
                  <div>
                    <h3 className="font-medium text-sm">{t.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{t.client}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                      t.status === 'nuovo' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-xs text-neutral-500">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sezione Post Recenti */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" /> Ultimi Articoli Blog
              </h2>
              <button className="text-sm text-neutral-400 hover:text-white transition-colors">Gestisci</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "Come usare gli Agenti AI nel 2026", views: "1.2k", date: "Oggi" },
                { title: "Migliorare le performance di Next.js", views: "850", date: "Ieri" },
                { title: "Guida completa a Supabase", views: "3.4k", date: "4 Apr" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-colors border border-white/5 group cursor-pointer">
                  <div className="pr-4">
                    <h3 className="font-medium text-sm group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">Pubblicato: {p.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-neutral-400 whitespace-nowrap">{p.views} views</div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
