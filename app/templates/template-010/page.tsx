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
    name: 'Maya',
    fullName: 'Maya Kusuma Dewi, S.Psi',
    parent: 'Bapak Bambang & Ibu Susi',
    childOrder: 'The only daughter',
    photo: 'https://placehold.co/600x800/fef3c7/f59e0b?text=Maya',
    instagram: 'https://instagram.com/mayakusuma',
  },
  groom: {
    name: 'Rio',
    fullName: 'Rio Fajar Dermawan, S.E',
    parent: 'Bapak Tono & Ibu Minah',
    childOrder: 'First son',
    photo: 'https://placehold.co/600x800/fef3c7/f59e0b?text=Rio',
    instagram: 'https://instagram.com/riofajar',
  },
  coverPhoto: 'https://placehold.co/1920x1080/fef3c7/f59e0b?text=Rio+%26+Maya+Wedding',
  weddingDate: {
    date: '28',
    month: '12',
    year: '2025',
    day: 'Saturday',
    fullDate: 'December 28th, 2025',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '10:00 WIB',
    location: 'Masjid Agung',
    address: 'Jl. Sultan No. 1, Medan',
  },
  reception: {
    type: 'Reception',
    time: '19:00 WIB',
    location: 'Grand Convention Center',
    address: 'Jl. Gatot Subroto No. 88, Medan',
  },
  quote: {
    text: 'True love is not about being inseparable; it\'s about being able to separate and still know that you\'ll run back into each other\'s arms.',
    author: 'Tyler Knott Gregson',
  },
  galleryQuote: 'Colorful moments, eternal love.',
  gallery: [
    'https://placehold.co/800x600/fef3c7/f59e0b?text=Prewedding+1',
    'https://placehold.co/800x600/fbcfe8/ec4899?text=Prewedding+2',
    'https://placehold.co/800x600/dbeafe/3b82f6?text=Prewedding+3',
    'https://placehold.co/800x600/dcfce7/22c55e?text=Prewedding+4',
    'https://placehold.co/800x600/f3e8ff/a855f7?text=Prewedding+5',
    'https://placehold.co/800x600/fed7aa/ea580c?text=Prewedding+6',
  ],
  gifts: [
    { bank: 'BRI', number: '4444555566667777', name: 'Rio Fajar Dermawan' },
    { bank: 'BNI', number: '8888999900001111', name: 'Maya Kusuma Dewi' },
  ],
  music: '/music/wedding.mp3',
}

export default function Template010() {
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
        <img src={templateData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/60 via-pink-100/50 to-blue-100/60"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-amber-800 font-serif italic text-lg mb-6">Dengan gembira mengundang Anda</p>
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-8 drop-shadow-lg">
            Rio & Maya
          </h1>
          <p className="text-2xl bg-gradient-to-r from-yellow-700 to-pink-700 bg-clip-text text-transparent font-serif mb-10">28 Desember 2025</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => { toggleMusic(); setOpened(true) }} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 px-12 py-4 rounded-full font-semibold tracking-wide text-lg shadow-lg">
              🎵 Buka Undangan
            </Button>
            <Button onClick={() => setOpened(true)} variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 px-12 py-4 rounded-full font-semibold">
              Tanpa Musik
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-blue-50">
      <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl hover:from-yellow-600 hover:to-orange-600 transition" aria-label="Toggle musik">
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-700 font-serif italic text-lg mb-6">Bersama keluarga dengan hati penuh syukur</p>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Rio Fajar Dermawan & Maya Kusuma Dewi
          </h1>
          <p className="text-xl text-amber-700 font-serif italic max-w-2xl mx-auto">{templateData.quote.text}</p>
          <p className="text-sm text-amber-600 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6 font-bold">The Beautiful Bride</p>
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl rounded-2xl" />
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-pink-600 bg-clip-text text-transparent mb-3">{templateData.bride.fullName}</h3>
              <p className="text-sm text-amber-700 mb-4">{templateData.bride.childOrder}: {templateData.bride.parent}</p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">@{templateData.bride.instagram.split('/').pop()}</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 font-bold">The Handsome Groom</p>
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-2xl rounded-2xl" />
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">{templateData.groom.fullName}</h3>
              <p className="text-sm text-amber-700 mb-4">{templateData.groom.childOrder}: {templateData.groom.parent}</p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">@{templateData.groom.instagram.split('/').pop()}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-r from-yellow-100 to-pink-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">{templateData.galleryQuote}</h2>
          </div>
          <Carousel plugins={[Autoplay({ delay: 3500 })]} opts={{ align: 'center', loop: true }} className="w-full">
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img src={photo} alt={`Gallery ${i + 1}`} className="w-full aspect-[4/3] object-cover shadow-2xl rounded-3xl" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none hover:from-yellow-600 hover:to-orange-600 rounded-full" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none hover:from-yellow-600 hover:to-orange-600 rounded-full" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent text-center mb-16">Wedding Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl border-yellow-200 rounded-3xl">
              <CardHeader className="border-b border-yellow-200"><CardTitle className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">{templateData.ceremony.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-1">Date</p><p className="font-serif text-amber-800">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-1">Time</p><p className="font-bold text-amber-800">{templateData.ceremony.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-1">Venue</p><p className="font-bold text-amber-800">{templateData.ceremony.location}</p><p className="text-sm text-amber-600 mt-1">{templateData.ceremony.address}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl border-blue-200 rounded-3xl">
              <CardHeader className="border-b border-blue-200"><CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">{templateData.reception.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-blue-600 font-bold mb-1">Date</p><p className="font-serif text-blue-800">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-blue-600 font-bold mb-1">Time</p><p className="font-bold text-blue-800">{templateData.reception.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-blue-600 font-bold mb-1">Venue</p><p className="font-bold text-blue-800">{templateData.reception.location}</p><p className="text-sm text-blue-600 mt-1">{templateData.reception.address}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-8 max-w-2xl mx-auto rounded-3xl">
            <h3 className="text-2xl font-bold text-amber-800 mb-6">Reservation (RSVP)</h3>
            <form onSubmit={handleRsvp} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-amber-800 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} required className="mt-2 rounded-full border-yellow-300 focus:border-yellow-500" /></div>
              <div><Label className="text-amber-800 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={rsvp.attending === 'yes'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-amber-800">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={rsvp.attending === 'no'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-amber-800">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-full font-semibold">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">Sending Gift</h2>
          <div className="bg-white shadow-2xl p-8 max-w-2xl mx-auto rounded-3xl">
            <div className="grid md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md rounded-2xl">
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-orange-600 font-bold">Account Number</p><p className="font-mono font-bold text-amber-800">{gift.number}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-orange-600 font-bold">Account Name</p><p className="font-semibold text-amber-800">{gift.name}</p></div>
                    <Button variant="outline" className="w-full rounded-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white" onClick={() => copyToClipboard(gift.number, gift.bank)}>{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent text-center mb-12">Guest Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-xl rounded-3xl">
              <h3 className="text-2xl font-bold text-amber-800 mb-6">Send Your Wishes</h3>
              <form onSubmit={handleWishes} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-amber-800 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={wishes.name} onChange={(e) => setWishes({ ...wishes, name: e.target.value })} required className="mt-2 rounded-full border-yellow-300" /></div>
                <div><Label htmlFor="wish-message" className="text-amber-800 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={wishes.message} onChange={(e) => setWishes({ ...wishes, message: e.target.value })} required rows={5} className="mt-2 rounded-3xl border-yellow-300" /></div>
                <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-full font-semibold">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 shadow-md border border-pink-200 rounded-2xl"><p className="font-bold text-amber-800">{wish.name}</p><p className="text-sm text-amber-700 mt-2">{wish.message}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 text-center"><p className="text-white text-sm font-semibold">Powered by Agenda Kita</p></footer>
    </div>
  )
}