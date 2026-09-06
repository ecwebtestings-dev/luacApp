// hooks/useLogs.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllLogs, deleteLog, deleteOldLogs } from '../Services/logService';
import { queryKeys } from './queryKeys';

export function useLogs(page = 1) {
  return useQuery({
    queryKey: queryKeys.logs.list(page),
    queryFn: () => getAllLogs(page), 
    keepPreviousData: true,
  });
}

export function useDeleteLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (logId) => deleteLog(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.logs.all });
    },
  });
}

export function useDeleteOldLogs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteOldLogs(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.logs.all });
    },
  });
}