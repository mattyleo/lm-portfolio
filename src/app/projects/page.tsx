import { getRepos } from "@/lib/github";
import { FadeInView } from "@/components/ui/Motion";

export default async function ProjectsPage() {
  const username = process.env.GITHUB_USERNAME || "mattyleo";
  const repos = await getRepos(username);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Progetti</h1>
        <p className="mt-2 text-gray-300">
          Repo aggiornate di recente da <span className="text-white">{username}</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((r, index) => (
          <FadeInView key={r.id} delay={index * 0.1}>
            <a
              href={r.html_url}
              target="_blank"
              className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/7 transition block h-full"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold">{r.name}</div>
                <div className="text-sm text-gray-400">★ {r.stargazers_count}</div>
              </div>
              <p className="mt-2 text-gray-300 line-clamp-3">
                {r.description || "—"}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <span>{r.language || "n/a"}</span>
                <span>Agg.: {new Date(r.updated_at).toLocaleDateString("it-IT")}</span>
              </div>
            </a>
          </FadeInView>
        ))}
      </div>
    </div>
  );
}
