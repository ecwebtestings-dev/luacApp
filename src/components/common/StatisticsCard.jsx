export default function StatisticsCard({ label, value, change, icon: Icon }) {
  return (
    <div className="group premium-panel rounded-2xl p-4 transition-all duration-300 sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon className="size-[18px]" /></span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <strong className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">{value}</strong>
        {change && <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${change.trend === 'down' ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>{change.label}</span>}
      </div>
    </div>
  )
}
