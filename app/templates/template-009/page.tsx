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
    name: 'Tetangga',
    fullName: 'Tetangga Sari Wulandari, S.Kom',
    parent: 'Bapak Kusumo & Ibu Lestari',
    childOrder: 'The only daughter',
    photo: 'https://placehold.co/600x800/dcfce7/15803d?text=Tetangga',
    instagram: 'https://instagram.com/tetangga',
  },
  groom: {
    name: 'Firman',
    fullName: 'Firman Hidayat, S.H',
    parent: 'Bapak Suharjo & Ibu Karti',
    childOrder: 'First son',
    photo: 'https://placehold.co/600x800/dcfce7/15803d?text=Firman',
    instagram: 'https://instagram.com/firmanhidayat',
  },
  coverPhoto: 'https://placehold.co/1920x1080/dcfce7/15803d?text=Firman+%26+Tetangga+Wedding',
  weddingDate: {
    date: '10',
    month: '10',
    year: '2025',
    day: 'Friday',
    fullDate: 'October 10th, 2025',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '08:00 WIB',
    location: 'Masjid Al-Amin',
    address: 'Jl. Merpati No. 67, Surabaya',
  },
  reception: {
    type: 'Resepsi',
    time: '17:00 WIB',
    location: 'Gedung Serbaguna',
    address: 'Jl. Pahlawan No. 10, Surabaya',
  },
  quote: {
    text: 'The purpose of a relationship is not to have another who might complete you, but to have another with whom you might share your completeness.',
    author: 'Neale Donald Walsch',
  },
  galleryQuote: 'Sweet simplicity in love.',
  gallery: [
    'https://placehold.co/800x600/dcfce7/15803d?text=Prewedding+1',
    'https://placehold.co/800x600/fef08a/a16207?text=Prewedding+2',
    'https://placehold.co/800x600/fbcfe8/c026d3?text=Prewedding+3',
    'https://placehold.co/800x600/c7d2fe/3730a3?text=Prewedding+4',
    'https://placehold.co/800x600/dcfce7/15803d?text=Prewedding+5',
    'https://placehold.co/800x600/fef08a/a16207?text=Prewedding+6',
  ],
  gifts: [
    { bank: 'BCA', number: '7788990011', name: 'Firman Hidayat' },
    { bank: 'Mandiri', number: '2233445566', name: 'Tetangga Sari Wulandari' },
  ],
  music: '/music/wedding.mp3',
}

export default function Template009() {
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-50">
        <img src={templateData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-white/60 to-amber-50/70"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-emerald-700 font-serif italic text-lg mb-6">Merupakan suatu kehormatan</p>
          <h1 className="text-7xl md:text-8xl font-bold text-emerald-800 mb-8 drop-shadow-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Firman & Tetangga
          </h1>
          <p className="text-2xl text-emerald-700 font-serif mb-10">10 Oktober 2025</p>
          <Button onClick={() => { toggleMusic(); setOpened(true) }} className="bg-emerald-600 text-white hover:bg-emerald-700 px-12 py-4 rounded-none font-semibold tracking-wide text-lg">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition" aria-label="Toggle musik">
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-600 font-serif italic text-lg mb-6">Dalam rasa syukur</p>
          <h1 className="text-6xl md:text-7xl font-bold text-emerald-800 mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Firman & Tetangga
          </h1>
          <p className="text-xl text-emerald-600 font-serif italic max-w-2xl mx-auto">{templateData.quote.text}</p>
          <p className="text-sm text-emerald-500 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-emerald-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-6 font-bold">The Bride</p>
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl rounded-full" />
              <h3 className="text-3xl font-bold text-emerald-800 mb-3">{templateData.bride.fullName}</h3>
              <p className="text-sm text-emerald-600 mb-4">{templateData.bride.childOrder}: {templateData.bride.parent}</p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-semibold">@{templateData.bride.instagram.split('/').pop()}</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-6 font-bold">The Groom</p>
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl rounded-full" />
              <h3 className="text-3xl font-bold text-emerald-800 mb-3">{templateData.groom.fullName}</h3>
              <p className="text-sm text-emerald-600 mb-4">{templateData.groom.childOrder}: {templateData.groom.parent}</p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-semibold">@{templateData.groom.instagram.split('/').pop()}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-emerald-800 mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>{templateData.galleryQuote}</h2>
          </div>
          <Carousel plugins={[Autoplay({ delay: 4000 })]} opts={{ align: 'center', loop: true }} className="w-full">
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img src={photo} alt={`Gallery ${i + 1}`} className="w-full aspect-[3/2] object-cover shadow-xl rounded-xl" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white border-none hover:bg-emerald-700 rounded-full" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white border-none hover:bg-emerald-700 rounded-full" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-emerald-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-emerald-800 text-center mb-16" style={{ fontFamily: "'Great Vibes', cursive" }}>Save The Date</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-xl border-emerald-100">
              <CardHeader className="border-b border-emerald-100"><CardTitle className="text-2xl text-emerald-800 font-bold">{templateData.ceremony.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Date</p><p className="font-serif text-emerald-700">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Time</p><p className="font-bold text-emerald-700">{templateData.ceremony.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Venue</p><p className="font-bold text-emerald-700">{templateData.ceremony.location}</p><p className="text-sm text-emerald-500 mt-1">{templateData.ceremony.address}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl border-emerald-100">
              <CardHeader className="border-b border-emerald-100"><CardTitle className="text-2xl text-emerald-800 font-bold">{templateData.reception.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Date</p><p className="font-serif text-emerald-700">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Time</p><p className="font-bold text-emerald-700">{templateData.reception.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">Venue</p><p className="font-bold text-emerald-700">{templateData.reception.location}</p><p className="text-sm text-emerald-500 mt-1">{templateData.reception.address}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-white p-8 max-w-2xl mx-auto shadow-xl rounded-xl">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Reservation (RSVP)</h3>
            <form onSubmit={handleRsvp} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-emerald-700 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} required className="mt-2 rounded-xl border-emerald-200 focus:border-emerald-400" /></div>
              <div><Label className="text-emerald-700 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={rsvp.attending === 'yes'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4 text-emerald-500" /><span className="text-emerald-700">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={rsvp.attending === 'no'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4 text-emerald-500" /><span className="text-emerald-700">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-emerald-800 mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>Sending Gift</h2>
          <div className="bg-emerald-50 shadow-xl p-8 max-w-2xl mx-auto rounded-xl">
            <div className="grid md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-white border-emerald-100 shadow-sm">
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Account Number</p><p className="font-mono font-bold text-emerald-700">{gift.number}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Account Name</p><p className="font-semibold text-emerald-700">{gift.name}</p></div>
                    <Button variant="outline" className="w-full rounded-xl border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white" onClick={() => copyToClipboard(gift.number, gift.bank)}>{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-emerald-800 text-center mb-12" style={{ fontFamily: "'Great Vibes', cursive" }}>Best Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 shadow-xl rounded-xl">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Send Your Wishes</h3>
              <form onSubmit={handleWishes} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-emerald-700 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={wishes.name} onChange={(e) => setWishes({ ...wishes, name: e.target.value })} required className="mt-2 rounded-xl border-emerald-200" /></div>
                <div><Label htmlFor="wish-message" className="text-emerald-700 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={wishes.message} onChange={(e) => setWishes({ ...wishes, message: e.target.value })} required rows={5} className="mt-2 rounded-xl border-emerald-200" /></div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-white p-4 shadow-md border border-emerald-100 rounded-xl"><p className="font-bold text-emerald-700">{wish.name}</p><p className="text-sm text-emerald-600 mt-2">{wish.message}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-emerald-800 text-center"><p className="text-emerald-100 text-sm">Powered by Agenda Kita</p></footer>
    </div>
  )
}