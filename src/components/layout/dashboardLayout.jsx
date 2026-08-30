import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './sideBar'
import Header from './Header'
import { useState } from 'react'

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

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)
  const { pathname } = useLocation()
  const title = sectionTitles[pathname] || 'Dashboard'

  return (
    <div className='flex h-screen overflow-hidden bg-body font-Inter'>

      {/* Desktop sidebar  */}
      <SideBar className={desktopSidebarOpen ? 'hidden lg:flex' : 'hidden'} />

      {/* Mobile sidebar  */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64">
            <SideBar className="flex" onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onToggleDesktopSidebar={() => setDesktopSidebarOpen((o) => !o)}
        />

        <main className='flex-1 overflow-y-auto p-6'>
          {/* Section title  */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-muted text-xs hidden sm:inline">Luac Workspace</span>
            <span className="text-muted text-xs hidden sm:inline">/</span>
            <h1 className="text-muted text-xs font-semibold">{title}</h1>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  )
}