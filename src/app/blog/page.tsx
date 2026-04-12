import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeUp, FadeInView } from "@/components/ui/Motion";
import { createClient } from "@/utils/supabase/server";

// Evita che Next.js diventi statica se pubblichi un post nuovo
export const dynamic = "force-dynamic";

export default async function BlogPublicPage() {
  const supabase = await createClient();
  
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  // Funzione finta per calcolare i minuti di lettura in base alla lunghezza
  const calculateReadTime = (content: string) => {
    if (!content) return "1 min read";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-[85vh] bg-neutral-950 text-white font-sans overflow-hidden relative">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <FadeUp delay={0}>
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-purple-400 mb-4">
              Blog e Risorse
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
              Passioni scritte a codice.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-400">
              Pensieri, tutorial e case studies su sviluppo full-stack, intelligenza artificiale e web design.
            </p>
          </FadeUp>
        </div>

        {(!posts || posts.length === 0) && (
          <FadeUp delay={0.3}>
            <div className="text-center text-neutral-500 py-20 bg-neutral-900/20 border border-white/5 rounded-3xl backdrop-blur-sm">
              <p className="text-lg">Nessun articolo ancora pubblicato.</p>
              <p className="text-sm mt-2">Torna a trovarmi presto per novità!</p>
            </div>
          </FadeUp>
        )}

        {posts && posts.length > 0 && (
          <>
            {/* Featured Post (First post large) */}
            <FadeUp delay={0.3}>
              <div className="mb-16">
                <Link href={`/blog/${posts[0].id}`} className="group relative block bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-neutral-900/60 transition-colors duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="h-64 md:h-full w-full relative overflow-hidden bg-neutral-800">
                      {posts[0].image_url ? (
                        <img 
                          src={posts[0].image_url} 
                          alt={posts[0].title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-50" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent md:bg-gradient-to-r" />
                    </div>
                    <div className="p-8 md:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                          {posts[0].category || "Articolo"}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                          <Calendar className="w-4 h-4" /> {new Date(posts[0].published_at).toLocaleDateString("it-IT")}
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-neutral-400 text-lg mb-8 line-clamp-3">
                        {posts[0].excerpt || "Leggi l'articolo per saperne di più sul nuovo pensiero..."}
                      </p>
                      <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                        Leggi l'articolo <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </FadeUp>

            {/* Grid Posts */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post, i) => (
                  <FadeInView key={post.id} delay={i * 0.1}>
                    <Link href={`/blog/${post.id}`} className="block h-full group bg-neutral-900/20 border border-white/5 rounded-3xl overflow-hidden hover:bg-neutral-900/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                      <div className="h-48 w-full relative bg-neutral-800 overflow-hidden">
                        {post.image_url ? (
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 opacity-50" />
                        )}
                      </div>
                      <div className="p-6 sm:p-8 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4 text-xs text-neutral-400">
                          <span className="text-purple-400 font-medium uppercase tracking-wider">
                            {post.category || "Articolo"}
                          </span>
                          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(post.content)}</div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-neutral-400 mb-6 line-clamp-3 text-sm flex-grow">
                          {post.excerpt || "Nessun riassunto fornito. Clicca per leggere gli interi dettagli dell'articolo."}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors mt-auto">
                          Continua a leggere <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </FadeInView>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
