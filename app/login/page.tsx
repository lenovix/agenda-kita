'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { login, signup } from '@/app/auth/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)
  const redirectTo = useRedirectTo()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <CardDescription>Masuk ke akun AgendaKita Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-1" placeholder="email@kamu.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="mt-1" placeholder="••••••••" />
            </div>
            {state?.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{state.error}</p>
            )}
            <Button type="submit" disabled={pending} className="w-full bg-blue-600 hover:bg-blue-700">
              {pending ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          <p className="text-sm text-slate-600 text-center mt-4">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Daftar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

async function loginAction(prev: any, formData: FormData) {
  return await login(formData)
}

function useRedirectTo() {
  const [v] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('redirectTo') || '/dashboard'
  })
  return v
}
