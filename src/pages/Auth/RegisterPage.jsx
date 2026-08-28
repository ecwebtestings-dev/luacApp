import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import image from '../../assets/images'
import { register } from '../../Services/authServices'
import Spinner from '../../components/Spinner'

export default function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    if (error) setError('')
  }

  const isValid = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Full name required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!form.password) {
      newErrors.password = 'Password required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Min 6+ characters'
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid()) return

    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-body font-Inter">
      {/* Left panel */}
      <div className="relative overflow-hidden flex flex-col justify-between px-8 py-6 h-40 lg:h-auto lg:py-14 lg:w-[45%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image.Students})` }}
        />
        <div className="absolute inset-0 bg-primary/89" />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />

        <a href="/" className="relative inline-flex items-center gap-3">
          <div className="p-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
            <img src={image.logo} alt="Luac logo" width="32" height="32" className="rounded-full" />
          </div>
          <span className="text-cream/70 text-xs font-semibold tracking-[0.2em] uppercase">
            Luac  Computing Platform
          </span>
        </a>

        <div className="relative hidden lg:block">
          <p className="font-serif text-4xl xl:text-5xl leading-[1.1] text-white tracking-tight">
            Join the<br />community.
          </p>
          <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
            Register for events, showcase projects, and connect with fellow computing students.
          </p>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
        </div>

        <p className="relative lg:hidden text-cream/70 text-xs">
          Register to connect with fellow computing students.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 sm:px-12">
        <div className="w-full max-w-sm">
          <h2 className="font-serif text-2xl text-dark text-center mb-1 tracking-tight">
            Create your account
          </h2>
          <p className="text-muted text-sm mb-5 text-center">
            Already a member?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-muted tracking-wide mb-1">
                Full name
              </label>
              <div className="relative group">
                <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 size-[18px] text-muted/60 group-focus-within:text-primary transition-colors" />
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={`w-full text-sm pl-7 pr-1 py-2 bg-transparent border-b text-dark placeholder:text-sm placeholder:text-muted/50 focus:outline-none transition-colors ${
                    fieldErrors.name ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
                  }`}
                />
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldErrors.name || ''}</p>
            </div>

            {/* Email */}
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
                  autoComplete="email"
                  className={`w-full pl-7 pr-1 py-2 bg-transparent text-sm border-b text-dark placeholder:text-sm placeholder:text-muted/50 focus:outline-none transition-colors ${
                    fieldErrors.email ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
                  }`}
                />
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldErrors.email || ''}</p>
            </div>

            {/* Password */}
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
                  placeholder="Min 6+ characters"
                  autoComplete="new-password"
                  className={`w-full pl-7 pr-8 py-2 text-sm bg-transparent border-b text-dark placeholder:text-sm placeholder:text-muted/50 focus:outline-none transition-colors ${
                    fieldErrors.password ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
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
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldErrors.password || ''}</p>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-muted tracking-wide mb-1">
                Confirm password
              </label>
              <div className="relative group">
                <LockClosedIcon className="absolute left-0 top-1/2 -translate-y-1/2 size-[18px] text-muted/60 group-focus-within:text-primary transition-colors" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full pl-7 pr-1 py-2 text-sm bg-transparent border-b text-dark placeholder:text-sm placeholder:text-muted/50 focus:outline-none transition-colors ${
                    fieldErrors.confirmPassword ? 'border-red-400' : 'border-iconBg/60 focus:border-primary'
                  }`}
                />
              </div>
              <p className="mt-0.5 text-[11px] leading-tight text-red-400 h-3.5">{fieldErrors.confirmPassword || ''}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-1 flex items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg shadow-primary/20 transition-all
                ${loading
                  ? 'opacity-60 cursor-not-allowed bg-primary'
                  : 'bg-primary hover:bg-primary-light hover:shadow-primary/30 active:scale-[0.98] cursor-pointer'
                }`}
            >
              {loading && <Spinner size={16} />}
              {loading ? 'Please wait. Creating...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}