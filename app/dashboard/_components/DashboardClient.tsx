'use client'

import { useState, useActionState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { createInvitation, deleteInvitation } from '../_actions'
import { useFormStatus } from 'react-dom'

const TEMPLATES = [
  { id: '001', title: 'Blossom Romance', category: 'Romantic', desc: 'Pastel pink floral, lembut & elegan' },
  { id: '002', title: 'Royal Black Gold', category: 'Luxury', desc: 'Hitam-emas mewah, modern minimalis' },
  { id: '003', title: 'Traditional Minang', category: 'Tradisional', desc: 'Cokelat-emas songket, Rumah Gadang' },
  { id: '004', title: 'Recky & Zahra', category: 'Modern', desc: 'Tanah-minimalis, quote Quran, carousel' },
  { id: '005', title: 'Hendra & Erika', category: 'Modern', desc: 'Blue-ice minimalis, video, bubble wishes' },
  { id: '006', title: 'Jaewoung & Cindy', category: 'Clean', desc: 'White minimalist, Korean bilingual' },
  { id: '007', title: 'Garden Pink', category: 'Romantic', desc: 'Playfair Display, rounded, floral vibes' },
  { id: '008', title: 'Luxury Black Gold', category: 'Luxury', desc: 'Cinzel serif, dark elegant' },
  { id: '009', title: 'Traditional Batik', category: 'Tradisional', desc: 'Great Vibes font, emerald, soft' },
  { id: '010', title: 'Colorful Modern', category: 'Modern', desc: 'Gradient text, vibrant, rounded' },
]

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

export default function DashboardClient({ invitations }: { invitations: Invitation[] }) {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'manage'>('browse')
  const [createState, createAction] = useActionState(createInvitation, null)

  useEffect(() => {
    if (createState?.success) {
      setActiveTab('manage')
    }
  }, [createState])

  const fillTestData = () => {
    const values: Record<string, string> = {
      couple_name_male: 'Andi Pratama',
      couple_name_female: 'Sari Indah',
      wedding_date: '2026-06-20',
      location: 'Grand Ballroom Hotel Aston, Jakarta',
    }
    Object.entries(values).forEach(([name, value]) => {
      const el = document.getElementById(name) as HTMLInputElement | null
      if (el) el.value = value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Wedding Studio</h1>
          <p className="text-slate-600">Buat undangan pernikahan digital dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`p-4 rounded-lg font-semibold transition ${
              activeTab === 'browse' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            📚 Lihat Template
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`p-4 rounded-lg font-semibold transition ${
              activeTab === 'create' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            ✨ Buat Undangan
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`p-4 rounded-lg font-semibold transition ${
              activeTab === 'manage' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            📋 Undangan Saya ({invitations.length})
          </button>
          <Link href="/dashboard/editor">
            <button className="p-4 rounded-lg font-semibold bg-white text-slate-700 hover:shadow-md transition w-full h-full">
              🎨 Studio Editor
            </button>
          </Link>
        </div>

        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Template Tersedia</h2>
              <p className="text-slate-600 mb-6">Pilih template favorit Anda sebagai dasar undangan</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEMPLATES.map((tpl) => (
                <Card key={tpl.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-5xl">
                    💒
                  </div>
                  <CardHeader>
                    <CardDescription>{tpl.category}</CardDescription>
                    <CardTitle>{tpl.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">{tpl.desc}</p>
                    <Link href={`/templates/template-${tpl.id}`}>
                      <Button className="w-full">Preview</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Buat Undangan Baru</CardTitle>
                <CardDescription>Isi data pernikahan Anda untuk membuat undangan digital</CardDescription>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillTestData}
                  className="text-amber-600 border-amber-300 hover:bg-amber-50"
                >
                  ⚡ Test Data
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <form action={createAction} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="couple_name_male">Nama Mempelai Pria</Label>
                    <Input id="couple_name_male" name="couple_name_male" placeholder="Nama lengkap" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="couple_name_female">Nama Mempelai Wanita</Label>
                    <Input id="couple_name_female" name="couple_name_female" placeholder="Nama lengkap" required className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="wedding_date">Tanggal Pernikahan</Label>
                  <Input id="wedding_date" name="wedding_date" type="date" required className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="location">Lokasi Resepsi</Label>
                  <Input id="location" name="location" placeholder="Nama gedung, alamat" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="category">Kategori Template</Label>
                  <select id="category" name="category" className="w-full mt-2 p-2 border border-input rounded-md bg-transparent text-sm">
                    <option value="Romantic">Romantic</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Modern">Modern</option>
                    <option value="Tradisional">Tradisional</option>
                    <option value="Clean">Clean</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="selected_template">Pilih Template</Label>
                  <select id="selected_template" name="selected_template" className="w-full mt-2 p-2 border border-input rounded-md bg-transparent text-sm">
                    {TEMPLATES.map((tpl) => (
                      <option key={tpl.id} value={tpl.id}>
                        {tpl.title}
                      </option>
                    ))}
                  </select>
                </div>

                {createState?.error && <p className="text-red-500 text-sm">{createState.error}</p>}

                <div className="flex gap-3 pt-4">
                  <SubmitButton />
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveTab('browse')}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Undangan Saya</h2>
              <p className="text-slate-600 mb-6">Kelola dan edit undangan yang sudah dibuat</p>
            </div>
            
            {invitations.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-slate-600 mb-4">Belum ada undangan yang dibuat</p>
                  <Button onClick={() => setActiveTab('create')} className="bg-blue-600">
                    Buat Undangan Pertama
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {invitations.map((inv) => (
                  <Card key={inv.id}>
                    <CardHeader>
                      <CardTitle>{inv.couple_name_male} & {inv.couple_name_female}</CardTitle>
                      <CardDescription>
                        {new Date(inv.wedding_date).toLocaleDateString('id-ID', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm">
                        <p><strong>Lokasi:</strong> {inv.location || '-'}</p>
                        <p><strong>Template:</strong> #{inv.selected_template} ({inv.category})</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/editor?id=${inv.id}`} className="flex-1">
                          <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Edit</Button>
                        </Link>
                        <Link href={`/templates/template-${inv.selected_template}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">Preview</Button>
                        </Link>
                        <form action={deleteInvitation}>
                          <input type="hidden" name="id" value={inv.id} />
                          <DeleteButton />
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
