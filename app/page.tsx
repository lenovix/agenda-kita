import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Smartphone,
  Zap,
  Music,
  MapPin,
  Gift,
  MessageSquareHeart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const highlights = [
  {
    icon: Sparkles,
    title: 'Desain Eksklusif & Elegan',
    description: 'Pilihan template modern dengan tipografi indah dan tata letak premium untuk momen istimewa Anda.',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Smartphone,
    title: 'Responsif di Semua Layar',
    description: 'Tampilan tetap presisi, nyaman dibaca, dan interaktif di smartphone Android, iPhone, maupun desktop.',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: Zap,
    title: 'Cepat & Siap Kirim',
    description: 'Proses setup kilat tanpa ribet, langsung siap disebarkan ke daftar tamu undangan via WhatsApp.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
]

const features = [
  {
    icon: Music,
    title: 'Backsound Musik',
    description: 'Iringi momen buka undangan dengan lagu pilihan favorit kedua mempelai.',
  },
  {
    icon: MapPin,
    title: 'Navigasi Google Maps',
    description: 'Tamu langsung dipandu ke venue akad & resepsi dengan petunjuk arah akurat.',
  },
  {
    icon: Gift,
    title: 'Amplop Digital & QRIS',
    description: 'Terima kado pernikahan dan tanda kasih secara aman via transfer bank atau QRIS.',
  },
  {
    icon: MessageSquareHeart,
    title: 'RSVP & Buku Tamu Online',
    description: 'Pantau perkiraan kehadiran dan tampung doa restu langsung dari undangan.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-20 -z-10 flex justify-center blur-3xl opacity-30 pointer-events-none"
        >
          <div className="w-152 h-88 bg-linear-to-tr from-primary via-rose-300 to-amber-200 rounded-full" />
        </div>

        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border-primary/30 bg-primary/5 text-primary gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Platform Undangan Digital Terpercaya
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Bikin Undangan Pernikahan{' '}
          <span className="bg-linear-to-r from-primary via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Lebih Elegan & Berkesan
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bagikan momen bahagia Anda dengan sentuhan modern. Praktis, hemat biaya cetak, dan mudah disebarkan ke seluruh keluarga serta sahabat.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/templates"
            className={`${buttonVariants({ size: 'lg' })} h-12 px-8 text-base font-medium rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2`}
          >
            Lihat Katalog Template <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricelist"
            className={`${buttonVariants({ variant: 'outline', size: 'lg' })} h-12 px-8 text-base font-medium rounded-full hover:bg-muted/80 transition-all`}
          >
            Daftar Paket & Harga
          </Link>
        </div>

        {/* Social Proof Checklist */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aktif Selamanya
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Revisi Cepat
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bebas Kuota Tamu
          </span>
        </div>
      </section>

      {/* Main Highlights Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group relative p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature Breakdown Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Fitur Lengkap untuk Momen Spesial</h2>
          <p className="text-muted-foreground text-base">
            Semua kebutuhan informasi akad dan resepsi tersaji rapi dalam satu link interaktif.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-base mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Siap Membuat Undangan Impian Anda?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Konsultasikan tema dan tanggal pernikahan Anda bersama kami. Tim siap membantu hingga undangan Anda siap disebar.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className={`${buttonVariants({ size: 'lg' })} rounded-full px-8 shadow-md`}
            >
              Hubungi Kami Sekarang
            </Link>
            <Link
              href="/templates"
              className={`${buttonVariants({ variant: 'outline', size: 'lg' })} rounded-full px-8`}
            >
              Eksplor Tema
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}