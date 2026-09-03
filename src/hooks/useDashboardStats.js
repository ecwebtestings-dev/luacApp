import { useQueries } from '@tanstack/react-query';
import { getAllUsers, getAllSuspendedUsers } from '../Services/userServices';
import { getAllProjects } from '../Services/projectServices';
import { viewEvents } from '../Services/eventServices';
import { queryKeys } from './queryKeys';

export function useDashboardStatistics() {
  const results = useQueries({
    queries: [
      { queryKey: queryKeys.users.all, queryFn: () => getAllUsers(), staleTime: 1000 * 60 * 5 },
      { queryKey: queryKeys.projects.all, queryFn: getAllProjects, staleTime: 1000 * 60 * 5 },
      { queryKey: queryKeys.events.all, queryFn: viewEvents, staleTime: 1000 * 60 * 5 },
      { queryKey: queryKeys.users.suspended, queryFn: getAllSuspendedUsers, staleTime: 1000 * 60 * 5 },
    ],
  });

  const [usersQuery, projectsQuery, eventsQuery, suspendedQuery] = results;

  const isLoading = results.some((r) => r.isLoading);

  const statistics = {
    totalUsers: usersQuery.data?.total ?? null,
    totalProjects: projectsQuery.data?.total ?? projectsQuery.data?.length ?? null,
    totalEvents: eventsQuery.data?.total ?? eventsQuery.data?.length ?? null,
    totalSuspendedUsers:
      suspendedQuery.data?.total ??
      (suspendedQuery.data?.data ?? suspendedQuery.data ?? []).length ??
      null,
  };

  return { statistics, isLoading };
}