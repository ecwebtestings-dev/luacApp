import { useState } from 'react'
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import image from '../../assets/images'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
     fullName: '', 
     email: '', 
     password: '', 
     confirmPassword: ''
    });

    //ERROR STATES
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [fieldErrors,setFeildErrors]=useState({});


    const handleChange =(e)=>{
      const {name,value}=e.target;
      setForm((prev)=>({...prev,[name]:value}));
      setFeildErrors((prev)=>({...prev,[name]:''}));
      if (error) setError('')
    }

    //INPUT FIELD VALIDATION
    const isValid=()=>{
        const newErrors ={};

        if(!form.fullName.trim()){
          newErrors.fullName ='Full names required';
        }

        if(!form.email.trim()){
          newErrors.email='Email required';
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
          newErrors.email='Invalid email address'
        }

        if(!form.password){
          newErrors.password='Password required';
        }else if(!form.password.length<8){
          newErrors.password='Atleast 6+ characters'
        }

        if(!form.confirmPassword){
          newErrors.confirmPassword='Comfirm password';
        }

        if(form.password !== form.confirmPassword){
          newErrors.confirmPassword ='Password mismatch';
        }

        setFeildErrors(newErrors);//Update fields
        return Object.keys(newErrors).length===0 //Return true if no error exists

    }


    //Submit form Function
    const handleSubmit = async(e) => {
      e.preventDefault()

      if(!isValid()) return;
        setError('');
        setLoading(true);
        
        
    }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-body font-Inter">

      {/* Brand panel  */}
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
                className="rounded-full lg:w-10 lg:h-10"
              />
            </div>
            <div className="text-center leading-tight">
              <h1 className="text-lg hidden lg:block font-extrabold text-white tracking-tight">LUAC</h1>
            
            </div>
          </a>

          <h2 className="hidden lg:block text-base lg:text-xl font-extrabold text-white mb-1 lg:mb-3 tracking-tight leading-snug">
            Join the community
          </h2>

          <p className="text-cream/80 text-sm leading-relaxed">
            Register for events, showcase projects, and connect with fellow computing students.
          </p>

          <div className="hidden lg:flex mt-8 items-center justify-center gap-2">
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

          <h2 className="text-2xl font-extrabold text-dark mb-2">Create your account</h2>
          <p className="text-muted mb-8">
            Already a member?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">

            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-dark mb-1.5">
                Full name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-iconBg/60 bg-white text-dark placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

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
                  placeholder="Min 6+ characters"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-dark mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-iconBg/60 bg-white text-dark placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}