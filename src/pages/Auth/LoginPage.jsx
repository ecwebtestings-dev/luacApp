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
    <div className="min-h-screen flex bg-body font-Inter">
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center p-12">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <div className="relative text-center max-w-sm">
          <a href="/" className="inline-flex items-center gap-2.5 mb-10">
            <img src={image.logo} alt="Luac logo" width="44" height="44" className="rounded-full border-2 border-white" />
            <div className="text-left leading-tight">
              <h1 className="text-xl font-extrabold text-white">LUAC</h1>
            </div>
          </a>
          <h2 className="text-2xl font-extrabold text-white mb-3">We're Glad your Here!</h2>
          <p className="text-cream/80">
           Please Sign in to catch up on events, showcase your projects, and connect with the LUAC
            community.
          </p>
        </div>
      </div>

      
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <a href="/" className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <img src={image.logo} alt="Luac logo" width="40" height="40" className="rounded-full border-2 border-primary" />
            <div className="text-left leading-tight">
              <h1 className="text-lg font-extrabold text-primary">LUAC</h1>
              <span className="text-xs text-muted">Computing Platform</span>
            </div>
          </a>

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

          <p className="text-muted mt-8 ">
            New to Luac? {' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}