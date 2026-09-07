import { useState, useRef, useEffect } from 'react'
import { LinkIcon, PencilIcon, TrashIcon, ChatBubbleLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import CommentDialog from '../comments/commentDialog'

export default function ProjectCard({ project, onEdit, onDelete }) {
  const [showComments, setShowComments] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

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
    onEdit(project)
  }

  const handleDelete = () => {
    setMenuOpen(false)
    onDelete(project)
  }

  return (
    <div className="bg-white border border-iconBg/50 rounded-xl overflow-hidden flex flex-col relative">
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          title="More actions"
          aria-label="More actions"
          className="flex items-center justify-center size-7 text-muted hover:text-dark rounded-lg border border-iconBg/50 bg-white"
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
        <h3 className="font-semibold text-dark mb-1 pr-16">{project.title}</h3>

        {project.description && (
          <p className="text-sm text-muted line-clamp-3 mb-3">{project.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {project.url ? (
            <a href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline min-w-0"
            >
              <LinkIcon className="size-3.5 shrink-0" />
              <span className="truncate">{project.url}</span>
            </a>
          ) : (
            <span />
          )}

          <button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-dark shrink-0"
          >
            <ChatBubbleLeftIcon className="size-3.5" />
            Comments
          </button>
        </div>
      </div>

      <CommentDialog
        projectId={project.id}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  )
}