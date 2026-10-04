import Link from 'next/link'
import { getServices } from '@/lib/services'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, PackageOpen } from 'lucide-react'

export default async function PricelistPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-wider font-semibold border-primary/30 text-primary">
            Daftar Harga & Paket
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Investasi Transparan untuk Kebutuhan Anda
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Temukan pilihan paket layanan terbaik dengan harga yang bersahabat dan kualitas terjamin.
          </p>
        </div>

        {/* Empty State */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30">
            <PackageOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">Belum Ada Layanan Tersedia</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Data pricelist belum ditemukan. Pastikan data sudah terisi pada database Supabase Anda.
            </p>
            <Button variant="outline">
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        ) : (
          /* Grid Card List */
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {services.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col justify-between border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/60 backdrop-blur-sm"
              >
                <div>
                  <CardHeader className="space-y-3 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="font-medium text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 pb-6">
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">
                        Mulai dari
                      </span>
                      <div className="flex items-baseline gap-1 text-primary">
                        <span className="text-sm font-semibold">Rp</span>
                        <span className="text-3xl font-extrabold tracking-tight">
                          {service.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-0 bg-white border-0">
                  <Link
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya tertarik dengan layanan *${service.name}*. Boleh info lebih lanjut?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='w-full'
                  >
                    <Button className="w-full gap-2 font-medium shadow-sm hover:shadow cursor-pointer">
                      Pilih Paket <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}