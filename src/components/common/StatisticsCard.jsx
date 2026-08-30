
export default function StatisticsCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-iconBg/50 bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
          <Icon className="size-[18px]" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      </div>
      <strong className="text-2xl font-bold text-dark">{value}</strong>
    </div>
  )
}
