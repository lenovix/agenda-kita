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
    name: 'Zahra',
    fullName: 'Zahra Aida Anggiana, S.Tr.T',
    parent: 'IPTU Aang Suhana, S.Pd and Ai Supiah, S.Pd',
    childOrder: 'Second Daughter of',
    photo: 'https://cdn-uploads.owlink.id/70d5a510-3084-11ee-8003-3b0d218bc3c4.jpg',
    instagram: 'https://instagram.com/zahraaanggiana',
  },
  groom: {
    name: 'Recky',
    fullName: 'Recky Pahlevi Anthoni Putra, S.Tr.T, M.T',
    parent: 'Opi Anthoni, S.T, M.M and Mamiek Suhermi',
    childOrder: 'Second Son of',
    photo: 'https://cdn-uploads.owlink.id/a72edd40-2fb0-11ee-8003-3b0d218bc3c4.jpg',
    instagram: 'https://instagram.com/reckyky',
  },
  coverPhoto: 'https://cdn-uploads.owlink.id/eaa19c30-8838-11ee-ad83-e7d3332466cd.jpeg',
  quotePhoto: 'https://cdn-uploads.owlink.id/c5b5a330-baac-11ed-beec-438fd447980a.jpeg',
  weddingDate: {
    date: '09',
    month: '09',
    year: '2023',
    day: 'Saturday',
    fullDate: 'September 9th, 2023',
  },
  akad: {
    type: 'Wedding Ceremony',
    time: '08:00 WIB - finish',
    location: 'IS Plaza Ballroom',
    address: 'Jl. Pramuka No.150, RT.9/RW.5, Utan Kayu Utara, Kec. Matraman, Jakarta, Daerah Khusus Ibukota Jakarta 13120',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAeNSQM3Ay3ptkkKCM5zEkwB9lohaPGz2Y&q=place_id:ChIJKcrj4Dr1aS4Ri86hY2Rjqfs',
    mapLink: 'https://maps.google.com/?cid=18134134657403440779',
  },
  reception: {
    type: 'Reception',
    time: '11:00 WIB - 13:00 WIB',
    location: 'IS Plaza Ballroom',
    address: 'Jl. Pramuka No.150, RT.9/RW.5, Utan Kayu Utara, Kec. Matraman, Jakarta, Daerah Khusus Ibukota Jakarta 13120',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAeNSQM3Ay3ptkkKCM5zEkwB9lohaPGz2Y&q=place_id:ChIJKcrj4Dr1aS4Ri86hY2Rjqfs',
    mapLink: 'https://maps.google.com/?cid=18134134657403440779',
  },
  quote: {
    arabic: 'وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُوْنَ',
    translation: 'And everything that We have made in pairs so that you may remember (the greatness of Allah).',
    source: 'Q.S Adz-Dzariat verse 49',
  },
  gallery: [
    'https://cdn-uploads.owlink.id/c46f3f00-3396-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/f7638e50-3393-11ee-85cd-3b0d218bc3c4.jpeg',
    'https://cdn-uploads.owlink.id/f767ad00-3393-11ee-85cd-3b0d218bc3c4.jpeg',
    'https://cdn-uploads.owlink.id/f767d410-3393-11ee-85cd-3b0d218bc3c4.jpeg',
    'https://cdn-uploads.owlink.id/072fbed0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/07375ff0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/0740d5d0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/0741e740-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/07423560-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/225890b0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/225b9df0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/225e0ef0-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
    'https://cdn-uploads.owlink.id/225e5d10-3394-11ee-85cd-3da6d5b4c7ab.jpeg',
  ],
  galleryQuote: {
    text: '"I love you without knowing how, or when, or from where..."',
    author: 'Pablo Neruda, One Hundred Love Sonnets: XVII',
  },
  gifts: [
    { bank: 'BCA', number: '1234567890', name: 'Recky Pahlevi Anthoni Putra' },
    { bank: 'Mandiri', number: '0987654321', name: 'Zahra Aida Anggiana' },
  ],
  music: 'https://api.our-wedding.link/uploads/d4f10e50-bb0d-11ed-bd90-b9ac931ad373.mp3',
}

function Countdown() {
  const weddingDate = new Date('2023-09-09T04:00:00Z') // 08:00 WIB
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = weddingDate.getTime() - now.getTime()
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true })
        return
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        ended: false,
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  if (countdown.ended) {
    return (
      <div className="text-center py-8">
        <h3 className="text-3xl font-serif text-[#412f25] mb-4">The wedding has been held</h3>
        <p className="text-[#9c6c60] italic font-serif">September 9th, 2023</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
      {[
        { label: 'DAYS', value: countdown.days },
        { label: 'HOURS', value: countdown.hours },
        { label: 'MINUTES', value: countdown.minutes },
        { label: 'SECONDS', value: countdown.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-[#713f32] text-white rounded-none w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg">
            {String(item.value).padStart(2, '0')}
          </div>
          <p className="text-xs text-[#9c6c60] mt-2 font-semibold tracking-widest">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function Template004() {
  const [rsvp, setRsvp] = useState({ name: '', attending: '' })
  const [wishes, setWishes] = useState({ name: '', message: '' })
  const [wishesList, setWishesList] = useState<Array<{ name: string; message: string }>>([])
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
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

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text)
    setCopiedGift(bank)
    setTimeout(() => setCopiedGift(null), 2000)
  }

  if (!opened) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#412f25]">
        <img
          src={templateData.coverPhoto}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#412f25]/60"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="mb-6">
            <div className="w-20 h-0.5 bg-white/60 mx-auto mb-4"></div>
            <p className="text-white/90 font-serif italic text-lg">The wedding of</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Recky & Zahra
          </h1>
          <p className="text-3xl md:text-4xl text-white/90 mb-8 font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            09 . 09 . 2023
          </p>
          <div className="w-20 h-0.5 bg-white/60 mx-auto mb-8"></div>
          <Button
            onClick={() => { toggleMusic(); setOpened(true) }}
            className="bg-[#713f32] hover:bg-[#9c6c60] text-white px-10 py-4 rounded-none font-semibold tracking-wide"
          >
            Open Invitation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#e8e8e9]">
      {/* Musik toggle */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#9c6c60] text-white shadow-lg hover:bg-[#713f32] transition"
        aria-label="Toggle musik"
      >
        {musicPlaying ? '♪' : '×'}
      </button>

      {/* Quote section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={templateData.quotePhoto}
          alt="Quote background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#412f25]/80 via-[#412f25]/70 to-[#412f25]/80"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-xl" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Recky & Zahra
          </h2>
          <p className="text-2xl md:text-3xl text-[#f3eeea] mb-6 leading-relaxed font-bold" style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}>
            {templateData.quote.arabic}
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-4 italic font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            {templateData.quote.translation}
          </p>
          <p className="text-[#9c6c60] font-semibold">{templateData.quote.source}</p>
          <div className="mt-12">
            <p className="text-2xl text-white font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              09 . 09 . 2023
            </p>
          </div>
        </div>
      </section>

      {/* Couple Profile */}
      <section className="py-20 px-4 bg-[#f3eeea]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-[#9c6c60] mb-4 font-semibold">THE BRIDE</p>
              <div className="relative inline-block mb-6">
                <img
                  src={templateData.bride.photo}
                  alt={templateData.bride.name}
                  className="w-64 h-80 object-cover rounded-sm shadow-2xl"
                />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#9c6c60] opacity-20"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#412f25] mb-3" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                {templateData.bride.name}
              </h3>
              <p className="text-[#412f25] mb-2 font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                {templateData.bride.fullName}
              </p>
              <p className="text-sm text-[#9c6c60] mb-4">
                {templateData.bride.childOrder}: {templateData.bride.parent}
              </p>
              <a
                href={templateData.bride.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#713f32] hover:text-[#9c6c60] font-semibold"
              >
                Instagram
              </a>
            </div>

            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-[#9c6c60] mb-4 font-semibold">THE GROOM</p>
              <div className="relative inline-block mb-6">
                <img
                  src={templateData.groom.photo}
                  alt={templateData.groom.name}
                  className="w-64 h-80 object-cover rounded-sm shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#9c6c60] opacity-20"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#412f25] mb-3" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                {templateData.groom.name}
              </h3>
              <p className="text-[#412f25] mb-2 font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                {templateData.groom.fullName}
              </p>
              <p className="text-sm text-[#9c6c60] mb-4">
                {templateData.groom.childOrder}: {templateData.groom.parent}
              </p>
              <a
                href={templateData.groom.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#713f32] hover:text-[#9c6c60] font-semibold"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 bg-[#e8e8e9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#412f25] mb-6" style={{ fontFamily: "'Diamond Bridge', serif" }}>
              Forever in Love
            </h2>
            <p className="text-lg text-[#9c6c60] italic font-serif max-w-2xl mx-auto" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              {templateData.galleryQuote.text}
            </p>
            <p className="text-sm text-[#713f32] mt-2">— {templateData.galleryQuote.author}</p>
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
                      className="w-full aspect-[4/3] object-cover rounded-sm shadow-xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#9c6c60] text-white border-none hover:bg-[#713f32] rounded-none" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9c6c60] text-white border-none hover:bg-[#713f32] rounded-none" />
          </Carousel>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-20 px-4 bg-[#f3eeea]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#412f25] mb-8" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Save The Date
          </h2>
          <Countdown />
        </div>
      </section>

      {/* Events & RSVP */}
      <section className="py-20 px-4 bg-[#e8e8e9]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#412f25] text-center mb-16" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Wedding Events
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white shadow-2xl border-none rounded-none">
              <CardHeader className="border-b border-[#9c6c60]/20">
                <CardTitle className="text-2xl text-[#412f25] font-bold" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                  {templateData.akad.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Date</p>
                  <p className="font-serif text-[#412f25]">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Time</p>
                  <p className="font-semibold text-[#412f25]">{templateData.akad.time}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Venue</p>
                  <p className="font-semibold text-[#412f25]">{templateData.akad.location}</p>
                  <p className="text-sm text-[#9c6c60] mt-1">{templateData.akad.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-2xl border-none rounded-none">
              <CardHeader className="border-b border-[#9c6c60]/20">
                <CardTitle className="text-2xl text-[#412f25] font-bold" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                  {templateData.reception.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Date</p>
                  <p className="font-serif text-[#412f25]">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Time</p>
                  <p className="font-semibold text-[#412f25]">{templateData.reception.time}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold mb-1">Venue</p>
                  <p className="font-semibold text-[#412f25]">{templateData.reception.location}</p>
                  <p className="text-sm text-[#9c6c60] mt-1">{templateData.reception.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Maps */}
          <div className="bg-white shadow-2xl mb-16 rounded-none overflow-hidden">
            <div className="p-6 border-b border-[#9c6c60]/20">
              <h3 className="text-2xl font-bold text-[#412f25]" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                Location Map
              </h3>
            </div>
            <iframe
              src={templateData.akad.mapEmbed}
              className="w-full h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="p-6 text-center">
              <a
                href={templateData.akad.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#713f32] hover:text-[#9c6c60] font-semibold"
              >
                See Location on Google Maps
              </a>
            </div>
          </div>

          {/* RSVP */}
          <div className="bg-[#f3eeea] shadow-2xl p-8 rounded-none max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#412f25] mb-2" style={{ fontFamily: "'Diamond Bridge', serif" }}>
                Reservation (RSVP)
              </h3>
              <p className="text-[#9c6c60] font-serif italic">Please confirm your attendance</p>
            </div>

            <form onSubmit={handleRsvp} className="space-y-6">
              <div>
                <Label htmlFor="rsvp-name" className="text-[#412f25] font-semibold">
                  Your full name
                </Label>
                <Input
                  id="rsvp-name"
                  type="text"
                  placeholder="Enter your name"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  required
                  className="mt-2 rounded-none border-[#9c6c60]/30 focus:border-[#9c6c60]"
                />
              </div>

              <div>
                <Label className="text-[#412f25] font-semibold mb-3 block">Will you attend?</Label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={rsvp.attending === 'yes'}
                      onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                      required
                      className="w-4 h-4 text-[#9c6c60]"
                    />
                    <span className="text-[#412f25]">Yes, I'll be there</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={rsvp.attending === 'no'}
                      onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                      required
                      className="w-4 h-4 text-[#9c6c60]"
                    />
                    <span className="text-[#412f25]">Sorry, I can't</span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#713f32] hover:bg-[#9c6c60] text-white py-3 rounded-none font-semibold tracking-wide"
              >
                Submit Confirmation
              </Button>
            </form>

            <p className="text-center text-sm text-[#9c6c60] mt-6 italic">
              please fill in the attendance confirmation form above
            </p>
          </div>
        </div>
      </section>

      {/* Gift / Amplop */}
      <section className="py-20 px-4 bg-[#f3eeea]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#412f25] mb-6" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Send Your Gift
          </h2>
          <p className="text-lg text-[#9c6c60] mb-12 font-serif italic">
            Give your gift to the bride and groom
          </p>

          <div className="bg-white shadow-2xl rounded-none p-8">
            <h3 className="text-2xl font-bold text-[#412f25] mb-6" style={{ fontFamily: "'Diamond Bridge', serif" }}>
              Direct Transfer
            </h3>
            <p className="text-[#9c6c60] mb-8">Transfer directly to the account listed</p>

            <div className="grid md:grid-cols-2 gap-8">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-[#e8e8e9] border-none shadow-lg rounded-none">
                  <CardHeader className="border-b border-[#9c6c60]/20">
                    <CardTitle className="text-xl text-[#412f25] font-bold">{gift.bank}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold">Account Number</p>
                      <p className="font-mono font-bold text-lg text-[#412f25]">{gift.number}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wider text-[#9c6c60] font-semibold">Account Name</p>
                      <p className="font-semibold text-[#412f25]">{gift.name}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-none border-[#9c6c60] text-[#713f32] hover:bg-[#9c6c60] hover:text-white"
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

      {/* Closing */}
      <section className="py-20 px-4 bg-[#412f25] text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-[#f3eeea] mb-8 italic leading-relaxed font-serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            It is an honor and happiness for us if Mr/Ms/Brother/i. If you are willing to attend to give your blessing, we thank you.
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-xl" style={{ fontFamily: "'Diamond Bridge', serif" }}>
            Recky & Zahra
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#412f25] border-t border-[#9c6c60]/30 text-center">
        <p className="text-[#f3eeea]/70 text-sm">
          Powered by Agenda Kita
        </p>
      </footer>
    </div>
  )
}
