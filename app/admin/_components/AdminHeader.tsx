'use client'

import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
          <Shield className="w-4 h-4" />
        </div>
        <span className="font-bold tracking-tight text-white">
          AgendaKita <span className="text-red-500 font-mono text-xs ml-1 uppercase bg-red-950/80 px-2 py-0.5 rounded border border-red-800">Superadmin</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </header>
  )
}
