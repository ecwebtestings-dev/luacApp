import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.jsx'
import { AuthProvider } from './Context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
        <App />
  </AuthProvider>
  </BrowserRouter>,
)
