import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers, getAllSuspendedUsers, suspendUser, UnsuspendUser, makeAdmin, demoteAdmin, getUser,
  upDateUserProfile, viewUserProfle, updateUserInfo,
} from '../Services/userServices';

// Paginated list
export function useUsersList(page) {
  return useQuery({
    queryKey: ['users', 'list', page],
    queryFn: () => getAllUsers(page),
    keepPreviousData: true,
  });
}

export function useSuspendedUsers() {
  return useQuery({
    queryKey: ['users', 'suspended'],
    queryFn: getAllSuspendedUsers,
  });
}

// Single user profile 
export function useUserProfile(userId) {
  return useQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
}

// View another/current user's profile (separate from getUser)
export function useViewUserProfile(userId) {
  return useQuery({
    queryKey: ['users', 'profile', userId],
    queryFn: () => viewUserProfle(userId),
    enabled: !!userId,
  });
}

// Update current user's own profile
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => upDateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Admin: update another user's profile info
export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }) => updateUserInfo(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'detail', userId] });
      queryClient.invalidateQueries({ queryKey: ['users', 'profile', userId] });
    },
  });
}

// Shared success handler for all four mutations
function useUserAction(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useSuspendUserAction() {
  return useUserAction((id) => suspendUser(id));
}
export function useUnsuspendUserAction() {
  return useUserAction((id) => UnsuspendUser(id));
}
export function useMakeAdminAction() {
  return useUserAction((id) => makeAdmin(id));
}
export function useDemoteAdminAction() {
  return useUserAction((id) => demoteAdmin(id));
}