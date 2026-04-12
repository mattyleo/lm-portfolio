import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Evita timeout su Vercel Serverless
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

const CATEGORIES = ["Ingegneria", "Programmazione", "AI", "Networking", "Tech", "Database", "Sicurezza", "Finanza"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    // Mini-Livello di sicurezza: se in Vercel imposti CRON_SECRET, la richiesta dovrà avere ?key=... passata nell'URL
    if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Non Autorizzato' }, { status: 401 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY mancante nel file .env.local o Vercel' }, { status: 500 });
    }

    // 1. Scelta Categoria Random
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    // 2. Chiamata ad OpenAI (ChatGPT)
    const systemPrompt = `
      Sei un espertissimo blogger IT e software engineer di nome Mattia Leoni.
      Scrivi un articolo accattivante e tecnico, ma facile da leggere, sulla categoria: ${randomCategory}.
      Usa la formattazione Markdown (usa grassetti **testo**, corsivi, e liste tipo 1. o A.).
      L'articolo deve essere di circa 3-4 paragrafi pieni e succosi.
      Non inserire saluti iniziali o finali.
      Ritorna RIGOROSAMENTE una stringa JSON (non un code block con apici, solo Puro JSON testuale valido) con questa esatta struttura:
      {
        "title": "Titolo corto, virale e ad impatto",
        "excerpt": "Un riassunto molto in stile hook (una frase succosa e curiosa)",
        "content": "Il tuo fantastico testo del blog in Markdown qui..."
      }
    `;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modello super veloce ed economico
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    const aiData = await aiResponse.json();
    if (!aiData.choices || aiData.choices.length === 0) {
      throw new Error(`Risposta AI fallita: ${JSON.stringify(aiData)}`);
    }

    // Parsing della risposta in JSON
    const { title, excerpt, content } = JSON.parse(aiData.choices[0].message.content);

    // 3. Connessione a Supabase con diritti Amministrativi (Service Role Key)
    // ATTENZIONE: l'API anonima pubblica non può scrivere a causa delle tue RLS (Row Level Security).
    // Usiamo il SERVICE_ROLE_KEY per saltare i permessi in sicurezza dietro al server.
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Va aggiunta!

    if (!SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY mancante nel file .env.local o Vercel. Recuperala dalle impostazioni API di Supabase!' }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Immagine placeholder da Unsplash ispirata al titolo o al mondo Tech
    const fallbackImage = `https://source.unsplash.com/random/800x400/?coding,technology,${randomCategory}`;

    // 4. Salvataggio Database
    const { data: insertedPost, error: dbError } = await supabaseAdmin.from('posts').insert([
      {
        title,
        excerpt,
        content,
        category: randomCategory,
        image_url: fallbackImage,
        is_published: true, // Pubblica istantaneamente sul sito!
      }
    ]).select();

    if (dbError) throw dbError;

    return NextResponse.json({
      success: true,
      message: 'L\'Agente AI ha partorito un nuovo articolo su Supabase!',
      post: insertedPost
    });

  } catch (error: any) {
    console.error("Errore nell'Agente AI:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
