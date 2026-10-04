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
    name: 'Erika',
    fullName: 'Erika Purnama Sari, S.Ak',
    parent: 'Frans Chandra & Fanny Ho',
    childOrder: 'Youngest daughter of',
    photo: 'https://cdn-uploads.owlink.id/48490c30-336e-11ee-9c7e-1b899468a894.jpg',
    instagram: 'https://instagram.com/hendraliau_',
  },
  groom: {
    name: 'Hendra',
    fullName: 'Hendra, S.Kom',
    parent: 'Sajono & Berliana',
    childOrder: 'Second son of',
    photo: 'https://cdn-uploads.owlink.id/48490c30-336e-11ee-9c7e-1b899468a894.jpg',
    instagram: 'https://instagram.com/hendraliau_',
  },
  coverPhoto: 'https://cdn-uploads.owlink.id/a8411240-336e-11ee-9c7e-1b899468a894.jpg',
  weddingDate: {
    date: '01',
    month: '10',
    year: '2023',
    day: 'Sunday',
    fullDate: 'October 1st, 2023',
  },
  akad: {
    type: 'Akad Nikah',
    time: '09:30 WIB - finish',
    location: 'Vihara Budhi Bakti',
    address: 'Jl. Pembangunan, Lubuk Baja Kota, Kec. Lubuk Baja, Kota Batam, Kepulauan Riau 29432',
    mapLink: 'https://maps.google.com/?cid=15370217587709845021',
  },
  reception: {
    type: 'Wedding Reception',
    time: '18:00 WIB - finish',
    location: 'Golden Prawn 933 Ballroom D',
    address: 'Jl. Golden Prawn, Tanjung Buntung, Kota Batam, Kepulauan Riau 29432',
    mapLink: 'https://maps.google.com/?cid=4759695174361972770',
  },
  quote: {
    text: 'You are the missing piece of my puzzle, the one I\'ve been looking for all my life. Now that I\'ve found you, I\'m complete.',
  },
  galleryQuote: {
    text: 'Creating memories is a priceless gift. Memories last a lifetime; things only last a moment.',
  },
  gallery: [
    'https://cdn-uploads.owlink.id/64a916d0-3374-11ee-9c7e-1b899468a894.jpeg',
    'https://cdn-uploads.owlink.id/6550ef90-3374-11ee-9c7e-1b899468a894.jpeg',
    'https://cdn-uploads.owlink.id/65e5dc90-3374-11ee-9c7e-1b899468a894.jpeg',
    'https://cdn-uploads.owlink.id/665e67f0-3374-11ee-9c7e-1b899468a894.jpeg',
    'https://cdn-uploads.owlink.id/667e4c00-3374-11ee-9c7e-1b899468a894.jpeg',
    'https://cdn-uploads.owlink.id/8882a3f0-3374-11ee-9c7e-1b899468a894.jpeg',
  ],
  video: 'https://www.youtube-nocookie.com/embed/ao7KxplB_14',
  gifts: [
    { bank: 'BCA', number: '1234567890', name: 'Hendra' },
    { bank: 'Mandiri', number: '0987654321', name: 'Erika Purnama Sari' },
  ],
  wishes: [
    { name: 'Chen Jia Er', location: 'Batam', message: 'May the years ahead be filled with lasting love and happiness.' },
    { name: 'Lin Jiale', location: '', message: '新婚快乐💞 早生贵子🤱 白头偕老🧓🧑‍🦳💕' },
    { name: 'Indra Wijaya', location: '', message: 'Jangn ko nakal, jadi istri yg baik dan berbakti' },
    { name: 'Jane l', location: '', message: 'Happy wedding adek erika dan suami... Bahagia selalu smpe tua dan maut memisahkan' },
    { name: 'Meyliana Isa', location: '', message: 'happy wedding sisteurr... happily ever after... semoga cepat dpt kabar bahagia' },
  ],
}

export default function Template005() {
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rsvp, setRsvp] = useState({ name: '', attending: '' })
  const [wishForm, setWishForm] = useState({ name: '', location: '', message: '' })
  const [wishesList, setWishesList] = useState(templateData.wishes)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/wedding.mp3')
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

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text)
    setCopiedGift(bank)
    setTimeout(() => setCopiedGift(null), 2000)
  }

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`RSVP: ${rsvp.name}, Kehadiran: ${rsvp.attending}`)
    setRsvp({ name: '', attending: '' })
  }

  const handleWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (wishForm.name && wishForm.message) {
      setWishesList([...wishesList, wishForm])
      setWishForm({ name: '', location: '', message: '' })
    }
  }

  if (!opened) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#b2b3b4]">
        <img
          src={templateData.coverPhoto}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#b2b3b4]/40"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="mb-8">
            <p className="text-white/80 font-serif italic text-xl mb-4">The Wedding of</p>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hendra & Erika
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-serif mb-8" style={{ fontFamily: "'Forum', serif" }}>
              {templateData.weddingDate.fullDate}
            </p>
          </div>
          <Button
            onClick={() => { toggleMusic(); setOpened(true) }}
            className="bg-white text-[#b2b3b4] hover:bg-white/90 px-10 py-4 rounded-none font-semibold tracking-wide text-lg"
          >
            Open Invitation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#b2b3b4]">
      <button
        onClick={toggleMusic}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-white text-[#b2b3b4] shadow-lg hover:bg-white/90 transition"
        aria-label="Toggle musik"
      >
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/80 font-serif italic text-lg mb-4">We are getting married</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hendra, S.Kom<br />&<br />Erika Purnama Sari, S.Ak
          </h1>
          <p className="text-xl text-white/90 font-serif italic max-w-2xl mx-auto" style={{ fontFamily: "'Forum', serif" }}>
            {templateData.quote.text}
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-white/70 mb-4 font-semibold">THE BRIDE</p>
              <img
                src={templateData.bride.photo}
                alt={templateData.bride.name}
                className="w-64 h-80 object-cover mx-auto mb-6 shadow-2xl"
              />
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {templateData.bride.fullName}
              </h3>
              <p className="text-sm text-white/70 mb-4">
                {templateData.bride.childOrder}: {templateData.bride.parent}
              </p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white font-semibold">
                @hendraliau_
              </a>
            </div>

            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-white/70 mb-4 font-semibold">THE GROOM</p>
              <img
                src={templateData.groom.photo}
                alt={templateData.groom.name}
                className="w-64 h-80 object-cover mx-auto mb-6 shadow-2xl"
              />
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {templateData.groom.fullName}
              </h3>
              <p className="text-sm text-white/70 mb-4">
                {templateData.groom.childOrder}: {templateData.groom.parent}
              </p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white font-semibold">
                @hendraliau_
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-black/20 shadow-2xl overflow-hidden">
            <iframe
              src={templateData.video}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Precious Moment
            </h2>
            <p className="text-lg text-white/80 italic font-serif max-w-2xl mx-auto" style={{ fontFamily: "'Forum', serif" }}>
              {templateData.galleryQuote.text}
            </p>
          </div>

          <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            opts={{ align: 'center', loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <img
                      src={photo}
                      alt={`Gallery ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover shadow-xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[#b2b3b4] border-none hover:bg-white/90" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#b2b3b4] border-none hover:bg-white/90" />
          </Carousel>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
            Wedding Events
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-2xl border-none">
              <CardHeader className="border-b border-[#b2b3b4]/20">
                <CardTitle className="text-2xl text-[#b2b3b4] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {templateData.akad.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Date</p>
                  <p className="font-serif text-[#b2b3b4]">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Time</p>
                  <p className="font-semibold text-[#b2b3b4]">{templateData.akad.time}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Venue</p>
                  <p className="font-semibold text-[#b2b3b4]">{templateData.akad.location}</p>
                  <p className="text-sm text-[#b2b3b4]/70 mt-1">{templateData.akad.address}</p>
                </div>
                <a
                  href={templateData.akad.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#b2b3b4] hover:text-[#b2b3b4]/70 font-semibold underline"
                >
                  See Location
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-2xl border-none">
              <CardHeader className="border-b border-[#b2b3b4]/20">
                <CardTitle className="text-2xl text-[#b2b3b4] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {templateData.reception.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Date</p>
                  <p className="font-serif text-[#b2b3b4]">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Time</p>
                  <p className="font-semibold text-[#b2b3b4]">{templateData.reception.time}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold mb-1">Venue</p>
                  <p className="font-semibold text-[#b2b3b4]">{templateData.reception.location}</p>
                  <p className="text-sm text-[#b2b3b4]/70 mt-1">{templateData.reception.address}</p>
                </div>
                <a
                  href={templateData.reception.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#b2b3b4] hover:text-[#b2b3b4]/70 font-semibold underline"
                >
                  See Location
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Reservation (RSVP)
            </h3>
          </div>

          <form onSubmit={handleRsvp} className="space-y-6 bg-white p-8 shadow-2xl">
            <div>
              <Label htmlFor="rsvp-name" className="text-[#b2b3b4] font-semibold">
                Your full name
              </Label>
              <Input
                id="rsvp-name"
                type="text"
                placeholder="Enter your name"
                value={rsvp.name}
                onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                required
                className="mt-2 rounded-none border-[#b2b3b4]/30 focus:border-[#b2b3b4]"
              />
            </div>

            <div>
              <Label className="text-[#b2b3b4] font-semibold mb-3 block">Will you attend?</Label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={rsvp.attending === 'yes'}
                    onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                    required
                    className="w-4 h-4"
                  />
                  <span className="text-[#b2b3b4]">Yes, I'll be there</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={rsvp.attending === 'no'}
                    onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                    required
                    className="w-4 h-4"
                  />
                  <span className="text-[#b2b3b4]">Sorry, I can't</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#b2b3b4] hover:bg-[#b2b3b4]/80 text-white py-3 rounded-none font-semibold">
              Submit Confirmation
            </Button>
          </form>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Kirim Amplop Digital
          </h2>
          <p className="text-lg text-white/80 mb-12 font-serif italic">
            Give your gift to the bride and groom
          </p>

          <div className="bg-white shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-[#b2b3b4] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Direct Transfer
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-[#b2b3b4]/10 border-none shadow-lg">
                  <CardHeader className="border-b border-[#b2b3b4]/20">
                    <CardTitle className="text-xl text-[#b2b3b4] font-bold">{gift.bank}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold">Account Number</p>
                      <p className="font-mono font-bold text-lg text-[#b2b3b4]">{gift.number}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#b2b3b4]/70 font-semibold">Account Name</p>
                      <p className="font-semibold text-[#b2b3b4]">{gift.name}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-none border-[#b2b3b4] text-[#b2b3b4] hover:bg-[#b2b3b4] hover:text-white"
                      onClick={() => copyToClipboard(gift.number, gift.bank)}
                    >
                      {copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Wishes
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-[#b2b3b4] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Send Your Wishes
              </h3>

              <form onSubmit={handleWish} className="space-y-4">
                <div>
                  <Label htmlFor="wish-name" className="text-[#b2b3b4] font-semibold">Name</Label>
                  <Input
                    id="wish-name"
                    type="text"
                    placeholder="Your name"
                    value={wishForm.name}
                    onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                    required
                    className="mt-2 rounded-none border-[#b2b3b4]/30"
                  />
                </div>
                <div>
                  <Label htmlFor="wish-location" className="text-[#b2b3b4] font-semibold">Location (optional)</Label>
                  <Input
                    id="wish-location"
                    type="text"
                    placeholder="Your location"
                    value={wishForm.location}
                    onChange={(e) => setWishForm({ ...wishForm, location: e.target.value })}
                    className="mt-2 rounded-none border-[#b2b3b4]/30"
                  />
                </div>
                <div>
                  <Label htmlFor="wish-message" className="text-[#b2b3b4] font-semibold">Message</Label>
                  <Textarea
                    id="wish-message"
                    placeholder="Your wishes..."
                    value={wishForm.message}
                    onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                    required
                    rows={4}
                    className="mt-2 rounded-none border-[#b2b3b4]/30"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#b2b3b4] hover:bg-[#b2b3b4]/80 text-white py-3 rounded-none font-semibold">
                  Send Wishes
                </Button>
              </form>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-white p-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#b2b3b4] flex items-center justify-center text-white font-bold">
                      {wish.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-[#b2b3b4]">{wish.name}</p>
                        {wish.location && <span className="text-xs text-[#b2b3b4]/60">• {wish.location}</span>}
                      </div>
                      <p className="text-sm text-[#b2b3b4]/80">{wish.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white/10 text-center">
        <p className="text-white/70 text-sm">
          Powered by Agenda Kita
        </p>
      </footer>
    </div>
  )
}