export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
};

export async function getRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=30&sort=updated`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    // Next cache (puoi cambiare)
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = (await res.json()) as (GithubRepo & { fork: boolean })[];
  
  const blacklist = ["netflix-clone", "spotify-clone"];
  
  return data
    .filter((repo) => !repo.fork)
    .filter((repo) => !blacklist.includes(repo.name.toLowerCase()))
    .slice(0, 12);
}
