'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const templateData = {
  bride: {
    name: 'Putri Ayu',
    fullName: 'Putri Ayu Lestari',
    parent: 'Bapak Budi Santoso & Ibu Siti Aminah',
    photo: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Bride',
  },
  groom: {
    name: 'Raka Wijaya',
    fullName: 'Raka Wijaya Kusuma',
    parent: 'Bapak Hendra Wijaya & Ibu Dewi Sartika',
    photo: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Groom',
  },
  mainPhoto: 'https://placehold.co/1200x600/1a1a2e/ffd700?text=Wedding+Couple',
  weddingDate: {
    date: '20',
    month: 'Januari',
    year: '2025',
    day: 'Sabtu',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '10:00 - 12:00 WIB',
    location: 'Masjid Al-Ikhlas, Jl. Ahmad Yani No. 88, Bandung',
    map: 'https://maps.google.com',
  },
  reception: {
    type: 'Resepsi',
    time: '19:00 - 22:00 WIB',
    location: 'The Ritz-Carlton Ballroom, Jl. Asia Afrika No. 1, Bandung',
    map: 'https://maps.google.com',
  },
  gallery: [
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+1',
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+2',
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+3',
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+4',
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+5',
    'https://placehold.co/400x300/1a1a2e/ffd700?text=Photo+6',
  ],
  gifts: [
    { name: 'BNI', number: '111222333', atas: 'Raka Wijaya' },
    { name: 'DANA/GOPAY', number: '081234567890', atas: 'Putri Ayu' },
  ],
}

function Countdown() {
  const [countdown, setCountdown] = useState({ days: 30, hours: 8, minutes: 45, seconds: 0 })

  return (
    <div className="grid grid-cols-4 gap-4 justify-center max-w-lg mx-auto">
      {[
        { label: 'HARI', value: countdown.days },
        { label: 'JAM', value: countdown.hours },
        { label: 'MENIT', value: countdown.minutes },
        { label: 'DETIK', value: countdown.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-gradient-to-b from-amber-100 to-yellow-200 text-amber-900 rounded-xl p-5 font-bold text-4xl border-2 border-amber-300 shadow-lg">
            {String(item.value).padStart(2, '0')}
          </div>
          <p className="text-xs text-zinc-500 mt-2 font-serif uppercase tracking-widest font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function Template002() {
  const [rsvp, setRsvp] = useState({ name: '', email: '', attending: '', guests: 1 })
  const [wishes, setWishes] = useState({ name: '', message: '' })
  const [wishesList, setWishesList] = useState<Array<{ name: string; message: string }>>([])
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`RSVP diterima: ${rsvp.name}, Kehadiran: ${rsvp.attending}, Jumlah tamu: ${rsvp.guests}`)
    setRsvp({ name: '', email: '', attending: '', guests: 1 })
  }

  const handleWishes = (e: React.FormEvent) => {
    e.preventDefault()
    if (wishes.name && wishes.message) {
      setWishesList([...wishesList, wishes])
      setWishes({ name: '', message: '' })
    }
  }

  const copyToClipboard = (text: string, gift: string) => {
    navigator.clipboard.writeText(text)
    setCopiedGift(gift)
    setTimeout(() => setCopiedGift(null), 2000)
  }

  if (!opened) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 text-8xl animate-pulse">✦</div>
          <div className="absolute top-40 right-20 text-6xl animate-pulse delay-300">✧</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-pulse delay-500">✦</div>
          <div className="absolute bottom-40 right-10 text-9xl animate-pulse delay-700">✧</div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.1)_0%,_transparent_70%)]"></div>
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="mb-8">
            <p className="text-lg text-zinc-400 mb-4 font-serif italic tracking-wide">Dengan memohon rahmat dan ridha Allah SWT</p>
            <p className="text-sm text-zinc-500 font-serif">Kami bermaksud mengadakan resepsi pernikahan putra-putri kami</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-amber-300 mb-2 tracking-wide drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            {templateData.bride.name}
          </h1>
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-4xl text-amber-400 font-serif">&</span>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-amber-300 mb-8 tracking-wide drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            {templateData.groom.name}
          </h1>
          <p className="text-2xl text-zinc-300 mb-10 font-serif tracking-wide">
            {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}
          </p>
          <Button size="lg" onClick={() => setOpened(true)} className="text-lg px-12 py-5 rounded-none border-2 border-amber-300 bg-transparent text-amber-300 hover:bg-amber-300 hover:text-zinc-950 transition-all duration-300 tracking-widest uppercase font-semibold">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-100">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={templateData.mainPhoto} alt="Couple" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl opacity-5 animate-pulse">✦</div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl md:text-6xl font-heading font-light mb-4 tracking-widest">{templateData.bride.name} & {templateData.groom.name}</h2>
          <p className="text-xl md:text-2xl font-serif italic text-amber-300 tracking-wide">{templateData.weddingDate.day}, {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}</p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-amber-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-20 space-y-24">
        {/* Countdown */}
        <section className="text-center">
          <div className="inline-block mb-4 text-4xl">✦</div>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 mb-8 tracking-widest">Hitungan Mundur</h2>
          <Countdown />
        </section>

        {/* Acara */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">🕰️</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 mb-2 tracking-widest">Acara Pernikahan</h2>
            <p className="text-zinc-400 font-serif italic max-w-2xl mx-auto">Kehadiran Anda menghiasi hari bahagia kami</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/80 backdrop-blur border-amber-800 shadow-[0_0_40px_rgba(255,215,0,0.1)] hover:shadow-[0_0_60px_rgba(255,215,0,0.2)] transition-all duration-500">
              <CardHeader className="border-b border-amber-800">
                <CardTitle className="text-2xl text-amber-300 font-heading tracking-wide">{templateData.ceremony.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-800">🕐</div>
                  <div>
                    <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Waktu</p>
                    <p className="font-semibold font-serif text-lg">{templateData.ceremony.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-800">📍</div>
                  <div>
                    <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Lokasi</p>
                    <p className="font-semibold font-serif">{templateData.ceremony.location}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-none border-amber-600 text-amber-300 hover:bg-amber-600 hover:text-zinc-950" onClick={() => window.open(templateData.ceremony.map)}>
                  Lihat di Maps →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/80 backdrop-blur border-amber-800 shadow-[0_0_40px_rgba(255,215,0,0.1)] hover:shadow-[0_0_60px_rgba(255,215,0,0.2)] transition-all duration-500">
              <CardHeader className="border-b border-amber-800">
                <CardTitle className="text-2xl text-amber-300 font-heading tracking-wide">{templateData.reception.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-800">🕐</div>
                  <div>
                    <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Waktu</p>
                    <p className="font-semibold font-serif text-lg">{templateData.reception.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-800">📍</div>
                  <div>
                    <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Lokasi</p>
                    <p className="font-semibold font-serif">{templateData.reception.location}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-none border-amber-600 text-amber-300 hover:bg-amber-600 hover:text-zinc-950" onClick={() => window.open(templateData.reception.map)}>
                  Lihat di Maps →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pasangan */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">👑</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 mb-2 tracking-widest">Mempelai</h2>
            <p className="text-zinc-400 font-serif italic max-w-2xl mx-auto leading-relaxed">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya"
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-full aspect-[3/4] object-cover rounded-none border-2 border-amber-300/30 shadow-[0_0_60px_rgba(255,215,0,0.2)]" />
              <h3 className="text-3xl font-heading font-bold text-amber-300 mt-6 tracking-wide">{templateData.bride.fullName}</h3>
              <p className="text-sm text-zinc-400 mt-2 font-serif italic">{templateData.bride.parent}</p>
            </div>
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-full aspect-[3/4] object-cover rounded-none border-2 border-amber-300/30 shadow-[0_0_60px_rgba(255,215,0,0.2)]" />
              <h3 className="text-3xl font-heading font-bold text-amber-300 mt-6 tracking-wide">{templateData.groom.fullName}</h3>
              <p className="text-sm text-zinc-400 mt-2 font-serif italic">{templateData.groom.parent}</p>
            </div>
          </div>
        </section>

        {/* Galeri */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">🖼️</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 tracking-widest">Galeri Kami</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {templateData.gallery.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={photo} alt={`Gallery ${i + 1}`} className="w-full h-64 object-cover rounded-none border border-amber-300/20 hover:border-amber-400 hover:scale-[1.02] transition-all duration-500" />
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">📜</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 tracking-widest">Konfirmasi Kehadiran</h2>
          </div>
          <Card className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur border-amber-800 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
            <CardHeader className="border-b border-amber-800">
              <CardTitle className="text-2xl font-heading tracking-wide text-amber-300">RSVP</CardTitle>
              <CardDescription className="font-serif text-zinc-400">Mohon konfirmasi kehadiran Anda sebelum 15 Januari 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRsvp} className="space-y-5">
                <div>
                  <Label htmlFor="rsvp-name" className="font-serif text-zinc-300">Nama</Label>
                  <Input
                    id="rsvp-name"
                    type="text"
                    placeholder="Nama Anda"
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none"
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-email" className="font-serif text-zinc-300">Email</Label>
                  <Input
                    id="rsvp-email"
                    type="email"
                    placeholder="email@example.com"
                    value={rsvp.email}
                    onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none"
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-attending" className="font-serif text-zinc-300">Kehadiran</Label>
                  <select
                    id="rsvp-attending"
                    value={rsvp.attending}
                    onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                    className="w-full bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none p-3 text-zinc-100"
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="yes">Akan Hadir</option>
                    <option value="no">Tidak Dapat Hadir</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="rsvp-guests" className="font-serif text-zinc-300">Jumlah Tamu</Label>
                  <Input
                    id="rsvp-guests"
                    type="number"
                    min="1"
                    max="5"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: parseInt(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none"
                  />
                </div>
                <Button type="submit" className="w-full rounded-none border-2 border-amber-300 bg-transparent text-amber-300 hover:bg-amber-300 hover:text-zinc-950 transition-all tracking-widest uppercase font-semibold py-3">
                  Kirim RSVP
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Doa & Ucapan */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">📝</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 tracking-widest">Doa & Ucapan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/80 backdrop-blur border-amber-800 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
              <CardHeader className="border-b border-amber-800">
                <CardTitle className="font-heading text-xl tracking-wide text-amber-300">Kirim Ucapan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWishes} className="space-y-5">
                  <div>
                    <Label htmlFor="wish-name" className="font-serif text-zinc-300">Nama</Label>
                    <Input
                      id="wish-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={wishes.name}
                      onChange={(e) => setWishes({ ...wishes, name: e.target.value })}
                      required
                      className="bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wish-message" className="font-serif text-zinc-300">Ucapan</Label>
                    <Textarea
                      id="wish-message"
                      placeholder="Tulis ucapan terbaik Anda..."
                      value={wishes.message}
                      onChange={(e) => setWishes({ ...wishes, message: e.target.value })}
                      required
                      rows={4}
                      className="bg-zinc-800 border-zinc-700 focus:border-amber-400 focus:ring-amber-400 rounded-none"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-none border-2 border-amber-300 bg-transparent text-amber-300 hover:bg-amber-300 hover:text-zinc-950 transition-all tracking-widest uppercase font-semibold py-3">
                    Kirim Ucapan
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl tracking-wide text-amber-300">Ucapan Tamu ({wishesList.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {wishesList.length === 0 ? (
                  <p className="text-zinc-500 text-sm font-serif italic text-center py-8">Belum ada ucapan. Jadilah yang pertama!</p>
                ) : (
                  wishesList.map((wish, i) => (
                    <Card key={i} className="bg-zinc-800/60 backdrop-blur border-zinc-700">
                      <CardContent className="pt-4">
                        <p className="font-semibold text-sm font-heading text-amber-300">{wish.name}</p>
                        <p className="text-sm text-zinc-300 font-serif mt-1">{wish.message}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gift */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-block mb-4 text-4xl">💎</div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-amber-300 mb-2 tracking-widest">Hadiah</h2>
            <p className="text-zinc-400 font-serif italic max-w-2xl mx-auto">Doa dan kehadiran Anda sudah menjadi hadiah terindah, namun jika ingin memberikan hadiah:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {templateData.gifts.map((gift, i) => (
              <Card key={i} className="bg-zinc-900/80 backdrop-blur border-amber-800 shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                <CardHeader className="border-b border-amber-800">
                  <CardTitle className="font-heading text-xl text-amber-300">{gift.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Atas Nama</p>
                      <p className="font-semibold font-heading text-lg">{gift.atas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-serif uppercase tracking-wider">Nomor</p>
                      <p className="font-mono font-semibold text-lg text-amber-300 tracking-wider">{gift.number}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-none border-amber-600 text-amber-300 hover:bg-amber-600 hover:text-zinc-950"
                      onClick={() => copyToClipboard(gift.number, gift.name)}
                    >
                      {copiedGift === gift.name ? '✓ Tersalin' : 'Salin Nomor'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-20 border-t border-zinc-800">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-5xl">✦</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-heading font-light text-amber-300 mb-4 tracking-widest">Terima Kasih</h2>
          <p className="text-zinc-400 font-serif max-w-2xl mx-auto mb-8 leading-relaxed">
            Atas kehadiran dan doa dari Anda, kami mengucapkan terima kasih yang sebesar-besarnya. Semoga pernikahan kami membawa berkah bagi kita semua.
          </p>
          <div className="text-zinc-400 font-serif">
            <p className="font-heading text-lg tracking-wide">{templateData.bride.name} & {templateData.groom.name}</p>
            <p className="mt-2 italic text-amber-400">✦ Bersama di tengah cinta ✦</p>
          </div>
        </section>
      </div>
    </div>
  )
}