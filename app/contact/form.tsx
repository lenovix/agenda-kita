'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { SiWhatsapp, SiTiktok, SiFacebook } from 'react-icons/si'

const socialMedia = [
  {
    name: 'WhatsApp',
    icon: SiWhatsapp,
    iconColor: 'text-[#25D366]',
    borderHover: 'hover:border-[#25D366]/40',
    bgHover: 'hover:bg-[#25D366]/5',
    link: 'https://wa.me/6281234567890',
  },
  {
    name: 'TikTok',
    icon: SiTiktok,
    iconColor: 'text-black dark:text-white',
    borderHover: 'hover:border-black/20',
    bgHover: 'hover:bg-black/5',
    link: 'https://tiktok.com/@agendakita',
  },
  {
    name: 'Facebook',
    icon: SiFacebook,
    iconColor: 'text-[#1877F2]',
    borderHover: 'hover:border-[#1877F2]/40',
    bgHover: 'hover:bg-[#1877F2]/5',
    link: 'https://facebook.com/agendakita',
  },
]

export default function ContactForm() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Hubungi Kami</h1>
        <p className="text-muted-foreground text-base">
          Pilih platform yang paling nyaman untuk Anda
        </p>
      </div>

      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {socialMedia.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className={`h-full transition-all duration-200 border group-hover:shadow-md ${item.borderHover} ${item.bgHover}`}>
                  <CardHeader className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <Icon className={`w-10 h-10 transition-transform duration-200 group-hover:scale-110 ${item.iconColor}`} />
                    <CardTitle className="text-lg font-medium">{item.name}</CardTitle>
                  </CardHeader>
                </Card>
              </a>
            )
          })}
        </div>
      </section>
    </div>
  )
}