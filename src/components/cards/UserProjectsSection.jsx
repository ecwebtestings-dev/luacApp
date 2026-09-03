import { useUserProjects } from '../../hooks/useProjects'
import StudentProjectCard from './StudentProjectCard'
import Spinner from '../common/Spinner'

export default function UserProjectsSection({ userId }) {
  const { data, isLoading, isError } = useUserProjects(userId)

  const projects = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []

  if (isLoading) return <div className="flex justify-center py-8"><Spinner size={24} /></div>
  if (isError) return <p className="text-sm text-muted">Could not load projects.</p>

  if (projects.length === 0) {
    return <p className="text-sm text-muted py-6 text-center">No projects yet.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project) => (
        <StudentProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}