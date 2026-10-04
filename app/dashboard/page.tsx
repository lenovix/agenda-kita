'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'manage'>('browse')
  const [formData, setFormData] = useState({
    couple_name_male: '',
    couple_name_female: '',
    wedding_date: '',
    location: '',
    category: 'Romantic',
    selected_template: '001',
  })
  const [saved, setSaved] = useState(false)

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateInvitation = () => {
    if (!formData.couple_name_male || !formData.couple_name_female || !formData.wedding_date) {
      alert('Isi semua data!')
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    console.log('Saving:', formData)
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
              activeTab === 'browse'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            📚 Lihat Template
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`p-4 rounded-lg font-semibold transition ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            ✨ Buat Undangan
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`p-4 rounded-lg font-semibold transition ${
              activeTab === 'manage'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md'
            }`}
          >
            📋 Undangan Saya
          </button>
          <Link href="/dashboard/editor">
            <button className="p-4 rounded-lg font-semibold bg-white text-slate-700 hover:shadow-md transition w-full">
              🎨 Studio Editor
            </button>
          </Link>
          <Link href="/">
            <button className="p-4 rounded-lg font-semibold bg-white text-slate-700 hover:shadow-md transition w-full">
              🏠 Beranda
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
            <CardHeader>
              <CardTitle>Buat Undangan Baru</CardTitle>
              <CardDescription>Isi data pernikahan Anda untuk membuat undangan digital</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="male-name">Nama Mempelai Pria</Label>
                  <Input
                    id="male-name"
                    placeholder="Nama lengkap"
                    value={formData.couple_name_male}
                    onChange={(e) => handleFormChange('couple_name_male', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="female-name">Nama Mempelai Wanita</Label>
                  <Input
                    id="female-name"
                    placeholder="Nama lengkap"
                    value={formData.couple_name_female}
                    onChange={(e) => handleFormChange('couple_name_female', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="wedding-date">Tanggal Pernikahan</Label>
                <Input
                  id="wedding-date"
                  type="date"
                  value={formData.wedding_date}
                  onChange={(e) => handleFormChange('wedding_date', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="location">Lokasi Resepsi</Label>
                <Input
                  id="location"
                  placeholder="Nama gedung, alamat"
                  value={formData.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category">Kategori Template</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option>Romantic</option>
                  <option>Luxury</option>
                  <option>Modern</option>
                  <option>Tradisional</option>
                  <option>Clean</option>
                  <option>Elegant</option>
                </select>
              </div>

              <div>
                <Label htmlFor="template">Pilih Template</Label>
                <select
                  id="template"
                  value={formData.selected_template}
                  onChange={(e) => handleFormChange('selected_template', e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  {TEMPLATES.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateInvitation} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Buat Undangan
                </Button>
                <Button variant="outline" className="flex-1">
                  Batal
                </Button>
              </div>

              {saved && (
                <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                  ✓ Undangan berhasil dibuat! Silakan lihat di halaman Undangan Saya.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Undangan Saya</h2>
              <p className="text-slate-600 mb-6">Kelola dan edit undangan yang sudah dibuat</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">Belum ada undangan yang dibuat</p>
                  <Button onClick={() => setActiveTab('create')} className="bg-blue-600">
                    Buat Undangan Pertama
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}