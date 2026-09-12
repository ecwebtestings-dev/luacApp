import { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import UserMenu from "./userMenu"
import NotificationBell from "../nofifications/NotificationBell"
import { useAuth } from "../../Context/useAuth"
import image from "../../assets/images"

export default function Header({ onOpenMobileNav, onToggleDesktopSidebar, onSearch }) {
  const { user } = useAuth()
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const notificationsPath = '/dashboard/notifications'

  if (mobileSearchOpen) {
    return (
      <header className="flex items-center gap-3 px-4 py-3 border-b border-iconBg/40 bg-body md:hidden">
        <MagnifyingGlassIcon className="size-4 text-muted/60 shrink-0" />
        <input
          autoFocus
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch?.(e.target.value)}
          className="flex-1 bg-transparent text-sm text-dark placeholder:text-muted/50 focus:outline-none"
        />
        <button
          onClick={() => setMobileSearchOpen(false)}
          className="p-1.5 rounded-lg text-muted hover:text-dark hover:bg-iconBg/30 transition-colors"
        >
          <XMarkIcon className="size-4" />
        </button>
      </header>
    )
  }

  return (
   <header className="flex items-center justify-between gap-3 px-4 lg:px-6 py-3 border-b border-iconBg/40 bg-body/95 backdrop-blur-sm shadow-sm">

  <div className="flex items-center gap-2 shrink-0">
    <button
      onClick={onOpenMobileNav}
      className="lg:hidden p-2 -ml-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 active:scale-95 transition-all"
    >
      <Bars3Icon className="size-5" />
    </button>

    <button
      onClick={onToggleDesktopSidebar}
      className="hidden lg:inline-flex p-2 -ml-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors"
    >
      <Bars3Icon className="size-5" />
    </button>

    <div className="flex items-center gap-2 lg:hidden">
      <img src={image.logo} alt="Luac logo" width="24" height="24" className="rounded-full ring-2 ring-primary/20" />
      <span className="text-primary text-sm font-semibold tracking-[0.1em] uppercase">Luac</span>
    </div>
  </div>

  <div className="relative flex-1 max-w-md hidden md:block">
    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary/50" />
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => onSearch?.(e.target.value)}
      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-iconBg/60 bg-white text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
    />
  </div>

  <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
    <button
      onClick={() => setMobileSearchOpen(true)}
      className="md:hidden p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 active:scale-95 transition-all"
    >
      <MagnifyingGlassIcon className="size-5" />
    </button>

    <NotificationBell notificationsPath={notificationsPath} />
    <UserMenu />
  </div>
</header>
  )
}