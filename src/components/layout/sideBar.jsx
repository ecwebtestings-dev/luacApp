import { NavLink } from 'react-router-dom'
import {
  Squares2X2Icon, UsersIcon, CalendarDaysIcon, DocumentTextIcon,
  BellIcon, ChartBarIcon, Cog6ToothIcon, ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '../../Context/useAuth'
import image from '../../assets/images'

const adminNav = [
  { path: '/dashboard', label: 'Overview', icon: Squares2X2Icon, end: true },
  { path: '/dashboard/users', label: 'All users', icon: UsersIcon },
  { path: '/dashboard/events', label: 'Events', icon: CalendarDaysIcon },
  { path: '/dashboard/projects', label: 'Projects', icon: DocumentTextIcon },
  { path: '/dashboard/notifications', label: 'Notifications', icon: BellIcon },
  { path: '/dashboard/logs', label: 'Content logs', icon: ChartBarIcon },
]

const studentNav = [
  { path: '/dashboard', label: 'Overview', icon: Squares2X2Icon, end: true },
  { path: '/dashboard/projects', label: 'My projects', icon: DocumentTextIcon },
  { path: '/dashboard/events', label: 'Events', icon: CalendarDaysIcon },
  { path: '/dashboard/community', label: 'Discover people', icon: UsersIcon },
  { path: '/dashboard/notifications', label: 'Notifications', icon: BellIcon },
  { path: '/dashboard/activity', label: 'My activity', icon: ChartBarIcon },
]

export default function Sidebar({ className = 'hidden lg:flex', collapsed = false, onNavigate }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const nav = isAdmin ? adminNav : studentNav

  return (
    <aside
      className={`${className} flex-col bg-primary shrink-0 h-screen transition-all duration-200 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex items-center gap-3 px-6 py-6 ${collapsed ? 'justify-center px-0' : ''}`}>
        <img src={image.logo} alt="Luac logo" width="30" height="30" className="rounded-full shrink-0" />
        {!collapsed && (
          <span className="text-white text-sm font-semibold tracking-[0.15em] uppercase">Luac</span>
        )}
      </div>

      {!collapsed && (
        <div className="mx-4 mb-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">Luac workspace</p>
            <p className="text-cream/50 text-xs truncate">
              {isAdmin ? 'Admin workspace' : 'Personal space'}
            </p>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 space-y-1">
        {!collapsed && (
          <p className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-cream/40">
            {isAdmin ? 'Workspace' : 'Your space'}
          </p>
        )}
        {nav.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive ? 'bg-primary-light text-white' : 'text-cream/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="size-[18px] shrink-0" />
            {!collapsed && label}
          </NavLink>
        ))}

        {!collapsed && (
          <p className="px-3 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wide text-cream/40">
            Account
          </p>
        )}
        <NavLink
          to="/dashboard/settings"
          onClick={onNavigate}
          title={collapsed ? 'Settings' : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? 'justify-center' : ''
            } ${
              isActive ? 'bg-primary text-white' : 'text-cream/70 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Cog6ToothIcon className="size-[18px] shrink-0" />
          {!collapsed && 'Settings'}
        </NavLink>
      </nav>

      {!collapsed && (
        <div className="p-4">
          <NavLink
            to="/dashboard/settings"
            className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-3 hover:underline"
          >
            Open settings <ChevronRightIcon className="size-3.5" />
          </NavLink>
        </div>
      )}
    </aside>
  )
}