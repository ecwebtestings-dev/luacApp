import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { viewEvents, createEvent, updateEvent, deleteEvent } from '../Services/eventServices';
import { queryKeys } from './queryKeys';

// LIST 
export function useEventsList() {
  return useQuery({
    queryKey: queryKeys.events.all,
    queryFn: viewEvents,
  });
}

// CREATE
export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
}

// UPDATE
export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }) => updateEvent(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
}

// DELETE
export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
}