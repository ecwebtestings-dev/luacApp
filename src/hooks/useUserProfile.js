import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { upDateUserProfile, viewUserProfle } from '../Services/userServices';
import { queryKeys } from './queryKeys';

export function useUserProfile(userId) {
  return useQuery({
    queryKey: queryKeys.profile.detail(userId),
    queryFn: () => viewUserProfle(userId),
    enabled: Boolean(userId),
  });
}

export function useUpdateUserProfile(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => upDateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.detail(userId) });
    },
  });
}