import { CalendarIcon } from '@heroicons/react/24/outline'
import { useEventsList } from '../../hooks/useEvents'
import Spinner from '../../components/common/Spinner'

const statusStyles = {
  upcoming: 'bg-blue-50 text-blue-700',
  ongoing: 'bg-green-50 text-green-700',
  completed: 'bg-black/5 text-muted',
  cancelled: 'bg-red-50 text-red-700',
}

export default function EventsSection() {
  const { data, isLoading, isError } = useEventsList()
  const events = data?.data ?? data ?? []

  return (
    <section id="events" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-karki">WHAT'S HAPPENING</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark mt-3 leading-tight">
            Upcoming Events
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-4">
            Workshops, hackathons, and community meetups happening at LUAC.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted text-sm py-12">
            <Spinner className="size-4" />
            Loading events
          </div>
        ) : isError ? (
          <p className="text-center text-muted text-sm py-12">Could not load events right now.</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted text-sm py-12">No events scheduled yet, check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const formattedDate = event.date
                ? new Date(event.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null

              return (
                <div
                  key={event.id}
                  className="rounded-3xl bg-white border border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 flex flex-col"
                >
                  {event.status && (
                    <span
                      className={`inline-block self-start px-2.5 py-1 rounded-full text-xs font-semibold capitalize mb-4 ${
                        statusStyles[event.status] ?? 'bg-black/5 text-dark'
                      }`}
                    >
                      {event.status}
                    </span>
                  )}

                  <h3 className="font-bold text-dark mb-1.5 line-clamp-1">{event.title}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                    {event.description}
                  </p>

                  {formattedDate && (
                    <div className="flex items-center gap-1.5 text-xs text-muted pt-3 border-t border-black/5">
                      <CalendarIcon className="size-3.5" />
                      {formattedDate}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}