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
    name: 'Intan',
    fullName: 'Intan Permata, S.Psi',
    parent: 'Bapak Harto & Ibu Sri',
    childOrder: 'Second daughter',
    photo: 'https://placehold.co/600x800/ede9fe/8b5cf6?text=Intan',
    instagram: 'https://instagram.com/intan',
  },
  groom: {
    name: 'Hafid',
    fullName: 'Hafid Maulana, S.Kom',
    parent: 'Bapak Dono & Ibu Ani',
    childOrder: 'First son',
    photo: 'https://placehold.co/600x800/ede9fe/8b5cf6?text=Hafid',
    instagram: 'https://instagram.com/hafid',
  },
  coverPhoto: 'https://placehold.co/1920x1080/ede9fe/8b5cf6?text=Hafid+Wedding',
  weddingDate: {
    fullDate: 'June 19th, 2025',
  },
  ceremony: {
    type: 'Akad Nikah',
    time: '10:00 WIB',
    location: 'Gedung Serbaguna',
    address: 'Jl. Merdeka No. 10, Jakarta',
  },
  reception: {
    type: 'Resepsi',
    time: '18:00 WIB',
    location: 'Grand Ballroom',
    address: 'Jl. Sudirman No. 88, Jakarta',
  },
  quote: {
    text: 'Whatever our souls are made of, yours and mine are the same.',
    author: 'Emily Bronte',
  },
  galleryTitle: 'Moments of Love',
  gallery: [
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+1',
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+2',
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+3',
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+4',
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+5',
    'https://placehold.co/800x600/ede9fe/8b5cf6?text=Photo+6',
  ],
  gifts: [
    { bank: 'BCA', number: '1234567890', name: 'Hafid Maulana, S.Kom' },
    { bank: 'Mandiri', number: '0987654321', name: 'Intan Permata, S.Psi' },
  ],
  music: '/music/wedding.mp3',
}

export default function Template015() {
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-purple-50">
        <img src={templateData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-purple-900/30"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white font-serif italic text-lg mb-6">Dengan penuh kebahagiaan</p>
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl" style={{ fontFamily: "'Georgia', serif" }}>
            Hafid & Intan
          </h1>
          <p className="text-2xl text-white font-serif mb-10">19 Juni 2025</p>
          <Button onClick={() => { toggleMusic(); setOpened(true) }} className="bg-purple-700 hover:bg-purple-800 text-white px-12 py-4 rounded-none font-semibold tracking-wide text-lg">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-700 text-white shadow-lg transition" aria-label="Toggle musik">
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-purple-700 font-serif italic text-lg mb-6">Together with their families</p>
          <h1 className="text-6xl md:text-7xl font-bold text-purple-900 mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Hafid Maulana, S.Kom & Intan Permata, S.Psi
          </h1>
          <p className="text-xl text-purple-700 font-serif italic max-w-2xl mx-auto">{templateData.quote.text}</p>
          <p className="text-sm text-purple-600 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-purple-600 mb-6 font-bold">The Bride</p>
              <img src={templateData.bride.photo} alt={templateData.bride.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-purple-900 mb-3">{templateData.bride.fullName}</h3>
              <p className="text-sm text-purple-600 mb-4">{templateData.bride.childOrder} of {templateData.bride.parent}</p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-800 font-semibold">Instagram</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-purple-600 mb-6 font-bold">The Groom</p>
              <img src={templateData.groom.photo} alt={templateData.groom.name} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-purple-900 mb-3">{templateData.groom.fullName}</h3>
              <p className="text-sm text-purple-600 mb-4">{templateData.groom.childOrder} of {templateData.groom.parent}</p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-800 font-semibold">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>{templateData.galleryTitle}</h2>
          </div>
          <Carousel plugins={[Autoplay({ delay: 4000 })]} opts={{ align: 'center', loop: true }} className="w-full">
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img src={photo} alt={`Gallery ${i + 1}`} className="w-full aspect-video object-cover shadow-xl" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-purple-900 text-center mb-16" style={{ fontFamily: "'Georgia', serif" }}>Wedding Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-purple-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-purple-900 font-bold">{templateData.ceremony.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Date</p><p className="font-serif text-purple-800">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Time</p><p className="font-bold text-purple-800">{templateData.ceremony.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Venue</p><p className="font-bold text-purple-800">{templateData.ceremony.location}</p><p className="text-sm text-purple-600 mt-1">{templateData.ceremony.address}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-purple-900 font-bold">{templateData.reception.type}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Date</p><p className="font-serif text-purple-800">{templateData.weddingDate.fullDate}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Time</p><p className="font-bold text-purple-800">{templateData.reception.time}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold mb-1">Venue</p><p className="font-bold text-purple-800">{templateData.reception.location}</p><p className="text-sm text-purple-600 mt-1">{templateData.reception.address}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-purple-50 p-8 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-purple-900 mb-6">Reservation (RSVP)</h3>
            <form onSubmit={handleRsvp} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-purple-800 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} required className="mt-2" /></div>
              <div><Label className="text-purple-800 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={rsvp.attending === 'yes'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-purple-800">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={rsvp.attending === 'no'} onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })} required className="w-4 h-4" /><span className="text-purple-800">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">Sending Gift</h2>
          <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i}>
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold">Account Number</p><p className="font-mono font-bold text-purple-800">{gift.number}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-purple-600 font-bold">Account Name</p><p className="font-semibold text-purple-800">{gift.name}</p></div>
                    <Button variant="outline" className="w-full" onClick={() => copyToClipboard(gift.number, gift.bank)}>{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-purple-900 text-center mb-12">Guest Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">Send Your Wishes</h3>
              <form onSubmit={handleWishes} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-purple-800 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={wishes.name} onChange={(e) => setWishes({ ...wishes, name: e.target.value })} required className="mt-2" /></div>
                <div><Label htmlFor="wish-message" className="text-purple-800 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={wishes.message} onChange={(e) => setWishes({ ...wishes, message: e.target.value })} required rows={5} className="mt-2" /></div>
                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-white p-4 shadow-md border"><p className="font-bold text-purple-800">{wish.name}</p><p className="text-sm text-purple-700 mt-2">{wish.message}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-purple-700 text-center"><p className="text-white text-sm">Powered by Agenda Kita</p></footer>
    </div>
  )
}
