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
    name: 'Siti',
    fullName: 'Siti Nurhaliza, S.Pd',
    parent: 'Bapak Ahmad & Ibu Fatimah',
    childOrder: 'Second daughter of',
    photo: 'https://placehold.co/600x800/fce7f3/ec4899?text=Siti',
    instagram: 'https://instagram.com/sitinurhaliza',
  },
  groom: {
    name: 'Budi',
    fullName: 'Budi Santoso, S.Kom',
    parent: 'Bapak Sutrisno & Ibu Wati',
    childOrder: 'First son of',
    photo: 'https://placehold.co/600x800/fce7f3/ec4899?text=Budi',
    instagram: 'https://instagram.com/budis',
  },
  coverPhoto: 'https://placehold.co/1920x1080/fce7f3/ec4899?text=Budi+%26+Siti+Wedding',
  weddingDate: {
    date: '15',
    month: '06',
    year: '2025',
    day: 'Sunday',
    fullDate: 'June 15th, 2025',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '10:00 WIB - selesai',
    location: 'Masjid Al-Mukminun',
    address: 'Jl. Raya No. 123, Jakarta Selatan',
  },
  reception: {
    type: 'Resepsi',
    time: '18:00 WIB - 21:00 WIB',
    location: 'The Garden Ballroom',
    address: 'Jl. Kebon Jeruk No. 45, Jakarta Barat',
  },
  quote: {
    text: 'In every walk with nature, one receives far more than he seeks.',
    author: 'John Muir',
  },
  galleryQuote: 'Love grows here.',
  gallery: [
    'https://placehold.co/800x600/fce7f3/ec4899?text=Prewedding+1',
    'https://placehold.co/800x600/fde68a/f59e0b?text=Prewedding+2',
    'https://placehold.co/800x600/bbf7d0/22c55e?text=Prewedding+3',
    'https://placehold.co/800x600/bfdbfe/3b82f6?text=Prewedding+4',
    'https://placehold.co/800x600/fce7f3/ec4899?text=Prewedding+5',
    'https://placehold.co/800x600/fde68a/f59e0b?text=Prewedding+6',
  ],
  gifts: [
    { bank: 'BCA', number: '1234567890', name: 'Budi Santoso' },
    { bank: 'Mandiri', number: '0987654321', name: 'Siti Nurhaliza' },
  ],
  music: '/music/wedding.mp3',
}

export default function Template007() {
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={templateData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-pink-50/60 to-amber-100/40"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-pink-800 font-serif italic text-lg mb-6">Dengan penuh kebahagiaan</p>
          <h1 className="text-7xl md:text-8xl font-bold text-pink-700 mb-8 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Budi & Siti
          </h1>
          <p className="text-2xl text-pink-700 font-serif mb-10">15 Juni 2025</p>
          <Button onClick={() => { toggleMusic(); setOpened(true) }} className="bg-pink-500 text-white hover:bg-pink-600 px-12 py-4 rounded-none font-semibold tracking-wide text-lg">
            Buka Undangan 🎵
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50">
      <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition" aria-label="Toggle musik">
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-pink-600 font-serif italic text-lg mb-6">Together with their families</p>
          <h1 className="text-6xl md:text-7xl font-bold text-pink-700 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Budi Santoso & Siti Nurhaliza
          </h1>
          <p className="text-xl text-pink-600 font-serif italic max-w-2xl mx-auto">{templateData.quote.text}</p>
          <p className="text-sm text-pink-500 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-pink-400 mb-6 font-bold">The Bride</p>
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl rounded-3xl" />
              <h3 className="text-4xl font-bold text-pink-700 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{templateData.bride.fullName}</h3>
              <p className="text-sm text-pink-400 mb-4">{templateData.bride.childOrder} {templateData.bride.parent}</p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 font-semibold">@{templateData.bride.instagram.split('/').pop()}</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-pink-400 mb-6 font-bold">The Groom</p>
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl rounded-3xl" />
              <h3 className="text-4xl font-bold text-pink-700 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{templateData.groom.fullName}</h3>
              <p className="text-sm text-pink-400 mb-4">{templateData.groom.childOrder} {templateData.groom.parent}</p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 font-semibold">@{templateData.groom.instagram.split('/').pop()}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-pink-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-pink-700 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{templateData.galleryQuote}</h2>
            <p className="text-lg text-pink-500 italic">Precious moments we shared</p>
          </div>
          <Carousel plugins={[Autoplay({ delay: 4000 })]} opts={{ align: 'center', loop: true }} className="w-full">
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img src={photo} alt={`Gallery ${i + 1}`} className="w-full aspect-video object-cover rounded-2xl shadow-xl" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white border-none hover:bg-pink-600 rounded-full" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white border-none hover:bg-pink-600 rounded-full" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-pink-700 text-center mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>Wedding Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-pink-50 shadow-xl border-pink-100">
              <CardHeader className="border-b border-pink-100"><CardTitle className="text-2xl text-pink-700 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{templateData.ceremony.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Date</p><p className="font-serif text-pink-700">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Time</p><p className="font-bold text-pink-700">{templateData.ceremony.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Venue</p><p className="font-bold text-pink-700">{templateData.ceremony.location}</p><p className="text-sm text-pink-400 mt-1">{templateData.ceremony.address}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-pink-50 shadow-xl border-pink-100">
              <CardHeader className="border-b border-pink-100"><CardTitle className="text-2xl text-pink-700 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{templateData.reception.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Date</p><p className="font-serif text-pink-700">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Time</p><p className="font-bold text-pink-700">{templateData.reception.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1">Venue</p><p className="font-bold text-pink-700">{templateData.reception.location}</p><p className="text-sm text-pink-400 mt-1">{templateData.reception.address}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-pink-50 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-pink-700 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Reservation (RSVP)</h3>
            <form onSubmit={handleRsvp} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-pink-700 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} required className="mt-2 rounded-none border-pink-200 focus:border-pink-400" /></div>
              <div><Label className="text-pink-700 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={rsvp.attending === 'yes'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4 text-pink-500" /><span className="text-pink-700">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={rsvp.attending === 'no'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4 text-pink-500" /><span className="text-pink-700">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-none font-semibold">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-pink-700 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Sending Gift</h2>
          <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-pink-50 border-pink-100 shadow-none">
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold">Account Number</p><p className="font-mono font-bold text-pink-700">{gift.number}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-pink-400 font-bold">Account Name</p><p className="font-semibold text-pink-700">{gift.name}</p></div>
                    <Button variant="outline" className="w-full rounded-none border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white" onClick={() => copyToClipboard(gift.number, gift.bank)}>{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-pink-700 text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>Guest Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-pink-50 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-pink-700 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send Your Wishes</h3>
              <form onSubmit={handleWishes} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-pink-700 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={wishes.name} onChange={(e) => setWishes({ ...wishes, name: e.target.value })} required className="mt-2 rounded-none border-pink-200" /></div>
                <div><Label htmlFor="wish-message" className="text-pink-700 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={wishes.message} onChange={(e) => setWishes({ ...wishes, message: e.target.value })} required rows={5} className="mt-2 rounded-none border-pink-200" /></div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-none font-semibold">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-white p-4 shadow-md border border-pink-100"><p className="font-bold text-pink-700">{wish.name}</p><p className="text-sm text-pink-600 mt-2">{wish.message}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-pink-700 text-center"><p className="text-pink-100 text-sm">Powered by Agenda Kita</p></footer>
    </div>
  )
}