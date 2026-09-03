import { useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import {
  useProjectComments, useCreateComment, useUpdateComment, useDeleteComment,
} from '../../hooks/useComments'
import { useAuth } from '../../Context/useAuth'
import Spinner from '../common/Spinner'

export default function CommentPanel({ projectId }) {
  const { user } = useAuth()
  const { data: comments, isLoading } = useProjectComments(projectId)
  const createComment = useCreateComment(projectId)
  const updateComment = useUpdateComment(projectId)
  const deleteComment = useDeleteComment(projectId)

  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const commentList = Array.isArray(comments?.data)
    ? comments.data
    : Array.isArray(comments)
      ? comments
      : Array.isArray(comments?.comments)
        ? comments.comments
        : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      await createComment.mutateAsync({ text: text.trim() })
      setText('')
    } catch {
      // interceptor already toasts the failure
    }
  }

  const startEdit = (comment) => {
    setEditingId(comment.id)
    setEditText(comment.comment)
  }

  const saveEdit = async (commentId) => {
    try {
      await updateComment.mutateAsync({ commentId, data: { text: editText.trim() } })
      setEditingId(null)
    } catch {
      // interceptor already toasts the failure
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await deleteComment.mutateAsync(commentId)
      toast.success('Comment deleted')
    } catch {
      // interceptor already toasts the failure
    }
  }

  return (
    <div className="mt-3 border-t border-iconBg/30 pt-3 w-full">
      {isLoading ? (
        <div className="py-4"><Spinner size={18} /></div>
      ) : (
        <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
          {commentList.length === 0 && (
            <p className="text-xs text-muted">No comments yet.</p>
          )}

          {commentList.map((c) => {
            const isOwn = c.user?.id === user?.id
            const isEditing = editingId === c.id

            return (
              <div key={c.id} className="text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="font-medium text-dark text-xs">{c.user?.name}</span>
                    {isEditing ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 border border-iconBg/50 rounded-lg px-2 py-1 text-xs"
                        />
                        <button onClick={() => saveEdit(c.id)} className="text-xs text-primary">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs text-muted">Cancel</button>
                      </div>
                    ) : (
                      <p className="text-muted">{c.comment}</p>
                    )}
                  </div>

                  {isOwn && !isEditing && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => startEdit(c)} className="text-muted hover:text-dark">
                        <PencilIcon className="size-3.5" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="text-muted hover:text-red-500">
                        <TrashIcon className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-iconBg/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={createComment.isPending}
          className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  )
}