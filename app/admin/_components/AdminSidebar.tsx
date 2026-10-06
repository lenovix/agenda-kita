'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Palette,
  CreditCard,
  Users,
  ShieldCheck,
  Settings
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Analitik Platform', icon: BarChart3 },
  { href: '/admin/themes', label: 'Manajemen Tema', icon: Palette },
  { href: '/admin/orders', label: 'Order & Pembayaran', icon: CreditCard },
  { href: '/admin/users', label: 'Manajemen Pengguna', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-3.5rem)]">
      <div className="p-4 space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            Admin Navigation
          </p>
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl transition ${
                    isActive
                      ? 'bg-red-950 text-red-400 font-semibold border border-red-900/50'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <p className="font-semibold text-slate-400">Security Mode</p>
        <p className="text-[11px] text-slate-500">Role: Superadministrator</p>
      </div>
    </aside>
  )
}
