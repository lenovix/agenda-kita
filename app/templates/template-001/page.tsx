'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const templateData = {
  bride: {
    name: 'Siti Nurhaliza',
    fullName: 'Siti Nurhaliza Azzahra',
    parent: 'Bapak Halim & Ibu Fatimah',
    photo: 'https://placehold.co/300x400/f4c2c2/ffffff?text=Bride',
  },
  groom: {
    name: 'Ahmad Rahman',
    fullName: 'Ahmad Rahman Putra',
    parent: 'Bapak Rachmat & Ibu Siti',
    photo: 'https://placehold.co/300x400/4169e1/ffffff?text=Groom',
  },
  mainPhoto: 'https://placehold.co/1200x600/ffffff/333333?text=Wedding+Couple',
  weddingDate: {
    date: '15',
    month: 'Desember',
    year: '2024',
    day: 'Minggu',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '09:00 - 11:00 WIB',
    location: 'Masjid At-Taqwa, Jl. Merdeka No. 123, Jakarta',
    map: 'https://maps.google.com',
  },
  reception: {
    type: 'Resepsi',
    time: '18:00 - 23:00 WIB',
    location: 'Grand Hotel Jakarta, Jl. Sudirman No. 456, Jakarta',
    map: 'https://maps.google.com',
  },
  gallery: [
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+1',
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+2',
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+3',
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+4',
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+5',
    'https://placehold.co/400x300/f4c2c2/ffffff?text=Photo+6',
  ],
  gifts: [
    { name: 'BCA', number: '1234567890', atas: 'Ahmad Rahman' },
    { name: 'Mandiri', number: '9876543210', atas: 'Siti Nurhaliza' },
  ],
}

function Countdown() {
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 30, seconds: 0 })

  return (
    <div className="grid grid-cols-4 gap-4 justify-center max-w-lg mx-auto">
      {[
        { label: 'Hari', value: countdown.days },
        { label: 'Jam', value: countdown.hours },
        { label: 'Menit', value: countdown.minutes },
        { label: 'Detik', value: countdown.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-gradient-to-br from-rose-100 to-pink-100 text-rose-700 rounded-2xl p-4 font-bold text-3xl shadow-inner border border-rose-200">
            {String(item.value).padStart(2, '0')}
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-serif uppercase tracking-widest">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function Template001() {
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
      <div className="relative min-h-screen floral-bg bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 text-8xl animate-pulse">🌸</div>
          <div className="absolute top-40 right-20 text-6xl animate-pulse delay-300">🌺</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-pulse delay-500">🌷</div>
          <div className="absolute bottom-40 right-10 text-9xl animate-pulse delay-700">💐</div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-4 font-serif italic">Dengan rasa syukur yang mendalam,<br/>kami mengundang Anda untuk merayakan pernikahan kami</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-rose-600 mb-4 drop-shadow-sm">
            {templateData.bride.name}
          </h1>
          <div className="text-5xl text-rose-400 my-6 font-serif italic">&</div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-rose-600 mb-8 drop-shadow-sm">
            {templateData.groom.name}
          </h1>
          <p className="text-2xl text-muted-foreground mb-10 font-serif">
            {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}
          </p>
          <Button size="lg" onClick={() => setOpened(true)} className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all">
            Buka Undangan 💌
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen floral-bg bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero */}
      <section className="relative h-[70vh] bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200 flex items-center justify-center overflow-hidden">
        <img src={templateData.mainPhoto} alt="Couple" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl opacity-10 animate-pulse">🌸</div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">{templateData.bride.name} & {templateData.groom.name}</h2>
          <p className="text-xl md:text-2xl font-serif italic drop-shadow">{templateData.weddingDate.day}, {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        {/* Countdown */}
        <section className="text-center">
          <div className="inline-block mb-4 text-4xl">💕</div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-8">Hitungan Mundur</h2>
          <Countdown />
        </section>

        {/* Acara */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">📅</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-2">Acara Pernikahan</h2>
            <p className="text-muted-foreground font-serif italic">Kehadiran Anda adalah hadiah terindah bagi kami</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur border-rose-200 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-600 font-heading">{templateData.ceremony.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground font-serif">Waktu</p>
                  <p className="font-semibold font-serif">{templateData.ceremony.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-serif">Lokasi</p>
                  <p className="font-semibold font-serif">{templateData.ceremony.location}</p>
                </div>
                <Button variant="outline" className="w-full rounded-full" onClick={() => window.open(templateData.ceremony.map)}>
                  📍 Lihat di Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-rose-200 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-600 font-heading">{templateData.reception.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground font-serif">Waktu</p>
                  <p className="font-semibold font-serif">{templateData.reception.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-serif">Lokasi</p>
                  <p className="font-semibold font-serif">{templateData.reception.location}</p>
                </div>
                <Button variant="outline" className="w-full rounded-full" onClick={() => window.open(templateData.reception.map)}>
                  📍 Lihat di Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pasangan */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">💑</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-2">Mempelai</h2>
            <p className="text-muted-foreground font-serif italic max-w-2xl mx-auto">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya"
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-full rounded-2xl mb-4 shadow-xl" />
              <h3 className="text-3xl font-heading font-bold text-rose-600">{templateData.bride.fullName}</h3>
              <p className="text-sm text-muted-foreground mt-2 font-serif italic">{templateData.bride.parent}</p>
            </div>
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-full rounded-2xl mb-4 shadow-xl" />
              <h3 className="text-3xl font-heading font-bold text-rose-600">{templateData.groom.fullName}</h3>
              <p className="text-sm text-muted-foreground mt-2 font-serif italic">{templateData.groom.parent}</p>
            </div>
          </div>
        </section>

        {/* Galeri */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">📸</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600">Galeri Kami</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {templateData.gallery.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={photo} alt={`Gallery ${i + 1}`} className="w-full h-64 object-cover rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300" />
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">✉️</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600">Konfirmasi Kehadiran</h2>
          </div>
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">RSVP</CardTitle>
              <CardDescription className="font-serif">Mohon konfirmasi kehadiran Anda sebelum 1 Desember 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRsvp} className="space-y-4">
                <div>
                  <Label htmlFor="rsvp-name">Nama</Label>
                  <Input
                    id="rsvp-name"
                    type="text"
                    placeholder="Nama Anda"
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-email">Email</Label>
                  <Input
                    id="rsvp-email"
                    type="email"
                    placeholder="email@example.com"
                    value={rsvp.email}
                    onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-attending">Kehadiran</Label>
                  <select
                    id="rsvp-attending"
                    value={rsvp.attending}
                    onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="yes">Akan Hadir</option>
                    <option value="no">Tidak Dapat Hadir</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="rsvp-guests">Jumlah Tamu</Label>
                  <Input
                    id="rsvp-guests"
                    type="number"
                    min="1"
                    max="5"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: parseInt(e.target.value) })}
                  />
                </div>
                <Button type="submit" className="w-full">Kirim RSVP</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Doa & Ucapan */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">💬</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600">Doa & Ucapan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Kirim Ucapan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWishes} className="space-y-4">
                  <div>
                    <Label htmlFor="wish-name" className="font-serif">Nama</Label>
                    <Input
                      id="wish-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={wishes.name}
                      onChange={(e) => setWishes({ ...wishes, name: e.target.value })}
                      required
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wish-message" className="font-serif">Ucapan</Label>
                    <Textarea
                      id="wish-message"
                      placeholder="Tulis ucapan terbaik Anda..."
                      value={wishes.message}
                      onChange={(e) => setWishes({ ...wishes, message: e.target.value })}
                      required
                      rows={4}
                      className="rounded-2xl"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full">Kirim Ucapan</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl">Ucapan dari Tamu ({wishesList.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {wishesList.length === 0 ? (
                  <p className="text-muted-foreground text-sm font-serif italic">Belum ada ucapan. Jadilah yang pertama!</p>
                ) : (
                  wishesList.map((wish, i) => (
                    <Card key={i} className="bg-white/60 backdrop-blur border-rose-100">
                      <CardContent className="pt-4">
                        <p className="font-semibold text-sm font-heading">{wish.name}</p>
                        <p className="text-sm text-muted-foreground font-serif mt-1">{wish.message}</p>
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
          <div className="text-center mb-10">
            <div className="inline-block mb-4 text-4xl">🎁</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-2">Hadiah</h2>
            <p className="text-muted-foreground font-serif italic max-w-2xl mx-auto">Doa dan kehadiran Anda sudah menjadi hadiah terindah, namun jika ingin memberikan hadiah, berikut rekeningnya:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {templateData.gifts.map((gift, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur border-rose-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{gift.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground font-serif">Atas Nama</p>
                      <p className="font-semibold font-heading">{gift.atas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-serif">Nomor Rekening</p>
                      <p className="font-mono font-semibold text-lg">{gift.number}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-full"
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
        <section className="text-center py-16 border-t border-rose-200">
          <div className="inline-block mb-6 text-5xl">🌸</div>
          <h2 className="text-4xl font-heading font-bold text-rose-600 mb-4">Terima Kasih</h2>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto mb-6 leading-relaxed">
            Atas kehadiran dan doa dari Anda, kami mengucapkan terima kasih yang sebesar-besarnya. Semoga pernikahan kami membawa berkah bagi kita semua.
          </p>
          <div className="text-muted-foreground font-serif">
            <p className="font-heading text-lg">{templateData.bride.name} & {templateData.groom.name}</p>
            <p className="mt-2 italic">✨ Bersama di tengah cinta ✨</p>
          </div>
        </section>
      </div>
    </div>
  )
}
