"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Save, Send, ArrowLeft, Type, Layout } from "lucide-react";
import Link from "next/link";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publishing post", { title, content });
    // TODO: Supabase Insert e trigger Agente Email
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Nuovo Articolo</h1>
              <p className="text-sm text-neutral-400 mt-1">Crea e pubblica un nuovo post sul blog.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/10 transition-colors border border-white/10 active:scale-95">
              <Save className="w-4 h-4" />
              Bozza
            </button>
            <button onClick={handlePublish} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:from-purple-500 hover:to-indigo-500 transition-colors shadow-lg shadow-purple-500/20 active:scale-95">
              <Send className="w-4 h-4" />
              Pubblica
            </button>
          </div>
        </header>

        {/* Editor Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-6 shadow-2xl">
              <input
                type="text"
                placeholder="Titolo dell'articolo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-3xl font-bold placeholder:text-neutral-600 focus:outline-none focus:border-b focus:border-purple-500/50 pb-4 mb-6 transition-colors"
              />
              
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Aggiungi Testo"><Type className="w-5 h-5" /></button>
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Aggiungi Immagine"><ImageIcon className="w-5 h-5" /></button>
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Formattazione"><Layout className="w-5 h-5" /></button>
              </div>

              <textarea
                placeholder="Scrivi qui il contenuto del tuo post (supporta Markdown)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[400px] bg-transparent text-neutral-300 placeholder:text-neutral-600 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Copertina */}
            <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-400">Immagine Copertina</h3>
              <div className="border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                  <ImageIcon className="w-6 h-6 text-neutral-400 group-hover:text-purple-400" />
                </div>
                <p className="text-sm text-neutral-400">Clicca o trascina un'immagine qui</p>
              </div>
            </div>

            {/* Newsletter Trigger */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl pointer-events-none" />
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <Send className="w-4 h-4" /> Invio Automatico
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                L'agente AI invierà una mail con il riassunto di questo post ai tuoi clienti registrati al momento della pubblicazione.
              </p>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
                <span className="text-sm font-medium text-white">Notifica Clienti</span>
              </label>
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
