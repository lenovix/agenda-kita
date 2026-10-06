import { requireAdmin } from './_actions'
import { createServerClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, DollarSign, TrendingUp, Palette, CreditCard } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  await requireAdmin()
  const adminClient = createServerClient()

  // Fetch data analytics
  const [invitationsRes, ordersRes, templatesRes, usersRes] = await Promise.all([
    adminClient.from('invitations').select('id, created_at, selected_template'),
    adminClient.from('orders').select('id, amount, status, created_at'),
    adminClient.from('templates').select('id, title, category, status'),
    adminClient.from('user_roles').select('user_id, role'),
  ])

  const invitations = invitationsRes.data || []
  const orders = ordersRes.data || []
  const templates = templatesRes.data || []
  const users = usersRes.data || []

  // Hitung statistik
  const totalUndanganAktif = invitations.length
  const totalPengguna = users.length
  const totalTema = templates.length
  const temaAktif = templates.filter(t => t.status === 'active').length

  // Omset bulanan (dari order paid)
  const paidOrders = orders.filter(o => o.status === 'paid')
  const totalOmset = paidOrders.reduce((sum, o) => sum + Number(o.amount), 0)

  // Omset per bulan (6 bulan terakhir)
  const monthlyRevenue: Record<string, number> = {}
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
    monthlyRevenue[key] = 0
  }
  paidOrders.forEach(o => {
    const d = new Date(o.created_at)
    const key = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
    if (monthlyRevenue[key] !== undefined) {
      monthlyRevenue[key] += Number(o.amount)
    }
  })

  // Tema paling populer
  const templateCount: Record<string, number> = {}
  invitations.forEach(inv => {
    const tplId = inv.selected_template
    templateCount[tplId] = (templateCount[tplId] || 0) + 1
  })
  const popularTemplates = Object.entries(templateCount)
    .map(([id, count]) => ({
      id,
      count,
      title: templates.find(t => t.id === id)?.title || `Template #${id}`,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const maxRevenue = Math.max(...Object.values(monthlyRevenue), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analitik Platform</h1>
        <p className="text-slate-400 text-sm">Laporan performa platform AgendaKita</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Undangan Aktif</p>
                <p className="text-3xl font-bold text-white mt-1">{totalUndanganAktif}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Pengguna</p>
                <p className="text-3xl font-bold text-white mt-1">{totalPengguna}</p>
              </div>
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Omset</p>
                <p className="text-3xl font-bold text-white mt-1">
                  Rp {totalOmset.toLocaleString('id-ID')}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Tema Aktif</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {temaAktif} <span className="text-sm text-slate-400 font-normal">/ {totalTema}</span>
                </p>
              </div>
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Omset Bulanan */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Omset Bulanan (6 Bulan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(monthlyRevenue).map(([month, amount]) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16 shrink-0">{month}</span>
                  <div className="flex-1 bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.max((amount / maxRevenue) * 100, 2)}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {amount > 0 ? `Rp ${(amount / 1000).toFixed(0)}k` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tema Populer */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" /> Tema Paling Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {popularTemplates.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">Belum ada data undangan</p>
            ) : (
              <div className="space-y-3">
                {popularTemplates.map((tpl, i) => (
                  <div key={tpl.id} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{tpl.title}</p>
                      <p className="text-xs text-slate-400">{tpl.count} undangan dibuat</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Status Summary */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" /> Ringkasan Status Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-800/50">
              <p className="text-2xl font-bold text-amber-400">{orders.filter(o => o.status === 'pending').length}</p>
              <p className="text-xs text-amber-300/70 mt-1">Pending</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/50">
              <p className="text-2xl font-bold text-emerald-400">{orders.filter(o => o.status === 'paid').length}</p>
              <p className="text-xs text-emerald-300/70 mt-1">Lunas</p>
            </div>
            <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/50">
              <p className="text-2xl font-bold text-red-400">{orders.filter(o => o.status === 'cancelled').length}</p>
              <p className="text-xs text-red-300/70 mt-1">Dibatalkan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
