import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './pages/Auth/RegisterPage'
import Login from './pages/Auth/LoginPage'
import Home from './pages/Home/Home'
import { Toaster, toast } from 'react-hot-toast'
import { onSessionExpired } from './Services/sessionEvents'

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App