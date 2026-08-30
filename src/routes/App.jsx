import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { onSessionExpired } from '../Services/sessionEvents'

//PUBLIC ROUTES
import Signup from '../pages/Auth/RegisterPage'
import Login from '../pages/Auth/LoginPage'
import Home from '../pages/Home/Home'

//LAYOUT
import ProtectedRoute from './protectedRoutes'
import DashboardLayout from '../components/layout/DashboardLayout'

//STUDENT USER PAGES
import Events from '../pages/Users/Events'
import Community from '../pages/Users/Community'
import MyActivity from '../pages/Users/MyActivity'
import MyProfile from '../pages/Users/myProfile'
import UserProfile from '../pages/Users/UsersProfile'

//ADMINS
import RoledBaseProjects from '../pages/dashboard/RoledBaseProjects'
import RoleBasedOverview from '../pages/dashboard/RoleBasedOverview'
import ManageUsers from '../pages/Admins/manageUsers'
import ActivityLogs from '../pages/Admins/activityLogs'
import Notifications from '../pages/Admins/Notifications'
import Settings from '../pages/Admins/Settings'



function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onSessionExpired(() => {
      toast.error('Session expired. Please log in again.')
      navigate('/login')
    })
    return unsubscribe
  }, [navigate])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: { background: '#16A34A', color: '#FFFFFF' },
            iconTheme: { primary: '#FFFFFF', secondary: '#16A34A' },
          },
          error: {
            style: { background: '#DC2626', color: '#FFFFFF' },
            iconTheme: { primary: '#FFFFFF', secondary: '#DC2626' },
          },
        }}
      />

      <Routes>
        {/*PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/*DASHBOARD ROUTES */}
        <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
          <Route index element={<RoleBasedOverview/>}/>
          {/*USER STUDENTS */}
          <Route path='projects' element={<RoledBaseProjects/>}/>
          <Route path='events' element={<Events/>}/>
          <Route path='community' element={<Community/>}/>
          <Route path='activity' element={<MyActivity/>}/>
          <Route path='profile' element={<MyProfile/>}/>
          <Route path='notifications' element={<Notifications/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='users/:userId' element={<UserProfile/>}/>

          {/*ADMINS */}
          <Route path='users' element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers/></ProtectedRoute>}/>
          <Route path='logs' element={<ProtectedRoute allowedRoles={['admin']}><ActivityLogs/></ProtectedRoute>}/>

        </Route>
      </Routes>
    </>
  )
}

export default App