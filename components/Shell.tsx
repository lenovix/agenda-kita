'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import DashboardFooter from './DashboardFooter'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard') && pathname !== '/dashboard/editor'
  const isEditor = pathname === '/dashboard/editor'
  const isAdmin = pathname?.startsWith('/admin')
  const hide = pathname?.match(/^\/templates\/template-/)

  if (hide || isEditor || pathname?.startsWith('/inv') || isAdmin) return <>{children}</>

  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <DashboardHeader />
        <div className="flex-1 flex">
          <DashboardSidebar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
        <DashboardFooter />
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}