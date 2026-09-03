import { useState } from 'react'
import { ChatBubbleLeftIcon, LinkIcon } from '@heroicons/react/24/outline'
import LikeButton from '../comments/likeButton'
import CommentDialog from '../comments/commentDialog'



export default function StudentProjectCard({ project }) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const ownerName = project.user?.name ?? project.owner?.name ?? 'Unknown'

  return (
    <div className="bg-white border border-iconBg/50 rounded-xl p-4 flex flex-col">
      

      <h3 className="font-semibold text-dark text-base mb-1">{project.title}</h3>

      <p className="text-xs text-muted mb-3">
        Shared by <span className="font-medium text-dark">{ownerName}</span>
      </p>

      {project.description && (
        <p className="text-sm text-muted line-clamp-2 mb-3">{project.description}</p>
      )}

      {project.url && (
        
         <a href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary hover:underline min-w-0 mb-3"
        >
          <LinkIcon className="size-3.5 shrink-0" />
          <span className="truncate">{project.url}</span>
        </a>
      )}

      <div className="flex items-center gap-5 pt-3 border-t border-iconBg/30">
        <LikeButton projectId={project.id} />
        <button
          onClick={() => setCommentsOpen(true)}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-dark transition-colors"
        >
          <ChatBubbleLeftIcon className="size-4" />
          <span>Comment</span>
        </button>
      </div>

      <CommentDialog
        projectId={project.id}
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
      />
    </div>
  )
}