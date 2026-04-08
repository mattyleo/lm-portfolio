import Image from "next/image";
import Link from "next/link";


const items = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Progetti" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
  <Image
    src="/logo.png"
    alt="Mattia Leoni"
    width={32}
    height={32}
    priority
    className="rounded-full bg-white/5 p-1 transition hover:shadow-[0_0_12px_rgba(56,189,248,.45)]"

    // className="rounded-full bg-white/5 p-1 opacity-90 hover:opacity-100 transition"
  />
  <span>
    <span className="text-white">Mattia</span>
    <span className="text-sky-300">Leoni</span>
    <span className="text-rose-300">.it</span>
  </span>
</Link>


        <nav className="flex items-center gap-2">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-sm px-3 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/5"
            >
              {it.label}
            </Link>
          ))}
          <a
            href="#contatti"
            className="text-sm px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors hidden sm:inline-block"
          >
            Contatti
          </a>
          <Link
            href="/login"
            className="text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/20 hover:from-blue-600/30 hover:to-purple-600/30 transition-colors ml-2 font-medium"
          >
            Area Clienti
          </Link>
        </nav>
      </div>
    </header>
  );
}
