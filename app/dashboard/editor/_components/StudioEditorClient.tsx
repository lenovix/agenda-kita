'use client'

import { useState, useTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { updateInvitation } from '../_actions'
import {
  Smartphone,
  Monitor,
  Palette,
  Heart,
  Calendar,
  Sparkles,
  Wallet,
  ShieldCheck,
  Check,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Music
} from 'lucide-react'

const PALETTES = [
  { name: 'Rose Romance', bg: 'bg-rose-50', accent: 'text-rose-700', border: 'border-rose-300', btn: 'bg-rose-600 hover:bg-rose-700' },
  { name: 'Emerald Sage', bg: 'bg-emerald-50', accent: 'text-emerald-800', border: 'border-emerald-300', btn: 'bg-emerald-700 hover:bg-emerald-800' },
  { name: 'Royal Navy', bg: 'bg-slate-900', accent: 'text-amber-200', border: 'border-amber-400/30', btn: 'bg-amber-600 hover:bg-amber-700' },
  { name: 'Golden Luxury', bg: 'bg-amber-50', accent: 'text-amber-900', border: 'border-amber-300', btn: 'bg-amber-700 hover:bg-amber-800' },
  { name: 'Classic Monokrom', bg: 'bg-zinc-100', accent: 'text-zinc-900', border: 'border-zinc-300', btn: 'bg-zinc-900 hover:bg-zinc-800' },
  { name: 'Lavender Bliss', bg: 'bg-purple-50', accent: 'text-purple-800', border: 'border-purple-300', btn: 'bg-purple-600 hover:bg-purple-700' },
]

export default function StudioEditorClient({ initialData }: { initialData?: any }) {
  const initialExtras = initialData?.extras || {}

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
    cover_image: initialData?.cover_image || '',
  })

  // Toggles untuk setiap modul (sama seperti sisi tamu)
  const [sectionToggles, setSectionToggles] = useState({
    showGroomBride: initialExtras?.showGroomBride !== false,
    showCountdown: initialExtras?.showCountdown !== false,
    showCalendarBtn: initialExtras?.showCalendarBtn !== false,
    showEvents: initialExtras?.showEvents !== false,
    showStory: initialExtras?.showStory !== false,
    showQuote: initialExtras?.showQuote !== false,
    showRsvp: initialExtras?.showRsvp !== false,
    showGuestbook: initialExtras?.showGuestbook !== false,
    showGift: initialExtras?.showGift !== false,
    showProtocol: initialExtras?.showProtocol !== false,
  })

  // Data amplop digital
  const [banks, setBanks] = useState<Array<{ name: string; number: string; owner: string }>>(
    initialExtras?.banks || [
      { name: 'BCA', number: '1234567890', owner: 'Andi Pratama' },
      { name: 'Mandiri', number: '9876543210', owner: 'Sari Indah' },
    ]
  )
  const [qrisImage, setQrisImage] = useState(initialExtras?.qris_image || '')
  const [shippingAddress, setShippingAddress] = useState(
    initialExtras?.shipping_address || 'Jl. Mawar No. 12, RT 01/RW 02, Menteng, Jakarta Pusat (Penerima: Sari Indah - 08123456789)'
  )

  // Data protokol & dresscode
  const [dressCode, setDressCode] = useState(initialExtras?.dress_code || 'Formal / Batik / Modest Attire')
  const [dressColors, setDressColors] = useState<string[]>(initialExtras?.dress_colors || ['#F9A8D4', '#E2E8F0', '#0F172A'])
  const [protocolNotes, setProtocolNotes] = useState<string[]>(
    initialExtras?.protocol_notes || [
      'Mohon hadir 15 menit sebelum acara dimulai.',
      'Menjaga ketertiban dan kekhusyukan selama prosesi akad nikah.',
      'Dihimbau tidak menyalakan flash kamera dari jarak dekat.',
    ]
  )

  const [activeTab, setActiveTab] = useState<'mempelai' | 'acara' | 'cerita' | 'amplop' | 'protokol' | 'desain'>('mempelai')
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [previewState, setPreviewState] = useState<0 | 1>(0)
  const [palette, setPalette] = useState(PALETTES[0])
  const [pending, startTransition] = useTransition()
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const toggleSection = (key: keyof typeof sectionToggles) => {
    setSectionToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    const form = document.getElementById('editor-form') as HTMLFormElement | null
    if (!form) return
    const fd = new FormData(form)

    // Pack extras JSON
    const extrasPayload = {
      ...sectionToggles,
      banks,
      qris_image: qrisImage,
      shipping_address: shippingAddress,
      dress_code: dressCode,
      dress_colors: dressColors,
      protocol_notes: protocolNotes,
    }
    fd.set('extras', JSON.stringify(extrasPayload))

    startTransition(async () => {
      const res = await updateInvitation(fd)
      if (res?.error) {
        setFormError(res.error)
        setSavedSuccess(false)
      } else {
        setFormError(null)
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 3000)
      }
    })
  }

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

  const addBank = () => {
    setBanks(prev => [...prev, { name: 'Bank BCA', number: '', owner: '' }])
  }

  const removeBank = (idx: number) => {
    setBanks(prev => prev.filter((_, i) => i !== idx))
  }

  const updateBank = (idx: number, field: string, val: string) => {
    setBanks(prev => prev.map((b, i) => (i === idx ? { ...b, [field]: val } : b)))
  }

  const addProtocolNote = () => {
    setProtocolNotes(prev => [...prev, 'Aturan tambahan...'])
  }

  const removeProtocolNote = (idx: number) => {
    setProtocolNotes(prev => prev.filter((_, i) => i !== idx))
  }

  const updateProtocolNote = (idx: number, val: string) => {
    setProtocolNotes(prev => prev.map((n, i) => (i === idx ? val : n)))
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">←</Button>
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
              className="text-amber-600 border-amber-300 hover:bg-amber-50 text-xs"
            >
              ⚡ Test Data
            </Button>
          )}

          <div className="flex bg-slate-100 p-1 rounded-lg border">
            <button
              onClick={() => setPreviewState(0)}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${previewState === 0 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
            >
              Cover (0)
            </button>
            <button
              onClick={() => setPreviewState(1)}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${previewState === 1 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
            >
              Detail (1)
            </button>
          </div>

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
            <Button type="button" onClick={handleSave} disabled={pending} size="sm" className="bg-blue-600">
              {pending ? 'Menyimpan...' : savedSuccess ? '✓ Tersimpan' : 'Simpan Perubahan'}
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600">Pilih dari Undangan</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Tabs (Vertical) */}
        <div className="w-20 sm:w-24 bg-slate-900 flex flex-col items-center py-4 gap-3 shrink-0 border-r border-slate-800 overflow-y-auto">
          {[
            { id: 'mempelai', label: 'Mempelai', icon: Heart, toggleKey: 'showGroomBride' },
            { id: 'acara', label: 'Acara', icon: Calendar, toggleKey: 'showEvents' },
            { id: 'cerita', label: 'Cerita', icon: Sparkles, toggleKey: 'showStory' },
            { id: 'amplop', label: 'Amplop', icon: Wallet, toggleKey: 'showGift' },
            { id: 'protokol', label: 'Protokol', icon: ShieldCheck, toggleKey: 'showProtocol' },
            { id: 'desain', label: 'Desain', icon: Palette, toggleKey: null },
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            const isEnabled = tab.toggleKey ? (sectionToggles as any)[tab.toggleKey] : true

            return (
              <div key={tab.id} className="relative group flex flex-col items-center">
                <button
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all ${
                    active 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-semibold">{tab.label}</span>
                </button>
                {tab.toggleKey && !isEnabled && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" title="Dinonaktifkan" />
                )}
              </div>
            )
          })}
        </div>

        {/* Center Form Controls */}
        <div className="w-full lg:w-[420px] xl:w-[480px] bg-white border-r border-border p-6 overflow-y-auto shrink-0 shadow-xl z-10">
          <form id="editor-form" className="space-y-4">
            <input type="hidden" name="id" value={formData.id} />
            <input type="hidden" name="selected_template" value={formData.selected_template} />
            <input type="hidden" name="category" value={formData.category} />

            {/* Hidden fallback inputs */}
            <input type="hidden" name="couple_name_male_val" value={formData.couple_name_male} />
            <input type="hidden" name="couple_name_female_val" value={formData.couple_name_female} />
            <input type="hidden" name="wedding_date_val" value={formData.wedding_date} />
            <input type="hidden" name="location_val" value={formData.location} />

            {/* TAB: MEMPELAI */}
            {activeTab === 'mempelai' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">1. Data Mempelai</h3>
                  <button
                    type="button"
                    onClick={() => toggleSection('showGroomBride')}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${
                      sectionToggles.showGroomBride ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sectionToggles.showGroomBride ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {sectionToggles.showGroomBride ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

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
                    name="groom_parents"
                    value={formData.groom_parents}
                    onChange={e => updateField('groom_parents', e.target.value)}
                    placeholder="Contoh: Bpk. Bambang & Ibu Sri"
                    className="mt-1"
                  />
                </div>

                <div className="pt-3 border-t">
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
                    name="bride_parents"
                    value={formData.bride_parents}
                    onChange={e => updateField('bride_parents', e.target.value)}
                    placeholder="Contoh: Bpk. Hendra & Ibu Dewi"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* TAB: ACARA */}
            {activeTab === 'acara' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">2. Jadwal & Tempat Acara</h3>
                  <button
                    type="button"
                    onClick={() => toggleSection('showEvents')}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${
                      sectionToggles.showEvents ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sectionToggles.showEvents ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {sectionToggles.showEvents ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

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
                      name="akad_time"
                      value={formData.akad_time}
                      onChange={e => updateField('akad_time', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Waktu Resepsi</Label>
                    <Input
                      name="reception_time"
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
                    name="maps_url"
                    value={formData.maps_url}
                    onChange={e => updateField('maps_url', e.target.value)}
                    placeholder="https://maps.app.goo.gl/..."
                    className="mt-1"
                  />
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Tampilkan Countdown Timer</span>
                    <button
                      type="button"
                      onClick={() => toggleSection('showCountdown')}
                      className={`text-xs px-2 py-0.5 rounded border ${sectionToggles.showCountdown ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showCountdown ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Tombol Tambah ke Kalender</span>
                    <button
                      type="button"
                      onClick={() => toggleSection('showCalendarBtn')}
                      className={`text-xs px-2 py-0.5 rounded border ${sectionToggles.showCalendarBtn ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showCalendarBtn ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CERITA & DOA */}
            {activeTab === 'cerita' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">3. Cerita, Ayat & Interaksi</h3>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label>Ayat / Kutipan Doa</Label>
                    <button
                      type="button"
                      onClick={() => toggleSection('showQuote')}
                      className={`text-[11px] px-2 py-0.5 rounded border ${sectionToggles.showQuote ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showQuote ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                  <Textarea
                    name="quote"
                    value={formData.quote}
                    onChange={e => updateField('quote', e.target.value)}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label>Kisah Cinta (Love Story)</Label>
                    <button
                      type="button"
                      onClick={() => toggleSection('showStory')}
                      className={`text-[11px] px-2 py-0.5 rounded border ${sectionToggles.showStory ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showStory ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                  <Textarea
                    name="story"
                    value={formData.story}
                    onChange={e => updateField('story', e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Form RSVP Online</span>
                    <button
                      type="button"
                      onClick={() => toggleSection('showRsvp')}
                      className={`text-xs px-2 py-0.5 rounded border ${sectionToggles.showRsvp ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showRsvp ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Buku Tamu & Ucapan Doa</span>
                    <button
                      type="button"
                      onClick={() => toggleSection('showGuestbook')}
                      className={`text-xs px-2 py-0.5 rounded border ${sectionToggles.showGuestbook ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {sectionToggles.showGuestbook ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AMPLOP DIGITAL & KADO */}
            {activeTab === 'amplop' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">4. Amplop Digital & Hadiah</h3>
                  <button
                    type="button"
                    onClick={() => toggleSection('showGift')}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${
                      sectionToggles.showGift ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sectionToggles.showGift ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {sectionToggles.showGift ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold">Rekening Bank / e-Wallet</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addBank} className="h-7 text-xs gap-1">
                      <Plus className="w-3 h-3" /> Tambah Bank
                    </Button>
                  </div>

                  {banks.map((bank, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border space-y-2">
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Nama Bank (e.g. BCA / GoPay)"
                          value={bank.name}
                          onChange={e => updateBank(i, 'name', e.target.value)}
                          className="h-8 text-xs w-1/2"
                        />
                        <Button type="button" size="sm" variant="ghost" onClick={() => removeBank(i)} className="text-red-500 h-8">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Nomor Rekening / No. HP"
                        value={bank.number}
                        onChange={e => updateBank(i, 'number', e.target.value)}
                        className="h-8 text-xs font-mono"
                      />
                      <Input
                        placeholder="Atas Nama Pemilik Rekening"
                        value={bank.owner}
                        onChange={e => updateBank(i, 'owner', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <Label>URL Gambar QRIS</Label>
                  <Input
                    placeholder="https://example.com/qris.jpg"
                    value={qrisImage}
                    onChange={e => setQrisImage(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div className="pt-3 border-t">
                  <Label>Alamat Pengiriman Kado Fisik</Label>
                  <Textarea
                    placeholder="Alamat lengkap tujuan kado..."
                    value={shippingAddress}
                    onChange={e => setShippingAddress(e.target.value)}
                    rows={3}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB: PROTOKOL & DRESSCODE */}
            {activeTab === 'protokol' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">5. Protokol & Dress Code</h3>
                  <button
                    type="button"
                    onClick={() => toggleSection('showProtocol')}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${
                      sectionToggles.showProtocol ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {sectionToggles.showProtocol ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {sectionToggles.showProtocol ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                <div>
                  <Label>Aturan Pakaian (Dress Code)</Label>
                  <Input
                    value={dressCode}
                    onChange={e => setDressCode(e.target.value)}
                    placeholder="Contoh: Formal / Batik / Kebaya"
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <Label>Palet Warna Rekomendasi (HEX)</Label>
                  <div className="flex gap-2 mt-1">
                    {dressColors.map((color, i) => (
                      <Input
                        key={i}
                        type="color"
                        value={color}
                        onChange={e => {
                          const newC = [...dressColors]
                          newC[i] = e.target.value
                          setDressColors(newC)
                        }}
                        className="w-12 h-9 p-1 rounded-lg cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold">Panduan / Tata Tertib Acara</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addProtocolNote} className="h-7 text-xs gap-1">
                      <Plus className="w-3 h-3" /> Tambah Poin
                    </Button>
                  </div>
                  {protocolNotes.map((note, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={note}
                        onChange={e => updateProtocolNote(i, e.target.value)}
                        className="h-8 text-xs flex-1"
                      />
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeProtocolNote(i)} className="text-red-500 h-8">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: DESAIN */}
            {activeTab === 'desain' && (
              <div className="space-y-4">
                <div className="pb-2 border-b">
                  <h3 className="text-base font-bold text-slate-900">6. Desain & Palet Warna</h3>
                </div>

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

                <div className="pt-3 border-t">
                  <Label>URL Musik Latar (MP3)</Label>
                  <Input
                    name="music_url"
                    value={formData.music_url}
                    onChange={e => updateField('music_url', e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <Label>URL Cover Background Image</Label>
                  <Input
                    name="cover_image"
                    value={formData.cover_image}
                    onChange={e => updateField('cover_image', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
            )}

            {formError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{formError}</p>}
          </form>
        </div>

        {/* Right Live Interactive Preview (Reflects enable/disable toggles) */}
        <div className="flex-1 bg-slate-200 p-4 md:p-8 flex justify-center items-start overflow-y-auto h-[calc(100vh-60px)]">
          <div
            className={`my-2 md:my-6 transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border-8 border-slate-800 bg-white shrink-0 ${
              previewDevice === 'mobile' ? 'w-full max-w-sm' : 'w-full max-w-2xl'
            }`}
          >
            {/* Phone Top Notch Mock */}
            <div className="bg-slate-800 h-6 w-full flex items-center justify-center">
              <div className="w-16 h-3 bg-slate-900 rounded-full" />
            </div>

            {/* Preview Document Body */}
            {previewState === 0 ? (
              /* STATE 0: COVER */
              <div className={`p-8 sm:p-12 ${palette.bg} min-h-[580px] flex flex-col justify-between items-center text-center`}>
                <div className="space-y-6 my-auto">
                  <div className="w-16 h-16 rounded-full bg-white/80 border flex items-center justify-center mx-auto shadow-sm">
                    <Heart className={`w-8 h-8 ${palette.accent}`} />
                  </div>
                  <div className="space-y-2">
                    <p className={`text-xs uppercase tracking-widest font-semibold ${palette.accent}`}>
                      The Wedding of
                    </p>
                    <h2 className={`text-3xl sm:text-4xl font-serif font-bold ${palette.accent}`}>
                      {formData.couple_name_male} <br />
                      <span className="text-xl">&</span> <br />
                      {formData.couple_name_female}
                    </h2>
                  </div>
                  <div className={`text-xs py-1.5 px-4 rounded-full inline-block border ${palette.border} ${palette.accent} bg-white/60`}>
                    {new Date(formData.wedding_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                <div className="w-full mt-8">
                  <p className="text-[11px] text-slate-500 mb-3">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                  <button
                    onClick={() => setPreviewState(1)}
                    className={`w-full py-3 rounded-xl text-white text-xs font-semibold shadow-md transition ${palette.btn}`}
                  >
                    💌 Buka Undangan
                  </button>
                </div>
              </div>
            ) : (
              /* STATE 1: DETAIL LENGKAP DENGAN KONDISIONAL TOGGLE */
              <div className={`p-6 sm:p-8 ${palette.bg} min-h-[580px] space-y-6 overflow-y-auto`}>
                {/* Header Mempelai */}
                <div className="text-center space-y-2">
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${palette.accent}`}>
                    Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
                  </p>
                  <h3 className={`text-2xl font-serif font-bold ${palette.accent}`}>
                    {formData.couple_name_male} & {formData.couple_name_female}
                  </h3>
                </div>

                {/* Countdown (Jika Aktif) */}
                {sectionToggles.showCountdown && (
                  <div className="bg-white/80 p-3 rounded-xl border text-center space-y-1">
                    <p className={`text-[11px] font-bold uppercase ${palette.accent}`}>Hitungan Mundur</p>
                    <div className="flex justify-center gap-2 text-xs font-mono font-bold text-slate-800">
                      <span className="bg-slate-100 px-2 py-1 rounded">24 Hari</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">12 Jam</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">45 Menit</span>
                    </div>
                  </div>
                )}

                {/* Profil Mempelai (Jika Aktif) */}
                {sectionToggles.showGroomBride && (
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white/80 p-4 rounded-xl border border-white text-center shadow-xs">
                      <h4 className="font-bold text-sm text-slate-900">{formData.couple_name_male}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{formData.groom_parents}</p>
                    </div>
                    <div className="text-center text-xs font-bold text-slate-400">&</div>
                    <div className="bg-white/80 p-4 rounded-xl border border-white text-center shadow-xs">
                      <h4 className="font-bold text-sm text-slate-900">{formData.couple_name_female}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{formData.bride_parents}</p>
                    </div>
                  </div>
                )}

                {/* Acara & Waktu (Jika Aktif) */}
                {sectionToggles.showEvents && (
                  <div className="space-y-3">
                    <div className="bg-white/90 rounded-xl p-4 border border-white shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className={`w-4 h-4 ${palette.accent}`} />
                        <h4 className="text-xs font-bold uppercase text-slate-800">Akad Nikah</h4>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{formData.akad_time}</p>
                      <p className="text-xs text-slate-600 mt-1">
                        {new Date(formData.wedding_date).toLocaleDateString('id-ID', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="bg-white/90 rounded-xl p-4 border border-white shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className={`w-4 h-4 ${palette.accent}`} />
                        <h4 className="text-xs font-bold uppercase text-slate-800">Resepsi Pernikahan</h4>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{formData.reception_time}</p>
                      <p className="text-xs text-slate-600 mt-1">{formData.location}</p>
                    </div>
                  </div>
                )}

                {/* Love Story (Jika Aktif) */}
                {sectionToggles.showStory && formData.story && (
                  <div className="bg-white/70 p-4 rounded-xl border border-white text-center space-y-1">
                    <h5 className={`text-xs font-bold uppercase ${palette.accent}`}>Cerita Cinta</h5>
                    <p className="text-xs text-slate-700 leading-relaxed italic">{formData.story}</p>
                  </div>
                )}

                {/* Quote (Jika Aktif) */}
                {sectionToggles.showQuote && formData.quote && (
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <p className="text-[11px] italic text-slate-600">{formData.quote}</p>
                  </div>
                )}

                {/* Amplop Digital Preview (Jika Aktif) */}
                {sectionToggles.showGift && banks.length > 0 && (
                  <div className="bg-white/90 p-4 rounded-xl border space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Wallet className="w-3.5 h-3.5 text-amber-600" /> Amplop Digital
                    </div>
                    {banks.map((b, i) => (
                      <div key={i} className="text-xs bg-slate-50 p-2 rounded border">
                        <span className="font-bold">{b.name}:</span> {b.number} ({b.owner})
                      </div>
                    ))}
                  </div>
                )}

                {/* Protokol Preview (Jika Aktif) */}
                {sectionToggles.showProtocol && (
                  <div className="bg-white/90 p-4 rounded-xl border space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Dress Code & Protokol
                    </div>
                    <p className="text-xs text-slate-600">Dresscode: {dressCode}</p>
                  </div>
                )}

                {/* Form RSVP Preview (Jika Aktif) */}
                {sectionToggles.showRsvp && (
                  <div className="bg-white/90 p-3 rounded-xl border text-center">
                    <p className="text-xs font-bold text-slate-800">✉️ Form RSVP Online Siap</p>
                  </div>
                )}

                {/* Buku Tamu Preview (Jika Aktif) */}
                {sectionToggles.showGuestbook && (
                  <div className="bg-white/90 p-3 rounded-xl border text-center">
                    <p className="text-xs font-bold text-slate-800">💬 Buku Tamu & Doa Siap</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
