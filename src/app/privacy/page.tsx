export default function PrivacyPage() {
  const lastUpdate = "27/12/2025";

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Informativa Privacy
        </h1>
        <p className="text-sm text-gray-400">Ultimo aggiornamento: {lastUpdate}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Titolare del trattamento</h2>
        <div className="text-gray-300 leading-relaxed space-y-1">
          <p>Mattia Leoni</p>
          <p>P. IVA: IT02801150356</p>
          <p>
            Email:{" "}
            <a className="text-sky-300 hover:text-sky-200" href="mailto:info@leonimattia.it">
              info@leonimattia.it
            </a>
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tipologia di dati trattati</h2>
        <p className="text-gray-300 leading-relaxed">
          Questo sito ha finalità informativa/portfolio. I dati possono essere trattati
          esclusivamente per consentire la navigazione e per rispondere a eventuali contatti
          inviati via email.
        </p>
        <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
          <li>Dati di navigazione (es. indirizzo IP, user-agent, log tecnici)</li>
          <li>Dati forniti volontariamente dall’utente via email (nome, email, contenuto del messaggio)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Finalità e base giuridica</h2>
        <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-1">
          <li>
            <b>Gestione tecnica del sito</b> (sicurezza, stabilità, funzionamento) — legittimo interesse.
          </li>
          <li>
            <b>Risposta a richieste di contatto</b> inviate dall’utente — esecuzione di misure precontrattuali
            e/o consenso dell’interessato (a seconda del contenuto).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cookie e strumenti di tracciamento</h2>
        <p className="text-gray-300 leading-relaxed">
          Il sito non utilizza cookie di profilazione o strumenti di tracciamento a fini pubblicitari.
          Possono essere presenti cookie tecnici strettamente necessari al funzionamento della piattaforma
          di hosting o del framework.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Conservazione dei dati</h2>
        <p className="text-gray-300 leading-relaxed">
          I dati di contatto inviati via email vengono conservati per il tempo necessario a gestire la richiesta
          e per eventuali obblighi di legge. I log tecnici sono conservati per periodi limitati, secondo le policy
          del provider di hosting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Destinatari e trasferimenti</h2>
        <p className="text-gray-300 leading-relaxed">
          I dati possono essere trattati da fornitori tecnici (es. hosting) nominati, ove necessario,
          responsabili del trattamento. Non è previsto il trasferimento dei dati al di fuori dello SEE
          salvo esigenze tecniche del provider; in tal caso vengono adottate garanzie adeguate previste dal GDPR.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Diritti dell’interessato</h2>
        <p className="text-gray-300 leading-relaxed">
          L’utente può esercitare i diritti previsti dagli artt. 15–22 del GDPR (accesso, rettifica,
          cancellazione, limitazione, opposizione, portabilità) contattando il titolare via email.
          È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contatti</h2>
        <p className="text-gray-300 leading-relaxed">
          Per qualsiasi richiesta relativa alla privacy puoi scrivere a{" "}
          <a className="text-sky-300 hover:text-sky-200" href="mailto:info@leonimattia.it">
            info@leonimattia.it
          </a>
          .
        </p>
      </section>
    </div>
  );
}
