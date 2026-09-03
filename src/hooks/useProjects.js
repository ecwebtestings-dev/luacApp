import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProjects, createProject, updateProject, deleteProject } from '../Services/projectServices';
import { queryKeys } from './queryKeys';

// LIST
export function useProjectsList() {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: getAllProjects,
  });
}

// CREATE
export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
}

// UPDATE
export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, data }) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
}

// DELETE
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
}

export function useUserProjects(userId) {
  const { data, ...rest } = useProjectsList(); 
  const allProjects = data?.data ?? data ?? [];
  const userProjects = allProjects.filter((p) => p.user_id === userId);

  return { ...rest, data: userProjects };
}