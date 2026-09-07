import { useState, useRef, useEffect } from 'react'
import { CalendarDaysIcon, PencilIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'

const statusStyles = {
  upcoming: 'bg-green-90 text-green-700',
  ongoing: 'bg-green-90 text-green-700',
  completed: 'bg-gray-100 text-gray-500',
}

export default function EventCard({ event, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const dateObj = new Date(event.date)
  const month = dateObj.toLocaleDateString(undefined, { month: 'short' }).toUpperCase()
  const day = dateObj.toLocaleDateString(undefined, { day: '2-digit' })
  const fullDate = dateObj.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEdit = () => {
    setMenuOpen(false)
    onEdit(event)
  }

  const handleDelete = () => {
    setMenuOpen(false)
    onDelete(event)
  }

  return (
    <div className="bg-white border border-iconBg/50 rounded-xl overflow-hidden flex flex-col relative">
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          title="More actions"
          aria-label="More actions"
          className="flex items-center justify-center size-7 text-muted hover:text-dark bg-white"
        >
          <EllipsisVerticalIcon className="size-4" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white border border-iconBg/50 rounded-lg shadow-lg overflow-hidden z-10">
            <button
              onClick={handleEdit}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-dark hover:bg-body transition-colors"
            >
              <PencilIcon className="size-3.5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="size-3.5" />
              Delete
            </button>
          </div>
        )}
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