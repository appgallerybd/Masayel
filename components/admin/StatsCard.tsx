interface StatsCardProps {
  label: string;
  value: string | number;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="border border-cream-50/10 bg-emerald-950/40 p-5">
      <p className="text-sm text-cream-100/60">{label}</p>
      <p className="mt-1 font-heading text-2xl text-cream-50">{value}</p>
    </div>
  );
}
