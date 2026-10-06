'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageSquareHeart, ChevronLeft, ChevronRight, Send } from 'lucide-react'

type Wish = {
  id?: string
  guest_name: string
  message: string
  status?: string
  created_at?: string
}

export default function GuestbookSection({
  initialWishes = [],
  onSubmitWish,
}: {
  initialWishes?: Wish[]
  onSubmitWish?: (name: string, message: string) => Promise<void>
}) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setLoading(true)
    const newWish: Wish = {
      id: String(Date.now()),
      guest_name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    }

    if (onSubmitWish) {
      await onSubmitWish(name, message)
    }

    setWishes([newWish, ...wishes])
    setName('')
    setMessage('')
    setLoading(false)
  }

  // Pagination logic
  const totalPages = Math.ceil(wishes.length / itemsPerPage) || 1
  const paginatedWishes = wishes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur border-border/60 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-rose-500" />
            <CardTitle className="text-xl">Buku Tamu & Ucapan Doa</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Tuliskan doa restu dan ucapan selamat terbaik Anda untuk kedua mempelai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="wish_name" className="text-xs font-semibold">Nama Anda</Label>
              <Input
                id="wish_name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nama Pengirim"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="wish_msg" className="text-xs font-semibold">Ucapan & Doa</Label>
              <Textarea
                id="wish_msg"
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Semoga menjadi keluarga sakinah mawaddah warahmah..."
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 gap-1.5">
              <Send className="w-4 h-4" />
              {loading ? 'Mengirim...' : 'Kirim Doa Restu'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List Wishes with Pagination */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Semua Doa Restu ({wishes.length})</span>
          {totalPages > 1 && (
            <span>Halaman {currentPage} dari {totalPages}</span>
          )}
        </div>

        {paginatedWishes.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs bg-white/50 rounded-2xl border">
            Belum ada ucapan. Jadilah yang pertama mengirim doa!
          </div>
        ) : (
          paginatedWishes.map((w, idx) => (
            <div key={w.id || idx} className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-border/50 shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">{w.guest_name}</h4>
                <span className="text-[10px] text-slate-400">
                  {w.created_at ? new Date(w.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : 'Baru saja'}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">"{w.message}"</p>
            </div>
          ))
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="h-8 text-xs gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="h-8 text-xs gap-1"
            >
              Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
