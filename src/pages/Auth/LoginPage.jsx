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

      
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center px-6 py-8 lg:w-1/2 lg:p-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] lg:bg-[size:44px_44px]" />

        {/* Decorative glow orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 lg:-top-16 lg:-left-16 lg:w-72 lg:h-72 rounded-full bg-white/10 blur-2xl lg:blur-3xl" />
        <div className="absolute bottom-0 right-0 w-52 h-52 lg:w-96 lg:h-96 rounded-full bg-white/10 blur-2xl lg:blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="hidden lg:block absolute top-1/3 right-10 w-40 h-40 rounded-full bg-cream/10 blur-2xl" />

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <div className="relative text-center max-w-sm">
          <a href="/" className="inline-flex items-center gap-2.5 mb-3 lg:mb-10">
            <div className="p-1 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 shadow-lg">
              <img
                src={image.logo}
                alt="Luac logo"
                width="36"
                height="36"
                className="rounded-full lg:w-11 lg:h-11"
              />
            </div>
            <div className="text-left leading-tight">
              <h1 className="text-lg lg:text-xl font-extrabold text-white tracking-tight">LUAC</h1>
              <span className="hidden lg:block text-xs text-cream/70 font-medium tracking-wide uppercase">
                Computing Platform
              </span>
            </div>
          </a>

          <h2 className="text-base lg:text-2xl font-extrabold text-white mb-1 lg:mb-3 tracking-tight leading-snug">
            We're glad you're here!
          </h2>

          {/* Full copy + accent dots only on desktop, to keep mobile banner compact */}
          <p className="hidden lg:block text-cream/80 text-[15px] leading-relaxed">
            Please sign in to catch up on events, showcase your projects, and connect with the LUAC community.
          </p>
          <div className="hidden lg:flex mt-10 items-center justify-center gap-2">
            <span className="h-1 w-8 rounded-full bg-white/60" />
            <span className="h-1 w-1.5 rounded-full bg-white/30" />
            <span className="h-1 w-1.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">

          <h2 className="text-2xl font-extrabold text-dark mb-2">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="you@lirauni.ac.ug"
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