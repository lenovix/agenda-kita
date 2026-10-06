'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CountdownTimer from '@/components/invitation/CountdownTimer'
import AddToCalendar from '@/components/invitation/AddToCalendar'
import RsvpForm from '@/components/invitation/RsvpForm'
import GuestbookSection from '@/components/invitation/GuestbookSection'
import DigitalEnvelope from '@/components/invitation/DigitalEnvelope'
import EventProtocol from '@/components/invitation/EventProtocol'
import { submitGuestRsvp, submitGuestWish } from '../actions'
import {
  Heart,
  CalendarDays,
  MapPin,
  Music,
  Sparkles,
  ChevronDown,
  MessageSquareHeart
} from 'lucide-react'

type Invitation = {
  id: string
  couple_name_male: string
  groom_parents: string | null
  couple_name_female: string
  bride_parents: string | null
  wedding_date: string
  akad_time: string | null
  reception_time: string | null
  location: string | null
  maps_url: string | null
  quote: string | null
  story: string | null
  cover_image: string | null
  music_url: string | null
  extras: any
}

export default function GuestInvitationView({
  invitation,
  initialWishes,
  guestName,
}: {
  invitation: Invitation
  initialWishes: any[]
  guestName?: string
}) {
  const [opened, setOpened] = useState(false)
  const [showMusic, setShowMusic] = useState(false)

  const extras = invitation.extras || {}
  const weddingDateTime = `${invitation.wedding_date}T09:00:00+07:00`
  const weddingDateLong = new Date(invitation.wedding_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleRsvp = async (data: {
    name: string
    phone: string
    status: string
    pax: number
    session: string
  }) => {
    await submitGuestRsvp({
      invitationId: invitation.id,
      name: data.name,
      phone: data.phone,
      status: data.status,
      pax: data.pax,
      session: data.session,
    })
  }

  const handleWish = async (name: string, message: string) => {
    await submitGuestWish({
      invitationId: invitation.id,
      name,
      message,
    })
  }

  if (invitation.music_url && showMusic) {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    new Audio(invitation.music_url).play().catch(() => {})
  }

  if (!opened) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 text-8xl animate-pulse">🌸</div>
          <div className="absolute top-40 right-20 text-6xl animate-pulse">🌺</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-pulse">🌷</div>
        </div>

        {invitation.cover_image && (
          <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={invitation.cover_image} alt="Cover" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-2xl bg-white/70 backdrop-blur-md p-8 rounded-3xl border shadow-xl">
          <p className="text-sm text-slate-600 italic mb-5 font-serif">
            Kepada Yth. Bapak/Ibu/Saudara {guestName ? guestName : ''}
            <br />
            Dengan segala hormat, kami mengundang Bapak/Ibu/Saudara untuk hadir di hari bahagia kami
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-rose-600 mb-3">
            {invitation.couple_name_male}
            <span className="text-2xl block text-rose-400 my-1">&</span>
            {invitation.couple_name_female}
          </h1>
          <p className="text-lg text-slate-700 font-serif mb-8">{weddingDateLong}</p>
          <Button
            size="lg"
            onClick={() => setOpened(true)}
            className="text-base px-10 py-6 rounded-full shadow-lg"
          >
            💌 Buka Undangan
          </Button>
          {invitation.music_url && (
            <button
              onClick={() => setShowMusic(true)}
              className="block mx-auto mt-4 text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Music className="w-3.5 h-3.5" /> Putar backsound
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-200 via-pink-200 to-purple-200">
        {invitation.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={invitation.cover_image} alt="Wedding Cover" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <Heart className="w-8 h-8 mx-auto mb-3 opacity-80" />
          <h2 className="text-4xl md:text-6xl font-heading font-bold drop-shadow-lg">
            {invitation.couple_name_male} & {invitation.couple_name_female}
          </h2>
          <p className="text-lg md:text-2xl font-serif italic drop-shadow mt-2">{weddingDateLong}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Countdown & Calendar */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" /> Hitungan Mundur
          </h2>
          <CountdownTimer targetDate={weddingDateTime} />
          <div className="pt-2">
            <AddToCalendar
              title={`Pernikahan ${invitation.couple_name_male} & ${invitation.couple_name_female}`}
              description={invitation.story || 'Kami mengundang Anda untuk hadir di pernikahan kami.'}
              location={invitation.location || ''}
              startDate={weddingDateTime}
            />
          </div>
        </section>

        {/* Mempelai & Orang Tua */}
        <section>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 text-center mb-4">
            Mempelai
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/85 backdrop-blur border-rose-200 text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-600">{invitation.couple_name_male}</CardTitle>
              </CardHeader>
              <CardContent>
                {invitation.groom_parents && (
                  <p className="text-sm text-slate-600 italic font-serif">Putra dari {invitation.groom_parents}</p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-white/85 backdrop-blur border-rose-200 text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-600">{invitation.couple_name_female}</CardTitle>
              </CardHeader>
              <CardContent>
                {invitation.bride_parents && (
                  <p className="text-sm text-slate-600 italic font-serif">Putri dari {invitation.bride_parents}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Acara */}
        <section>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 text-center mb-4">
            Acara Pernikahan
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/85 backdrop-blur border-rose-200">
              <CardHeader>
                <CardTitle className="text-xl text-rose-600 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" /> Akad Nikah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">{weddingDateLong}</p>
                <p className="font-semibold">{invitation.akad_time || 'TBA'}</p>
                <p className="text-sm text-slate-600">{invitation.location}</p>
                {invitation.maps_url && (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(invitation.maps_url!)}>
                    <MapPin className="w-3.5 h-3.5" /> Lihat di Maps
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/85 backdrop-blur border-rose-200">
              <CardHeader>
                <CardTitle className="text-xl text-rose-600 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Resepsi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">{weddingDateLong}</p>
                <p className="font-semibold">{invitation.reception_time || 'TBA'}</p>
                <p className="text-sm text-slate-600">{invitation.location}</p>
                {invitation.maps_url && (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(invitation.maps_url!)}>
                    <MapPin className="w-3.5 h-3.5" /> Lihat di Maps
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {invitation.story && (
            <Card className="bg-white/70 backdrop-blur border-rose-100 mt-6 text-center">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Cerita Cinta</p>
                <p className="text-sm text-slate-700 italic leading-relaxed">{invitation.story}</p>
              </CardContent>
            </Card>
          )}

          {invitation.quote && (
            <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-rose-200 text-center">
              <p className="text-sm italic text-slate-600">{invitation.quote}</p>
            </div>
          )}
        </section>

        {/* RSVP */}
        <section>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 text-center mb-6">
            Konfirmasi Kehadiran
          </h2>
          <RsvpForm onSubmitRsvp={handleRsvp} />
        </section>

        {/* Buku Tamu & Doa */}
        <section>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 text-center mb-6 flex items-center justify-center gap-2">
            <MessageSquareHeart className="w-6 h-6" /> Buku Tamu & Ucapan
          </h2>
          <GuestbookSection initialWishes={initialWishes} onSubmitWish={handleWish} />
        </section>

        {/* Protokol / Dresscode */}
        <section>
          <EventProtocol
            dressCode={extras.dress_code || 'Formal / Batik / Kebaya'}
            colorPalette={extras.dress_colors || ['#F9A8D4', '#FBCFE8', '#E2E8F0']}
            instructions={extras.protocol_notes || [
              'Mohon hadir 15 menit sebelum acara dimulai.',
              'Menjaga ketertiban dan kekhusyukan selama prosesi akad nikah.',
              'Dih Taxon respeito telah memberi贡献持有人 Two hours ahead. ',
            ]}
          />
        </section>

        {/* Amplop Digital */}
        <section>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-rose-600 text-center mb-6">
            Amplop Digital
          </h2>
          <DigitalEnvelope
            banks={extras.banks || []}
            qrisImage={extras.qris_image || ''}
            shippingAddress={extras.shipping_address || ''}
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-rose-200">
          <Heart className="w-8 h-8 mx-auto mb-4 text-rose-400" />
          <h3 className="text-2xl font-heading font-bold text-rose-600 mb-2">Terima Kasih</h3>
          <p className="text-sm text-slate-600 italic max-w-xl mx-auto">
            Atas kehadiran dan doa dari Anda, kami mengucapkan terima kasih yang sebesar-besarnya.
          </p>
          <p className="text-xs text-slate-500 font-heading mt-4">
            {invitation.couple_name_male} & {invitation.couple_name_female}
          </p>
        </footer>
      </div>

      {/* Scroll to top / button back */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg bg-white/90 backdrop-blur"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </Button>
      </div>
    </div>
  )
}