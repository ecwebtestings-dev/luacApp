import { useEffect, useState } from "react";
import { UserIcon, DocumentTextIcon, CalendarDaysIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import StatisticsCard from "../../components/common/StatisticsCard";
import { getAllUsers, getAllSuspendedUsers } from "../../Services/userServices";
import { getAllProjects } from "../../Services/projectServices";
import { viewEvents } from "../../Services/eventServices";
import Spinner from "../../components/common/Spinner";

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatistics = async () => {
      setLoading(true);

      const [usersResult, projectsResult, eventsResult, suspendedResult] = await Promise.allSettled([
        getAllUsers(),
        getAllProjects(),
        viewEvents(),
        getAllSuspendedUsers(),
      ]);

      setStatistics({
        totalUsers: usersResult.status === 'fulfilled' ? usersResult.value.total : null,
        totalProjects: projectsResult.status === 'fulfilled' ? (projectsResult.value.total ?? projectsResult.value.length) : null,
        totalEvents: eventsResult.status === 'fulfilled' ? (eventsResult.value.total ?? eventsResult.value.length) : null,
        suspendedUsers: suspendedResult.status === 'fulfilled' ? (suspendedResult.value.total ?? suspendedResult.value.length) : null,
      });

      setLoading(false);
    };
    loadStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted text-sm mb-6">Current Status</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatisticsCard label='Total Users' value={statistics.totalUsers ?? ''} icon={UserIcon} />
        <StatisticsCard label='Live Projects' value={statistics.totalProjects ?? ''} icon={DocumentTextIcon} />
        <StatisticsCard label='Upcoming Events' value={statistics.totalEvents ?? ''} icon={CalendarDaysIcon} />
        <StatisticsCard label='Suspended Users' value={statistics.suspendedUsers ?? ''} icon={ShieldExclamationIcon} />
      </div>

      <div className="rounded-xl border border-dashed border-iconBg/60 p-6 text-center text-muted text-sm">
        MAIN BODY
      </div>
    </div>
  );
}