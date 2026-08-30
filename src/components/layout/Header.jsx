//Top bar
import { useLocation, NavLink } from "react-router-dom"
import { BellIcon, Bars3Icon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import UserMenu from "./userMenu";

//TITLES
const sectionTitles = {
  '/dashboard': 'Overview',
  '/dashboard/users': 'All users',
  '/dashboard/events': 'Events',
  '/dashboard/projects': 'Projects',
  '/dashboard/notifications': 'Notifications',
  '/dashboard/logs': 'Content logs',
  '/dashboard/community': 'Discover people',
  '/dashboard/activity': 'My activity',
  '/dashboard/settings': 'Settings',
}

export default function Header({ onOpenMobileNav, onSearch }) {
  const { pathname } = useLocation();
  const title = sectionTitles[pathname] || 'Dashboard';


  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-iconBg/40 bg-body">
      
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={onOpenMobileNav} className="lg:hidden text-muted">
          <Bars3Icon className="size-5" />
        </button>
        <span className="text-muted text-sm hidden sm:inline">LUAC Workspace</span>
        <span className="text-muted text-sm hidden sm:inline">/</span>
        <span className="text-dark text-sm font-semibold">{title}</span>
      </div>

      {/*SEARCH INPUT AREA*/}
      <div className="relative flex-1 max-w-sm hidden md:block">
        <MagnifyingGlassCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted/60" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-iconBg/60 bg-white text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/*NOTIFICATION AND USER INTIALS */}
      <div className="flex items-center gap-4 shrink-0">
        <NavLink to='/dashboard/notifications' className="text-muted hover:text-dark transition-colors">
          <BellIcon className="size-5" />
        </NavLink>

        {/*DROPDOWN MENU */}
        <UserMenu/>

      </div>
    </header>
  )
}