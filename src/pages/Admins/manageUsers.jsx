import { useState } from 'react'
import { ShieldExclamationIcon, ShieldCheckIcon, UserIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import {
  useUsersList, useSuspendUserAction, useUnsuspendUserAction, useMakeAdminAction, useDemoteAdminAction,
} from '../../hooks/useUsers'
import Spinner from '../../components/common/Spinner'
import SearchBar from '../../components/common/SearchBar'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/emptyState'
import ConfirmDialog from '../../components/common/comfirmDialog'

export default function ManageUsers() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [pendingAction, setPendingAction] = useState(null)

  const { data, isLoading, isError, error } = useUsersList(page)
  const suspendUser = useSuspendUserAction()
  const unsuspendUser = useUnsuspendUserAction()
  const makeAdmin = useMakeAdminAction()
  const demoteAdmin = useDemoteAdminAction()

  const users = data?.data ?? []
  const meta = {
    current_page: data?.current_page ?? 1,
    last_page: data?.last_page ?? 1,
    total: data?.total ?? 0,
  }

  const visibleUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const requestSuspendToggle = (user) => {
    const isSuspended = user.status === 'suspended'
    setPendingAction({
      user,
      mutation: isSuspended ? unsuspendUser : suspendUser,
      successMessage: isSuspended ? 'User unsuspended' : 'User suspended',
      title: isSuspended ? 'Unsuspend user' : 'Suspend user',
      message: isSuspended
        ? `Restore access for ${user.name}?.`
        : `Suspend ${user.name}?`,
      confirmLabel: isSuspended ? 'Unsuspend' : 'Suspend',
      danger: !isSuspended,
    })
  }

  const requestRoleToggle = (user) => {
    const isAdmin = user.role === 'admin'
    setPendingAction({
      user,
      mutation: isAdmin ? demoteAdmin : makeAdmin,
      successMessage: isAdmin ? 'Demoted to student' : 'Promoted to admin',
      title: isAdmin ? 'Demote to student' : 'Promote to admin',
      message: isAdmin
        ? `Remove admin access from ${user.name}? They'll be downgraded to a regular student account.`
        : `Grant admin access to ${user.name}? They'll be able to manage users, projects, and events.`,
      confirmLabel: isAdmin ? 'Demote' : 'Promote',
      danger: isAdmin,
    })
  }

  const confirmPendingAction = async () => {
    if (!pendingAction) return
    const { user, mutation, successMessage } = pendingAction
    try {
      await mutation.mutateAsync(user.id)
      toast.success(successMessage)
    } catch (err) {
      // interceptor already toasts the failure
    } finally {
      setPendingAction(null)
    }
  }

  const isActioning = (userId) =>
    (suspendUser.isPending && suspendUser.variables === userId) ||
    (unsuspendUser.isPending && unsuspendUser.variables === userId) ||
    (makeAdmin.isPending && makeAdmin.variables === userId) ||
    (demoteAdmin.isPending && demoteAdmin.variables === userId)

  if (isLoading) return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
  if (isError) return <EmptyState message={error?.response?.data?.message || 'Could not load users'} />

  return (
    <div>
      <p className="text-muted text-sm mb-2">Manage access, roles, and member activity.</p>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users" />
      </div>

      <div className="border border-iconBg/50 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-iconBg/40">
          <strong className="text-sm text-dark">{meta.total} users</strong>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted border-b border-iconBg/40">
                <th className="px-2 py-3">User</th>
                <th className="px-2 py-3">Email Address</th>
                <th className="px-2 py-3">Role</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Joined</th>
                <th className="px-2 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => {
                const isSuspended = user.status === 'suspended'
                const isAdmin = user.role === 'admin'
                const isBusy = isActioning(user.id)

                return (
                  <tr key={user.id} className="border-b border-iconBg/30 last:border-0 hover:bg-body transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white text-xs font-semibold shrink-0">
                          {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-dark truncate">{user.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-muted text-xs">{user.email}</td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        isAdmin ? 'bg-primary/10 text-primary' : 'bg-body text-muted'
                      }`}>
                        {isAdmin ? 'Admin' : 'Student'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        isSuspended ? 'text-red-500' : 'text-green-600'
                      }`}>
                        <span className={`size-1.5 rounded-full ${isSuspended ? 'bg-red-500' : 'bg-green-600'}`} />
                        {isSuspended ? 'Suspended' : 'Active'}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => requestSuspendToggle(user)}
                          disabled={isBusy}
                          title={isSuspended ? 'Unsuspend' : 'Suspend'}
                          className="text-muted hover:text-dark disabled:opacity-40 transition-colors"
                        >
                          {isSuspended ? <ShieldCheckIcon className="size-[18px]" /> : <ShieldExclamationIcon className="size-[18px]" />}
                        </button>

                        <button
                          onClick={() => requestRoleToggle(user)}
                          disabled={isBusy}
                          title={isAdmin ? 'Demote to student' : 'Promote to admin'}
                          className="text-muted hover:text-dark disabled:opacity-40 transition-colors"
                        >
                          {isAdmin ? <UserIcon className="size-[18px]" /> : <ArrowUpCircleIcon className="size-[18px]" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {visibleUsers.length === 0 && (
          <p className="text-center text-muted text-sm py-8">No users match your search.</p>
        )}

        <Pagination currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={!!pendingAction}
        onClose={() => setPendingAction(null)}
        onConfirm={confirmPendingAction}
        title={pendingAction?.title}
        message={pendingAction?.message}
        confirmLabel={pendingAction?.confirmLabel}
        danger={pendingAction?.danger}
        loading={pendingAction ? isActioning(pendingAction.user.id) : false}
      />
    </div>
  )
}