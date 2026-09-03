// components/comments/likeButton.jsx
import { HandThumbUpIcon as ThumbOutline } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as ThumbSolid } from '@heroicons/react/24/solid'
import { useProjectLikes, useToggleLike } from '../../hooks/useLikes'

export default function LikeButton({ projectId }) {
  const { likesCount, isLiked, isLoading } = useProjectLikes(projectId)
  const toggleLike = useToggleLike(projectId)

  return (
    <button
      onClick={() => toggleLike.mutate()}
      disabled={isLoading || toggleLike.isPending}
      className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors disabled:opacity-50"
    >
      {isLiked ? <ThumbSolid className="size-4 text-primary" /> : <ThumbOutline className="size-4" />}
      <span>{likesCount > 0 ? likesCount : ''}</span>
    </button>
  )
}