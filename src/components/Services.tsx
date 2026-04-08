import Link from "next/link";
import { caseStudies } from "@/lib/caseStudies";

export function Services() {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Case studies
        </h2>
        <span className="text-sm text-gray-400">
          Moduli chiari, risultati misurabili
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {caseStudies.map((s) => (
          <Link
            key={s.slug}
            href={`/case-studies/${s.slug}`}
            className="rounded-2xl p-6 bg-white/5 border border-white/10 transition
                       hover:bg-white/7 hover:-translate-y-0.5
                       hover:shadow-[0_12px_30px_-18px_rgba(56,189,248,.35)]"
          >
            <div className="text-lg font-semibold">{s.title}</div>
            <p className="mt-2 text-gray-300">{s.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.stack.slice(0, 4).map((t: string) => (
                <span
                  key={t}
                  className="text-xs rounded-xl px-2.5 py-1 bg-white/5 border border-white/10 text-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
