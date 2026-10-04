import { getTemplates } from '@/lib/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const localTemplates = [
  { slug: 'template-001', title: 'Blossom Romance', category: 'Romantic', desc: 'Pastel pink floral, lembut & elegan', gradient: 'from-rose-100 to-pink-200', icon: '🌸' },
  { slug: 'template-002', title: 'Royal Black Gold', category: 'Luxury', desc: 'Hitam-emas mewah, modern minimalis', gradient: 'from-zinc-800 to-black', icon: '✦' },
  { slug: 'template-003', title: 'Traditional Minang', category: 'Tradisional', desc: 'Cokelat-emas songket, Rumah Gadang', gradient: 'from-amber-900 to-yellow-700', icon: '🏛️' },
  { slug: 'template-004', title: 'Recky & Zahra', category: 'Modern', desc: 'Tanah-minimalis, quote Quran, carousel', gradient: 'from-stone-800 to-stone-600', icon: '💍' },
  { slug: 'template-005', title: 'Hendra & Erika', category: 'Modern', desc: 'Blue-ice minimalis, video, bubble wishes', gradient: 'from-gray-300 to-gray-200', icon: '💎' },
  { slug: 'template-006', title: 'Jaewoung & Cindy', category: 'Clean', desc: 'White minimalist, Korean bilingual, Bebas Neue', gradient: 'from-white to-gray-100', icon: '🤍' },
  { slug: 'template-007', title: 'Garden Pink', category: 'Romantic', desc: 'Playfair Display, rounded, floral vibes', gradient: 'from-pink-100 to-amber-100', icon: '🌹' },
  { slug: 'template-008', title: 'Luxury Black Gold', category: 'Luxury', desc: 'Cinzel serif, dark elegant, border details', gradient: 'from-gray-900 to-yellow-900', icon: '👑' },
  { slug: 'template-009', title: 'Traditional Batik', category: 'Tradisional', desc: 'Great Vibes font, emerald, soft rounded', gradient: 'from-emerald-50 to-white', icon: '🌿' },
  { slug: 'template-010', title: 'Colorful Modern', category: 'Modern', desc: 'Gradient text, vibrant, rounded corners', gradient: 'from-yellow-100 via-pink-100 to-blue-100', icon: '🎨' },
  { slug: 'template-011', title: 'Vintage Beige', category: 'Romantic', desc: 'Classic beige tones, warm & vintage', gradient: 'from-amber-100 to-yellow-200', icon: '📜' },
  { slug: 'template-012', title: 'Navy Blue Nautical', category: 'Elegant', desc: 'Deep blue & white, nautical elegance', gradient: 'from-blue-200 to-sky-100', icon: '⚓' },
  { slug: 'template-013', title: 'Sage Green Nature', category: 'Romantic', desc: 'Earthy green, natural & serene', gradient: 'from-green-100 to-emerald-100', icon: '🌿' },
  { slug: 'template-014', title: 'Burgundy Wine', category: 'Elegant', desc: 'Deep burgundy, wine & luxury', gradient: 'from-rose-200 to-red-100', icon: '🍷' },
  { slug: 'template-015', title: 'Lavender Dream', category: 'Romantic', desc: 'Soft purple, lavender fields', gradient: 'from-purple-200 to-violet-100', icon: '💜' },
  { slug: 'template-016', title: 'Coral Sunset', category: 'Modern', desc: 'Warm coral & amber, sunset vibes', gradient: 'from-orange-200 to-amber-100', icon: '🌅' },
  { slug: 'template-017', title: 'Mint Pastel', category: 'Modern', desc: 'Fresh mint & teal, cooling pastel', gradient: 'from-teal-100 to-cyan-100', icon: '🍃' },
  { slug: 'template-018', title: 'Charcoal Modern', category: 'Modern', desc: 'Slate & charcoal, ultra-modern', gradient: 'from-zinc-300 to-neutral-200', icon: '◆' },
  { slug: 'template-019', title: 'Rose Gold Glam', category: 'Luxury', desc: 'Pink rose gold, glamorous shine', gradient: 'from-pink-200 to-rose-100', icon: '✨' },
  { slug: 'template-020', title: 'Teal Tropical', category: 'Modern', desc: 'Ocean teal & cyan, tropical breeze', gradient: 'from-cyan-200 to-sky-100', icon: '🌊' },
  { slug: 'template-021', title: 'Cherry Red Romance', category: 'Romantic', desc: 'Bold red, passionate & vibrant', gradient: 'from-red-200 to-rose-100', icon: '❤️' },
  { slug: 'template-022', title: 'Indigo Elegance', category: 'Elegant', desc: 'Deep indigo, royal & sophisticated', gradient: 'from-indigo-200 to-blue-100', icon: '💙' },
  { slug: 'template-023', title: 'Fuchsia Fusion', category: 'Modern', desc: 'Vibrant fuchsia, bold & modern', gradient: 'from-fuchsia-200 to-pink-100', icon: '💖' },
  { slug: 'template-024', title: 'Sky Blue Heaven', category: 'Romantic', desc: 'Light sky blue, airy & peaceful', gradient: 'from-sky-200 to-blue-50', icon: '☁️' },
  { slug: 'template-025', title: 'Amber Glow', category: 'Romantic', desc: 'Warm amber, golden sunset', gradient: 'from-amber-200 to-yellow-100', icon: '🌟' },
  { slug: 'template-026', title: 'Lime Fresh', category: 'Modern', desc: 'Bright lime green, fresh & energetic', gradient: 'from-lime-200 to-green-100', icon: '🍈' },
  { slug: 'template-027', title: 'Violet Dreams', category: 'Romantic', desc: 'Deep violet, dreamy & mystical', gradient: 'from-violet-200 to-purple-100', icon: '🔮' },
  { slug: 'template-028', title: 'Slate Minimal', category: 'Modern', desc: 'Cool slate gray, ultra-minimal', gradient: 'from-slate-200 to-gray-100', icon: '■' },
  { slug: 'template-029', title: 'Stone Elegance', category: 'Elegant', desc: 'Warm stone tones, timeless', gradient: 'from-stone-200 to-neutral-100', icon: '🏛️' },
  { slug: 'template-030', title: 'Warm Neutral', category: 'Modern', desc: 'Soft warm grays, cozy modern', gradient: 'from-neutral-200 to-stone-100', icon: '☕' },
  { slug: 'template-031', title: 'Ruby Passion', category: 'Romantic', desc: 'Deep ruby red, passionate', gradient: 'from-red-200 to-rose-50', icon: '💎' },
  { slug: 'template-032', title: 'Emerald Garden', category: 'Romantic', desc: 'Rich emerald, garden vibes', gradient: 'from-emerald-200 to-green-50', icon: '🌿' },
  { slug: 'template-033', title: 'Monochrome Chic', category: 'Modern', desc: 'Pure monochrome, ultra chic', gradient: 'from-zinc-300 to-zinc-100', icon: '⚫' },
  { slug: 'template-034', title: 'Blush Romance', category: 'Romantic', desc: 'Soft blush pink, dreamy', gradient: 'from-pink-200 to-pink-50', icon: '💗' },
  { slug: 'template-035', title: 'Ocean Breeze', category: 'Modern', desc: 'Fresh cyan, ocean breeze', gradient: 'from-cyan-200 to-cyan-50', icon: '🌊' },
  { slug: 'template-036', title: 'Saffron Warmth', category: 'Romantic', desc: 'Warm saffron, cozy feel', gradient: 'from-orange-200 to-orange-50', icon: '🔥' },
  { slug: 'template-037', title: 'Indigo Night', category: 'Elegant', desc: 'Deep indigo, night sky', gradient: 'from-indigo-200 to-indigo-50', icon: '🌌' },
  { slug: 'template-038', title: 'Rose Petals', category: 'Romantic', desc: 'Soft rose, petal soft', gradient: 'from-rose-200 to-rose-50', icon: '🌹' },
  { slug: 'template-039', title: 'Teal Calm', category: 'Modern', desc: 'Calming teal, serene', gradient: 'from-teal-200 to-teal-50', icon: '🍃' },
  { slug: 'template-040', title: 'Violet Charm', category: 'Romantic', desc: 'Charming violet, elegant', gradient: 'from-violet-200 to-violet-50', icon: '🔮' },
  { slug: 'template-041', title: 'Slate Elegance', category: 'Modern', desc: 'Deep slate, sophisticated', gradient: 'from-slate-300 to-slate-100', icon: '🏢' },
  { slug: 'template-042', title: 'Stone Classic', category: 'Elegant', desc: 'Timeless stone, classic', gradient: 'from-stone-300 to-stone-100', icon: '🏛️' },
  { slug: 'template-043', title: 'Modern Gray', category: 'Modern', desc: 'Contemporary gray tones', gradient: 'from-gray-300 to-gray-100', icon: '🏙️' },
  { slug: 'template-044', title: 'Neutral Elegance', category: 'Elegant', desc: 'Pure neutral, refined', gradient: 'from-neutral-300 to-neutral-100', icon: '🤍' },
  { slug: 'template-045', title: 'Zinc Minimal', category: 'Modern', desc: 'Zinc minimal, clean lines', gradient: 'from-zinc-300 to-zinc-100', icon: '🖤' },
  { slug: 'template-046', title: 'Soft Neutral', category: 'Modern', desc: 'Soft warm neutral', gradient: 'from-neutral-200 to-neutral-50', icon: '☁️' },
  { slug: 'template-047', title: 'Warm Gray', category: 'Modern', desc: 'Cozy warm gray', gradient: 'from-gray-200 to-gray-100', icon: '🌫️' },
  { slug: 'template-048', title: 'Cool Gray', category: 'Modern', desc: 'Cool steel gray', gradient: 'from-slate-200 to-slate-100', icon: '❄️' },
  { slug: 'template-049', title: 'Light Neutral', category: 'Modern', desc: 'Light airy neutral', gradient: 'from-neutral-100 to-neutral-50', icon: '🕊️' },
  { slug: 'template-050', title: 'Pale Gray', category: 'Modern', desc: 'Pale soft gray', gradient: 'from-zinc-100 to-zinc-50', icon: '🌑' },
]

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center">Template Undangan</h1>
      <p className="text-center text-muted-foreground mb-8">Pilih desain sesuai karakter acara Anda</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {localTemplates.map((t) => (
          <Link key={t.slug} href={`/templates/${t.slug}`}>
            <Card className="overflow-hidden hover:shadow-xl transition h-full">
              <div className={`h-48 bg-linear-to-br ${t.gradient} flex items-center justify-center text-6xl`}>
                {t.icon}
              </div>
              <CardHeader>
                <CardDescription>{t.category}</CardDescription>
                <CardTitle>{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
