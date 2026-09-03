import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProject, getProjectLikesCount } from '../Services/likesServices';
import { queryKeys } from './queryKeys';
import { useAuth } from '../Context/useAuth';

export function useProjectLikes(projectId) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.likes.count(projectId),
    queryFn: () => getProjectLikesCount(projectId),
    enabled: !!projectId,
  });

  const likesList = query.data?.user?.likes ?? [];
  const isLiked = likesList.some((like) => like.user_id === user?.id);

  return {
    ...query,
    likesCount: query.data?.likes_count ?? 0,
    isLiked,
  };
}

export function useToggleLike(projectId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likeProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.likes.count(projectId) });
    },
  });
}