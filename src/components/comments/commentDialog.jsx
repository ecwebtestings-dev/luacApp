import { useState } from 'react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import {
  useProjectComments, useCreateComment, useUpdateComment, useDeleteComment,
} from '../../hooks/useComments'
import { useAuth } from '../../Context/useAuth'
import Spinner from '../common/Spinner'

function timeAgo(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const intervals = [
    { label: 'y', secs: 31536000 },
    { label: 'mo', secs: 2592000 },
    { label: 'd', secs: 86400 },
    { label: 'h', secs: 3600 },
    { label: 'm', secs: 60 },
  ]

  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) return `${count}${label}`
  }
  return 'now'
}

function initialsOf(name) {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

export default function CommentDialog({ projectId, isOpen, onClose }) {
  const { user } = useAuth()
  const { data: comments, isLoading } = useProjectComments(projectId)
  const createComment = useCreateComment(projectId)
  const updateComment = useUpdateComment(projectId)
  const deleteComment = useDeleteComment(projectId)

  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const commentList = Array.isArray(comments?.['project comments']?.comments)
    ? comments['project comments'].comments
    : Array.isArray(comments?.data)
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
    setEditText(comment.text)
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

  if (!isOpen) return null

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl max-h-[85vh] flex flex-col shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <h2 className="font-semibold text-dark text-sm">Comments</h2>
            <button onClick={onClose} className="text-muted hover:text-dark">
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {/* Comment list */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {isLoading ? (
              <div className="py-4 flex justify-center"><Spinner size={20} /></div>
            ) : commentList.length === 0 ? (
              <p className="text-sm text-muted text-center py-6">No comments yet.</p>
            ) : (
              commentList.map((c) => {
                const isOwn = c.user?.id === user?.id
                const isEditing = editingId === c.id

                return (
                  <div key={c.id} className="flex items-start gap-2.5">
                    {/* Avatar */}
                    <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                      {initialsOf(c.user?.name)}
                    </span>

                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1  rounded-lg px-2 py-1 text-xs"
                            autoFocus
                          />
                          <button onClick={() => saveEdit(c.id)} className="text-xs text-primary shrink-0">Save</button>
                          <button onClick={() => setEditingId(null)} className="text-xs text-muted shrink-0">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 inline-block max-w-full">
                            <p className="font-medium text-dark text-xs">{c.user?.name}</p>
                            <p className="text-dark text-sm break-words">{c.text}</p>
                          </div>

                          {/* Actions row */}
                          <div className="flex items-center gap-3 mt-1 pl-1 text-xs text-muted">
                            <span>{timeAgo(c.created_at)}</span>
                            {isOwn && (
                              <>
                                <button onClick={() => startEdit(c)} className="font-medium hover:text-dark">
                                  Edit
                                </button>
                                <button onClick={() => handleDelete(c.id)} className="font-medium hover:text-red-500">
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* New comment form */}
          <form onSubmit={handleSubmit} className="flex gap-2 px-4 py-3 shrink-0">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            <button
              type="submit"
              disabled={createComment.isPending || !text.trim()}
              className="px-3 cursor-pointer py-1.5 text-sm bg-primary text-white rounded-lg disabled:opacity-50 shrink-0"
            >
              Comment
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}