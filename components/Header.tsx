'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import AuthMenu from '@/components/AuthMenu'

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/dashboard', label: 'Studio' },
  { href: '/templates', label: 'Templates' },
  { href: '/pricelist', label: 'Pricelist' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link
          href="/home"
          className="flex items-center gap-2 font-bold text-xl tracking-tight transition hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span>
            Agenda<span className="text-primary">Kita</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${isActive
                  ? 'text-primary bg-primary/10 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <AuthMenu />
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {open && (
        <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="pt-2">
            <AuthMenu />
          </div>
        </div>
      )}
    </header>
  )
}