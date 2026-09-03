export default function StatisticsCard({ label, value, change, icon: Icon }) {
  return (
    <div className="rounded-xl border border-iconBg/50 bg-white p-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center size-9 rounded-lg bg-body text-karki shrink-0">
          <Icon className="size-[18px]" />
        </span>
        <p className="text-sm font-semibold tracking-wide text-dark">{label}</p>
      </div>

      <div className="flex items-baseline gap-2">
        <strong className="text-2xl font-bold text-dark">{value}</strong>
        {change && (
          <span className={`text-xs font-medium ${
            change.trend === 'down' ? 'text-red-500' : 'text-green-600'
          }`}>
            {change.label}
          </span>
        )}
      </div>
    </div>
  )
}