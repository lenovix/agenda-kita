import { createServerClient } from '@/lib/supabase-server'

export type Template = {
  id: string
  title: string
  image_url: string
  category: string
  description: string
}

export async function getTemplates(): Promise<Template[]> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return []
  const supabase = createServerClient()
  const { data } = await supabase.from('templates').select('*').order('title')
  return data ?? []
}
