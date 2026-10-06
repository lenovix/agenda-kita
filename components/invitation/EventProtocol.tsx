'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ShieldCheck, Shirt, AlertCircle, Heart } from 'lucide-react'

export default function EventProtocol({
  dressCode = 'Formal / Batik / Modest Attire',
  colorPalette = ['#E2E8F0', '#94A3B8', '#1E293B'],
  instructions = [
    'Mohon hadir 15 menit sebelum acara dimulai.',
    'Menjaga ketertiban dan kekhusyukan selama prosesi akad nikah.',
    'Dihimbau tidak mengambil foto dengan menyalakan flash dari jarak dekat.',
  ],
}: {
  dressCode?: string
  colorPalette?: string[]
  instructions?: string[]
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur border-border/60 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <CardTitle className="text-xl">Protokol & Panduan Acara</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Panduan kenyamanan dan tata tertib selama berlangsungnya acara pernikahan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dress code */}
          <div className="p-4 rounded-2xl border bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Shirt className="w-4 h-4 text-blue-600" /> Pakaian & Dresscode
            </div>
            <p className="text-xs text-slate-700 font-medium">{dressCode}</p>
            {colorPalette.length > 0 && (
              <div>
                <p className="text-[11px] text-slate-500 mb-1">Rekomendasi Warna Pakaian:</p>
                <div className="flex gap-2">
                  {colorPalette.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Guidelines */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 font-bold text-sm text-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Panduan Teknis Tamu
            </h4>
            <ul className="space-y-2">
              {instructions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
