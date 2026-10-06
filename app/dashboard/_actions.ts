'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvitation(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const invitation = {
    user_id: user.id,
    couple_name_male: formData.get('couple_name_male') as string,
    couple_name_female: formData.get('couple_name_female') as string,
    wedding_date: formData.get('wedding_date') as string,
    location: (formData.get('location') as string) || null,
    category: (formData.get('category') as string) || 'Romantic',
    selected_template: (formData.get('selected_template') as string) || '001',
  }

  const { error } = await supabase.from('invitations').insert(invitation)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteInvitation(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('invitations').delete().eq('id', id)

  if (error) {
    console.error('Delete error:', error)
  }

  revalidatePath('/dashboard')
}
