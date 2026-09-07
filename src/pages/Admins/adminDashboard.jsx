import { useMemo, useState } from "react";
import {
  UserIcon, DocumentTextIcon, CalendarDaysIcon, ChevronRightIcon, UserMinusIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import StatisticsCard from "../../components/common/StatisticsCard";
import Spinner from "../../components/common/Spinner";
import { useDashboardStatistics } from "../../hooks/useDashboardStats";
import { useProjectsList } from "../../hooks/useProjects";
import { useUsersList, useSuspendedUsers } from "../../hooks/useUsers";
import { useAuth } from "../../Context/useAuth";

// BUILDS THE LAST 30 CALENDAR DAYS (OLDEST TO NEWEST) FOR THE ACTIVITY CHART
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

// FORMATS A DATE AS A SHORT CHART-AXIS LABEL
function formatDay(date) {
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

// COMPARES TWO DATES BY CALENDAR DAY, IGNORING TIME
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// RETURNS A TIME-OF-DAY GREETING BASED ON THE CURRENT HOUR
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const BANNER_DISMISS_KEY = "dashboard-welcome-dismissed";

export default function AdminDashboard() {
  // LOGGED-IN ADMIN, FOR THE GREETING
  const { user } = useAuth();

  // CORE DASHBOARD METRICS
  const { statistics, isLoading } = useDashboardStatistics();
  const { data: projects, isLoading: projectsLoading } = useProjectsList();
  const { data: users, isLoading: usersLoading } = useUsersList(1);
  const { data: suspended } = useSuspendedUsers();

  // WELCOME BANNER DISMISS STATE, PERSISTED SO IT STAYS HIDDEN ACROSS SESSIONS
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(BANNER_DISMISS_KEY) === "true"
  );

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem(BANNER_DISMISS_KEY, "true");
  };

  // NORMALIZE RESPONSES — SOME ENDPOINTS RETURN A PAGINATED { data: [...] }, OTHERS A RAW ARRAY
  const projectList = projects?.data ?? projects ?? [];
  const userList = users?.data ?? users ?? [];
  const suspendedList = suspended?.data ?? suspended ?? [];

  // BUILDS THE 30-DAY SIGNUPS/PROJECTS SERIES FOR THE ACTIVITY CHART
  const activityData = useMemo(() => {
    const days = last30DaysBuckets();
    return days.map((day) => {
      const signups = userList.filter((u) => u.created_at && sameDay(new Date(u.created_at), day)).length;
      const newProjects = projectList.filter((p) => p.created_at && sameDay(new Date(p.created_at), day)).length;
      return { label: formatDay(day), Signups: signups, Projects: newProjects };
    });
  }, [userList, projectList]);

  // COUNT OF NEW SIGNUPS IN THE TRAILING 7 DAYS, USED IN THE WORKSPACE HEALTH PANEL
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
      {/* WELCOME BANNER — PLAIN TEXT, NO CARD, TIGHT TO THE TOP */}
      {!bannerDismissed && (
        <div className="relative mb-8">
          <button
            onClick={dismissBanner}
            aria-label="Dismiss welcome message"
          >
          </button>

          <h1 className="text-2xl sm:text-3xl text-dark font-semibold mb-1.5">
            {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-sm text-muted max-w-lg">
            Here's what's happening across LUAC today
          </p>
        </div>
      )}

      {/* STAT CARDS — VALUES + PLACEHOLDER */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <StatisticsCard
          label="Total Users"
          value={statistics.totalUsers ?? ''}
          icon={UserIcon}
          accent="primary"
          // TODO: PLACEHOLDER
          change={{ trend: 'up', label: '+12.5%' }}
        />
        <StatisticsCard
          label="Live Projects"
          value={statistics.totalProjects ?? ''}
          icon={DocumentTextIcon}
          accent="karki"
          // TODO: PLACEHOLDER
          change={{ trend: 'up', label: '+18.4%' }}
        />
        <StatisticsCard
          label="Upcoming Events"
          value={statistics.totalEvents ?? ''}
          icon={CalendarDaysIcon}
          accent="primaryLight"
          // TODO: PLACEHOLDER
          change={{ trend: 'up', label: '+8.2%' }}
        />
        <StatisticsCard
          label="Suspended Users"
          value={statistics.totalSuspendedUsers ?? ''}
          icon={UserMinusIcon}
          accent="red"
          // TODO: PLACEHOLDER
          change={{ trend: 'down', label: '0%' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* ACTIVITY OVERVIEW — SIGNUPS/PROJECTS AREA CHART */}
        <div className="lg:col-span-2 rounded-xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Activity overview</p>
            <span className="text-xs font-medium text-dark bg-iconBg/30 rounded-full px-3 py-1">Last 30 days</span>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Workspace pulse</h2>

          {projectsLoading || usersLoading ? (
            <div className="flex justify-center py-12"><Spinner size={20} /></div>
          ) : (
            <ResponsiveContainer width="100%" height={280} className="flex-1">
              <AreaChart data={activityData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                {/* GRADIENT FILLS FOR EACH SERIES — FADES FROM SOLID AT TOP TO TRANSPARENT AT BOTTOM */}
                <defs>
                  <linearGradient id="signupsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3E6B8A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3E6B8A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004225" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#004225" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="Signups"
                  stroke="#3E6B8A"
                  strokeWidth={2}
                  fill="url(#signupsGradient)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="Projects"
                  stroke="#004225"
                  strokeWidth={2}
                  fill="url(#projectsGradient)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* WORKSPACE HEALTH — QUICK-GLANCE METRICS FOR TODAY */}
        <div className="rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Today</p>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Workspace health</h2>

          <div className="divide-y divide-iconBg/30">
            {/* NEW MEMBERS THIS WEEK */}
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

            {/* SUSPENDED USERS */}
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

            {/* UPCOMING EVENTS */}
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
 