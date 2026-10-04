'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const PALETTES = [
  { name: 'Rose', bg: 'bg-rose-50', accent: 'text-rose-700', btn: 'bg-rose-600' },
  { name: 'Sage', bg: 'bg-emerald-50', accent: 'text-emerald-800', btn: 'bg-emerald-700' },
  { name: 'Navy', bg: 'bg-blue-50', accent: 'text-blue-900', btn: 'bg-blue-800' },
  { name: 'Gold', bg: 'bg-amber-50', accent: 'text-amber-900', btn: 'bg-amber-700' },
  { name: 'Charcoal', bg: 'bg-zinc-100', accent: 'text-zinc-900', btn: 'bg-zinc-900' },
  { name: 'Lavender', bg: 'bg-purple-50', accent: 'text-purple-800', btn: 'bg-purple-600' },
]

export default function EditorPage() {
  const [d, setD] = useState({ groom: 'Andi', bride: 'Sari', date: '2026-06-15', time: '10:00 WIB', venue: 'Gedung Serbaguna, Jakarta', quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu. (QS 30:21)', music: true })
  const [pal, setPal] = useState(PALETTES[0])
  const set = (k: string, v: string | boolean) => setD(p => ({ ...p, [k]: v }))

  const code = `'use client'\n// Template: ${d.groom} & ${d.bride} — palette ${pal.name}\nexport const couple = ${JSON.stringify({ groom: d.groom, bride: d.bride, date: d.date, time: d.time, venue: d.venue, quote: d.quote }, null, 2)}`

  const copy = () => { navigator.clipboard.writeText(code); alert('Kode tersalin! Tempel ke app/templates/template-0XX/page.tsx') }
  const download = () => {
    const b = new Blob([code], { type: 'text/plain' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'template-data.txt'; a.click()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-3xl font-bold">Template Studio</h1><p className="text-slate-500 text-sm">Edit data → preview → salin kode</p></div>
          <Link href="/dashboard"><Button variant="outline">← Dashboard</Button></Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>1. Data Mempelai</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nama Pria</Label><Input value={d.groom} onChange={e => set('groom', e.target.value)} className="mt-1" /></div>
                <div><Label>Nama Wanita</Label><Input value={d.bride} onChange={e => set('bride', e.target.value)} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Tanggal</Label><Input type="date" value={d.date} onChange={e => set('date', e.target.value)} className="mt-1" /></div>
                <div><Label>Waktu</Label><Input value={d.time} onChange={e => set('time', e.target.value)} className="mt-1" /></div>
              </div>
              <div><Label>Venue</Label><Input value={d.venue} onChange={e => set('venue', e.target.value)} className="mt-1" /></div>
              <div><Label>Kutipan / Ayat</Label><Textarea value={d.quote} onChange={e => set('quote', e.target.value)} rows={3} className="mt-1" /></div>
              <div><Label>Palet Warna</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {PALETTES.map(p => (
                    <button key={p.name} onClick={() => setPal(p)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${pal.name === p.name ? 'border-slate-900' : 'border-transparent'} ${p.bg} ${p.accent}`}>{p.name}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={d.music} onChange={e => set('music', e.target.checked)} /><Label>Musik latar</Label></div>
              <div className="flex gap-2 pt-2">
                <Button onClick={copy} className="flex-1">Salin Kode</Button>
                <Button variant="outline" onClick={download}>Unduh .txt</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className={`overflow-hidden ${pal.bg}`}>
              <div className="p-8 text-center">
                <p className={`italic text-sm ${pal.accent}`}>Dengan penuh kebahagiaan</p>
                <h2 className={`text-5xl font-bold my-4 ${pal.accent}`}>{d.groom} & {d.bride}</h2>
                <p className={pal.accent}>{d.date} • {d.time}</p>
                <p className={`text-sm mt-1 ${pal.accent}`}>{d.venue}</p>
                <div className={`mt-6 p-4 bg-white/60 rounded text-sm italic ${pal.accent}`}>{d.quote}</div>
                <div className="mt-6"><span className={`inline-block ${pal.btn} text-white px-8 py-2 text-sm`}>Buka Undangan</span></div>
              </div>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">2. Output Kode</CardTitle></CardHeader>
              <CardContent><pre className="text-xs bg-slate-900 text-green-300 p-4 rounded overflow-x-auto max-h-64">{code}</pre></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
