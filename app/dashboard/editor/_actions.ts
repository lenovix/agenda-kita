'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateInvitation(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const id = formData.get('id') as string

  // Verify ownership
  const { data: existing } = await supabase
    .from('invitations')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!existing) return { error: 'Undangan tidak ditemukan' }

  const updates = {
    couple_name_male: formData.get('couple_name_male') as string,
    couple_name_female: formData.get('couple_name_female') as string,
    wedding_date: formData.get('wedding_date') as string,
    location: (formData.get('location') as string) || null,
    category: (formData.get('category') as string) || 'Romantic',
    selected_template: (formData.get('selected_template') as string) || '001',
  }

  const { error } = await supabase
    .from('invitations')
    .update(updates)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/editor/${id}`)
  return { success: true }
}

export async function getInvitation(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}