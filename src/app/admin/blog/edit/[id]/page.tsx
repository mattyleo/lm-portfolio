"use client";

import { useState, useRef, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Save, Send, ArrowLeft, Bold, Italic, ListOrdered, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Programmazione");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedCategories = ["Ingegneria", "Programmazione", "AI", "Networking", "Tech", "Database", "Sicurezza", "Finanza"];

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  // RECUPERO DATI INIZIALI
  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error || !data) {
        setError("Errore durante il caricamento dell'articolo.");
        setIsInitializing(false);
        return;
      }
      
      setTitle(data.title || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
      if (data.category && predefinedCategories.includes(data.category)) {
          setCategory(data.category);
      } else if (data.category) {
          // Fallback se avevamo categorie vecchie non previste nei pulsanti
          setCategory(data.category);
      }
      setImageUrl(data.image_url || null);
      
      setIsInitializing(false);
    }
    
    fetchPost();
  }, [id, supabase]);

  // INSERIMENTO MARKDOWN
  const insertFormatting = (before: string, after: string = "", block: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = "";
    let newCursorPos = 0;

    if (block) {
      const textBefore = content.substring(0, start);
      const textAfter = content.substring(end);
      const hasNewlineBefore = start === 0 || textBefore.endsWith('\n');
      
      const prefix = hasNewlineBefore ? before : '\n' + before;
      newText = textBefore + prefix + selectedText + textAfter;
      newCursorPos = start + prefix.length + selectedText.length;
    } else {
      newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
      newCursorPos = start + before.length + selectedText.length;
    }

    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // UPLOAD IMMAGINE COPERTINA
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      setError("Errore durante il caricamento dell'immagine. Assicurati di aver creato il bucket 'blog-images'.");
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
    setIsUploading(false);
  };

  // AGGIORNAMENTO POST
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
       setError("Il titolo dell'articolo è obbligatorio");
       return;
    }

    setIsPublishing(true);
    setError(null);

    const { error: updateError } = await supabase.from('posts').update({
        title,
        excerpt,
        content,
        category,
        image_url: imageUrl,
    }).eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setIsPublishing(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  if (isInitializing) {
     return (
       <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
       </div>
     );
  }

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
              <h1 className="text-2xl font-bold tracking-tight">Modifica Articolo</h1>
              <p className="text-sm text-neutral-400 mt-1">Aggiorna i dettagli dell'articolo selezionato.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/10 transition-colors border border-white/10 active:scale-95 disabled:opacity-50">
              <Save className="w-4 h-4" />
              Bozza
            </button>
            <button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-full font-medium hover:from-emerald-500 hover:to-teal-500 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-75"
            >
              {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salva Modifiche
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl text-center">
            {error}
          </div>
        )}

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
                className="w-full bg-transparent text-3xl font-bold placeholder:text-neutral-600 focus:outline-none focus:border-b focus:border-purple-500/50 pb-4 mb-4 transition-colors"
              />
              
              <input
                type="text"
                placeholder="Sottotitolo / Estratto dell'articolo..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-transparent text-lg text-neutral-300 placeholder:text-neutral-600 focus:outline-none mb-6"
              />
              
              {/* Selettore Etichette */}
              <div className="mb-6">
                 <p className="text-sm text-neutral-500 mb-3 uppercase tracking-wider font-semibold">Etichetta Selezionata: <span className="text-purple-400">{category}</span></p>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {predefinedCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${category === cat ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'}`}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>
              
              {/* Toolbar Markdown */}
              <div className="flex items-center gap-1 mb-4 border-b border-white/10 pb-4 flex-wrap">
                <button onClick={() => insertFormatting("**", "**")} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Grassetto">
                  <Bold className="w-5 h-5" />
                </button>
                <button onClick={() => insertFormatting("*", "*")} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Corsivo">
                  <Italic className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <button onClick={() => insertFormatting("1. ", "", true)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Lista numerica (1.)">
                  <ListOrdered className="w-5 h-5" />
                </button>
                <button onClick={() => insertFormatting("A. ", "", true)} className="px-3 py-1 text-neutral-400 font-bold hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Lista alfabetica (A.)">
                  A.
                </button>
                <button onClick={() => insertFormatting("I. ", "", true)} className="px-3 py-1 text-neutral-400 font-bold hover:text-white hover:bg-white/5 rounded-lg font-serif transition-colors" title="Lista romana (I.)">
                  I.
                </button>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <button onClick={() => insertFormatting("![Descrizione Immagine](URL_QUI_OLTRE_ALLE_PARENTESI)", "", true)} className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Aggiungi Immagine nel corpo dell'articolo">
                  <ImagePlus className="w-5 h-5" />
                </button>
              </div>

              <textarea
                ref={textareaRef}
                placeholder="Scrivi qui il contenuto del tuo post (supporta Markdown)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[400px] bg-transparent text-neutral-200 placeholder:text-neutral-600 focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Copertina */}
            <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-neutral-400">Immagine Copertina</h3>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer group overflow-hidden relative"
                style={{ height: '200px' }}
                title="Clicca per caricare dal tuo PC"
              >
                {isUploading ? (
                   <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                ) : imageUrl ? (
                   <img src={imageUrl} alt="Copertina" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                      <ImageIcon className="w-6 h-6 text-neutral-400 group-hover:text-emerald-400" />
                    </div>
                    <p className="text-sm text-neutral-400 px-4">Clicca per caricare<br/><span className="text-xs">(Diretta su Supabase)</span></p>
                  </>
                )}
              </div>
              {imageUrl && (
                <button onClick={() => setImageUrl(null)} className="mt-4 text-xs text-red-400 hover:text-red-300 w-full text-center">
                  Rimuovi Immagine
                </button>
              )}
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
