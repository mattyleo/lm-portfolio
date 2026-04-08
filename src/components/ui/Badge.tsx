export function Badge({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "soft";
}) {
  const base = "inline-flex items-center text-xs rounded-full px-3 py-1 border";
  const styles =
    variant === "solid"
      ? "bg-white/10 border-white/10 text-gray-100"
      : "bg-sky-500/10 border-sky-400/20 text-sky-200";

  return <span className={`${base} ${styles}`}>{children}</span>;
}
