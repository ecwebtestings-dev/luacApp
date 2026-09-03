import { CalendarDaysIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const statusStyles = {
  upcoming: 'bg-green-90 text-green-700',
  ongoing: 'bg-green-90 text-green-700',
  completed: 'bg-gray-100 text-gray-500',
}

export default function EventCard({ event, onEdit, onDelete }) {
  const dateObj = new Date(event.date)
  const month = dateObj.toLocaleDateString(undefined, { month: 'short' }).toUpperCase()
  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const fullDate = dateObj.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })

  return (
    <div className="bg-white border border-iconBg/50 rounded-xl overflow-hidden flex flex-col relative">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(event)}
          title="Edit"
          className="flex items-center justify-center size-7 text-muted hover:text-dark rounded-lg border border-iconBg/50 bg-white"
        >
          <PencilIcon className="size-3.5" />
        </button>
        <button
          onClick={() => onDelete(event)}
          title="Delete"
          className="flex items-center justify-center size-7 text-red-500 hover:text-red-600 rounded-lg border border-red-200 bg-white"
        >
          <TrashIcon className="size-3.5" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary mb-3 pr-16">
          <CalendarDaysIcon className="size-4" />
          <span className="text-xs font-semibold tracking-wide">{month}</span>
          <span className="text-lg font-bold leading-none">{day}</span>
        </div>

        <h3 className="font-medium text-dark mb-1 pr-16">{event.title}</h3>

        {event.description && (
          <p className="text-sm text-muted line-clamp-2 mb-2">{event.description}</p>
        )}

        <p className="text-xs text-dark mb-3">{fullDate}</p>

        <span className={`inline-flex w-fit px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[event.status] || 'bg-body text-muted'}`}>
          {event.status}
        </span>
      </div>
    </div>
  )
}