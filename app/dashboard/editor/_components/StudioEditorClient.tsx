'use client'

import { useState, useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { updateInvitation } from '../_actions'
import { Smartphone, Monitor, Palette, Heart, Calendar, MapPin, Music, Image as ImageIcon, Sparkles, Check } from 'lucide-react'

const PALETTES = [
  { name: 'Rose Romance', bg: 'bg-rose-50', accent: 'text-rose-700', border: 'border-rose-300', btn: 'bg-rose-600 hover:bg-rose-700' },
  { name: 'Emerald Sage', bg: 'bg-emerald-50', accent: 'text-emerald-800', border: 'border-emerald-300', btn: 'bg-emerald-700 hover:bg-emerald-800' },
  { name: 'Royal Navy', bg: 'bg-slate-900', accent: 'text-amber-200', border: 'border-amber-400/30', btn: 'bg-amber-600 hover:bg-amber-700' },
  { name: 'Golden Luxury', bg: 'bg-amber-50', accent: 'text-amber-900', border: 'border-amber-300', btn: 'bg-amber-700 hover:bg-amber-800' },
  { name: 'Classic Monokrom', bg: 'bg-zinc-100', accent: 'text-zinc-900', border: 'border-zinc-300', btn: 'bg-zinc-900 hover:bg-zinc-800' },
  { name: 'Lavender Bliss', bg: 'bg-purple-50', accent: 'text-purple-800', border: 'border-purple-300', btn: 'bg-purple-600 hover:bg-purple-700' },
]

export default function StudioEditorClient({ initialData }: { initialData?: any }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    couple_name_male: initialData?.couple_name_male || 'Andi Pratama',
    groom_parents: initialData?.groom_parents || 'Putra dari Bpk. Bambang & Ibu Sri',
    couple_name_female: initialData?.couple_name_female || 'Sari Indah',
    bride_parents: initialData?.bride_parents || 'Putri dari Bpk. Hendra & Ibu Dewi',
    wedding_date: initialData?.wedding_date || '2026-06-20',
    akad_time: initialData?.akad_time || '08:00 - 10:00 WIB',
    reception_time: initialData?.reception_time || '11:00 - 14:00 WIB',
    location: initialData?.location || 'Grand Ballroom Hotel Aston, Jakarta',
    maps_url: initialData?.maps_url || 'https://maps.google.com',
    quote: initialData?.quote || '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu...” (QS. Ar-Rum: 21)',
    story: initialData?.story || 'Pertama kali bertemu di bangku kuliah tahun 2020, lalu memutuskan melangkah bersama.',
    selected_template: initialData?.selected_template || '001',
    category: initialData?.category || 'Romantic',
    music_url: initialData?.music_url || 'https://example.com/audio.mp3',
  })

  const [activeTab, setActiveTab] = useState<'mempelai' | 'acara' | 'cerita' | 'desain'>('mempelai')
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [palette, setPalette] = useState(PALETTES[0])
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [state, formAction, pending] = useActionState(updateInvitation, null)

  const fillTestData = () => {
    setFormData(prev => ({
      ...prev,
      couple_name_male: 'Dimas Anggara, S.Kom',
      groom_parents: 'Putra pertama dari Bpk. Ir. Bambang & Ibu Hj. Sri Wahyuni',
      couple_name_female: 'Nadia Salsabila, B.Des',
      bride_parents: 'Putri kedua dari Bpk. Drs. Hendra Kusuma & Ibu Dewi Kartika',
      wedding_date: '2026-10-18',
      akad_time: '08:30 - 10:30 WIB',
      reception_time: '11:30 - 15:00 WIB',
      location: 'Grand Ballroom Hotel Mulia, Senayan, Jakarta Pusat',
      maps_url: 'https://maps.google.com/?q=Hotel+Mulia+Senayan',
      quote: '“Dan Kami ciptakan kamu berpasang-pasangan.” (QS. An-Naba: 8)',
      story: 'Bermula dari perkenalan sederhana di kampus pada tahun 2021 hingga akhirnya mantap melangkah ke pelaminan bersama restu kedua keluarga.',
    }))
  }

  const updateField = (key: string, val: string) => {
    setFormData(prev => ({ ...prev, [key]: val }))
  }

  useEffect(() => {
    if (state?.success) {
      setSavedSuccess(true)
      const t = setTimeout(() => setSavedSuccess(false), 3000)
      return () => clearTimeout(t)
    }
  }, [state])

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">← Dashboard</Button>
          </Link>
          <div>
            <h1 className="text-base font-bold text-slate-800">Studio Editor Undangan</h1>
            <p className="text-xs text-muted-foreground">{formData.couple_name_male} & {formData.couple_name_female}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
          <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg border">
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
              title="Mobile Preview"
            >
              <Smartphone className="w-3.5 h-3.5" /> HP
            </button>
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
              title="Desktop Preview"
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
          </div>

          {formData.id ? (
            <Button form="editor-form" type="submit" disabled={pending} size="sm" className="bg-blue-600">
              {pending ? 'Menyimpan...' : savedSuccess ? '✓ Tersimpan' : 'Simpan Perubahan'}
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600">Pilih dari Undangan Saya</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Form Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border-r border-border p-6 overflow-y-auto max-h-[calc(100vh-65px)]">
          {/* Navigation Tabs */}
          <div className="flex border-b border-border mb-6">
            {[
              { id: 'mempelai', label: 'Mempelai', icon: Heart },
              { id: 'acara', label: 'Acara & Lokasi', icon: Calendar },
              { id: 'cerita', label: 'Cerita & Doa', icon: Sparkles },
              { id: 'desain', label: 'Tema & Palet', icon: Palette },
            ].map(tab => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 pb-3 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition ${
                    active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <form id="editor-form" action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={formData.id} />
            <input type="hidden" name="selected_template" value={formData.selected_template} />
            <input type="hidden" name="category" value={formData.category} />

            {/* TAB: MEMPELAI */}
            {activeTab === 'mempelai' && (
              <div className="space-y-4">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base">Profil Mempelai Pria</CardTitle>
                </CardHeader>
                <div>
                  <Label>Nama Lengkap Mempelai Pria</Label>
                  <Input
                    name="couple_name_male"
                    value={formData.couple_name_male}
                    onChange={e => updateField('couple_name_male', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Nama Orang Tua Pria</Label>
                  <Input
                    value={formData.groom_parents}
                    onChange={e => updateField('groom_parents', e.target.value)}
                    placeholder="Contoh: Bpk. Bambang & Ibu Sri"
                    className="mt-1"
                  />
                </div>

                <div className="pt-4 border-t">
                  <CardTitle className="text-base mb-3">Profil Mempelai Wanita</CardTitle>
                  <div className="space-y-4">
                    <div>
                      <Label>Nama Lengkap Mempelai Wanita</Label>
                      <Input
                        name="couple_name_female"
                        value={formData.couple_name_female}
                        onChange={e => updateField('couple_name_female', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Nama Orang Tua Wanita</Label>
                      <Input
                        value={formData.bride_parents}
                        onChange={e => updateField('bride_parents', e.target.value)}
                        placeholder="Contoh: Bpk. Hendra & Ibu Dewi"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ACARA */}
            {activeTab === 'acara' && (
              <div className="space-y-4">
                <div>
                  <Label>Tanggal Pernikahan</Label>
                  <Input
                    name="wedding_date"
                    type="date"
                    value={formData.wedding_date}
                    onChange={e => updateField('wedding_date', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Waktu Akad</Label>
                    <Input
                      value={formData.akad_time}
                      onChange={e => updateField('akad_time', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Waktu Resepsi</Label>
                    <Input
                      value={formData.reception_time}
                      onChange={e => updateField('reception_time', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Nama Gedung / Alamat Lokasi</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={e => updateField('location', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Link Google Maps</Label>
                  <Input
                    value={formData.maps_url}
                    onChange={e => updateField('maps_url', e.target.value)}
                    placeholder="https://maps.app.goo.gl/..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* TAB: CERITA */}
            {activeTab === 'cerita' && (
              <div className="space-y-4">
                <div>
                  <Label>Ayat / Kutipan Doa</Label>
                  <Textarea
                    value={formData.quote}
                    onChange={e => updateField('quote', e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Kisah Cinta Singkat (Love Story)</Label>
                  <Textarea
                    value={formData.story}
                    onChange={e => updateField('story', e.target.value)}
                    rows={4}
                    className="mt-1"
                    placeholder="Ceritakan awal perkenalan hingga menuju pelaminan..."
                  />
                </div>
              </div>
            )}

            {/* TAB: DESAIN */}
            {activeTab === 'desain' && (
              <div className="space-y-4">
                <div>
                  <Label>Pilihan Palet Warna Tema</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {PALETTES.map(p => (
                      <button
                        type="button"
                        key={p.name}
                        onClick={() => setPalette(p)}
                        className={`p-3 rounded-lg border text-left flex items-center justify-between transition ${
                          palette.name === p.name ? 'ring-2 ring-blue-600 border-blue-600' : 'hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full ${p.bg} border`} />
                          <span className="text-xs font-semibold text-slate-800">{p.name}</span>
                        </div>
                        {palette.name === p.name && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {state?.error && <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{state.error}</p>}
          </form>
        </div>

        {/* Right Live Interactive Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-200 p-4 md:p-8 flex items-center justify-center overflow-y-auto max-h-[calc(100vh-65px)]">
          <div
            className={`transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border-8 border-slate-800 bg-white ${
              previewDevice === 'mobile' ? 'w-full max-w-sm min-h-[640px]' : 'w-full max-w-2xl min-h-[600px]'
            }`}
          >
            {/* Phone Top Notch Mock */}
            <div className="bg-slate-800 h-6 w-full flex items-center justify-center">
              <div className="w-16 h-3 bg-slate-900 rounded-full" />
            </div>

            {/* Preview Document Body */}
            <div className={`p-6 sm:p-10 ${palette.bg} min-h-full flex flex-col justify-between`}>
              <div className="text-center space-y-4">
                <p className={`text-xs uppercase tracking-widest font-semibold ${palette.accent}`}>
                  The Wedding of
                </p>
                <h2 className={`text-3xl sm:text-4xl font-serif font-bold ${palette.accent}`}>
                  {formData.couple_name_male} <br />
                  <span className="text-xl">&</span> <br />
                  {formData.couple_name_female}
                </h2>
                <div className={`text-xs py-2 px-4 rounded-full inline-block border ${palette.border} ${palette.accent}`}>
                  {new Date(formData.wedding_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Akad & Resepsi Preview Cards */}
              <div className="my-6 space-y-3">
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-white shadow-sm text-center">
                  <h4 className="text-xs font-bold uppercase text-slate-700">Akad Nikah</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{formData.akad_time}</p>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-white shadow-sm text-center">
                  <h4 className="text-xs font-bold uppercase text-slate-700">Resepsi Pernikahan</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{formData.reception_time}</p>
                  <p className="text-xs text-slate-600 mt-1">{formData.location}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <p className="text-xs italic text-slate-700">{formData.quote}</p>
              </div>

              <div className="mt-6 text-center">
                <button className={`w-full py-2.5 rounded-xl text-white text-xs font-semibold shadow-md ${palette.btn}`}>
                  Buka Undangan & RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
