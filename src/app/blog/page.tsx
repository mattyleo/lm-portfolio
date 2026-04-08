"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPublicPage() {
  const posts = [
    {
      id: 1,
      title: "Come gli Agenti AI trasformano lo sviluppo web moderno",
      excerpt: "Scopri come l'intelligenza artificiale non sta solo scrivendo codice, ma architettando intere applicazioni scalabili.",
      date: "Oggi",
      readTime: "5 min read",
      category: "Ingegneria",
      image: "bg-gradient-to-br from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Design System in Next.js: Guida Definitiva",
      excerpt: "Architettare componenti riutilizzabili e performanti utilizzando Tailwind CSS e Framer Motion per esperienze fluide.",
      date: "3 Apr 2026",
      readTime: "8 min read",
      category: "UI/UX",
      image: "bg-gradient-to-br from-emerald-500 to-teal-700"
    },
    {
      id: 3,
      title: "Ottimizzare PostgreSQL con Supabase",
      excerpt: "Trucchi e configurazioni avanzate per ottenere il massimo dal tuo database in ambienti serverless.",
      date: "28 Mar 2026",
      readTime: "12 min read",
      category: "Database",
      image: "bg-gradient-to-br from-amber-500 to-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-purple-400 mb-4"
          >
            Blog e Risorse
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
          >
            Approfondimenti sul Codice e dintorni.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400"
          >
            Pensieri, tutorial e case studies su sviluppo full-stack, intelligenza artificiale e web design.
          </motion.p>
        </div>

        {/* Featured Post (First post large) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Link href={`/blog/${posts[0].id}`} className="group relative block bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-neutral-900/60 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className={`h-64 md:h-full w-full ${posts[0].image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {posts[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Calendar className="w-4 h-4" /> {posts[0].date}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                  {posts[0].title}
                </h2>
                <p className="text-neutral-400 text-lg mb-8 line-clamp-3">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                  Leggi l'articolo <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              <Link href={`/blog/${post.id}`} className="block h-full group bg-neutral-900/20 border border-white/5 rounded-3xl overflow-hidden hover:bg-neutral-900/50 transition-all duration-300 hover:-translate-y-2">
                <div className={`h-48 w-full ${post.image}`} />
                <div className="p-6 sm:p-8 flex flex-col h-[calc(100%-12rem)]">
                  <div className="flex items-center justify-between mb-4 text-xs text-neutral-400">
                    <span className="text-purple-400 font-medium uppercase tracking-wider">{post.category}</span>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-400 mb-6 line-clamp-3 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors mt-auto">
                    Continua a leggere <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
}
