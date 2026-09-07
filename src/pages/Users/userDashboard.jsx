import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Squares2X2Icon,
  HeartIcon,
  CalendarDaysIcon,
  BellIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from "../../components/common/StatisticsCard";
import Spinner from "../../components/common/Spinner";
import { useUserProjects } from "../../hooks/useProjects";
import { useEventsList } from "../../hooks/useEvents";
import { useNotifications } from "../../hooks/useNotifications";
import { extractUnreadCount } from "../../utils/notificationUtils";
import { useAuth } from "../../Context/useAuth";

// RETURNS A TIME-OF-DAY GREETING BASED ON THE CURRENT HOUR — SAME AS ADMIN DASHBOARD
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

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

function formatDateShort(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: userProjects, isLoading: projectsLoading } = useUserProjects(user?.id);
  const { data: events, isLoading: eventsLoading } = useEventsList();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();

  const eventList = useMemo(() => {
    const list = events?.data ?? events ?? [];
    return list.slice(0, 3);
  }, [events]);

  const unreadCount = notificationsLoading ? 0 : extractUnreadCount(notifications);

  const recentProjects = useMemo(() => {
    const list = userProjects ?? [];
    return [...list]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
  }, [userProjects]);

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
      {/* WELCOME BANNER — PLAIN TEXT, MATCHES ADMIN DASHBOARD STYLE */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-dark mb-1.5">
          {getGreeting()}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-muted max-w-lg">
          A quick look at your projects, events, and community.
        </p>
      </div>

      {/* STAT CARDS — ACCENTED ICONS, MATCHING ADMIN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6">
        <StatisticsCard
          label="Your Projects"
          value={userProjects?.length ?? ""}
          icon={Squares2X2Icon}
          accent="primary"
        />
        <StatisticsCard
          label="Project Likes"
          // TODO: PLACEHOLDER — NEEDS AN AGGREGATE LIKES COUNT ACROSS ALL OF THE USER'S PROJECTS
          value=""
          icon={HeartIcon}
          accent="red"
        />
        <StatisticsCard
          label="Upcoming Events"
          value={eventList.length ?? ""}
          icon={CalendarDaysIcon}
          accent="primaryLight"
        />
        <StatisticsCard
          label="Unread Alerts"
          value={notificationsLoading ? "" : unreadCount}
          icon={BellIcon}
          accent="karki"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* RECENT PROJECTS */}
        <div className="lg:col-span-2 rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Overview</p>
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline"
            >
              View all
              <ChevronRightIcon className="size-3.5" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-dark mb-4">Recent projects</h2>

          {projectsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size={20} />
            </div>
          ) : recentProjects.length === 0 ? (
            <p className="text-sm text-muted py-12 text-center">
              You haven't posted any projects yet.
            </p>
          ) : (
            <div className="divide-y divide-iconBg/30">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/dashboard/projects`)}
                  className="flex items-center gap-3 py-3 group cursor-pointer"
                >
                  <span className="flex items-center justify-center size-10 rounded-xl shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Squares2X2Icon className="size-4.5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark text-sm truncate">{project.title}</p>
                    <p className="text-xs text-muted truncate">
                      Posted {formatDateShort(project.created_at)}
                    </p>
                  </div>
                  <ChevronRightIcon className="size-4 text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPCOMING EVENTS */}
        <div className="rounded-2xl border border-iconBg/40 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Today</p>
            <button
              onClick={() => navigate("/dashboard/events")}
              className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:underline"
            >
              View all
              <ChevronRightIcon className="size-3.5" />
            </button>
          </div>
          <h2 className="text-md font-semibold text-muted mb-4">Upcoming events</h2>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size={20} />
            </div>
          ) : eventList.length === 0 ? (
            <p className="text-sm text-muted py-8 text-center">No upcoming events.</p>
          ) : (
            <div className="divide-y divide-iconBg/30">
              {eventList.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/dashboard/events/`)}
                  className="flex items-center gap-3 py-3 group cursor-pointer"
                >
                  <span className="flex items-center justify-center size-10 rounded-xl shrink-0 group-hover:bg-primary/15 transition-colors">
                    <CalendarDaysIcon className="size-4.5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-muted text-sm truncate">{event.title}</p>
                    <p className="text-xs text-muted truncate">{formatEventTime(event.startsAt ?? event.start_date ?? event.date)}</p>
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