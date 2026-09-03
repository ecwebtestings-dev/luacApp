import { useState,} from 'react'
import {
  AcademicCapIcon, PhoneIcon, CalendarIcon,
} from '@heroicons/react/24/outline'
import Modal from './Modal'
import Spinner from './Spinner'

const ROLES = ['user', 'admin']
const STATUSES = ['active', 'suspended']

export default function UserEditModal({ user, open, onClose, onSave, saving }) {
  const [role, setRole] = useState(user?.role)
  const [status, setStatus] = useState(user?.status)

  
  if (!user) return null

  const initials = user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  const hasChanges = role !== user.role || status !== user.status

  const handleSave = () => {
    onSave(user.id, { roleChanged: role !== user.role, newRole: role, statusChanged: status !== user.status, newStatus: status })
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit user">
      <div className="flex flex-col items-center text-center mb-6">
        <span className="flex items-center justify-center size-16 rounded-full bg-primary text-white text-xl font-semibold mb-3">
          {initials}
        </span>
        <h3 className="font-semibold text-dark">{user.name}</h3>
        <p className="text-muted text-sm">{user.email}</p>
      </div>

      <div className="space-y-4 mb-4 text-sm">
        {user.profile?.course && (
          <div className="flex items-center gap-2.5">
            <AcademicCapIcon className="size-4 text-muted shrink-0" />
            <span className="text-dark">{user.profile.course}</span>
          </div>
        )}
        {user.profile?.phone && (
          <div className="flex items-center gap-2.5">
            <PhoneIcon className="size-4 text-muted shrink-0" />
            <span className="text-dark">{user.profile.phone}</span>
          </div>
        )}
        {user.profile?.year_of_study && (
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="size-4 text-muted shrink-0" />
            <span className="text-dark">Year {user.profile.year_of_study}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-iconBg/40 space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted mb-2">Role</label>
          <div className="flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  role === r ? 'bg-primary text-white' : 'bg-body border border-iconBg/60 text-muted'
                }`}
              >
                {r === 'user' ? 'Student' : 'Admin'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted mb-2">Status</label>
          <div className="flex gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  status === s
                    ? s === 'suspended' ? 'bg-red-500 text-white' : 'bg-green-600 text-white'
                    : 'bg-body border border-iconBg/60 text-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg border border-iconBg/60 text-sm font-medium text-dark hover:bg-body transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-40 hover:bg-primary-light transition-colors"
        >
          {saving && <Spinner size={14} />}
          Save changes
        </button>
      </div>
    </Modal>
  )
}