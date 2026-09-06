import { NavLink } from 'react-router-dom'
import { Squares2X2Icon, UsersIcon, CalendarDaysIcon, DocumentTextIcon, BellIcon, ChartBarIcon, Cog6ToothIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
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
  { path: '/dashboard/projects', label: 'Projects', icon: DocumentTextIcon },
  { path: '/dashboard/events', label: 'Events', icon: CalendarDaysIcon },
  { path: '/dashboard/community', label: 'Discover people', icon: UsersIcon },
  { path: '/dashboard/notifications', label: 'Notifications', icon: BellIcon },
]

export default function Sidebar({ className = 'hidden lg:flex', collapsed = false, onNavigate }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const nav = isAdmin ? adminNav : studentNav

  return (
    <aside className={`${className} flex-col bg-primary shrink-0 h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className={`flex items-center gap-3 px-7 py-7 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
          <img src={image.logo} alt="Luac logo" width="25" height="25" className="rounded-full" />
        </div>
        {!collapsed && <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Luac</span>}
      </div>

      {!collapsed && <div className="mx-5 mb-7 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3.5 shadow-inner shadow-white/5">
        <p className="truncate text-sm font-semibold text-white">Luac workspace</p>
        <p className="mt-1 truncate text-xs text-cream/50">{isAdmin ? 'Admin workspace' : 'Personal space'}</p>
      </div>}

      <nav className="flex-1 px-4">
        {!collapsed && <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/40">{isAdmin ? 'Workspace' : 'Your space'}</p>}
        <div className="flex flex-col gap-1">
          {nav.map(({ path, label, icon: Icon, end }) => <NavLink key={path} to={path} end={end} onClick={onNavigate} title={collapsed ? label : undefined} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-white text-primary shadow-lg shadow-black/10' : 'text-cream/65 hover:bg-white/10 hover:text-white'}`}><Icon className="size-[18px] shrink-0" />{!collapsed && label}</NavLink>)}
        </div>
        {!collapsed && <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/40">Account</p>}
        <NavLink to="/dashboard/settings" onClick={onNavigate} title={collapsed ? 'Settings' : undefined} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-white text-primary shadow-lg shadow-black/10' : 'text-cream/65 hover:bg-white/10 hover:text-white'}`}><Cog6ToothIcon className="size-[18px] shrink-0" />{!collapsed && 'Settings'}</NavLink>
      </nav>

      {!collapsed && <div className="p-5"><NavLink to="/dashboard/settings" className="inline-flex items-center gap-1 text-xs font-semibold text-karki transition-colors hover:text-karki-hover">Open settings <ChevronRightIcon className="size-3.5" /></NavLink></div>}
    </aside>
  )
}
