"""Generate wedding templates 041-050 from shared pattern with color variations."""
import os

BASE = r"C:\Users\ichkm\Documents\Project\agenda-kita\app\templates"

TEMPLATES = [
    dict(n="041", bg="slate", txt="slate", btn="bg-slate-900 hover:bg-black",
         title="Slate Elegance", g1="Hadi", g2="Yuni", g1f="Hadi Kurnia, S.T", g2f="Yuniarti, S.E",
         date_id="21 April 2026", date_en="April 21st, 2026", ph1="0f172a", ph2="f1f5f9"),
    dict(n="042", bg="stone", txt="stone", btn="bg-stone-900 hover:bg-stone-950",
         title="Stone Classic", g1="Doni", g2="Dewi", g1f="Doni Prasetyo, S.H", g2f="Dewi Lestari, S.Psi",
         date_id="28 April 2026", date_en="April 28th, 2026", ph1="292524", ph2="f5f5f4"),
    dict(n="043", bg="gray", txt="gray", btn="bg-gray-800 hover:bg-gray-900",
         title="Modern Gray", g1="Sigit", g2="Lina", g1f="Sigit Budi, S.Kom", g2f="Lina Putri, S.M",
         date_id="05 Mei 2026", date_en="May 5th, 2026", ph1="374151", ph2="f3f4f6"),
    dict(n="044", bg="neutral", txt="neutral", btn="bg-neutral-800 hover:bg-neutral-900",
         title="Neutral elegance", g1="Arief", g2="Putri", g1f="Arief Wibowo, S.T", g2f="Putri Ramadani, S.E",
         date_id="12 Mei 2026", date_en="May 12th, 2026", ph1="404040", ph2="f9fafb"),
    dict(n="045", bg="zinc", txt="zinc", btn="bg-zinc-800 hover:bg-black",
         title="Zinc Minimal", g1="Eka", g2="Rina", g1f="Eka Surya, S.Kom", g2f="Rina Wati, S.Pd",
         date_id="19 Mei 2026", date_en="May 19th, 2026", ph1="27272a", ph2="f4f4f5"),
    dict(n="046", bg="neutral", txt="neutral", btn="bg-neutral-700 hover:bg-neutral-800",
         title="Soft Neutral", g1="Rudi", g2="Sari", g1f="Rudi Hartono, S.T", g2f="Sari Kusuma, S.Ked",
         date_id="26 Mei 2026", date_en="May 26th, 2026", ph1="52525b", ph2="fafafa"),
    dict(n="047", bg="neutral", txt="neutral", btn="bg-neutral-600 hover:bg-neutral-700",
         title="Warm Gray", g1="Mulyadi", g2="Rina", g1f="Mulyadi Santoso, S.H", g2f="Rina Pertiwi, S.E",
         date_id="02 Juni 2026", date_en="June 2nd, 2026", ph1="73737a", ph2="f5f5f5"),
    dict(n="048", bg="neutral", txt="neutral", btn="bg-neutral-500 hover:bg-neutral-600",
         title="Cool Gray", g1="Supriyanto", g2="Tina", g1f="Supriyanto Wijaya, S.T", g2f="Tina Sari, S.Psi",
         date_id="09 Juni 2026", date_en="June 9th, 2026", ph1="a1a1aa", ph2="f5f5f5"),
    dict(n="049", bg="neutral", txt="neutral", btn="bg-neutral-400 hover:bg-neutral-500",
         title="Light Neutral", g1="Agus", g2="Sinta", g1f="Agus Pratama, S.Kom", g2f="Sinta Ayu, S.M",
         date_id="16 Juni 2026", date_en="June 16th, 2026", ph1="d4d4d8", ph2="f9fafb"),
    dict(n="050", bg="neutral", txt="neutral", btn="bg-neutral-300 hover:bg-neutral-400",
         title="Pale Gray", g1="Ferry", g2="Maya", g1f="Ferry Kusuma, S.T", g2f="Maya Sari, S.E",
         date_id="23 Juni 2026", date_en="June 23rd, 2026", ph1="e4e4e7", ph2="fcfcfc"),
]

PAGE = """'use client'

import {{ useState, useEffect, useRef }} from 'react'
import {{ Card, CardContent, CardHeader, CardTitle }} from '@/components/ui/card'
import {{ Button }} from '@/components/ui/button'
import {{ Input }} from '@/components/ui/input'
import {{ Textarea }} from '@/components/ui/textarea'
import {{ Label }} from '@/components/ui/label'
import {{ Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const templateData = {{
  bride: {{
    name: '{g2}',
    fullName: '{g2f}',
    parent: 'Bapak Harto & Ibu Sri',
    childOrder: 'Second daughter',
    photo: 'https://placehold.co/600x800/{ph2}/{ph1}?text={g2}',
    instagram: 'https://instagram.com/{g2l}',
  }},
  groom: {{
    name: '{g1}',
    fullName: '{g1f}',
    parent: 'Bapak Dono & Ibu Ani',
    childOrder: 'First son',
    photo: 'https://placehold.co/600x800/{ph2}/{ph1}?text={g1}',
    instagram: 'https://instagram.com/{g1l}',
  }},
  coverPhoto: 'https://placehold.co/1920x1080/{ph2}/{ph1}?text={g1}+Wedding',
  weddingDate: {{
    fullDate: '{date_en}',
  }},
  ceremony: {{
    type: 'Akad Nikah',
    time: '10:00 WIB',
    location: 'Gedung Serbaguna',
    address: 'Jl. Merdeka No. 10, Jakarta',
  }},
  reception: {{
    type: 'Resepsi',
    time: '18:00 WIB',
    location: 'Grand Ballroom',
    address: 'Jl. Sudirman No. 88, Jakarta',
  }},
  quote: {{
    text: 'Love is not about finding the perfect person, but seeing an imperfect person perfectly.',
    author: 'Sam Keen',
  }},
  galleryTitle: 'Our Love Story',
  gallery: [
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+1',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+2',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+3',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+4',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+5',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+6',
  ],
  gifts: [
    {{ bank: 'BCA', number: '1234567890', name: '{g1f}' }},
    {{ bank: 'Mandiri', number: '0987654321', name: '{g2f}' }},
  ],
  music: '/music/wedding.mp3',
}}

export default function Template{n}() {{
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rsvp, setRsvp] = useState({{ name: '', attending: '' }})
  const [wishes, setWishes] = useState({{ name: '', message: '' }})
  const [wishesList, setWishesList] = useState<Array<{{ name: string; message: string }}>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = () => {{
    if (!audioRef.current) {{
      audioRef.current = new Audio(templateData.music)
      audioRef.current.loop = true
    }}
    if (muted || !musicPlaying) {{
      audioRef.current.play().catch(() => setMusicPlaying(false))
      setMusicPlaying(true)
      setMuted(false)
    }} else {{
      audioRef.current.pause()
      setMusicPlaying(false)
      setMuted(true)
    }}
  }}

  useEffect(() => {{
    return () => {{
      if (audioRef.current) audioRef.current.pause()
    }}
  }}, [])

  const copyToClipboard = (text: string, name: string) => {{
    navigator.clipboard.writeText(text)
    setCopiedGift(name)
    setTimeout(() => setCopiedGift(null), 2000)
  }}

  const handleRsvp = (e: React.FormEvent) => {{
    e.preventDefault()
    alert(`RSVP: ${{rsvp.name}}, Kehadiran: ${{rsvp.attending}}`)
    setRsvp({{ name: '', attending: '' }})
  }}

  const handleWishes = (e: React.FormEvent) => {{
    e.preventDefault()
    if (wishes.name && wishes.message) {{
      setWishesList([...wishesList, wishes])
      setWishes({{ name: '', message: '' }})
    }}
  }}

  if (!opened) {{
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-{bg}-50">
        <img src={{templateData.coverPhoto}} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-{bg}-900/30"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white font-serif italic text-lg mb-6">Dengan penuh kebahagiaan</p>
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl">
            {g1} & {g2}
          </h1>
          <p className="text-2xl text-white font-serif mb-10">{date_id}</p>
          <Button onClick={{() => {{ toggleMusic(); setOpened(true) }}}} className="bg-{bg}-700 text-white px-12 py-4 rounded-none font-semibold tracking-wide text-lg">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }}

  return (
    <div className="min-h-screen bg-{bg}-50">
      <button onClick={{toggleMusic}} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-{bg}-700 text-white shadow-lg transition" aria-label="Toggle musik">
        {{musicPlaying ? '♪' : '×'}}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-{txt}-700 font-serif italic text-lg mb-6">Together with their families</p>
          <h1 className="text-6xl md:text-7xl font-bold text-{txt}-900 mb-8">
            {g1f} & {g2f}
          </h1>
          <p className="text-xl text-{txt}-700 font-serif italic max-w-2xl mx-auto">{{templateData.quote.text}}</p>
          <p className="text-sm text-{txt}-600 mt-4">— {{templateData.quote.author}}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-{txt}-600 mb-6 font-bold">The Bride</p>
              <img src={{templateData.bride.photo}} alt={{templateData.bride.name}} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-{txt}-900 mb-3">{{templateData.bride.fullName}}</h3>
              <p className="text-sm text-{txt}-600 mb-4">{{templateData.bride.childOrder}} of {{templateData.bride.parent}}</p>
              <a href={{templateData.bride.instagram}} target="_blank" rel="noopener noreferrer" className="text-{txt}-700 hover:text-{txt}-800 font-semibold">Instagram</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-{txt}-600 mb-6 font-bold">The Groom</p>
              <img src={{templateData.groom.photo}} alt={{templateData.groom.name}} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-{txt}-900 mb-3">{{templateData.groom.fullName}}</h3>
              <p className="text-sm text-{txt}-600 mb-4">{{templateData.groom.childOrder}} of {{templateData.groom.parent}}</p>
              <a href={{templateData.groom.instagram}} target="_blank" rel="noopener noreferrer" className="text-{txt}-700 hover:text-{txt}-800 font-semibold">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-{bg}-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 mb-6">{{templateData.galleryTitle}}</h2>
          </div>
          <Carousel plugins={{[Autoplay({{ delay: 4000 }})]}} opts={{{{ align: 'center', loop: true }}}} className="w-full">
            <CarouselContent>
              {{templateData.gallery.map((photo, i) => (
                <CarouselItem key={{i}}>
                  <img src={{photo}} alt={{`Gallery ${{i + 1}}`}} className="w-full aspect-video object-cover shadow-xl" />
                </CarouselItem>
              ))}}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-{bg}-700 text-white border-none hover:bg-{bg}-800" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-{bg}-700 text-white border-none hover:bg-{bg}-800" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 text-center mb-16">Wedding Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-{bg}-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-{txt}-900 font-bold">{{templateData.ceremony.type}}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Date</p><p className="font-serif text-{txt}-800">{{templateData.weddingDate.fullDate}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Time</p><p className="font-bold text-{txt}-800">{{templateData.ceremony.time}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Venue</p><p className="font-bold text-{txt}-800">{{templateData.ceremony.location}}</p><p className="text-sm text-{txt}-600 mt-1">{{templateData.ceremony.address}}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-{bg}-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-{txt}-900 font-bold">{{templateData.reception.type}}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Date</p><p className="font-serif text-{txt}-800">{{templateData.weddingDate.fullDate}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Time</p><p className="font-bold text-{txt}-800">{{templateData.reception.time}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Venue</p><p className="font-bold text-{txt}-800">{{templateData.reception.location}}</p><p className="text-sm text-{txt}-600 mt-1">{{templateData.reception.address}}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-{bg}-50 p-8 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-{txt}-900 mb-6">Reservation (RSVP)</h3>
            <form onSubmit={{handleRsvp}} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-{txt}-800 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={{rsvp.name}} onChange={{(e) => setRsvp({{ ...rsvp, name: e.target.value }})}} required className="mt-2" /></div>
              <div><Label className="text-{txt}-800 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={{rsvp.attending === 'yes'}} onChange={{(e) => setRsvp({{ ...rsvp, attending: e.target.value }})}} required /><span className="text-{txt}-800">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={{rsvp.attending === 'no'}} onChange={{(e) => setRsvp({{ ...rsvp, attending: e.target.value }})}} required /><span className="text-{txt}-800">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full bg-{bg}-700 text-white py-3">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-{bg}-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 mb-6">Sending Gift</h2>
          <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {{templateData.gifts.map((gift, i) => (
                <Card key={{i}}>
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold">Account Number</p><p className="font-mono font-bold text-{txt}-800">{{gift.number}}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold">Account Name</p><p className="font-semibold text-{txt}-800">{{gift.name}}</p></div>
                    <Button variant="outline" className="w-full" onClick={{() => copyToClipboard(gift.number, gift.bank)}}>{{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}}</Button>
                  </CardContent>
                </Card>
              ))}}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 text-center mb-12">Guest Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-{bg}-50 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-{txt}-900 mb-6">Send Your Wishes</h3>
              <form onSubmit={{handleWishes}} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-{txt}-800 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={{wishes.name}} onChange={{(e) => setWishes({{ ...wishes, name: e.target.value }})}} required className="mt-2" /></div>
                <div><Label htmlFor="wish-message" className="text-{txt}-800 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={{wishes.message}} onChange={{(e) => setWishes({{ ...wishes, message: e.target.value }})}} required rows={{5}} className="mt-2" /></div>
                <Button type="submit" className="w-full bg-{bg}-700 text-white py-3">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {{wishesList.map((wish, i) => (
                <div key={{i}} className="bg-white p-4 shadow-md border"><p className="font-bold text-{txt}-800">{{wish.name}}</p><p className="text-sm text-{txt}-700 mt-2">{{wish.message}}</p></div>
              ))}}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-{bg}-700 text-center"><p className="text-white text-sm">Powered by Agenda Kita</p></footer>
    </div>
  )
}}
"""

for t in TEMPLATES:
    t["g1l"] = t["g1"].lower()
    t["g2l"] = t["g2"].lower()
    content = PAGE.format(**t)
    path = os.path.join(BASE, "template-" + t["n"], "page.tsx")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote template-" + t["n"])

PAGE = """'use client'

import {{ useState, useEffect, useRef }} from 'react'
import {{ Card, CardContent, CardHeader, CardTitle }} from '@/components/ui/card'
import {{ Button }} from '@/components/ui/button'
import {{ Input }} from '@/components/ui/input'
import {{ Textarea }} from '@/components/ui/textarea'
import {{ Label }} from '@/components/ui/label'
import {{ Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const templateData = {{
  bride: {{
    name: '{g2}',
    fullName: '{g2f}',
    parent: 'Bapak Harto & Ibu Sri',
    childOrder: 'Second daughter',
    photo: 'https://placehold.co/600x800/{ph2}/{ph1}?text={g2}',
    instagram: 'https://instagram.com/{g2l}',
  }},
  groom: {{
    name: '{g1}',
    fullName: '{g1f}',
    parent: 'Bapak Dono & Ibu Ani',
    childOrder: 'First son',
    photo: 'https://placehold.co/600x800/{ph2}/{ph1}?text={g1}',
    instagram: 'https://instagram.com/{g1l}',
  }},
  coverPhoto: 'https://placehold.co/1920x1080/{ph2}/{ph1}?text={g1}+Wedding',
  weddingDate: {{
    fullDate: '{date_en}',
  }},
  ceremony: {{
    type: 'Akad Nikah',
    time: '10:00 WIB',
    location: 'Gedung Serbaguna',
    address: 'Jl. Merdeka No. 10, Jakarta',
  }},
  reception: {{
    type: 'Resepsi',
    time: '18:00 WIB',
    location: 'Grand Ballroom',
    address: 'Jl. Sudirman No. 88, Jakarta',
  }},
  quote: {{
    text: 'Whatever our souls are made of, yours and mine are the same.',
    author: 'Emily Bronte',
  }},
  galleryTitle: 'Moments of Love',
  gallery: [
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+1',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+2',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+3',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+4',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+5',
    'https://placehold.co/800x600/{ph2}/{ph1}?text=Photo+6',
  ],
  gifts: [
    {{ bank: 'BCA', number: '1234567890', name: '{g1f}' }},
    {{ bank: 'Mandiri', number: '0987654321', name: '{g2f}' }},
  ],
  music: '/music/wedding.mp3',
}}

export default function Template{n}() {{
  const [opened, setOpened] = useState(false)
  const [copiedGift, setCopiedGift] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rsvp, setRsvp] = useState({{ name: '', attending: '' }})
  const [wishes, setWishes] = useState({{ name: '', message: '' }})
  const [wishesList, setWishesList] = useState<Array<{{ name: string; message: string }}>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = () => {{
    if (!audioRef.current) {{
      audioRef.current = new Audio(templateData.music)
      audioRef.current.loop = true
    }}
    if (muted || !musicPlaying) {{
      audioRef.current.play().catch(() => setMusicPlaying(false))
      setMusicPlaying(true)
      setMuted(false)
    }} else {{
      audioRef.current.pause()
      setMusicPlaying(false)
      setMuted(true)
    }}
  }}

  useEffect(() => {{
    return () => {{
      if (audioRef.current) audioRef.current.pause()
    }}
  }}, [])

  const copyToClipboard = (text: string, name: string) => {{
    navigator.clipboard.writeText(text)
    setCopiedGift(name)
    setTimeout(() => setCopiedGift(null), 2000)
  }}

  const handleRsvp = (e: React.FormEvent) => {{
    e.preventDefault()
    alert(`RSVP: ${{rsvp.name}}, Kehadiran: ${{rsvp.attending}}`)
    setRsvp({{ name: '', attending: '' }})
  }}

  const handleWishes = (e: React.FormEvent) => {{
    e.preventDefault()
    if (wishes.name && wishes.message) {{
      setWishesList([...wishesList, wishes])
      setWishes({{ name: '', message: '' }})
    }}
  }}

  if (!opened) {{
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-{bg}-50">
        <img src={{templateData.coverPhoto}} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-{bg}-900/30"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white font-serif italic text-lg mb-6">Dengan penuh kebahagiaan</p>
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 drop-shadow-2xl" style={{{{ fontFamily: "'Georgia', serif" }}}}>
            {g1} & {g2}
          </h1>
          <p className="text-2xl text-white font-serif mb-10">{date_id}</p>
          <Button onClick={{() => {{ toggleMusic(); setOpened(true) }}}} className="{btn} text-white px-12 py-4 rounded-none font-semibold tracking-wide text-lg">
            Buka Undangan
          </Button>
        </div>
      </div>
    )
  }}

  return (
    <div className="min-h-screen bg-{bg}-50">
      <button onClick={{toggleMusic}} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full {btnsplit} text-white shadow-lg transition" aria-label="Toggle musik">
        {{musicPlaying ? '♪' : '×'}}
      </button>

      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-{txt}-700 font-serif italic text-lg mb-6">Together with their families</p>
          <h1 className="text-6xl md:text-7xl font-bold text-{txt}-900 mb-8" style={{{{ fontFamily: "'Georgia', serif" }}}}>
            {g1f} & {g2f}
          </h1>
          <p className="text-xl text-{txt}-700 font-serif italic max-w-2xl mx-auto">{{templateData.quote.text}}</p>
          <p className="text-sm text-{txt}-600 mt-4">— {{templateData.quote.author}}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-{txt}-600 mb-6 font-bold">The Bride</p>
              <img src={{templateData.bride.photo}} alt={{templateData.bride.name}} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-{txt}-900 mb-3">{{templateData.bride.fullName}}</h3>
              <p className="text-sm text-{txt}-600 mb-4">{{templateData.bride.childOrder}} of {{templateData.bride.parent}}</p>
              <a href={{templateData.bride.instagram}} target="_blank" rel="noopener noreferrer" className="text-{txt}-700 hover:text-{txt}-800 font-semibold">Instagram</a>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-{txt}-600 mb-6 font-bold">The Groom</p>
              <img src={{templateData.groom.photo}} alt={{templateData.groom.name}} className="w-80 h-96 object-cover mx-auto mb-8 shadow-xl" />
              <h3 className="text-3xl font-bold text-{txt}-900 mb-3">{{templateData.groom.fullName}}</h3>
              <p className="text-sm text-{txt}-600 mb-4">{{templateData.groom.childOrder}} of {{templateData.groom.parent}}</p>
              <a href={{templateData.groom.instagram}} target="_blank" rel="noopener noreferrer" className="text-{txt}-700 hover:text-{txt}-800 font-semibold">Instagram</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-{bg}-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 mb-6" style={{{{ fontFamily: "'Georgia', serif" }}}}>{{templateData.galleryTitle}}</h2>
          </div>
          <Carousel plugins={{[Autoplay({{ delay: 4000 }})]}} opts={{{{ align: 'center', loop: true }}}} className="w-full">
            <CarouselContent>
              {{templateData.gallery.map((photo, i) => (
                <CarouselItem key={{i}}>
                  <img src={{photo}} alt={{`Gallery ${{i + 1}}`}} className="w-full aspect-video object-cover shadow-xl" />
                </CarouselItem>
              ))}}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 text-center mb-16" style={{{{ fontFamily: "'Georgia', serif" }}}}>Wedding Events</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-{bg}-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-{txt}-900 font-bold">{{templateData.ceremony.type}}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Date</p><p className="font-serif text-{txt}-800">{{templateData.weddingDate.fullDate}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Time</p><p className="font-bold text-{txt}-800">{{templateData.ceremony.time}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Venue</p><p className="font-bold text-{txt}-800">{{templateData.ceremony.location}}</p><p className="text-sm text-{txt}-600 mt-1">{{templateData.ceremony.address}}</p></div>
              </CardContent>
            </Card>
            <Card className="bg-{bg}-50 shadow-xl">
              <CardHeader><CardTitle className="text-2xl text-{txt}-900 font-bold">{{templateData.reception.type}}</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Date</p><p className="font-serif text-{txt}-800">{{templateData.weddingDate.fullDate}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Time</p><p className="font-bold text-{txt}-800">{{templateData.reception.time}}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold mb-1">Venue</p><p className="font-bold text-{txt}-800">{{templateData.reception.location}}</p><p className="text-sm text-{txt}-600 mt-1">{{templateData.reception.address}}</p></div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-{bg}-50 p-8 max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold text-{txt}-900 mb-6">Reservation (RSVP)</h3>
            <form onSubmit={{handleRsvp}} className="space-y-6">
              <div><Label htmlFor="rsvp-name" className="text-{txt}-800 font-semibold">Your full name</Label><Input id="rsvp-name" type="text" placeholder="Enter your name" value={{rsvp.name}} onChange={{(e) => setRsvp({{ ...rsvp, name: e.target.value }})}} required className="mt-2" /></div>
              <div><Label className="text-{txt}-800 font-semibold mb-3 block">Will you attend?</Label><div className="space-y-3"><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="yes" checked={{rsvp.attending === 'yes'}} onChange={{(e) => setRsvp({{ ...rsvp, attending: e.target.value }})}} required className="w-4 h-4" /><span className="text-{txt}-800">Yes, I'll be there</span></label><label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="attending" value="no" checked={{rsvp.attending === 'no'}} onChange={{(e) => setRsvp({{ ...rsvp, attending: e.target.value }})}} required className="w-4 h-4" /><span className="text-{txt}-800">Sorry, I can't</span></label></div></div>
              <Button type="submit" className="w-full {btn} text-white py-3">Submit Confirmation</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-{bg}-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 mb-6">Sending Gift</h2>
          <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {{templateData.gifts.map((gift, i) => (
                <Card key={{i}}>
                  <CardContent className="space-y-3 pt-6">
                    <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold">Account Number</p><p className="font-mono font-bold text-{txt}-800">{{gift.number}}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-{txt}-600 font-bold">Account Name</p><p className="font-semibold text-{txt}-800">{{gift.name}}</p></div>
                    <Button variant="outline" className="w-full" onClick={{() => copyToClipboard(gift.number, gift.bank)}}>{{copiedGift === gift.bank ? '✓ Copied' : 'Copy Number'}}</Button>
                  </CardContent>
                </Card>
              ))}}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-{txt}-900 text-center mb-12">Guest Wishes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-{bg}-50 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-{txt}-900 mb-6">Send Your Wishes</h3>
              <form onSubmit={{handleWishes}} className="space-y-4">
                <div><Label htmlFor="wish-name" className="text-{txt}-800 font-bold text-sm uppercase">Name</Label><Input id="wish-name" type="text" placeholder="Your name" value={{wishes.name}} onChange={{(e) => setWishes({{ ...wishes, name: e.target.value }})}} required className="mt-2" /></div>
                <div><Label htmlFor="wish-message" className="text-{txt}-800 font-bold text-sm uppercase">Message</Label><Textarea id="wish-message" placeholder="Your wishes..." value={{wishes.message}} onChange={{(e) => setWishes({{ ...wishes, message: e.target.value }})}} required rows={{5}} className="mt-2" /></div>
                <Button type="submit" className="w-full {btn} text-white py-3">Send Wishes</Button>
              </form>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {{wishesList.map((wish, i) => (
                <div key={{i}} className="bg-white p-4 shadow-md border"><p className="font-bold text-{txt}-800">{{wish.name}}</p><p className="text-sm text-{txt}-700 mt-2">{{wish.message}}</p></div>
              ))}}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 {btnsplit} text-center"><p className="text-white text-sm">Powered by Agenda Kita</p></footer>
    </div>
  )
}}
"""

for t in TEMPLATES:
    t["g1l"] = t["g1"].lower()
    t["g2l"] = t["g2"].lower()
    t["btnsplit"] = t["btn"].split()[0]
    content = PAGE.format(**t)
    path = os.path.join(BASE, "template-" + t["n"], "page.tsx")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote template-" + t["n"])
