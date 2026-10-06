'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  PenTool,
  Library,
  Sparkles,
  ExternalLink
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/editor', label: 'Studio Editor', icon: PenTool },
  { href: '/admin', label: 'Panel Superadmin', icon: Sparkles },
  { href: '/templates', label: 'Katalog Template', icon: Library, external: true },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border min-h-[calc(100vh-3.5rem)] flex flex-col justify-between hidden md:flex shrink-0">
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Menu Utama
          </p>
          <nav className="space-y-1 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition ${isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.external && <ExternalLink className="w-3.5 h-3.5 text-slate-300" />}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-1">
            <Sparkles className="w-4 h-4" />
            AgendaKita Pro
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
            Bikin undangan elegan tanpa batas dengan custom domain & musik.
          </p>
          <Link
            href="/pricelist"
            className="block text-center text-xs font-semibold py-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upgrade Paket
          </Link>
        </div>
      </div>
    </aside>
  )
}
