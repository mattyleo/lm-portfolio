import { getCaseStudy, caseStudies } from "@/lib/caseStudies";
import Link from "next/link";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Case study non trovato</h1>
        <Link className="text-sky-300 hover:text-sky-200" href="/">
          ← Torna alla Home
        </Link>
      </div>
    );
  }

  const Icon = cs.icon;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-400/25 text-sky-300">
            <Icon size={20} />
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {cs.title}
            </h1>
            <p className="text-gray-300 mt-1">{cs.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Highlights</div>
          <ul className="mt-3 space-y-2 text-gray-200">
            {cs.highlights.map((h: string) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {cs.stack.map((t: string) => (
              <span
                key={t}
                className="text-sm rounded-xl px-3 py-2 bg-white/5 border border-white/10 text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Problema</div>
          <ul className="mt-3 space-y-2 text-gray-200">
            {cs.body.problem.map((x: string) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Approccio</div>
          <ul className="mt-3 space-y-2 text-gray-200">
            {cs.body.approach.map((x: string) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="text-sm text-gray-400">Risultato</div>
          <ul className="mt-3 space-y-2 text-gray-200">
            {cs.body.outcome.map((x: string) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-2">
        <Link className="text-sky-300 hover:text-sky-200" href="/">
          ← Torna alla Home
        </Link>
      </div>
    </div>
  );
}
