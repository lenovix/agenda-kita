'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const templateData = {
  bride: {
    name: 'Dina',
    fullName: 'Dina Maharani Putri, S.E',
    parent: 'Bapak Sukardi & Ibu Surtini',
    childOrder: 'Youngest daughter of',
    photo: 'https://placehold.co/600x800/fef3c7/d97706?text=Dina',
    instagram: 'https://instagram.com/dinamaharani',
  },
  groom: {
    name: 'Riyanto',
    fullName: 'Riyanto Wijaya, S.T, MBA',
    parent: 'Bapak Sutiyoso & Ibu Hartini',
    childOrder: 'First son of',
    photo: 'https://placehold.co/600x800/fef3c7/d97706?text=Riyanto',
    instagram: 'https://instagram.com/riyantow',
  },
  coverPhoto: 'https://placehold.co/1920x1080/1f2937/fbbf24?text=Riyanto+%26+Dina+Wedding',
  weddingDate: {
    date: '22',
    month: '08',
    year: '2025',
    day: 'Saturday',
    fullDate: 'August 22nd, 2025',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '09:30 WIB - selesai',
    location: 'Gereja Katedral',
    address: 'Jl. Pemuda No. 88, Jakarta Timur',
  },
  reception: {
    type: 'Resepsi Mewah',
    time: '19:00 WIB - 23:00 WIB',
    location: 'The Grand Ballroom Hotel Mewah',
    address: 'Jl. Sudirman No. 10, Jakarta Pusat',
  },
  quote: {
    text: 'A successful marriage requires falling in love many times, always with the same person.',
    author: 'Mignon McLaughlin',
  },
  galleryQuote: 'Luxury moments, forever captured.',
  gallery: [
    'https://placehold.co/800x600/fef3c7/d97706?text=Prewedding+1',
    'https://placehold.co/800x600/fcd34d/f59e0b?text=Prewedding+2',
    'https://placehold.co/800x600/fbbf24/b45309?text=Prewedding+3',
    'https://placehold.co/800x600/f59e0b/92400e?text=Prewedding+4',
    'https://placehold.co/800x600/fef3c7/d97706?text=Prewedding+5',
    'https://placehold.co/800x600/fcd34d/f59e0b?text=Prewedding+6',
  ],
  gifts: [
    { bank: 'CIMB', number: '1111222233334444', name: 'Riyanto Wijaya' },
    { bank: 'BNI', number: '5555666677778888', name: 'Dina Maharani Putri' },
  ],
  music: '/music/wedding.mp3',
}

export default function Template008() {
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rsvp, setRsvp] = useState({ name: '', attending: '' })
  const [wishes, setWishes] = useState({ name: '', message: '' })
  const [wishesList, setWishesList] = useState<Array<{ name: string; message: string }>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(templateData.music)
      audioRef.current.loop = true
    }
    if (muted || !musicPlaying) {
      audioRef.current.play().catch(() => setMusicPlaying(false))
      setMusicPlaying(true)
      setMuted(false)
    } else {
      audioRef.current.pause()
      setMusicPlaying(false)
      setMuted(true)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedGift(name)
    setTimeout(() => setCopiedGift(null), 2000)
  }

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`RSVP: ${rsvp.name}, Kehadiran: ${rsvp.attending}`)
    setRsvp({ name: '', attending: '' })
  }

  const handleWishes = (e: React.FormEvent) => {
    e.preventDefault()
    if (wishes.name && wishes.message) {
      setWishesList([...wishesList, wishes])
      setWishes({ name: '', message: '' })
    }
  }

  if (!opened) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <img src={templateData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-yellow-900/40"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-yellow-300 font-serif italic text-lg mb-6">Dengan hormat mengundang Anda</p>
          <h1 className="text-7xl md:text-8xl font-bold text-yellow-400 mb-8 drop-shadow-2xl" style={{ fontFamily: "'Cinzel', serif" }}>
            Riyanto & Dina
          </h1>
          <p className="text-2xl text-yellow-300 font-serif mb-10">22 Agustus 2025</p>
          <Button onClick={() => { toggleMusic(); setOpened(true) }} className="bg-yellow-600 text-white hover:bg-yellow-700 px-12 py-4 rounded-sm font-semibold tracking-widest text-lg uppercase">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-sm bg-yellow-600 text-white shadow-2xl hover:bg-yellow-700 transition" aria-label="Toggle musik">
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-300 font-serif italic text-lg mb-6">Dengan segenap hati dan ketulusan</p>
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            Riyanto Wijaya & Dina Maharani Putri
          </h1>
          <p className="text-xl text-yellow-200 font-serif italic max-w-2xl mx-auto">{templateData.quote.text}</p>
          <p className="text-sm text-yellow-400 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-yellow-400 mb-6 font-bold">Mempelai Wanita</p>
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl border-4 border-yellow-600" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{templateData.bride.fullName}</h3>
              <p className="text-sm text-yellow-300 mb-4">{templateData.bride.childOrder} {templateData.bride.parent}</p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-semibold">@{templateData.bride.instagram.split('/').pop()}</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-yellow-400 mb-6 font-bold">Mempelai Pria</p>
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl border-4 border-yellow-600" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{templateData.groom.fullName}</h3>
              <p className="text-sm text-yellow-300 mb-4">{templateData.groom.childOrder} {templateData.groom.parent}</p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-semibold">@{templateData.groom.instagram.split('/').pop()}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 border-b border-yellow-600 pb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6" style={{ fontFamily: "'Cinzel', serif" }}>{templateData.galleryQuote}</h2>
          </div>
          <Carousel plugins={[Autoplay({ delay: 5000 })]} opts={{ align: 'center', loop: true }} className="w-full">
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img src={photo} alt={`Gallery ${i + 1}`} className="w-full aspect-video object-cover shadow-2xl border-2 border-yellow-600" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-600 text-white border-none hover:bg-yellow-700" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-600 text-white border-none hover:bg-yellow-700" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center mb-16" style={{ fontFamily: "'Cinzel', serif" }}>Jadwal Acara</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900 shadow-xl border-yellow-600">
              <CardHeader className="border-b border-yellow-600"><CardTitle className="text-2xl text-yellow-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{templateData.ceremony.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Tanggal</p><p className="font-serif text-yellow-300">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Waktu</p><p className="font-bold text-yellow-300">{templateData.ceremony.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Tempat</p><p className="font-bold text-yellow-300">{templateData.ceremony.location}</p><p className="text-sm text-yellow-400 mt-1">{templateData.ceremony.address}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 shadow-xl border-yellow-600">
              <CardHeader className="border-b border-yellow-600"><CardTitle className="text-2xl text-yellow-400 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{templateData.reception.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Tanggal</p><p className="font-serif text-yellow-300">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Waktu</p><p className="font-bold text-yellow-300">{templateData.reception.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Tempat</p><p className="font-bold text-yellow-300">{templateData.reception.location}</p><p className="text-sm text-yellow-400 mt-1">{templateData.reception.address}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-900 border border-yellow-600 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6" style={{ fontFamily: "'Cinzel', serif" }}>Konfirmasi Kehadiran</h3>
            <form onSubmit={handleRsvp} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-yellow-300 font-semibold uppercase text-sm">Nama Lengkap</Label><Input id="rsvp-name" type="text" placeholder="Masukkan nama Anda" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} required className="mt-2 rounded-sm border-yellow-600 bg-gray-800 text-white" /></div>
              <div><Label className="text-yellow-300 font-semibold uppercase text-sm mb-3 block">Apakah Anda hadir?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={rsvp.attending === 'yes'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-yellow-300">Ya, saya akan hadir</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={rsvp.attending === 'no'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-yellow-300">Maaf, saya tidak bisa hadir</span></label></div></div>
              <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-sm font-semibold uppercase">Kirim Konfirmasi</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6" style={{ fontFamily: "'Cinzel', serif" }}>Amplop Digital</h2>
          <div className="bg-gray-800 shadow-2xl border border-yellow-600 p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-gray-900 border-yellow-600 shadow-lg">
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold">Nomor Rekening</p><p className="font-mono font-bold text-yellow-300">{gift.number}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-yellow-400 font-bold">Atas Nama</p><p className="font-semibold text-yellow-300">{gift.name}</p></div>
                    <Button variant="outline" className="w-full rounded-sm border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white" onClick={() => copyToClipboard(gift.number, gift.bank)}>{copiedGift === gift.bank ? '✓ Tersalin' : 'Salin Nomor'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center mb-12" style={{ fontFamily: "'Cinzel', serif" }}>Doa dan Ucapan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-yellow-600 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6" style={{ fontFamily: "'Cinzel', serif" }}>Kirim Ucapan</h3>
              <form onSubmit={handleWishes} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-yellow-300 font-bold text-sm uppercase">Nama</Label><Input id="wish-name" type="text" placeholder="Nama Anda" value={wishes.name} onChange={(e) => setWishes({ ...wishes, name: e.target.value })} required className="mt-2 rounded-sm border-yellow-600 bg-gray-800 text-white" /></div>
                <div><Label htmlFor="wish-message" className="text-yellow-300 font-bold text-sm uppercase">Ucapan</Label><Textarea id="wish-message" placeholder="Tulis ucapan Anda..." value={wishes.message} onChange={(e) => setWishes({ ...wishes, message: e.target.value })} required rows={5} className="mt-2 rounded-sm border-yellow-600 bg-gray-800 text-white" /></div>
                <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-sm font-semibold uppercase">Kirim Ucapan</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-gray-900 border border-yellow-600 p-4 shadow-md"><p className="font-bold text-yellow-400">{wish.name}</p><p className="text-sm text-yellow-200 mt-2">{wish.message}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black text-center border-t border-yellow-600"><p className="text-yellow-400 text-sm font-semibold">Powered by Agenda Kita</p></footer>
    </div>
  )
}