import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import UserMenu from './userMenu'
import NotificationBell from '../nofifications/NotificationBell'
import { useAuth } from '../../Context/useAuth'
import image from '../../assets/images'

export default function Header({ onOpenMobileNav, onToggleDesktopSidebar, onSearch }) {
  const { user } = useAuth()
  const notificationsPath = user?.role === 'admin' ? '/dashboard/notifications' : '/dashboard/notifications'

  return (
    <header className="flex items-center justify-between gap-4 border-b border-iconBg/40 bg-surfaceHeader/90 px-4 py-3.5 backdrop-blur sm:px-6">
      <div className="flex shrink-0 items-center gap-3">
        <button aria-label="Open navigation" onClick={onOpenMobileNav} className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-primary lg:hidden"><Bars3Icon className="size-5" /></button>
        <button aria-label="Toggle sidebar" onClick={onToggleDesktopSidebar} className="hidden rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-primary lg:inline-flex"><Bars3Icon className="size-5" /></button>
        <div className="flex items-center gap-2 lg:hidden"><img src={image.logo} alt="Luac logo" width="24" height="24" className="rounded-full" /><span className="text-sm font-semibold uppercase tracking-[0.14em] text-dark">Luac</span></div>
      </div>
      <div className="relative hidden max-w-lg flex-1 md:block">
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted/60" />
        <input aria-label="Search workspace" type="text" placeholder="Search your workspace" onChange={(e) => onSearch?.(e.target.value)} className="w-full rounded-xl border border-iconBg/50 bg-body/70 py-2.5 pl-10 pr-4 text-sm text-dark placeholder:text-muted/50 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10" />
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4"><NotificationBell notificationsPath={notificationsPath} /><div className="h-7 w-px bg-iconBg/50" /><UserMenu /></div>
    </header>
  )
}
