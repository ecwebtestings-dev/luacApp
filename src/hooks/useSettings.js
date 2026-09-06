// hooks/useSettings.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword, updateUsername, deleteAccount } from '../Services/settingsServices';
import { queryKeys } from './queryKeys';

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data) => updatePassword(data),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUsername(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => deleteAccount(),
  });
}