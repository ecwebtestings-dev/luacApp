import { useState } from 'react'
import {Bars3Icon,XMarkIcon,} from '@heroicons/react/24/outline'
import image from '../../assets/images'
import {Link} from 'react-router-dom';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/', },
    { name: 'Our Activities', href: '/activities',  },
    { name: 'About Luac', href: '/about',  },
    { name: 'Events', href: '/events',  },
  ]

  return (
    <>
      <header className="fixed top-[50px] left-1/2 -translate-x-1/2 z-[10000] flex items-center justify-between w-[min(100%-2rem,1200px)] h-[70px] px-5 rounded-[10px] bg-surfaceHeader/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 pl-2">
          <img
            src={image.logo}
            alt="Luac logo"
            width="40"
            height="40"
            className="rounded-full border-2 border-primary"
          />
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold tracking-tight text-primary">LUAC</h1>
            <span className="text-xs font-medium tracking-tight text-muted">Computing Platform</span>
          </div>
        </a>

        {/* Desktop nav — flat links, no dropdowns */}
        <nav className="hidden lg:flex mx-auto">
          <ul className="flex list-none">
            {navLinks.map((item) => (
              <li key={item.name} className="px-4 py-2 rounded-[10px] hover:bg-hoverBg transition-colors">
                <a href={item.href} className="flex items-center gap-1.5 text-navlink font-medium hover:text-primary">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex gap-2.5">
          <Link to='/login' className="px-5 py-2.5 cursor-pointer rounded-[10px] text-sm text-navlink hover:bg-karki-hover transition-colors">
            Sign In
          </Link>
          <Link to='/register' className="px-5 py-2.5 cursor-pointer rounded-[10px] text-sm font-bold text-white bg-primary hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] transition-all">
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden flex items-center justify-center"
          aria-label="Open menu"
        >
          <Bars3Icon className="size-8 text-primary" />
        </button>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[99998] transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* Slide-in mobile menu */}
      <div
        className={`lg:hidden fixed right-0 top-0 w-[75%] max-w-[380px] h-screen bg-body shadow-[-5px_0_30px_rgba(0,0,0,0.2)] z-[99999] transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-2.5 border-b border-gray-200">
          <div className="flex items-center gap-5">
            <img
              src={image.logo}
              alt="Luac logo"
              width="40"
              height="40"
              className="rounded-full border-2 border-primary"
            />
            <div className="leading-tight">
              <h1 className="text-lg font-extrabold text-primary">LUAC</h1>
              <span className="text-xs text-muted whitespace-nowrap">Computing Platform</span>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <XMarkIcon className="size-8 text-primary" />
          </button>
        </div>

        <nav className="p-2.5">
          <ul className="list-none space-y-2">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-[10px] text-dark font-semibold hover:bg-hoverBg"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute left-0 bottom-4 w-full flex flex-col gap-3 p-4 bg-body border-t border-iconBg">
          <Link to='/login' className="w-full py-3 px-3 rounded-[10px] text-sm text-navlink border border-iconBg">
            Sign In
          </Link>
          <Link to='/register' className="w-full py-3 px-3 rounded-[10px] text-sm font-bold text-white bg-primary">
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}