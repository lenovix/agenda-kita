'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hide = pathname?.match(/^\/templates\/template-/) || pathname?.match(/^\/dashboard\/dashboard-/)

  if (hide) return <>{children}</>

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
