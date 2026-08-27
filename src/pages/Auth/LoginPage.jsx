import { useState } from 'react'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import image from '../../assets/images'
import { Link } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted:', form)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-body font-Inter">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center px-6 py-10 lg:w-1/2 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <div className="relative text-center max-w-sm">
          <a href="/" className="inline-flex flex-col items-center gap-3 mb-4 lg:mb-10">
            <div className="p-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 shadow-lg">
              <img
                src={image.logo}
                alt="Luac logo"
                width="36"
                height="36"
                className="rounded-full lg:w-11 lg:h-11"
              />
            </div>
            <div className="text-center leading-tight">
              <h1 className="hidden text-lg lg:text-xl font-extrabold text-white tracking-tight">LUAC</h1>
              <span className="hidden lg:block text-xs text-cream/70 font-medium tracking-wide uppercase mt-1">
                Computing Platform
              </span>
            </div>
          </a>

          <h2 className="hidden lg:block text-base lg:text-2xl font-extrabold text-white mb-1 lg:mb-3 tracking-tight leading-snug">
            Welcome Here!
          </h2>

          <p className="hidden lg:block text-cream/80 text-[15px] leading-relaxed">
            Please sign in to catch up on events, showcase your projects, and connect with the LUAC community.
          </p>
          <p className="md:hidden lg:hidden text-cream/80 text-[15px] leading-relaxed">
            Please sign in to  connect with the LUAC community.
          </p>
          <div className="hidden lg:flex mt-10 items-center justify-center gap-2">
            <span className="h-1 w-8 rounded-full bg-white/60" />
            <span className="h-1 w-1.5 rounded-full bg-white/30" />
            <span className="h-1 w-1.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center text-center lg:text-left
                       p-6 sm:p-12
                       bg-body rounded-t-3xl -mt-6 relative z-10 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]
                       lg:rounded-none lg:mt-0 lg:shadow-none">
        <div className="w-full max-w-sm flex flex-col items-center lg:items-start">

          <h2 className="text-2xl font-extrabold text-dark mb-2">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-dark mb-1.5">
                Email address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-iconBg/60 bg-white text-dark placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-iconBg/60 bg-white text-dark placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="rounded border-iconBg text-primary focus:ring-primary/40" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-primary font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-muted mt-8">
            New to Luac?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}