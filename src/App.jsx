import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Auth/RegisterPage'
import Login from './pages/Auth/LoginPage'
import Home from './pages/Home/Home'

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
