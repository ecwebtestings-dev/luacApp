import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useEventsList, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/emptyState'
import ConfirmDialog from '../../components/common/comfirmDialog'
import EventFormModal from '../../components/forms/eventForm'
import EventCard from '../../components/cards/EventCard'

export default function AdminEvents() {
  const { data: events, isLoading, isError, error } = useEventsList()
  const createEvent = useCreateEvent()
  const updateEvent = useUpdateEvent()
  const deleteEvent = useDeleteEvent()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const openCreate = () => {
    setEditingEvent(null)
    setModalOpen(true)
  }

  const openEdit = (event) => {
    setEditingEvent(event)
    setModalOpen(true)
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await updateEvent.mutateAsync({ eventId: editingEvent.id, data: formData })
        toast.success('Event updated')
      } else {
        await createEvent.mutateAsync(formData)
        toast.success('Event created')
      }
      setModalOpen(false)
    } catch {
      // interceptor already toasts the failure
    }
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    try {
      await deleteEvent.mutateAsync(pendingDelete.id)
      toast.success('Event deleted')
    } catch {
      // interceptor already toasts the failure
    } finally {
      setPendingDelete(null)
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
  if (isError) return <EmptyState message={error?.response?.data?.message || 'Could not load events'} />

  const eventList = events?.data ?? events ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted text-sm mt-1">COMMUNITY EVENTS MANAGEMENT</p>
        </div>


        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg"
        >
          <PlusIcon className="size-4" />
          Create event
        </button>

      </div>

      {eventList.length === 0 ? (
        <p className="text-center text-muted text-sm py-16">No events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={openEdit}
              onDelete={setPendingDelete}
            />
          ))}
        </div>
      )}

      <EventFormModal
        key={editingEvent?.id ?? 'create'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingEvent}
        loading={createEvent.isPending || updateEvent.isPending}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        
        message={`Are you sure you want to delete this?.`}
        confirmLabel="Delete"
        danger
        loading={deleteEvent.isPending}
      />
    </div>
  )
}