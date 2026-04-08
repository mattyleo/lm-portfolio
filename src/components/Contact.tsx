export function Contact() {
  return (
    <section
      id="contatti"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
    >
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Contatti
      </h2>

      <p className="mt-3 text-gray-300 max-w-2xl">
        Scrivimi con due righe su contesto e obiettivo:
        rete, virtualizzazione, backup o monitoring.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:info@leonimattia.it"
          className="rounded-xl px-4 py-3 bg-white/10 border border-white/10 hover:bg-white/15"
        >
          Email: info@leonimattia.it
        </a>

        <a
          href="https://www.linkedin.com/in/mattyleo/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl px-4 py-3 bg-white/10 border border-white/10 hover:bg-white/15"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/mattyleo"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl px-4 py-3 bg-white/10 border border-white/10 hover:bg-white/15"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
