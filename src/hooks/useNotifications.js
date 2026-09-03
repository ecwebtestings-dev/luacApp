import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllNotifications, markNotificationsRead, deleteNotification } from '../Services/notificationService';
import { queryKeys } from './queryKeys';

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: getAllNotifications,
    staleTime: 1000 * 30, // 30s — notifications should feel fairly live
    refetchInterval: 1000 * 60, // poll every minute
  });
}

export function useMarkNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noticeId) => deleteNotification(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}