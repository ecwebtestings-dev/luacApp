import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, Cog6ToothIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../Context/useAuth'
import toast from 'react-hot-toast'

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  //CLOSE MENU WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  //NAVIAGTION 
  const handleNavigate = (path) => {
    setOpen(false)
    navigate(path)
  }

  //LOGOUT HANDLER
  const handleLogout = () => {
    setOpen(false)
    logout()
    toast.success('Logged out')
    navigate('/login')
  }

  return (
    <div className="relative" ref={menuRef}>
      
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center size-8 rounded-full bg-primary text-white text-xs font-semibold hover:ring-2 hover:ring-primary/30 transition-all"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-iconBg/50 bg-white shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-iconBg/40">
            <p className="text-sm font-semibold text-dark truncate">{user?.name}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => handleNavigate('/dashboard/profile')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-body transition-colors text-left"
            >
              <UserCircleIcon className="size-[18px] text-muted" />
              Profile
            </button>

            <button
              onClick={() => handleNavigate('/dashboard/settings')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-body transition-colors text-left"
            >
              <Cog6ToothIcon className="size-[18px] text-muted" />
              Settings
            </button>
          </div>



          <div className="py-1 border-t border-iconBg/40">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              <ArrowRightStartOnRectangleIcon className="size-[18px]" />
              Log out
            </button>
          </div>
          
        </div>
      )}
    </div>
  )
}