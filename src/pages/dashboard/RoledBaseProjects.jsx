import { useState } from 'react'
import ManageProjects from "../Admins/manageProjects"
import StudentProjects from "../Users/StudentProjects"
import { useAuth } from '../../Context/useAuth'

export default function RoledBaseProjects() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [tab, setTab] = useState('browse') 

  if (!isAdmin) {
    return <StudentProjects />
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-iconBg/40">
        <button
          onClick={() => setTab('browse')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            tab === 'browse'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-dark'
          }`}
        >
          Browse Projects
        </button>
       
      </div>

      {tab === 'browse' ? <StudentProjects /> : <ManageProjects />}
    </div>
  )
}