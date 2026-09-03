import { useState } from 'react'
import { LinkIcon, PencilIcon, TrashIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import CommentDialog from '../comments/commentDialog'

export default function ProjectCard({ project, onEdit, onDelete }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="bg-white border border-iconBg/50 rounded-xl overflow-hidden flex flex-col relative">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(project)}
          title="Edit"
          className="flex items-center justify-center size-7 text-muted hover:text-dark rounded-lg border border-iconBg/50 bg-white"
        >
          <PencilIcon className="size-3.5" />
        </button>
        <button
          onClick={() => onDelete(project)}
          title="Delete"
          className="flex items-center justify-center size-7 text-red-500 hover:text-red-600 rounded-lg border border-red-200 bg-white"
        >
          <TrashIcon className="size-3.5" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-dark mb-1 pr-16">{project.title}</h3>

        {project.description && (
          <p className="text-sm text-muted line-clamp-3 mb-3">{project.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-iconBg/30">
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