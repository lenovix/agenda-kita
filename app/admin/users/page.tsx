import { requireAdmin, resetUserPassword, setUserRole } from '../_actions'
import { createServerClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users, Shield, ShieldOff, RotateCcw } from 'lucide-react'

export default async function AdminUsersPage() {
  await requireAdmin()
  const adminClient = createServerClient()

  // Fetch user roles
  const { data: roles } = await adminClient
    .from('user_roles')
    .select('*')

  // Fetch user auth data via admin API
  const { data: authUsersData } = await adminClient.auth.admin.listUsers()
  const authUsers = authUsersData?.users || []

  // Join with roles
  const usersWithRoles = authUsers.map(user => ({
    ...user,
    role: roles?.find(r => r.user_id === user.id)?.role || 'user',
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manajemen Pengguna</h1>
        <p className="text-slate-400 text-sm">Daftar akun pengguna, reset kata sandi, dan pengaturan peran (admin/user)</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" /> Daftar Akun Terdaftar ({usersWithRoles.length})
          </CardTitle>
          <CardDescription className="text-slate-400">
            Kelola akun dan akses administatif pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-xs font-semibold text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Email Pengguna</th>
                  <th className="p-3">Status Akun</th>
                  <th className="p-3">Peran</th>
                  <th className="p-3">Bergabung</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {usersWithRoles.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-700/30">
                    <td className="p-3 font-semibold text-white">{u.email}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Aktif
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        u.role === 'admin'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {u.role === 'admin' ? 'Superadmin' : 'User Biasa'}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-400">
                      {new Date(u.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Role */}
                        <form action={setUserRole.bind(null, u.id, u.role === 'admin' ? 'user' : 'admin')}>
                          <Button size="sm" variant="outline" type="submit" className="h-7 text-xs bg-slate-900 border-slate-700 text-slate-300 hover:text-white">
                            {u.role === 'admin' ? (
                              <><ShieldOff className="w-3 h-3 mr-1 text-amber-400" /> Jadikan User</>
                            ) : (
                              <><Shield className="w-3 h-3 mr-1 text-red-400" /> Jadikan Admin</>
                            )}
                          </Button>
                        </form>

                        {/* Reset Password Form Inline */}
                        <form
                          action={async (formData: FormData) => {
                            'use server'
                            const pwd = formData.get('new_password') as string
                            if (pwd && pwd.length >= 6) {
                              await resetUserPassword(u.id, pwd)
                            }
                          }}
                          className="flex items-center gap-1"
                        >
                          <Input
                            name="new_password"
                            type="password"
                            placeholder="Sandi Baru"
                            required
                            minLength={6}
                            className="h-7 w-24 text-xs bg-slate-900 border-slate-700 text-white px-2"
                          />
                          <Button size="sm" variant="outline" type="submit" className="h-7 text-xs bg-slate-900 border-slate-700 text-slate-300 hover:text-white">
                            <RotateCcw className="w-3 h-3 mr-1" /> Reset
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
