export default function CookiePage() {
  const lastUpdate = "18/01/2026";

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-gray-400">Ultimo aggiornamento: {lastUpdate}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cosa sono i cookie</h2>
        <p className="text-gray-300 leading-relaxed">
          I cookie sono piccoli file di testo che i siti web possono salvare sul dispositivo
          dell’utente per far funzionare correttamente il sito, migliorare l’esperienza di
          navigazione o, in alcuni casi, effettuare misurazioni e tracciamenti.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cookie utilizzati su questo sito</h2>
        <p className="text-gray-300 leading-relaxed">
          Questo sito è un portfolio informativo e, allo stato attuale, non utilizza cookie di
          profilazione o strumenti di tracciamento pubblicitario. Possono essere utilizzati
          cookie tecnici strettamente necessari al funzionamento del framework e/o del servizio
          di hosting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Categorie</h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
          <div className="text-sm text-gray-400">Cookie tecnici (necessari)</div>
          <p className="text-gray-300 leading-relaxed">
            Servono a garantire il corretto funzionamento del sito (es. sicurezza, stabilità,
            gestione tecnica). Non richiedono consenso, ma l’utente deve essere informato.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
          <div className="text-sm text-gray-400">Cookie analytics</div>
          <p className="text-gray-300 leading-relaxed">
            Al momento non sono utilizzati. Se in futuro verranno attivati strumenti di analisi
            statistica, la configurazione verrà valutata per capire se è necessario un consenso
            e come informare correttamente l’utente.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
          <div className="text-sm text-gray-400">Cookie di profilazione</div>
          <p className="text-gray-300 leading-relaxed">
            Al momento non sono utilizzati. Questi cookie sono finalizzati a creare profili e
            mostrare pubblicità mirata e, in generale, richiedono consenso preventivo.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Come gestire o disabilitare i cookie</h2>
        <p className="text-gray-300 leading-relaxed">
          Puoi gestire i cookie dalle impostazioni del browser. La disabilitazione dei cookie
          tecnici potrebbe compromettere alcune funzionalità del sito.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contatti</h2>
        <p className="text-gray-300 leading-relaxed">
          Per informazioni puoi contattare{" "}
          <a className="text-sky-300 hover:text-sky-200" href="mailto:info@leonimattia.it">
            info@leonimattia.it
          </a>
          .
        </p>
      </section>
    </div>
  );
}
