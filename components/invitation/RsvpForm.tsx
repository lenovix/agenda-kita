'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2 } from 'lucide-react'

export default function RsvpForm({
  invitationId,
  onSubmitRsvp,
}: {
  invitationId?: string
  onSubmitRsvp?: (data: { name: string; phone: string; status: string; pax: number; session: string }) => Promise<void>
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'hadir',
    pax: 1,
    session: 'Sesi 1 (Akad & Resepsi)',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (onSubmitRsvp) {
      await onSubmitRsvp(formData)
    }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="max-w-xl mx-auto bg-white/95 backdrop-blur border-emerald-200 text-center p-6 shadow-lg">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Terima Kasih atas Konfirmasinya!</h3>
        <p className="text-xs text-slate-600 mt-1">
          Konfirmasi kehadiran Anda telah tersimpan. Kami sangat menantikan kehadiran Anda di hari bahagia kami.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs"
        >
          Kirim Ulang / Ubah Jawaban
        </Button>
      </Card>
    )
  }

  return (
    <Card className="max-w-xl mx-auto bg-white/90 backdrop-blur border-border/60 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Konfirmasi Kehadiran (RSVP)</CardTitle>
        <CardDescription className="text-xs">
          Mohon konfirmasikan kehadiran Anda untuk membantu persiapan jamuan & tempat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <Label htmlFor="name" className="text-xs font-semibold">Nama Lengkap</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Bpk. Kurniawan & Keluarga"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone" className="text-xs font-semibold">Nomor WhatsApp</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08123456789"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="session" className="text-xs font-semibold">Pilihan Sesi Acara</Label>
              <select
                id="session"
                value={formData.session}
                onChange={e => setFormData({ ...formData, session: e.target.value })}
                className="w-full mt-1 p-2 border border-input rounded-lg text-sm bg-transparent"
              >
                <option value="Sesi 1 (Akad & Resepsi Siang)">Sesi 1 (Akad & Resepsi Siang)</option>
                <option value="Sesi 2 (Resepsi Malam)">Sesi 2 (Resepsi Malam)</option>
                <option value="VIP / Undangan Khusus">VIP / Undangan Khusus</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="status" className="text-xs font-semibold">Konfirmasi Kehadiran</Label>
              <select
                id="status"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full mt-1 p-2 border border-input rounded-lg text-sm bg-transparent"
              >
                <option value="hadir">✓ Ya, Saya Akan Hadir</option>
                <option value="ragu">? Masih Ragu-ragu</option>
                <option value="tidak_hadir">✕ Maaf, Tidak Dapat Hadir</option>
              </select>
            </div>
            <div>
              <Label htmlFor="pax" className="text-xs font-semibold">Jumlah Tamu</Label>
              <Input
                id="pax"
                type="number"
                min="1"
                max="5"
                value={formData.pax}
                onChange={e => setFormData({ ...formData, pax: Number(e.target.value) })}
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 mt-2">
            {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
