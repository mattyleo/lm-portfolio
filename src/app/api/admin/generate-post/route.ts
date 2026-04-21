import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Evita timeout su Vercel Serverless
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, category } = body;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY mancante nel file .env.local o Vercel' }, { status: 500 });
    }

    const aiPrompt = prompt || "un argomento interessante in ambito tech/programmazione";
    const selectedCategory = category || "Tech";

    // 2. Chiamata ad OpenAI (ChatGPT)
    const systemPrompt = `
      Sei un espertissimo blogger IT e software engineer di nome Mattia Leoni.
      Scrivi un articolo accattivante e tecnico, ma facile da leggere, basato sul seguente spunto: "${aiPrompt}".
      La categoria del post è: ${selectedCategory}.
      Usa la formattazione Markdown (usa grassetti **testo**, corsivi, e liste tipo 1. o A.).
      L'articolo deve essere di circa 3-4 paragrafi pieni e succosi.
      Non inserire saluti iniziali o finali.
      Ritorna RIGOROSAMENTE una stringa JSON con questa esatta struttura:
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
        model: 'gpt-4o-mini',
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
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY mancante nel file .env.local o Vercel.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Immagine placeholder da Picsum (molto più affidabile di Unsplash Source)
    const fallbackImage = `https://picsum.photos/seed/${Math.random().toString().slice(2, 8)}/800/400`;

    // 4. Salvataggio Database
    const { data: insertedPost, error: dbError } = await supabaseAdmin.from('posts').insert([
      {
        title,
        excerpt,
        content,
        category: selectedCategory,
        image_url: fallbackImage,
        is_published: true, // Pubblica istantaneamente sul sito
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
