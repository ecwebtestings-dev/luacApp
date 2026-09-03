import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createComment, getProjectComments, updateComment, deleteComment,
} from '../Services/commentServices';
import { queryKeys } from './queryKeys';

export function useProjectComments(projectId) {
  return useQuery({
    queryKey: queryKeys.comments.byProject(projectId),
    queryFn: () => getProjectComments(projectId),
    enabled: !!projectId,
  });
}

export function useCreateComment(projectId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createComment(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byProject(projectId) });
    },
  });
}

export function useUpdateComment(projectId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data }) => updateComment(commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byProject(projectId) });
    },
  });
}

export function useDeleteComment(projectId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byProject(projectId) });
    },
  });
}