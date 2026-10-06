'use client'

import { useState, useActionState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { createInvitation, deleteInvitation, addGuest, removeGuest, checkInGuest, toggleHideWish, deleteWish, importGuestsBulk } from '../_actions'
import { useFormStatus } from 'react-dom'
import QRCode from 'qrcode'
import { Html5QrcodeScanner } from 'html5-qrcode'
import {
  Users,
  MessageSquare,
  QrCode,
  Send,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  HelpCircle,
  Calendar,
  MapPin,
  Sparkles,
  Camera,
  X
} from 'lucide-react'

type Invitation = {
  id: string
  couple_name_male: string
  couple_name_female: string
  wedding_date: string
  location: string | null
  category: string
  selected_template: string
  created_at: string
}

type Guest = {
  id: string
  invitation_id: string
  name: string
  phone: string | null
  session: string
  pax: number
  status: 'pending' | 'hadir' | 'ragu' | 'tidak_hadir'
  checked_in: boolean
  checked_in_at: string | null
  notes: string | null
}

type Wish = {
  id: string
  invitation_id: string
  guest_name: string
  message: string
  status: string
  is_hidden: boolean
  created_at: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="flex-1 bg-blue-600 hover:bg-blue-700">
      {pending ? 'Menyimpan...' : 'Buat Undangan'}
    </Button>
  )
}

function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      {pending ? 'Menghapus...' : 'Hapus'}
    </Button>
  )
}

export default function DashboardClient({
  invitations,
  initialGuests = [],
  initialWishes = []
}: {
  invitations: Invitation[]
  initialGuests?: Guest[]
  initialWishes?: Wish[]
}) {
  const [selectedInvId, setSelectedInvId] = useState<string>(invitations[0]?.id || '')
  const [activePanel, setActivePanel] = useState<'overview' | 'guests' | 'wa' | 'rsvp' | 'qrcode'>('overview')

  const [createState, createAction] = useActionState(createInvitation, null)

  // QR & Scanner State
  const [selectedQrGuest, setSelectedQrGuest] = useState<Guest | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [showScanner, setShowScanner] = useState(false)
  const [scannerResult, setScannerResult] = useState<string | null>(null)

  // Filtered lists for selected invitation
  const currentInv = invitations.find(i => i.id === selectedInvId) || invitations[0]
  const guests = initialGuests.filter(g => g.invitation_id === selectedInvId)
  const wishes = initialWishes.filter(w => w.invitation_id === selectedInvId)

  // Custom WA message template
  const [waTemplate, setWaTemplate] = useState(
    'Halo {nama}, kami mengundang Anda ke pernikahan {pria} & {wanita} pada tanggal {tanggal}. Sesi: {sesi}. Mohon RSVP di link berikut: https://agendakita.ai/inv/{id}'
  )

  // Stat calculations
  const totalGuests = guests.length
  const totalHadir = guests.filter(g => g.status === 'hadir').length
  const totalRagu = guests.filter(g => g.status === 'ragu').length
  const totalTidakHadir = guests.filter(g => g.status === 'tidak_hadir').length
  const totalCheckedIn = guests.filter(g => g.checked_in).length

  // Generate QR image on select
  useEffect(() => {
    if (selectedQrGuest) {
      QRCode.toDataURL(selectedQrGuest.id, { width: 250, margin: 2 })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err))
    }
  }, [selectedQrGuest])

  // Camera QR Scanner init
  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null
    if (showScanner) {
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      )

      scanner.render(
        async (decodedText) => {
          setScannerResult(decodedText)
          if (scanner) {
            scanner.clear().catch(() => { })
          }
          setShowScanner(false)

          // Perform checkin action
          if (selectedInvId) {
            const res = await checkInGuest(decodedText, selectedInvId)
            if (res?.success) {
              alert(`✓ Check-in Berhasil untuk Tamu ID: ${decodedText}`)
            } else {
              alert(`⚠️ Gagal Check-in: ${res?.error || 'Tamu tidak ditemukan'}`)
            }
          }
        },
        (_error) => { }
      )
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(() => { })
      }
    }
  }, [showScanner, selectedInvId])

  // Export CSV
  const exportToCSV = () => {
    if (guests.length === 0) return alert('Belum ada tamu untuk diexport.')
    const headers = ['Nama', 'Telepon', 'Sesi', 'Jumlah Pax', 'Status RSVP', 'Check-in']
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.phone || ''}"`,
      `"${g.session}"`,
      g.pax,
      `"${g.status}"`,
      g.checked_in ? 'Ya' : 'Tidak'
    ])

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Daftar_Tamu_${currentInv?.couple_name_male || 'Undangan'}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Import CSV Client Handler
  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedInvId) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = event.target?.result as string
      if (!text) return
      const lines = text.split('\n').map(l => l.trim()).filter(l => l)
      if (lines.length < 2) return alert('File CSV kosong atau format salah.')

      const items = lines.slice(1).map(line => {
        const parts = line.split(',').map(p => p.replace(/^"|"$/g, '').trim())
        return {
          name: parts[0] || 'Tamu',
          phone: parts[1] || '',
          session: parts[2] || 'Sesi 1',
          pax: Number(parts[3]) || 1
        }
      })

      const res = await importGuestsBulk(selectedInvId, items)
      if (res?.success) {
        alert(`✓ Berhasil mengimport ${res.count} tamu!`)
      } else {
        alert(`⚠️ Gagal import: ${res?.error}`)
      }
    }
    reader.readAsText(file)
  }

  // Construct WhatsApp Link per guest
  const getWaLink = (guest: Guest) => {
    if (!guest.phone) return '#'
    const cleanPhone = guest.phone.replace(/[^0-9]/g, '')
    const formattedPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone

    const text = waTemplate
      .replace('{nama}', guest.name)
      .replace('{pria}', currentInv?.couple_name_male || '')
      .replace('{wanita}', currentInv?.couple_name_female || '')
      .replace('{tanggal}', currentInv?.wedding_date || '')
      .replace('{sesi}', guest.session)
      .replace('{id}', selectedInvId)

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`
  }

  if (invitations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Buat Undangan Pertama Anda</CardTitle>
            <CardDescription>Mulai kelola pernikahan digital dengan platform AgendaKita</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAction} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="couple_name_male">Nama Mempelai Pria</Label>
                  <Input id="couple_name_male" name="couple_name_male" required placeholder="Andi Pratama" />
                </div>
                <div>
                  <Label htmlFor="couple_name_female">Nama Mempelai Wanita</Label>
                  <Input id="couple_name_female" name="couple_name_female" required placeholder="Sari Indah" />
                </div>
              </div>
              <div>
                <Label htmlFor="wedding_date">Tanggal Pernikahan</Label>
                <Input id="wedding_date" name="wedding_date" type="date" required />
              </div>
              <div>
                <Label htmlFor="location">Lokasi Resepsi</Label>
                <Input id="location" name="location" placeholder="Hotel Aston Jakarta" />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header Selector & Controls */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Client Panel Dashboard</h1>
            <p className="text-slate-500 text-sm">Kelola Tamu, RSVP, WA Broadcast, & QR Check-in</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedInvId}
              onChange={e => setSelectedInvId(e.target.value)}
              className="p-2 text-sm font-semibold border border-input rounded-xl bg-slate-50 text-slate-800"
            >
              {invitations.map(inv => (
                <option key={inv.id} value={inv.id}>
                  💍 {inv.couple_name_male} & {inv.couple_name_female} ({inv.wedding_date})
                </option>
              ))}
            </select>

            <Link href={`/dashboard/editor?id=${selectedInvId}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                ✏️ Edit Konten Undangan
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Panel */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'overview', label: 'Ringkasan & Stat', icon: Users },
            { id: 'guests', label: 'Daftar Tamu & Sesi', icon: Plus },
            { id: 'wa', label: 'WhatsApp Broadcast', icon: Send },
            { id: 'rsvp', label: 'Buku Tamu & Ucapan', icon: MessageSquare },
            { id: 'qrcode', label: 'QR Check-in & Scanner', icon: QrCode },
          ].map(tab => {
            const Icon = tab.icon
            const isActive = activePanel === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition ${isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-border'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* PANEL 1: OVERVIEW & STATISTIK */}
        {activePanel === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-white">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Total Tamu</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalGuests}</h3>
                </CardContent>
              </Card>
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-emerald-700 font-semibold uppercase">Hadir</p>
                  <h3 className="text-3xl font-bold text-emerald-800 mt-1">{totalHadir}</h3>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-amber-700 font-semibold uppercase">Ragu-Ragu</p>
                  <h3 className="text-3xl font-bold text-amber-800 mt-1">{totalRagu}</h3>
                </CardContent>
              </Card>
              <Card className="bg-rose-50 border-rose-200">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-rose-700 font-semibold uppercase">Tidak Hadir</p>
                  <h3 className="text-3xl font-bold text-rose-800 mt-1">{totalTidakHadir}</h3>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200 col-span-2 md:col-span-1">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-blue-700 font-semibold uppercase">Checked-In (QR)</p>
                  <h3 className="text-3xl font-bold text-blue-800 mt-1">{totalCheckedIn}</h3>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detail Undangan Pernikahan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p><strong>Pasangan:</strong> {currentInv?.couple_name_male} & {currentInv?.couple_name_female}</p>
                <p><strong>Tanggal:</strong> {currentInv?.wedding_date}</p>
                <p><strong>Lokasi:</strong> {currentInv?.location || '-'}</p>
                <p><strong>Template:</strong> #{currentInv?.selected_template} ({currentInv?.category})</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PANEL 2: MANAJEMEN DAFTAR TAMU & SESI */}
        {activePanel === 'guests' && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tambah Tamu Undangan</CardTitle>
                  <CardDescription>Masukkan nama, nomor WhatsApp, dan sesi kehadiran</CardDescription>
                </div>
                <div className="flex gap-2">
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border">
                    <Upload className="w-3.5 h-3.5" /> Import CSV
                    <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
                  </label>
                  <Button size="sm" variant="outline" onClick={exportToCSV} className="text-xs">
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const fd = new FormData(form)
                    const res = await addGuest(fd)
                    if (res?.error) alert(res.error)
                    else form.reset()
                  }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3"
                >
                  <input type="hidden" name="invitation_id" value={selectedInvId} />
                  <Input name="name" placeholder="Nama Lengkap Tamu" required />
                  <Input name="phone" placeholder="No. WA (0812...)" />
                  <select name="session" className="p-2 border rounded-lg text-sm bg-transparent">
                    <option value="Sesi 1 (08.00 - 10.00)">Sesi 1 (08.00 - 10.00)</option>
                    <option value="Sesi 2 (11.00 - 13.00)">Sesi 2 (11.00 - 13.00)</option>
                    <option value="VIP / Khusus">VIP / Khusus</option>
                  </select>
                  <Input name="pax" type="number" defaultValue="1" placeholder="Jumlah Pax" min="1" />
                  <Button type="submit" className="bg-blue-600">Simpan Tamu</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daftar Tamu ({guests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {guests.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-6">Belum ada daftar tamu.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-100 text-xs font-semibold uppercase text-slate-600">
                        <tr>
                          <th className="p-3">Nama</th>
                          <th className="p-3">WhatsApp</th>
                          <th className="p-3">Sesi</th>
                          <th className="p-3">Pax</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Check-in</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {guests.map(g => (
                          <tr key={g.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-900">{g.name}</td>
                            <td className="p-3">{g.phone || '-'}</td>
                            <td className="p-3"><span className="bg-slate-200 text-slate-800 text-xs px-2 py-0.5 rounded">{g.session}</span></td>
                            <td className="p-3">{g.pax} org</td>
                            <td className="p-3">
                              <span className={`text-xs px-2 py-1 rounded font-semibold ${g.status === 'hadir' ? 'bg-emerald-100 text-emerald-800' :
                                  g.status === 'ragu' ? 'bg-amber-100 text-amber-800' :
                                    g.status === 'tidak_hadir' ? 'bg-rose-100 text-rose-800' :
                                      'bg-slate-100 text-slate-600'
                                }`}>
                                {g.status}
                              </span>
                            </td>
                            <td className="p-3">
                              {g.checked_in ? (
                                <span className="text-emerald-600 font-semibold text-xs">✓ Checked-In</span>
                              ) : (
                                <span className="text-slate-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={async () => {
                                  if (confirm(`Hapus tamu ${g.name}?`)) {
                                    await removeGuest(g.id, selectedInvId)
                                  }
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
        )}

        {/* PANEL 3: WHATSAPP LINK GENERATOR & BROADCAST */}
        {activePanel === 'wa' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kustomisasi Draf Pesan WhatsApp</CardTitle>
                <CardDescription>Gunakan tag placeholder: {'{nama}'}, {'{pria}'}, {'{wanita}'}, {'{tanggal}'}, {'{sesi}'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={waTemplate}
                  onChange={e => setWaTemplate(e.target.value)}
                  rows={3}
                  className="text-sm font-mono"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kirim Undangan WhatsApp (1-Klik)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guests.filter(g => g.phone).map(g => (
                    <div key={g.id} className="flex items-center justify-between p-3 border rounded-xl bg-white hover:bg-slate-50">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{g.name}</h4>
                        <p className="text-xs text-slate-500">{g.phone} • {g.session}</p>
                      </div>
                      <a
                        href={getWaLink(g)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" /> Kirim WA
                      </a>
                    </div>
                  ))}
                  {guests.filter(g => g.phone).length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-6">Belum ada nomor WhatsApp tamu terisi.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PANEL 4: BUKU TAMU & MODERASI UCAPAN */}
        {activePanel === 'rsvp' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderasi Doa & Ucapan Buku Tamu ({wishes.length})</CardTitle>
                <CardDescription>Sembunyikan ucapan yang kurang pantas dari tampilan undangan digital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {wishes.map(w => (
                    <div key={w.id} className={`p-4 rounded-xl border ${w.is_hidden ? 'bg-slate-100 border-slate-300 opacity-60' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{w.guest_name}</h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              await toggleHideWish(w.id, w.is_hidden, selectedInvId)
                            }}
                            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 border px-2 py-1 rounded bg-white"
                          >
                            {w.is_hidden ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-amber-600" />}
                            {w.is_hidden ? 'Tampilkan' : 'Sembunyikan'}
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Hapus ucapan ini?')) {
                                await deleteWish(w.id, selectedInvId)
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 italic">"{w.message}"</p>
                    </div>
                  ))}
                  {wishes.length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-6">Belum ada ucapan doa dari tamu.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PANEL 5: QR CODE CHECK-IN & CAMERA SCANNER */}
        {activePanel === 'qrcode' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* QR Generator per Tamu */}
              <Card>
                <CardHeader>
                  <CardTitle>Generate QR Code Check-in</CardTitle>
                  <CardDescription>Pilih tamu untuk melihat & mengunduh QR Code personal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <select
                    onChange={e => {
                      const g = guests.find(g => g.id === e.target.value)
                      setSelectedQrGuest(g || null)
                    }}
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="">-- Pilih Tamu --</option>
                    {guests.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.session})
                      </option>
                    ))}
                  </select>

                  {selectedQrGuest && qrDataUrl && (
                    <div className="text-center p-6 bg-white border rounded-2xl space-y-3">
                      <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 mx-auto border p-2 rounded-xl" />
                      <h4 className="font-bold text-slate-900">{selectedQrGuest.name}</h4>
                      <p className="text-xs text-slate-500">ID: {selectedQrGuest.id}</p>
                      <a
                        href={qrDataUrl}
                        download={`QR_${selectedQrGuest.name}.png`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                      >
                        Download QR PNG
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Kamera Scanner Check-in */}
              <Card>
                <CardHeader>
                  <CardTitle>Scanner QR Resepsi Kamera HP</CardTitle>
                  <CardDescription>Petunjuk penerima tamu: scan QR tamu di meja penerima untuk check-in instan</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {!showScanner ? (
                    <Button onClick={() => setShowScanner(true)} className="bg-emerald-600 hover:bg-emerald-700 w-full py-6 text-base font-semibold">
                      <Camera className="w-5 h-5 mr-2" /> Buka Kamera Scanner QR
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div id="qr-reader" className="w-full overflow-hidden rounded-xl border"></div>
                      <Button variant="outline" onClick={() => setShowScanner(false)} className="w-full">
                        <X className="w-4 h-4 mr-1" /> Tutup Scanner
                      </Button>
                    </div>
                  )}

                  {scannerResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-mono">
                      Hasil Scan Terakhir: {scannerResult}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
