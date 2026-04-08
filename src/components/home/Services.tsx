import Link from "next/link";
import { caseStudies } from "@/lib/caseStudies";
import { FadeInView } from "@/components/ui/Motion";

export function Services() {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Case studies
        </h2>
        <span className="text-sm text-gray-400">
          Esperienza reale, approccio misurabile
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {caseStudies.map((s, index) => {
          const Icon = s.icon;

          return (
            <FadeInView key={s.slug} delay={index * 0.1}>
              <Link
                href={`/case-studies/${s.slug}`}
                className="
                  group rounded-2xl p-6
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:bg-white/7 hover:-translate-y-0.5
                  hover:shadow-[0_14px_32px_-18px_rgba(56,189,248,.45)]
                  block
                  h-full
                "
              >
                <div
                  className="
                    mb-4 inline-flex items-center justify-center
                    h-10 w-10 rounded-xl
                    bg-sky-500/15 border border-sky-400/25
                    text-sky-300 group-hover:text-sky-200
                    transition
                  "
                >
                  <Icon size={20} />
                </div>

                <div className="text-lg font-semibold text-white">{s.title}</div>
                <p className="mt-2 text-gray-300 leading-relaxed">{s.subtitle}</p>

                <div className="mt-4 h-px w-10 bg-sky-400/40 group-hover:w-16 transition-all" />
                <div className="mt-3 text-sm text-sky-300/90 group-hover:text-sky-200">
                  Apri case study →
                </div>
              </Link>
            </FadeInView>
          );
        })}
      </div>
    </section>
  );
}
