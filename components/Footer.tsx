import Link from 'next/link'
import { Sparkles, Heart } from 'lucide-react'

const footerNav = [
  {
    title: 'Navigasi',
    links: [
      { label: 'Beranda', href: '/' },
      { label: 'Katalog Template', href: '/templates' },
      { label: 'Daftar Harga', href: '/pricelist' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
  },
  {
    title: 'Pemesanan',
    links: [
      { label: 'WhatsApp CS', href: 'https://wa.me/6281234567890', external: true },
      { label: 'Toko Shopee', href: 'https://shopee.co.id/agendakita', external: true },
      { label: 'Toko Tokopedia', href: 'https://tokopedia.com/agendakita', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-auto backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span>
                Agenda<span className="text-primary">Kita</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Platform undangan pernikahan digital interaktif dan eksklusif. Jadikan momen spesial Anda berkesan, praktis, dan mudah dibagikan kepada seluruh kerabat.
            </p>
          </div>

          {/* Dynamic Link Groups */}
          {footerNav.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgendaKita. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk momen bahagia Anda
          </p>
        </div>
      </div>
    </footer>
  )
}