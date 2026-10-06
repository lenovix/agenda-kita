import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import GuestInvitationView from './GuestInvitationView'

export default async function GuestInvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ to?: string }>
}) {
  const { id } = await params
  const { to } = await searchParams

  const supabase = await createClient()

  // Load invitation
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !invitation) {
    notFound()
  }

  // Load unhidden wishes
  const { data: wishes } = await supabase
    .from('wishes')
    .select('*')
    .eq('invitation_id', id)
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })

  return (
    <GuestInvitationView
      invitation={invitation}
      initialWishes={wishes || []}
      guestName={to}
    />
  )
}
