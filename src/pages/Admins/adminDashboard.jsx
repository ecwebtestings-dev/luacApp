import { useMemo, useState } from "react";
import {
  UserIcon, DocumentTextIcon, CalendarDaysIcon, ChevronRightIcon,UserMinusIcon,
 SparklesIcon,
} from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatisticsCard from "../../components/common/StatisticsCard";
import Spinner from "../../components/common/Spinner";
import { useDashboardStatistics } from "../../hooks/useDashboardStats";
import { useProjectsList } from "../../hooks/useProjects";
import { useUsersList, useSuspendedUsers } from "../../hooks/useUsers";
import { useAuth } from "../../Context/useAuth";

function last30DaysBuckets() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
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
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const BANNER_DISMISS_KEY = "dashboard-welcome-dismissed";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { statistics, isLoading } = useDashboardStatistics();
  const { data: projects, isLoading: projectsLoading } = useProjectsList();
  const { data: users, isLoading: usersLoading } = useUsersList(1);
  const { data: suspended } = useSuspendedUsers();

  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(BANNER_DISMISS_KEY) === "true"
  );

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem(BANNER_DISMISS_KEY, "true");
  };

  const projectList = projects?.data ?? projects ?? [];
  const userList = users?.data ?? users ?? [];
  const suspendedList = suspended?.data ?? suspended ?? [];

  const activityData = useMemo(() => {
    const days = last30DaysBuckets();
    return days.map((day) => {
      const signups = userList.filter((u) => u.created_at && sameDay(new Date(u.created_at), day)).length;
      const newProjects = projectList.filter((p) => p.created_at && sameDay(new Date(p.created_at), day)).length;
      return { label: formatDay(day), Signups: signups, Projects: newProjects };
    });
  }, [userList, projectList]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newMembersThisWeek = userList.filter((u) => u.created_at && new Date(u.created_at) >= oneWeekAgo).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    );
  }

  return (
    <div>
      {!bannerDismissed && (
        <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-3 sm:p-4 mb-6 shadow-lg shadow-primary/20">
          <div className="absolute -right-6 -top-6 opacity-10">
            <SparklesIcon className="size-32" />
          </div>

          <button
            onClick={dismissBanner}
            aria-label="Dismiss welcome message"
            
          >
            
          </button>

          <div className="relative flex items-center gap-2 mb-1">
            <SparklesIcon className="size-4" />
            <p className="text-xs font-semibold tracking-wide  text-white/80">Welcome Administrator</p>
          </div>
          <h1 className="relative text-xl sm:text-2xl text-karki font-semibold mb-1">
            Hello {user?.name ? `, ${user.name.split(' ')[0]}` : ''} 
          </h1>
          <p className="relative text-sm text-white/85 max-w-lg">
            Here's what's happening across the platform  {statistics.totalUsers ?? 0} members,{' '}
            {statistics.totalProjects ?? 0} live projects, and {newMembersThisWeek} new{' '}
            {newMembersThisWeek === 1 ? 'signup' : 'signups'} this week.
          </p>
        </div>
      )}

      <p className="text-muted text-sm mb-4">Current status</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <StatisticsCard label='Total Users' value={statistics.totalUsers ?? ''} icon={UserIcon} />
        <StatisticsCard label='Live Projects' value={statistics.totalProjects ?? ''} icon={DocumentTextIcon} />
        <StatisticsCard label='Upcoming Events' value={statistics.totalEvents ?? ''} icon={CalendarDaysIcon} />
        <StatisticsCard label='Suspended Users' value={statistics.totalSuspendedUsers?? ''} icon={UserMinusIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Activity overview */}
        <div className="lg:col-span-2 rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Activity overview</p>
            <span className="text-xs font-medium text-dark bg-iconBg/30 rounded-full px-3 py-1">Last 30 days</span>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Workspace pulse</h2>

          {projectsLoading || usersLoading ? (
            <div className="flex justify-center py-12"><Spinner size={20} /></div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F0EA" />
                <XAxis
                  dataKey="label"
                  interval={6}
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
                <Bar dataKey="Signups" fill="#3E6B8A" radius={[6, 6, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Projects" fill="#004225" radius={[6, 6, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Workspace health */}
        <div className="rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Today</p>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Workspace health</h2>

          <div className="divide-y divide-iconBg/30">
            <div className="flex items-center gap-3 py-3 group cursor-pointer">
              <span className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/15 transition-colors">
                <UserIcon className="size-4.5 text-primary" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-sm">{newMembersThisWeek}</p>
                <p className="text-xs text-muted truncate">New members &middot; Joined this week</p>
              </div>
              <ChevronRightIcon className="size-4 text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div className="flex items-center gap-3 py-3 group cursor-pointer">
              <span className="flex items-center justify-center size-10 rounded-xl bg-karki/10 shrink-0 group-hover:bg-karki/15 transition-colors">
                <DocumentTextIcon className="size-4.5 text-karki" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-sm">{suspendedList.length}</p>
                <p className="text-xs text-muted truncate">Suspended users &middot; Need your attention</p>
              </div>
              <ChevronRightIcon className="size-4 text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div className="flex items-center gap-3 py-3 group cursor-pointer">
              <span className="flex items-center justify-center size-10 rounded-xl bg-primary-light/10 shrink-0 group-hover:bg-primary-light/15 transition-colors">
                <CalendarDaysIcon className="size-4.5 text-primary-light" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-sm">{statistics.totalEvents ?? 0}</p>
                <p className="text-xs text-muted truncate">Upcoming events</p>
              </div>
              <ChevronRightIcon className="size-4 text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}