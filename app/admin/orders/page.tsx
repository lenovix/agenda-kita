import { requireAdmin, verifyOrderPayment, cancelOrder } from '../_actions'
import { createServerClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react'

export default async function AdminOrdersPage() {
  await requireAdmin()
  const adminClient = createServerClient()

  const { data: orders } = await adminClient
    .from('orders')
    .select('*, services(name, price)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manajemen Order & Pembayaran</h1>
        <p className="text-slate-400 text-sm">Pelacakan transaksi, verifikasi transfer manual, dan riwayat faktur</p>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" /> Daftar Transaksi Masuk ({orders?.length || 0})
          </CardTitle>
          <CardDescription className="text-slate-400">
            Daftar pesanan paket layanan dari pengguna platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!orders || orders.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">Belum ada transaksi</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-xs font-semibold text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">ID Order</th>
                    <th className="p-3">Layanan</th>
                    <th className="p-3">Jumlah</th>
                    <th className="p-3">Metode</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-700/30">
                      <td className="p-3 font-mono text-xs text-slate-400">{o.id.slice(0, 8)}...</td>
                      <td className="p-3 font-semibold text-white">{o.services?.name || 'Paket Layanan'}</td>
                      <td className="p-3 font-semibold text-emerald-400">
                        Rp {Number(o.amount).toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-xs">{o.payment_method || 'Transfer Bank'}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold inline-flex items-center gap-1 ${
                          o.status === 'paid'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : o.status === 'cancelled'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {o.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                          {o.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                          {o.status === 'pending' && <Clock className="w-3 h-3" />}
                          {o.status === 'paid' ? 'Lunas' : o.status === 'cancelled' ? 'Batal' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-slate-400">
                        {new Date(o.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-3 text-right">
                        {o.status === 'pending' && (
                          <div className="flex items-center justify-end gap-1">
                            <form action={verifyOrderPayment.bind(null, o.id)}>
                              <Button size="sm" type="submit" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
                                Verifikasi Lunas
                              </Button>
                            </form>
                            <form action={cancelOrder.bind(null, o.id)}>
                              <Button size="sm" variant="outline" type="submit" className="h-7 text-xs bg-slate-900 border-slate-700 text-slate-400 hover:text-red-400">
                                Batal
                              </Button>
                            </form>
                          </div>
                        )}
                        {o.status === 'paid' && (
                          <span className="text-xs text-emerald-400 font-medium">✓ Terverifikasi</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
