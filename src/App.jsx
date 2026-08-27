import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/LandingPage/Home'
import Signup from './pages/Auth/RegisterPage'
import Login from './pages/Auth/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
