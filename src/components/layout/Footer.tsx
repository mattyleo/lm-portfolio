import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Progetti", href: "/projects" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/mattyleo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mattyleo/" },
  { label: "YouTube", href: "https://www.youtube.com/@mltechit" },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-black/20">
      {/* Neural signature (background) */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="ml-neural-footer absolute inset-0 h-full w-full"
          viewBox="0 0 1200 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g className="ml-neural-lines-footer">
            <line x1="60" y1="280" x2="220" y2="220" />
            <line x1="220" y1="220" x2="380" y2="290" />
            <line x1="380" y1="290" x2="540" y2="210" />
            <line x1="540" y1="210" x2="720" y2="280" />
            <line x1="720" y1="280" x2="900" y2="230" />
            <line x1="900" y1="230" x2="1080" y2="290" />

            <line x1="220" y1="220" x2="260" y2="140" />
            <line x1="540" y1="210" x2="600" y2="140" />
            <line x1="900" y1="230" x2="960" y2="140" />

            <line x1="380" y1="290" x2="520" y2="330" />
            <line x1="720" y1="280" x2="840" y2="330" />
          </g>

          <g className="ml-neural-nodes-footer">
            <circle className="ml-node ml-d0" cx="60" cy="280" r="3.0" />
            <circle className="ml-node ml-d1" cx="220" cy="220" r="3.3" />
            <circle className="ml-node ml-d2" cx="380" cy="290" r="3.0" />
            <circle className="ml-node ml-d3" cx="540" cy="210" r="3.3" />
            <circle className="ml-node ml-d4" cx="720" cy="280" r="3.0" />
            <circle className="ml-node ml-d5" cx="900" cy="230" r="3.3" />
            <circle className="ml-node ml-d6" cx="1080" cy="290" r="3.0" />

            <circle className="ml-node ml-d7" cx="260" cy="140" r="2.8" />
            <circle className="ml-node ml-d8" cx="600" cy="140" r="2.8" />
            <circle className="ml-node ml-d9" cx="960" cy="140" r="2.8" />

            <circle className="ml-node ml-d10" cx="520" cy="330" r="2.8" />
            <circle className="ml-node ml-d11" cx="840" cy="330" r="2.8" />
          </g>
        </svg>

        {/* Fade for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/35" />
      </div>

      {/* Footer content */}
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-white">Mattia</span>
              <span className="text-sky-300">Leoni</span>
              <span className="text-white/80">.it</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              System & Network Engineer. Infrastrutture, reti, sicurezza e monitoring:
              approccio pratico, documentato e misurabile.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/90">Navigazione</div>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-300 hover:text-sky-200 transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#contatti"
                  className="text-gray-300 hover:text-sky-200 transition"
                >
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white/90">Contatti</div>

            <div className="space-y-2 text-sm text-gray-300">
              <a
                href="mailto:info@leonimattia.it"
                className="inline-flex items-center gap-2 hover:text-sky-200 transition"
              >
                info@leonimattia.it
              </a>

              <div className="flex flex-wrap gap-2 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-3 py-2 bg-white/5 border border-white/10
                               text-gray-200 hover:text-white hover:border-sky-400/25
                               hover:shadow-[0_0_12px_rgba(56,189,248,.25)]
                               transition"
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              <p className="pt-2 text-xs text-gray-400">
                © {new Date().getFullYear()} Mattia Leoni – P. IVA IT02801150356
              </p>
              <p className="text-xs text-gray-500">
                Attività svolta in regime di Partita IVA
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            Progetto in evoluzione: blog tech e area clienti in arrivo.
          </div>
          <div className="flex gap-4 text-xs">
            <Link className="text-gray-400 hover:text-sky-200 transition" href="/privacy">
              Privacy
            </Link>
            <Link href="/cookie" className="text-gray-400 hover:text-sky-200 transition">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
