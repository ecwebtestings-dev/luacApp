import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useProjectsList, useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/useProjects'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/emptyState'
import ConfirmDialog from '../../components/common/comfirmDialog'
import ProjectFormModal from '../../components/forms/projectForm'
import ProjectCard from '../../components/cards/ProjectCard'

export default function ManageProjects() {
  const { data: projects, isLoading, isError, error } = useProjectsList()
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const openCreate = () => {
    setEditingProject(null)
    setModalOpen(true)
  }

  const openEdit = (project) => {
    setEditingProject(project)
    setModalOpen(true)
  }

  const handleSubmit = async (data) => {
    try {
      if (editingProject) {
        await updateProject.mutateAsync({ projectId: editingProject.id, data })
        toast.success('Project updated')
      } else {
        await createProject.mutateAsync(data)
        toast.success('Project created')
      }
      setModalOpen(false)
      setEditingProject(null)
    } catch {
      // interceptor already toasts the failure
    }
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    try {
      await deleteProject.mutateAsync(pendingDelete.id)
      toast.success('Project deleted')
    } catch {
      // interceptor already toasts the failure
    } finally {
      setPendingDelete(null)
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
        <div>
          <p className="text-muted text-sm mt-1">Create and manage community projects.</p>
        </div>
      <button
          onClick={openCreate}
          className="flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-medium px-2.5 py-2 sm:px-3 rounded-lg"
      >
        <PlusIcon className="size-4 shrink-0" />
        <span className="hidden sm:inline">Create project</span>
        <span className="sm:hidden">Create</span>
      </button>
      </div>

      {projectList.length === 0 ? (
        <p className="text-center text-muted text-sm py-16">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEdit}
              onDelete={setPendingDelete}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        key={editingProject?.id ?? 'create'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
        loading={createProject.isPending || updateProject.isPending}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title="Delete project"
        message={`Delete "${pendingDelete?.title}"?`}
        confirmLabel="Delete"
        danger
        loading={deleteProject.isPending}
      />
    </div>
  )
}