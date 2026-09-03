import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function getEventStatus(dateStr) {
  if (!dateStr) return 'upcoming'
  const eventDate = new Date(dateStr)
  const now = new Date()
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (eventDay.getTime() === today.getTime()) return 'Ongoing event'
  if (eventDay < today) return 'completed'
  return 'upcoming event'
}

export default function EventFormModal({ open, onClose, onSubmit, initialData, loading }) {

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(
    initialData?.image ? `${import.meta.env.VITE_API_BASE_URL}/${initialData.image}` : null
  )

  if (!open) return null

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description ?? '')
    formData.append('date', form.date)
    formData.append('status', getEventStatus(form.date))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-semibold text-dark">
            {initialData ? 'Edit Event' : 'Create Event'}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-dark">
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-iconBg/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="text-xs text-muted mt-1">
              Status is set automatically ({getEventStatus(form.date)}) based on this date.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-lg border border-iconBg/40" />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-iconBg/50 text-muted hover:text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}