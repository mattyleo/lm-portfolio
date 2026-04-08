import Link from "next/link";
import { Badge } from "@/components/ui";
import { FadeUp } from "@/components/ui/Motion";

/*
export function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12
                 shadow-[0_0_0_1px_rgba(255,255,255,.04)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <FadeUp>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>IT & Network Consulting</Badge>
            <Badge variant="soft">Proxmox</Badge>
            <Badge variant="soft">Azure</Badge>
            <Badge variant="soft">Elastic</Badge>
            <Badge variant="soft">Security</Badge>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Infrastrutture solide, reti sicure, monitoring che serve davvero.
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-4 max-w-2xl text-gray-300 leading-relaxed">
            Sono <span className="text-white">Mattia Leoni</span>, System & Network Engineer.
            Progetto e gestisco reti, virtualizzazione e cloud con un approccio
            pragmatico, sicuro e misurabile.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center rounded-xl px-4 py-3
                         bg-sky-500/20 border border-sky-400/30 hover:bg-sky-500/30
                         shadow-[0_0_0_1px_rgba(56,189,248,.18)]
                         hover:shadow-[0_0_12px_rgba(56,189,248,.45)]
                         transition"
            >
              <span className="text-white group-hover:text-white transition">
                Vedi i progetti
              </span>
            </Link>

            <a
              href="#contatti"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3
                         bg-white/10 border border-white/10 hover:bg-white/15
                         transition"
            >
              Contattami
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
*/

export function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12
                 shadow-[0_0_0_1px_rgba(255,255,255,.04)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Neural network – wide & bright */}
        <svg
          className="ml-neural absolute inset-0 h-full w-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Lines */}
          <g className="ml-neural-lines">
            <line x1="80"  y1="120" x2="260" y2="200" />
            <line x1="260" y1="200" x2="460" y2="150" />
            <line x1="460" y1="150" x2="680" y2="240" />
            <line x1="680" y1="240" x2="900" y2="170" />
            <line x1="900" y1="170" x2="1080" y2="230" />

            <line x1="260" y1="200" x2="320" y2="360" />
            <line x1="460" y1="150" x2="520" y2="320" />
            <line x1="680" y1="240" x2="740" y2="360" />
            <line x1="900" y1="170" x2="960" y2="300" />

            <line x1="320" y1="360" x2="520" y2="320" />
            <line x1="520" y1="320" x2="740" y2="360" />
            <line x1="740" y1="360" x2="960" y2="300" />
          </g>

          {/* Nodes */}
          <g className="ml-neural-nodes">
            <circle className="ml-node ml-d0"  cx="80"  cy="120" r="3.4" />
            <circle className="ml-node ml-d1"  cx="260" cy="200" r="3.8" />
            <circle className="ml-node ml-d2"  cx="460" cy="150" r="3.4" />
            <circle className="ml-node ml-d3"  cx="680" cy="240" r="3.8" />
            <circle className="ml-node ml-d4"  cx="900" cy="170" r="3.4" />
            <circle className="ml-node ml-d5"  cx="1080"cy="230" r="3.6" />

            <circle className="ml-node ml-d6"  cx="320" cy="360" r="3.4" />
            <circle className="ml-node ml-d7"  cx="520" cy="320" r="3.8" />
            <circle className="ml-node ml-d8"  cx="740" cy="360" r="3.4" />
            <circle className="ml-node ml-d9"  cx="960" cy="300" r="3.6" />

            <circle className="ml-node ml-d10" cx="600" cy="210" r="3.2" />
            <circle className="ml-node ml-d11" cx="780" cy="190" r="3.2" />
          </g>
        </svg>

        {/* Glow blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-112 w-md rounded-full bg-cyan-500/22 blur-3xl" />

        {/* Contrast fade */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30" />
      </div>

      <div className="relative">
        <FadeUp>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge>IT & Network Consulting</Badge>
            <Badge variant="soft">Proxmox</Badge>
            <Badge variant="soft">Azure</Badge>
            <Badge variant="soft">Elastic</Badge>
            <Badge variant="soft">Security</Badge>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="ml-glow text-3xl md:text-5xl font-semibold tracking-tight">
            Infrastrutture solide, reti sicure, monitoring che serve davvero.
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-4 max-w-2xl text-gray-300 leading-relaxed">
            Sono <span className="text-white">Mattia Leoni</span>, System & Network Engineer.
            Progetto e gestisco reti, virtualizzazione e cloud con un approccio
            pragmatico, sicuro e misurabile.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center rounded-xl px-4 py-3
                         bg-sky-500/25 border border-sky-400/35 hover:bg-sky-500/35
                         shadow-[0_0_0_1px_rgba(56,189,248,.22)]
                         hover:shadow-[0_0_20px_rgba(0,229,255,.55)]
                         transition"
            >
              <span className="text-white transition">Vedi i progetti</span>
            </Link>

            <a
              href="#contatti"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3
                         bg-white/12 border border-white/12 hover:bg-white/18
                         transition"
            >
              Contattami
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
