// hooks/useUserActivity.js
import { useMemo } from "react";
import { useUserProjects } from "./useProjects";

function lastNDaysBuckets(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
}

function formatDay(date) {
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function useUserActivity(userId, days = 30) {
  const { data: projects, isLoading, isError, error } = useUserProjects(userId);

  const data = useMemo(() => {
    const buckets = lastNDaysBuckets(days);
    return buckets.map((day) => {
      const count = (projects ?? []).filter(
        (p) => p.created_at && sameDay(new Date(p.created_at), day)
      ).length;
      return { date: day.toISOString(), label: formatDay(day), value: count };
    });
  }, [projects, days]);

  return { data, isLoading, isError, error };
}