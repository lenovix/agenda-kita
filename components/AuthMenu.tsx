'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { User, LogOut } from 'lucide-react'

export default function AuthMenu() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          {user.email}
        </span>
        <Button size="sm" variant="outline" onClick={handleLogout} className="rounded-full">
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Keluar</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="ghost" className="rounded-full" onClick={() => router.push('/login')}>
        Masuk
      </Button>
      <Button size="sm" className="rounded-full shadow-sm hover:shadow">
        <Link href="/register">Daftar</Link>
      </Button>
    </div>
  )
}
