import { requireAdmin, createTemplate, toggleTemplateStatus, deleteTemplate } from '../_actions'
import { createServerClient } from '@/lib/supabase-server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Palette, Plus, Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function AdminThemesPage() {
  await requireAdmin()
  const adminClient = createServerClient()

  const { data: templates } = await adminClient
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manajemen Tema & Template</h1>
        <p className="text-slate-400 text-sm">Kelola katalog template, tambah tema baru, dan atur status aktif/nonaktif</p>
      </div>

      {/* Form Tambah Tema Baru */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" /> Tambah Tema Baru
          </CardTitle>
          <CardDescription className="text-slate-400">
            Daftarkan tema baru ke katalog template AgendaKita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTemplate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">Nama Tema</Label>
                <Input id="title" name="title" required placeholder="Contoh: Royal Garden" className="bg-slate-900 border-slate-700 text-white mt-1" />
              </div>
              <div>
                <Label htmlFor="category" className="text-slate-300">Kategori</Label>
                <select name="category" className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm">
                  <option value="Romantic">Romantic</option>
                  <option value="Modern">Modern</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Clean">Clean</option>
                </select>
              </div>
              <div>
                <Label htmlFor="status" className="text-slate-300">Status</Label>
                <select name="status" className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm">
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="image_url" className="text-slate-300">URL Gambar Thumbnail</Label>
              <Input id="image_url" name="image_url" placeholder="https://example.com/thumb.jpg" className="bg-slate-900 border-slate-700 text-white mt-1" />
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-300">Deskripsi Singkat</Label>
              <Textarea id="description" name="description" rows={2} placeholder="Keterangan gaya desain, font, dan elemen..." className="bg-slate-900 border-slate-700 text-white mt-1" />
            </div>

            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Simpan Tema
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Daftar Tema */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" /> Katalog Tema ({templates?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates?.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{t.title}</h4>
                    <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {t.category}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                    t.status === 'active'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {t.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{t.description || 'Tidak ada deskripsi'}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <form action={toggleTemplateStatus.bind(null, t.id, t.status || 'active')} className="flex-1">
                    <Button variant="outline" size="sm" type="submit" className="w-full text-xs h-7 bg-slate-800 text-slate-300 hover:text-white border-slate-700">
                      {t.status === 'active' ? (
                        <><EyeOff className="w-3 h-3 mr-1 text-amber-400" /> Nonaktifkan</>
                      ) : (
                        <><Eye className="w-3 h-3 mr-1 text-emerald-400" /> Aktifkan</>
                      )}
                    </Button>
                  </form>

                  <form action={deleteTemplate.bind(null, t.id)}>
                    <Button variant="outline" size="sm" type="submit" className="h-7 text-xs bg-slate-800 text-red-400 hover:text-red-300 border-slate-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
