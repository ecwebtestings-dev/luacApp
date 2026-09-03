import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useProjectsList, useCreateProject } from '../../hooks/useProjects'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/emptyState'
import ProjectFormModal from '../../components/forms/projectForm'
import StudentProjectCard from '../../components/cards/StudentProjectCard'

export default function StudentProjects() {
  const { data: projects, isLoading, isError, error } = useProjectsList()
  const createProject = useCreateProject()
  const [modalOpen, setModalOpen] = useState(false)

  const handleSubmit = async (data) => {
    try {
      await createProject.mutateAsync(data)
      toast.success('Project created')
      setModalOpen(false)
    } catch {
      // interceptor already toasts the failure
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
  if (isError) return <EmptyState message={error?.response?.data?.message || 'Could not load projects'} />

  const projectList = (projects?.data ?? projects ?? []).filter(
    (project) => project.status !== 'deleted'
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted text-sm">Explore what others are building.</p>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-3 py-2 rounded-lg"
        >
          <PlusIcon className="size-4" />
          Create project
        </button>
      </div>

      {projectList.length === 0 ? (
        <p className="text-center text-muted text-sm py-16">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectList.map((project) => (
            <StudentProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <ProjectFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={null}
        loading={createProject.isPending}
      />
    </div>
  )
}