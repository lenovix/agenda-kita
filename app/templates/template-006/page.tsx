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
    name: 'Cindy',
    fullName: 'Cindy Okabe (岡部シンディ)',
    parent: 'Hiroshi Okabe & Marvah Nelza',
    childOrder: 'Second daughter of',
    photo: 'https://cdn-uploads.owlink.id/8ac15ad0-ce14-11ef-b48b-a353fca77b9e.jpg',
    instagram: 'https://instagram.com/okabecindy',
  },
  groom: {
    name: 'Jaewoung',
    fullName: 'Jaewoung Lee (이재웅)',
    parent: 'Boyeol Lee & Woonja Kim',
    childOrder: 'First son of',
    photo: 'https://cdn-uploads.owlink.id/af74a620-ce14-11ef-b48b-a353fca77b9e.jpg',
    instagram: 'https://instagram.com/yoona_soul',
  },
  coverPhoto: 'https://cdn-uploads.owlink.id/67db7c80-ce14-11ef-b48b-a353fca77b9e.jpg',
  separatorPhoto: 'https://cdn-uploads.owlink.id/b6f8fc70-ce6e-11ef-a62a-a5af7598b4ab.jpg',
  weddingDate: {
    date: '05',
    month: '04',
    year: '2025',
    day: 'Saturday',
    fullDate: 'April 5th, 2025',
  },
  ceremony: {
    type: 'Wedding Ceremony / Traditional',
    time: '01:30 AM KST',
    location: '창원의집 (Changwon\'s House)',
    address: '59 Sarim-ro 16beon-gil, Uichang-gu, Changwon-si, Gyeongsangnam-do, South Korea',
  },
  reception: {
    type: 'Lunch Reception',
    time: '11:00 AM KST',
    location: '창원의집',
    address: '59 Sarim-ro 16beon-gil, Uichang-gu, Changwon-si, Gyeongsangnam-do, South Korea',
  },
  quote: {
    text: '"And among the signs of his power is that he created for you soul mates from your own kind, so that you may find comfort in them, and he made among you affection and compassion. Indeed, in that there are signs for people who think." (QS 30:21)',
    korean: '가장 커다란 선물은 오늘입니다.\n가장 아름다운 선물은 당신입니다.',
    author: '나태주 - 선물',
  },
  gallery: [
    'https://cdn-uploads.owlink.id/123e0ed0-726e-11ee-adf9-c7238c118323.jpg',
    'https://cdn-uploads.owlink.id/16c90ab0-71a9-11ee-adf9-c7238c118323.jpg',
    'https://cdn-uploads.owlink.id/2c48c680-726e-11ee-adf9-c7238c118323.jpg',
    'https://cdn-uploads.owlink.id/39aa3890-726e-11ee-adf9-c7238c118323.jpg',
    'https://cdn-uploads.owlink.id/82185290-71b7-11ee-adf9-c7238c118323.jpg',
    'https://cdn-uploads.owlink.id/a865cd40-71b4-11ee-adf9-c7238c118323.jpg',
  ],
  galleryQuote: 'Love is the thread that weaves our heart together, and precious memories are the tapestry of our shared journey.',
  gifts: [
    { name: 'Jaewoung Lee (Commerzbank)', number: 'DE91500400000550147300' },
    { name: 'Cindy Okabe (Commerzbank)', number: 'DE74590400000515713600' },
  ],
  music: 'https://api.our-wedding.link/uploads/d45d5820-3802-11ec-b847-e92596a7aafa.mp3',
}

export default function Template006() {
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
    alert(`RSVP: ${rsvp.name}, Attending: ${rsvp.attending}`)
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <img
          src={templateData.coverPhoto}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-gray-700 font-serif italic text-lg mb-6">Wedding Invitation</p>
          <h1 className="text-7xl md:text-8xl font-black text-gray-900 mb-8 drop-shadow-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Jaewoung<br />&<br />Cindy
          </h1>
          <p className="text-2xl text-gray-800 font-serif mb-10">
            {templateData.weddingDate.fullDate}
          </p>
          <Button
            onClick={() => { toggleMusic(); setOpened(true) }}
            className="bg-gray-900 text-white hover:bg-gray-800 px-12 py-4 rounded-none font-bold tracking-wide text-lg"
          >
            Open Invitation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition"
        aria-label="Toggle music"
      >
        {musicPlaying ? '♪' : '×'}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 font-serif italic text-lg mb-6">With joy we announce</p>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Jaewoung Lee & Cindy Okabe
          </h1>
          <p className="text-xl text-gray-700 font-serif italic max-w-2xl mx-auto leading-relaxed">
            {templateData.quote.text}
          </p>
          <p className="text-lg text-gray-600 font-serif mt-8 whitespace-pre-line">
            {templateData.quote.korean}
          </p>
          <p className="text-sm text-gray-500 mt-4">— {templateData.quote.author}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">The Bride</p>
              <img
                src={templateData.bride.photo}
                alt={templateData.bride.name}
                className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl"
              />
              <h3 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {templateData.bride.fullName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {templateData.bride.childOrder} {templateData.bride.parent}
              </p>
              <a href={templateData.bride.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 font-semibold">
                @{templateData.bride.instagram.split('/').pop()}
              </a>
            </div>

            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">The Groom</p>
              <img
                src={templateData.groom.photo}
                alt={templateData.groom.name}
                className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl"
              />
              <h3 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {templateData.groom.fullName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {templateData.groom.childOrder} {templateData.groom.parent}
              </p>
              <a href={templateData.groom.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-600 font-semibold">
                @{templateData.groom.instagram.split('/').pop()}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Our Precious Moments
            </h2>
            <p className="text-lg text-gray-600 italic">{templateData.galleryQuote}</p>
          </div>

          <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            opts={{ align: 'center', loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {templateData.gallery.map((photo, i) => (
                <CarouselItem key={i}>
                  <img
                    src={photo}
                    alt={`Gallery ${i + 1}`}
                    className="w-full aspect-video object-cover shadow-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white border-none hover:bg-gray-800" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white border-none hover:bg-gray-800" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Wedding Events
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white shadow-lg border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl text-gray-900 font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {templateData.ceremony.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Date</p>
                  <p className="font-serif text-gray-900">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Time</p>
                  <p className="font-bold text-gray-900">{templateData.ceremony.time}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Venue</p>
                  <p className="font-bold text-gray-900">{templateData.ceremony.location}</p>
                  <p className="text-sm text-gray-600 mt-1">{templateData.ceremony.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl text-gray-900 font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {templateData.reception.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Date</p>
                  <p className="font-serif text-gray-900">{templateData.weddingDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Time</p>
                  <p className="font-bold text-gray-900">{templateData.reception.time}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Venue</p>
                  <p className="font-bold text-gray-900">{templateData.reception.location}</p>
                  <p className="text-sm text-gray-600 mt-1">{templateData.reception.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Reservation (RSVP)
            </h3>

            <form onSubmit={handleRsvp} className="space-y-6">
              <div>
                <Label htmlFor="rsvp-name" className="text-gray-900 font-bold text-sm uppercase">
                  Your full name
                </Label>
                <Input
                  id="rsvp-name"
                  type="text"
                  placeholder="Enter your name"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  required
                  className="mt-2 rounded-none border-gray-300 bg-white"
                />
              </div>

              <div>
                <Label className="text-gray-900 font-bold text-sm uppercase mb-3 block">Will you attend?</Label>
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
                    <span className="text-gray-900">Yes, I'll be there</span>
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
                    <span className="text-gray-900">Sorry, I can't</span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-none font-bold">
                Submit Confirmation
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Sending Gift
          </h2>

          <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templateData.gifts.map((gift, i) => (
                <Card key={i} className="bg-gray-50 border-gray-200 shadow-none">
                  <CardContent className="space-y-3 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Account Number</p>
                      <p className="font-mono font-bold text-gray-900 text-sm">{gift.number}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Account Name</p>
                      <p className="font-semibold text-gray-900 text-sm">{gift.name}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-none border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      onClick={() => copyToClipboard(gift.number, gift.name)}
                    >
                      {copiedGift === gift.name ? '✓ Copied' : 'Copy Number'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Guest Wishes
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 shadow-lg">
              <h3 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Send Your Wishes
              </h3>

              <form onSubmit={handleWishes} className="space-y-4">
                <div>
                  <Label htmlFor="wish-name" className="text-gray-900 font-bold text-sm uppercase">Name</Label>
                  <Input
                    id="wish-name"
                    type="text"
                    placeholder="Your name"
                    value={wishes.name}
                    onChange={(e) => setWishes({ ...wishes, name: e.target.value })}
                    required
                    className="mt-2 rounded-none border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="wish-message" className="text-gray-900 font-bold text-sm uppercase">Message</Label>
                  <Textarea
                    id="wish-message"
                    placeholder="Your wishes..."
                    value={wishes.message}
                    onChange={(e) => setWishes({ ...wishes, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-2 rounded-none border-gray-300 bg-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-none font-bold">
                  Send Wishes
                </Button>
              </form>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishesList.map((wish, i) => (
                <div key={i} className="bg-white p-4 shadow-md border border-gray-200">
                  <p className="font-bold text-gray-900">{wish.name}</p>
                  <p className="text-sm text-gray-700 mt-2">{wish.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">Powered by Agenda Kita</p>
      </footer>
    </div>
  )
}
