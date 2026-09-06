import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './sideBar'
import Header from './Header'
import { useState } from 'react'

const sectionTitles = {
  '/dashboard': 'overview',
  '/dashboard/users': 'users',
  '/dashboard/events': 'events',
  '/dashboard/projects': 'projects',
  '/dashboard/notifications': 'notifications',
  '/dashboard/logs': 'logs',
  '/dashboard/community': 'discover people',
  '/dashboard/activity': 'my activity',
  '/dashboard/settings': 'settings',
}

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const { pathname } = useLocation()
  const title = sectionTitles[pathname] || 'Dashboard'

  return (
    <div className='flex h-screen overflow-hidden bg-body font-Inter'>
      <SideBar className="hidden lg:flex" collapsed={desktopCollapsed} />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 shadow-2xl">
            <SideBar className="flex" onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className='flex-1 flex min-w-0 flex-col overflow-hidden'>
        <Header onOpenMobileNav={() => setMobileNavOpen(true)} onToggleDesktopSidebar={() => setDesktopCollapsed((c) => !c)} />
        <main className='flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8'>
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-7 flex items-center gap-2 text-xs">
              <span className="font-medium text-muted">Luac workspace</span>
              <span className="text-iconBg">/</span>
              <h1 className="font-semibold capitalize text-primary">{title}</h1>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
