// src/pages/Users/UserProfile.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AcademicCapIcon, PhoneIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { getUser } from '../../Services/userServices'
import ProjectCard from '../../components/cards/ProjectCard'
import Spinner from '../../components/common/Spinner'

export default function UserProfile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getUser(id)
        setProfile(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load this profile')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
        {error}
      </div>
    )
  }

  const initials = profile?.user?.name
    ? profile.user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className="w-full max-w-3xl mx-auto px-1 sm:px-0">
      {/* Header card */}
      <div className="rounded-xl border border-iconBg/50 bg-white p-4 sm:p-6 mb-6">
        <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:items-start sm:text-left sm:gap-4">
          {profile?.profile?.profile_image ? (
            <img
              src={profile.profile.profile_image}
              alt={profile.user.name}
              className="size-14 sm:size-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <span className="flex items-center justify-center size-14 sm:size-16 rounded-full bg-primary text-white text-lg sm:text-xl font-semibold shrink-0">
              {initials}
            </span>
          )}

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-dark truncate">{profile?.user?.name}</h1>
            <p className="text-muted text-sm truncate">{profile?.user?.email}</p>
          </div>
        </div>

        {/* Detail grid — 1 col on mobile, 2 on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-iconBg/40">
          {profile?.profile?.course && (
            <div className="flex items-center gap-2.5 text-sm">
              <AcademicCapIcon className="size-[18px] text-primary shrink-0" />
              <span className="text-dark break-words">{profile.profile.course}</span>
            </div>
          )}
          {profile?.profile?.year_of_study && (
            <div className="flex items-center gap-2.5 text-sm">
              <CalendarIcon className="size-[18px] text-primary shrink-0" />
              <span className="text-dark">Year {profile.profile.year_of_study}</span>
            </div>
          )}
          {profile?.profile?.phone && (
            <div className="flex items-center gap-2.5 text-sm">
              <PhoneIcon className="size-[18px] text-primary shrink-0" />
              <span className="text-dark break-words">{profile.profile.phone}</span>
            </div>
          )}
          {profile?.profile?.hobbies && (
            <div className="flex items-center gap-2.5 text-sm">
              <SparklesIcon className="size-[18px] text-primary shrink-0" />
              <span className="text-dark break-words">{profile.profile.hobbies}</span>
            </div>
          )}
        </div>

        {!profile?.profile?.course &&
          !profile?.profile?.year_of_study &&
          !profile?.profile?.phone &&
          !profile?.profile?.hobbies && (
            <p className="text-muted text-sm mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-iconBg/40 text-center sm:text-left">
              This user hasn't added any profile details yet.
            </p>
          )}
      </div>

      {/* Their projects */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Projects
        </h2>
        {profile?.projects?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
            No projects posted yet.
          </div>
        )}
      </div>
    </div>
  )
}