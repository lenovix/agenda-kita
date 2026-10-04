'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const templateData = {
  bride: {
    name: 'Nurul Hidayah',
    fullName: 'Nurul Hidayah Siregar',
    parent: 'Bapak Siregar & Ibu Widya',
    photo: 'https://placehold.co/300x400/8b5a2b/ffd700?text=Bride+Minang',
  },
  groom: {
    name: 'Hendrik Tambunan',
    fullName: 'Hendrik Tambunan Sitepu',
    parent: 'Bapak Tambunan & Ibu Syamsiah',
    photo: 'https://placehold.co/300x400/8b5a2b/ffd700?text=Groom+Minang',
  },
  mainPhoto: 'https://placehold.co/1200x600/8b5a2b/ffd700?text=Wedding+Minang',
  weddingDate: {
    date: '5',
    month: 'Februari',
    year: '2025',
    day: 'Sabtu',
    dayMinang: 'Hari Sabtu',
  },
  ceremony: {
    type: 'Ijab Qabul',
    time: '09:00 - 10:30 WIB',
    location: 'Masjid Raya Bandung, Jl. Ahmad Yani No. 99, Bandung',
    map: 'https://maps.google.com',
  },
  reception: {
    type: 'Resepsi Adat Minang',
    time: '12:00 - 16:00 WIB',
    location: 'Rumah Gadang Tradisional, Jl. Merdeka No. 50, Bandung',
    map: 'https://maps.google.com',
  },
  messages: [
    'Undangan ini kami persembahkan untuk Anda yang kami hormati',
    'Kehadiran Anda adalah kehormatan bagi keluarga besar kami',
  ],
  gallery: [
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+1',
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+2',
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+3',
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+4',
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+5',
    'https://placehold.co/400x300/8b5a2b/ffd700?text=Photo+6',
  ],
  gifts: [
    { name: 'BRI', number: '333444555', atas: 'Hendrik Tambunan' },
    { name: 'Mandiri', number: '666777888', atas: 'Nurul Hidayah' },
  ],
}

function Countdown() {
  const [countdown, setCountdown] = useState({ days: 25, hours: 14, minutes: 20, seconds: 0 })

  return (
    <div className="grid grid-cols-4 gap-3 justify-center max-w-lg mx-auto">
      {[
        { label: 'Hari', value: countdown.days },
        { label: 'Jam', value: countdown.hours },
        { label: 'Menit', value: countdown.minutes },
        { label: 'Detik', value: countdown.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-gradient-to-br from-amber-600 to-yellow-600 text-yellow-100 rounded-lg p-4 font-bold text-3xl border-2 border-yellow-500 shadow-lg">
            {String(item.value).padStart(2, '0')}
          </div>
          <p className="text-xs text-amber-900 mt-2 font-semibold uppercase">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function Template003() {
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
      <div className="relative min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-10 left-10 w-32 h-32" viewBox="0 0 100 100" fill="currentColor" color="#8b5a2b">
            <path d="M50 10L20 50L30 80L50 70L70 80L80 50Z"/>
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,90,43,0.1)_0%,_transparent_70%)]"></div>
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="mb-6 text-sm text-amber-900 font-serif">
            <p className="italic mb-4">"Assalamu'alaikum Warahmatullahi Wabarakatuh"</p>
            <p className="text-amber-700">Dengan segala kerendahan hati, kami mengundang Anda</p>
            <p className="text-amber-700">untuk menghadiri acara pernikahan kami</p>
          </div>
          <div className="my-8 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-amber-700"></div>
            <svg className="w-6 h-6 text-amber-900" fill="currentColor" viewBox="0 0 100 100">
              <path d="M50 10L20 50L30 80L50 70L70 80L80 50Z"/>
            </svg>
            <div className="w-12 h-px bg-amber-700"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-2 drop-shadow-sm">
            {templateData.bride.name}
          </h1>
          <p className="text-3xl text-amber-800 my-4 font-serif">&</p>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-8 drop-shadow-sm">
            {templateData.groom.name}
          </h1>
          <p className="text-lg text-amber-800 mb-2 font-serif">
            {templateData.weddingDate.dayMinang}
          </p>
          <p className="text-2xl text-amber-900 mb-10 font-semibold">
            {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}
          </p>
          <Button size="lg" onClick={() => setOpened(true)} className="text-lg px-10 py-6 rounded-lg bg-gradient-to-r from-amber-700 to-yellow-600 text-yellow-100 hover:from-amber-800 hover:to-yellow-700 shadow-lg font-semibold">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Hero dengan pola songket */}
      <section className="relative h-[60vh] bg-gradient-to-br from-amber-800 via-yellow-700 to-orange-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1)), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px'}}></div>
        </div>
        <img src={templateData.mainPhoto} alt="Couple" className="w-full h-full object-cover opacity-50 absolute" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-amber-900/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-2">{templateData.bride.name} & {templateData.groom.name}</h2>
          <p className="text-xl font-serif italic">{templateData.weddingDate.day}, {templateData.weddingDate.date} {templateData.weddingDate.month} {templateData.weddingDate.year}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        {/* Sambutan */}
        <section className="text-center">
          <div className="inline-block bg-gradient-to-r from-amber-700 to-yellow-600 px-6 py-3 rounded-lg mb-6">
            <p className="text-yellow-100 font-serif italic">Undangan Pernikahan Adat Minang</p>
          </div>
          {templateData.messages.map((msg, i) => (
            <p key={i} className="text-amber-900 font-serif text-lg mb-3 italic">{msg}</p>
          ))}
        </section>

        {/* Countdown */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8">Hitungan Waktu</h2>
          <Countdown />
        </section>

        {/* Acara */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Rangkaian Acara</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-amber-700 shadow-lg">
              <CardHeader className="border-b-2 border-amber-700">
                <CardTitle className="text-2xl text-amber-900">{templateData.ceremony.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <p className="text-sm text-amber-700 font-semibold uppercase">Waktu</p>
                  <p className="text-lg font-semibold text-amber-900">{templateData.ceremony.time}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-semibold uppercase">Lokasi</p>
                  <p className="text-amber-900">{templateData.ceremony.location}</p>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800 text-yellow-100" onClick={() => window.open(templateData.ceremony.map)}>
                  📍 Lihat di Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-amber-700 shadow-lg">
              <CardHeader className="border-b-2 border-amber-700">
                <CardTitle className="text-2xl text-amber-900">{templateData.reception.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <p className="text-sm text-amber-700 font-semibold uppercase">Waktu</p>
                  <p className="text-lg font-semibold text-amber-900">{templateData.reception.time}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-semibold uppercase">Lokasi</p>
                  <p className="text-amber-900">{templateData.reception.location}</p>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800 text-yellow-100" onClick={() => window.open(templateData.reception.map)}>
                  📍 Lihat di Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mempelai */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Mempelai Pengantin</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-full rounded-lg mb-4 border-4 border-amber-700" />
              <h3 className="text-2xl font-bold text-amber-900">{templateData.bride.fullName}</h3>
              <p className="text-sm text-amber-700 mt-2 font-serif italic">{templateData.bride.parent}</p>
            </div>
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-full rounded-lg mb-4 border-4 border-amber-700" />
              <h3 className="text-2xl font-bold text-amber-900">{templateData.groom.fullName}</h3>
              <p className="text-sm text-amber-700 mt-2 font-serif italic">{templateData.groom.parent}</p>
            </div>
          </div>
        </section>

        {/* Galeri */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Galeri Prewedding</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {templateData.gallery.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={photo} alt={`Gallery ${i + 1}`} className="w-full h-64 object-cover rounded-lg border-2 border-amber-700 hover:shadow-lg transition" />
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Konfirmasi Kehadiran</h2>
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-amber-700">
            <CardHeader className="border-b-2 border-amber-700">
              <CardTitle className="text-2xl text-amber-900">RSVP</CardTitle>
              <CardDescription className="text-amber-800">Mohon konfirmasi kehadiran sebelum 31 Januari 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRsvp} className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="rsvp-name" className="text-amber-900 font-semibold">Nama</Label>
                  <Input
                    id="rsvp-name"
                    type="text"
                    placeholder="Nama Anda"
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    required
                    className="border-amber-700 focus:border-amber-900"
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-email" className="text-amber-900 font-semibold">Email</Label>
                  <Input
                    id="rsvp-email"
                    type="email"
                    placeholder="email@example.com"
                    value={rsvp.email}
                    onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
                    required
                    className="border-amber-700 focus:border-amber-900"
                  />
                </div>
                <div>
                  <Label htmlFor="rsvp-attending" className="text-amber-900 font-semibold">Kehadiran</Label>
                  <select
                    id="rsvp-attending"
                    value={rsvp.attending}
                    onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                    className="w-full border-2 border-amber-700 rounded-lg p-2"
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="yes">Akan Hadir</option>
                    <option value="no">Tidak Dapat Hadir</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="rsvp-guests" className="text-amber-900 font-semibold">Jumlah Tamu</Label>
                  <Input
                    id="rsvp-guests"
                    type="number"
                    min="1"
                    max="5"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: parseInt(e.target.value) })}
                    className="border-amber-700 focus:border-amber-900"
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-yellow-100 font-semibold">
                  Kirim RSVP
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Doa & Ucapan */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Doa & Ucapan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-amber-700">
              <CardHeader className="border-b-2 border-amber-700">
                <CardTitle className="text-amber-900">Kirim Ucapan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWishes} className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="wish-name" className="text-amber-900 font-semibold">Nama</Label>
                    <Input
                      id="wish-name"
                      type="text"
                      placeholder="Nama Anda"
                      value={wishes.name}
                      onChange={(e) => setWishes({ ...wishes, name: e.target.value })}
                      required
                      className="border-amber-700 focus:border-amber-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wish-message" className="text-amber-900 font-semibold">Ucapan</Label>
                    <Textarea
                      id="wish-message"
                      placeholder="Tulis doa dan ucapan Anda..."
                      value={wishes.message}
                      onChange={(e) => setWishes({ ...wishes, message: e.target.value })}
                      required
                      rows={4}
                      className="border-amber-700 focus:border-amber-900"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-yellow-100 font-semibold">
                    Kirim Ucapan
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-amber-900">Ucapan dari Keluarga Besar ({wishesList.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishesList.length === 0 ? (
                  <p className="text-amber-700 text-sm font-serif italic text-center py-8">Belum ada ucapan. Jadilah yang pertama berdoa untuk kami!</p>
                ) : (
                  wishesList.map((wish, i) => (
                    <Card key={i} className="bg-yellow-100 border-amber-700">
                      <CardContent className="pt-4">
                        <p className="font-semibold text-sm text-amber-900">{wish.name}</p>
                        <p className="text-sm text-amber-800 mt-1 font-serif italic">{wish.message}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-10">Hadiah</h2>
          <p className="text-center text-amber-800 font-serif mb-8">Doa restu Anda adalah hadiah terindah. Jika ingin memberikan hadiah:</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {templateData.gifts.map((gift, i) => (
              <Card key={i} className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-amber-700">
                <CardHeader className="border-b-2 border-amber-700">
                  <CardTitle className="text-amber-900">{gift.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div>
                    <p className="text-xs text-amber-700 font-semibold uppercase">Atas Nama</p>
                    <p className="font-semibold text-amber-900">{gift.atas}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-semibold uppercase">Nomor Rekening</p>
                    <p className="font-mono font-semibold text-amber-900">{gift.number}</p>
                  </div>
                  <Button
                    className="w-full bg-amber-700 hover:bg-amber-800 text-yellow-100"
                    onClick={() => copyToClipboard(gift.number, gift.name)}
                  >
                    {copiedGift === gift.name ? '✓ Tersalin' : 'Salin Nomor'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-12 border-t-4 border-amber-700">
          <p className="text-amber-900 font-serif text-lg italic mb-4">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Terima Kasih</h2>
          <p className="text-amber-800 font-serif max-w-2xl mx-auto mb-6">
            Atas kehadiran dan doa dari Anda, kami mengucapkan terima kasih yang sebesar-besarnya.
          </p>
          <div className="text-amber-800 font-serif">
            <p className="font-bold text-lg">{templateData.bride.name} & {templateData.groom.name}</p>
            <p className="mt-2">Semoga senantiasa mendapat berkah dari Allah SWT</p>
          </div>
        </section>
      </div>
    </div>
  )
}
