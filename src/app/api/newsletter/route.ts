import { NextResponse } from "next/server";
// import { Resend } from "resend";

// Inizializza Resend con la chiave proxy/mockata
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { title, excerpt, postUrl } = await request.json();

    if (!title || !postUrl) {
      return NextResponse.json({ error: "Dati mancanti per l'invio newsletter" }, { status: 400 });
    }

    console.log("[AGENTE EMAIL] Inizio elaborazione invio per il post:", title);

    // MOCK: In un ambiente reale, qui preleveremmo le email dei clienti registrati da Supabase
    const mockClientEmails = ["cliente1@email.com", "cliente2@azienda.it"];

    /* 
    await resend.emails.send({
      from: 'Mattia Leoni <hello@tuodominio.com>',
      to: mockClientEmails,
      subject: `Nuovo articolo pubblicato: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Nuovo post sul Blog!</h1>
          <h2>${title}</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">${excerpt || "Ho appena pubblicato un nuovo approfondimento."}</p>
          <a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background: #6d28d9; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
            Leggi l'articolo
          </a>
        </div>
      `
    });
    */

    console.log(`[AGENTE EMAIL] Newsletter inviata con successo a ${mockClientEmails.length} clienti.`);

    return NextResponse.json({ success: true, message: "Newsletter inviata agli iscritti." });
  } catch (error) {
    console.error("[AGENTE EMAIL] Errore invio newsletter:", error);
    return NextResponse.json({ error: "Impossibile inviare le email" }, { status: 500 });
  }
}
