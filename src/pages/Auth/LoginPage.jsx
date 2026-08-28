import { useState } from 'react'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import image from '../../assets/images'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Services/authServices'
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const [error, setError] = useState('')
  const [fieldError, setFeildErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFeildErrors((prev) => ({ ...prev, [name]: '' }))
    if (error) setError('')
  }

  const isValid = () => {
    const newErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!form.password) {
      newErrors.password = 'Password required'
    }
    setFeildErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) return
    setError('')
    setLoading(true)

    try {
      const data = await login(form)
      localStorage.setItem('token', data.token.plainTextToken)

      if (data.user.role === 'user') {
        navigate('/userdashboard')
      } else {
        navigate('/admindashboard')
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-body font-Inter">
      {/* Left side */}
      <div className="relative overflow-hidden bg-primary flex flex-col justify-between px-8 py-6 h-40 lg:h-auto lg:py-14 lg:w-[45%]">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${image.Students})` }} />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />

        <a href="/" className="relative inline-flex items-center gap-3">
          <div className="p-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
            <img src={image.logo} alt="Luac logo" width="32" height="32" className="rounded-full" />
          </div>
          <span className="text-cream/70 text-xs font-semibold tracking-[0.2em] uppercase">
            LUAC  Computing Platform
          </span>
        </a>

        <div className="relative hidden lg:block">
          <p className="font-serif text-4xl xl:text-5xl leading-[1.1] text-white tracking-tight">
            Where computing<br />finds its people.
          </p>
          <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
            Catch up on events, showcase your projects, and connect with the LUAC community.
          </p>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
        </div>

        <p className="relative lg:hidden text-cream/70 text-xs">
          Sign in to connect with the LUAC community.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 sm:px-12">
        <div className="w-full max-w-sm">
          <h2 className="font-serif text-3xl text-dark mb-1 tracking-tight text-center">Sign in</h2>
          <p className="text-muted text-sm mb-1 text-center">Enter your details to access your account.</p>
            <p className="text-muted text-sm mb-5 text-center">
            New to Luac?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>


          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-muted tracking-wide mb-1">
                Email address
              </label>
              <div className="relative group">
                <EnvelopeIcon className="absolute left-0 top-1/2 -translate-y-1/2 size-[18px] text-muted/60 group-focus-within:text-primary transition-colors" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className={`w-full pl-7 pr-1 py-2 text-sm bg-transparent border-b text-dark placeholder:text-muted/50 placeholder:text-sm focus:outline-none transition-colors ${
                    fieldError.email ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
                  }`}
                />
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldError.email || ''}</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-muted tracking-wide mb-1">
                Password
              </label>
              <div className="relative group">
                <LockClosedIcon className="absolute left-0 top-1/2 -translate-y-1/2 size-[18px] text-muted/60 group-focus-within:text-primary transition-colors" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full pl-7 pr-8 py-2 text-sm bg-transparent border-b text-dark placeholder:text-muted/50 placeholder:text-sm focus:outline-none transition-colors ${
                    fieldError.password ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted/60 hover:text-dark transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlashIcon className="size-[18px]" /> : <EyeIcon className="size-[18px]" />}
                </button>
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldError.password || ''}</p>
            </div>

            <div className="flex items-center justify-between text-sm pt-0.5">
              <label className="flex items-center gap-2 text-muted cursor-pointer">
                <input type="checkbox" className="rounded border-iconBg text-primary focus:ring-primary/40" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-primary font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-8 flex items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg shadow-primary/20 transition-all
                ${loading
                  ? 'opacity-60 cursor-not-allowed bg-primary'
                  : 'bg-primary hover:bg-primary-light hover:shadow-primary/30 active:scale-[0.98] cursor-pointer'
                }`}
            >
              {loading && <Spinner size={16} />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  )
}