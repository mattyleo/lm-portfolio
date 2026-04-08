export function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && (
        <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}