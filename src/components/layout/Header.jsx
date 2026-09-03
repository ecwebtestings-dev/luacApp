import { Bars3Icon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import UserMenu from "./userMenu"
import NotificationBell from "../nofifications/NotificationBell"
import { useAuth } from "../../Context/useAuth"
import image from "../../assets/images"

export default function Header({ onOpenMobileNav, onToggleDesktopSidebar, onSearch }) {
  const { user } = useAuth()
  
  const notificationsPath = user?.role === 'admin' ? '/dashboard/notifications' : '/dashboard/notifications'

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-iconBg/40 bg-body">

      <div className="flex items-center gap-3 shrink-0">
        {/* Mobile  */}
        <button onClick={onOpenMobileNav} className="lg:hidden text-muted">
          <Bars3Icon className="size-5" />
        </button>

        {/* Desktop  */}
        <button onClick={onToggleDesktopSidebar} className="hidden lg:inline-flex text-muted hover:text-dark transition-colors">
          <Bars3Icon className="size-5" />
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <img src={image.logo} alt="Luac logo" width="24" height="24" className="rounded-full" />
          <span className="text-dark text-sm font-semibold tracking-[0.1em] uppercase">Luac</span>
        </div>
      </div>

      {/*SEARCH INPUT AREA*/}
      <div className="relative flex-1 max-w-md hidden md:block">
        <MagnifyingGlassCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted/60" />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-iconBg/60 bg-white text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/*NOTIFICATION AND USER MENU */}
      <div className="flex items-center gap-4 shrink-0">
        <NotificationBell notificationsPath={notificationsPath} />

        <UserMenu/>
      </div>
    </header>
  )
}