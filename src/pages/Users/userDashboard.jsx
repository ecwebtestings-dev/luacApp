import { useMemo } from "react";
import {
  Squares2X2Icon,
  HeartIcon,
  CalendarDaysIcon,
  BellIcon,
  ChevronRightIcon,
  // PlusIcon,
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatisticsCard from "../../components/common/StatisticsCard";
import Spinner from "../../components/common/Spinner";
import { useUserProjects } from "../../hooks/useProjects";
import { useEventsList } from "../../hooks/useEvents";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuth } from "../../Context/useAuth";

const PIE_COLORS = ["#3E6B8A", "#004225", "#B45309"];

function formatEventTime(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (sameDay(date, today)) return `Today, ${time}`;
  if (sameDay(date, tomorrow)) return `Tomorrow, ${time}`;
  return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${time}`;
}

export default function UserDashboard() {
  const { user } = useAuth();

  const { data: userProjects, isLoading: projectsLoading } = useUserProjects(user?.id);
  const { data: events, isLoading: eventsLoading } = useEventsList();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();

  const eventList = useMemo(() => {
    const list = events?.data ?? events ?? [];
    return list.slice(0, 3);
  }, [events]);

  const notificationList = Array.isArray(notifications)
    ? notifications
    : Array.isArray(notifications?.data)
    ? notifications.data
    : Array.isArray(notifications?.data?.data)
    ? notifications.data.data
    : [];

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const pieData = useMemo(() => {
    return [
      { name: "Projects", value: userProjects?.length ?? 0 },
      { name: "Events", value: eventList.length ?? 0 },
      { name: "Unread Alerts", value: unreadCount ?? 0 },
    ].filter((d) => d.value > 0);
  }, [userProjects, eventList, unreadCount]);

  const isLoading = projectsLoading && eventsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={28} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
         
          <h1 className="text-2xl sm:text-3xl font-semibold text-dark mb-1">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-muted">A quick look at your projects, events, and community.</p>
        </div>

        
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatisticsCard label="Your Projects" value={userProjects?.length ?? ""} icon={Squares2X2Icon} />
        <StatisticsCard label="Project Likes" value={""} icon={HeartIcon} />
        <StatisticsCard label="Upcoming Events" value={eventList.length ?? ""} icon={CalendarDaysIcon} />
        <StatisticsCard
          label="Unread Alerts"
          value={notificationsLoading ? "" : unreadCount}
          status={unreadCount > 0 ? "Needs review" : undefined}
          icon={BellIcon}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Breakdown */}
        <div className="lg:col-span-2 rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Overview</p>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Your activity breakdown</h2>

          {projectsLoading || eventsLoading || notificationsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size={20} />
            </div>
          ) : pieData.length === 0 ? (
            <p className="text-sm text-muted py-12 text-center">Nothing to show yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Upcoming events */}
        <div className="rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Today</p>
            <button className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline">
              View all
              <ChevronRightIcon className="size-3.5" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Upcoming events</h2>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size={20} />
            </div>
          ) : eventList.length === 0 ? (
            <p className="text-sm text-muted py-8 text-center">No upcoming events.</p>
          ) : (
            <div className="divide-y divide-iconBg/30">
              {eventList.map((event) => (
                <div key={event.id} className="flex items-center gap-3 py-3 group cursor-pointer">
                  <span className="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/15 transition-colors">
                    <CalendarDaysIcon className="size-4.5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark text-sm truncate">{event.title}</p>
                    <p className="text-xs text-muted truncate">{formatEventTime(event.startsAt ?? event.start_date)}</p>
                  </div>
                  <ChevronRightIcon className="size-4 text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}