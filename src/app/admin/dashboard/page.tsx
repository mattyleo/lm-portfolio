"use client";

import { motion } from "framer-motion";
import { Users, FileText, Ticket, TrendingUp, Plus, ArrowRight, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [ticketsResponse, postsResponse] = await Promise.all([
        supabase.from('tickets').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('posts').select('*').order('published_at', { ascending: false }).limit(5)
      ]);
      
      if (ticketsResponse.data) setTickets(ticketsResponse.data);
      if (postsResponse.data) setPosts(postsResponse.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const openTicketsCount = tickets.filter(t => t.status === 'nuovo' || t.status === 'in corso').length;

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
            <button onClick={handleLogout} className="flex items-center gap-2 bg-neutral-800 text-white px-5 py-2.5 rounded-full font-medium hover:bg-neutral-700 transition-colors shadow-lg active:scale-95">
              <LogOut className="w-5 h-5" />
              Esci
            </button>
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
            { label: "Post Pubblicati", value: loading ? "..." : (posts.length || 0).toString(), icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { label: "Ticket Aperti", value: loading ? "..." : openTicketsCount.toString(), icon: Ticket, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
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
              {loading ? (
                 <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-neutral-400" /></div>
              ) : tickets.length === 0 ? (
                 <p className="text-sm text-neutral-500 p-4">Nessun ticket presente.</p>
              ) : tickets.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-colors border border-white/5">
                  <div>
                    <h3 className="font-medium text-sm">{t.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{t.client || t.client_name || 'Senza nome'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                      t.status === 'nuovo' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {t.status || 'nuovo'}
                    </span>
                    <span className="text-xs text-neutral-500">{t.created_at ? new Date(t.created_at).toLocaleDateString("it-IT") : ''}</span>
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
              <span className="text-xs text-neutral-500">Clicca un post per modificarlo</span>
            </div>
            <div className="space-y-4">
              {loading ? (
                 <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-neutral-400" /></div>
              ) : posts.length === 0 ? (
                 <p className="text-sm text-neutral-500 p-4">Nessun post pubblicato.</p>
              ) : posts.map((p, i) => (
                <div key={i} onClick={() => router.push(`/admin/blog/edit/${p.id}`)} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-colors border border-white/5 group cursor-pointer">
                  <div className="pr-4">
                    <h3 className="font-medium text-sm group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    <p className="text-xs text-neutral-500 mt-1">Pubblicato: {p.published_at ? new Date(p.published_at).toLocaleDateString("it-IT") : ''}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-white/40 flex gap-2">
                       <span className="px-2 py-0.5 rounded-full bg-white/5">{p.category || 'Tech'}</span>
                    </div>
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
