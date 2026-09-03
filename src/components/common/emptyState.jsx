export default function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
      {message}
    </div>
  )
}