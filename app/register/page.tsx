'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signupAction, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Daftar Akun</CardTitle>
          <CardDescription>Buat akun baru untuk mulai membuat undangan</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" name="name" required className="mt-1" placeholder="Nama Anda" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-1" placeholder="email@kamu.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="mt-1" placeholder="Minimal 6 karakter" />
            </div>
            {state?.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{state.error}</p>
            )}
            {state?.success && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                {state.success}{' '}
                <Link href="/login" className="font-semibold underline">
                  Login di sini
                </Link>
              </div>
            )}
            <Button type="submit" disabled={pending} className="w-full bg-blue-600 hover:bg-blue-700">
              {pending ? 'Mendaftar...' : 'Daftar Sekarang'}
            </Button>
          </form>
          <p className="text-sm text-slate-600 text-center mt-4">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

async function signupAction(prev: any, formData: FormData) {
  return await signup(formData)
}
