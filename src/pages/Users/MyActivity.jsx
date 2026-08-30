export default function MyActivity() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-1">My activity</h1>
      <p className="text-muted text-sm mb-6">A history of your likes, comments, and project updates.</p>

      <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
        Activity history will appear here once the backend exposes an activity endpoint.
      </div>
    </div>
  )
}