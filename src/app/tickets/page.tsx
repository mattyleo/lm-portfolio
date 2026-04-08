"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MessageSquare, Clock, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TicketsDashboard() {
  const [tickets] = useState([
    {
      id: "TKT-001",
      title: "Richiesta modifica layout Home Page",
      status: "in progress",
      date: "Oggi, 14:30",
      messages: 3,
    },
    {
      id: "TKT-002",
      title: "Errore caricamento immagini galleria",
      status: "resolved",
      date: "Ieri, 09:15",
      messages: 5,
    },
    {
      id: "TKT-003",
      title: "Aggiunta nuova lingua al sito",
      status: "open",
      date: "5 Apr, 11:20",
      messages: 1,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "in progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-medium border border-emerald-500/20">Risolto</span>;
      case "in progress":
        return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium border border-blue-500/20">In Lavorazione</span>;
      default:
        return <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium border border-amber-500/20">Aperto</span>;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">I Miei Ticket</h1>
            <p className="text-neutral-400 mt-1">Gestisci le tue richieste di supporto e i task di sviluppo.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-neutral-200 transition-colors active:scale-95">
            <Plus className="w-5 h-5" />
            Nuovo Ticket
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-amber-500 mb-2"><AlertCircle className="w-6 h-6" /></div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-neutral-400 font-medium">Ticket Aperti</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-blue-500 mb-2"><Clock className="w-6 h-6" /></div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-neutral-400 font-medium">In Lavorazione</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-emerald-500 mb-2"><CheckCircle2 className="w-6 h-6" /></div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-neutral-400 font-medium">Risolti Totali</div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-white/[0.02]">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neutral-400" />
              Ultime Attività
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {tickets.map((ticket, i) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-white/5 p-2 rounded-xl">
                      {getStatusIcon(ticket.status)}
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{ticket.id}</div>
                      <h3 className="font-medium text-lg leading-tight group-hover:text-blue-400 transition-colors">{ticket.title}</h3>
                      <div className="flex items-center gap-4 mt-3 text-sm text-neutral-400">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {ticket.date}</span>
                        <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {ticket.messages} messaggi</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48 pl-14 sm:pl-0">
                    {getStatusBadge(ticket.status)}
                    <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
