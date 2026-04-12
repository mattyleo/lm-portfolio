import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { FadeUp } from "@/components/ui/Motion";

export const dynamic = "force-dynamic";

// Funzione base per calcolare il tempo di lettura
const calculateReadTime = (content: string) => {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

// Funzione per validare e convertire mini-sintassi markdown in HTML
const parseMarkdown = (text: string) => {
  if (!text) return "";
  
  // Immagini: ![alt](url)
  let html = text.replace(/!\[([^\]]*)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-3xl my-10 shadow-2xl border border-white/10" />');
  
  // Grassetto: **testo**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  
  // Corsivo: *testo*
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-neutral-300">$1</em>');
  
  // Liste numeriche (1. o A. o I.) a inizio linea:
  html = html.replace(/^(1\.|A\.|I\.) /gm, '<span class="mr-3 font-semibold text-purple-400 bg-purple-500/10 px-2 rounded">$1</span>');

  return html;
};

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Prendi il post dal DB
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Dividiamo il contenuto in paragrafi a ogni doppia riga vuota
  const paragraphs = post.content ? post.content.split(/\n\n+/) : [];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        
        <FadeUp delay={0}>
          <Link href="/blog" className="inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors mb-12 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-neutral-800">
            <ArrowLeft className="w-4 h-4" /> Torna agli articoli
          </Link>
        </FadeUp>

        <article>
          {/* Article Header */}
          <header className="mb-12">
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {post.category || "Articolo"}
                </span>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Calendar className="w-4 h-4" /> {new Date(post.published_at).toLocaleDateString("it-IT", { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Clock className="w-4 h-4" /> {calculateReadTime(post.content)}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-serif">
                {post.title}
              </h1>
            </FadeUp>

            {post.excerpt && (
              <FadeUp delay={0.3}>
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed border-l-4 border-purple-500/50 pl-6 my-8 italic">
                  {post.excerpt}
                </p>
              </FadeUp>
            )}
            
            <FadeUp delay={0.4}>
              <div className="flex items-center gap-4 py-8 border-y border-white/10 mt-8">
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full p-0.5">
                  <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center text-sm font-bold">
                    ML
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Mattia Leoni</h3>
                  <p className="text-sm text-neutral-400">Autore</p>
                </div>
              </div>
            </FadeUp>
          </header>

          {/* Copertina Principale */}
          {post.image_url && (
             <FadeUp delay={0.5}>
               <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden mb-16 shadow-2xl relative border border-white/10">
                  <img src={post.image_url} alt="Copertina articolo" className="w-full h-full object-cover" />
               </div>
             </FadeUp>
          )}

          {/* Testo Articolo */}
          <FadeUp delay={0.6}>
            <div className="text-lg text-neutral-300 leading-relaxed font-sans max-w-none">
              {paragraphs.map((para: string, idx: number) => (
                <p 
                  key={idx} 
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(para).replace(/\n/g, '<br/>') }} 
                  className="mb-6 font-light"
                ></p>
              ))}
            </div>
          </FadeUp>
        </article>

      </main>
    </div>
  );
}
