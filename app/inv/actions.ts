'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitGuestRsvp(data: {
  invitationId: string
  name: string
  phone?: string
  status: string
  pax: number
  session: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from('guests').insert({
    invitation_id: data.invitationId,
    name: data.name,
    phone: data.phone || null,
    status: data.status,
    pax: data.pax,
    session: data.session,
  })

  if (error) return { error: error.message }
  revalidatePath(`/inv/${data.invitationId}`)
  return { success: true }
}

export async function submitGuestWish(data: {
  invitationId: string
  name: string
  message: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from('wishes').insert({
    invitation_id: data.invitationId,
    guest_name: data.name,
    message: data.message,
    status: 'hadir',
  })

  if (error) return { error: error.message }
  revalidatePath(`/inv/${data.invitationId}`)
  return { success: true }
}
