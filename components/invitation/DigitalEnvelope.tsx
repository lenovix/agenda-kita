'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, Wallet, MapPin, QrCode } from 'lucide-react'

type Bank = {
  name: string
  number: string
  owner: string
}

export default function DigitalEnvelope({
  banks = [],
  qrisImage = '',
  shippingAddress = '',
}: {
  banks?: Bank[]
  qrisImage?: string
  shippingAddress?: string
}) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(key)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur border-border/60 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-xl">Amplop Digital & Kado</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin mengirimkan tanda kasih, silakan:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bank Accounts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {banks.map((bank, i) => (
              <div key={i} className="p-4 rounded-2xl border bg-slate-50/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{bank.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Rekening</span>
                </div>
                <p className="text-[11px] text-slate-500">Atas Nama: {bank.owner}</p>
                <p className="font-mono font-bold text-lg text-slate-900 tracking-wide">{bank.number}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copy(bank.number, `bank-${i}`)}
                  className="w-full text-xs h-8 gap-1.5"
                >
                  {copiedItem === `bank-${i}` ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-600" /> Tersalin!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Salin Nomor Rekening</>
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* QRIS */}
          {qrisImage && (
            <div className="p-5 rounded-2xl border bg-white text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-slate-700 font-bold text-sm">
                <QrCode className="w-4 h-4" /> Scan QRIS
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrisImage}
                alt="QRIS Pembayaran"
                className="w-48 h-48 mx-auto rounded-xl border p-2 shadow-xs"
              />
              <p className="text-[11px] text-slate-500">
                Scan menggunakan aplikasi m-Banking / Dompet Digital (GoPay, OVO, DANA, ShopeePay)
              </p>
            </div>
          )}

          {/* Shipping Address */}
          {shippingAddress && (
            <div className="p-4 rounded-2xl border bg-rose-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
                <MapPin className="w-4 h-4 text-rose-600" /> Alamat Pengiriman Kado Fisik
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border">
                {shippingAddress}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copy(shippingAddress, 'address')}
                className="w-full text-xs h-8 gap-1.5"
              >
                {copiedItem === 'address' ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-600" /> Alamat Tersalin!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Salin Alamat Pengiriman</>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
