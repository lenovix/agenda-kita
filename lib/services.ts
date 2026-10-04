import { createServerClient } from '@/lib/supabase-server'

export type Service = {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export async function getServices(): Promise<Service[]> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return []
  const supabase = createServerClient()
  const { data } = await supabase.from('services').select('*').order('price')
  return data ?? []
}
