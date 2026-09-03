import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsersList } from '../../hooks/useUsers'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/emptyState'
import SearchBar from '../../components/common/SearchBar'
import Pagination from '../../components/common/Pagination'

export default function Community() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useUsersList(page)

  const users = data?.data ?? []
  const meta = {
    current_page: data?.current_page ?? 1,
    last_page: data?.last_page ?? 1,
    total: data?.total ?? 0,
  }

  const visibleUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
  if (isError) return <EmptyState message={error?.response?.data?.message || 'Could not load community members'} />

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-1">Community</h1>
      <p className="text-muted text-sm mb-6">Browse and connect with other members.</p>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search members" />
      </div>

      <div className="border border-iconBg/50 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-iconBg/40">
          <strong className="text-sm text-dark">{meta.total} members</strong>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted border-b border-iconBg/40">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id} className="border-b border-iconBg/30 last:border-0 hover:bg-body transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white text-xs font-semibold shrink-0">
                        {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                      </span>
                      <p className="font-medium text-dark truncate">{user.name}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-muted text-xs">{user.email}</td>

                  <td className="px-4 py-3 text-muted text-xs">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/dashboard/users/${user.id}`)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleUsers.length === 0 && (
          <p className="text-center text-muted text-sm py-8">No members found.</p>
        )}

        <Pagination currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} />
      </div>
    </div>
  )
}