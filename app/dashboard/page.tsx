import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './_components/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Load invitations
  const { data: invitations, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (invError) throw new Error(`Gagal memuat undangan: ${invError.message}`)

  // Load associated data for each invitation (guests & wishes)
  // In a real large-scale app, we might paginate or lazy-load this via APIs,
  // but for AgendaKita MVP, we'll preload it for seamless Dashboard Client rendering.
  const invIds = invitations?.map(i => i.id) || []
  let allGuests: any[] = []
  let allWishes: any[] = []

  if (invIds.length > 0) {
    const [guestsRes, wishesRes] = await Promise.all([
      supabase.from('guests').select('*').in('invitation_id', invIds).order('created_at', { ascending: false }),
      supabase.from('wishes').select('*').in('invitation_id', invIds).order('created_at', { ascending: false })
    ])
    allGuests = guestsRes.data || []
    allWishes = wishesRes.data || []
  }

  return (
    <DashboardClient 
      invitations={invitations ?? []} 
      initialGuests={allGuests} 
      initialWishes={allWishes} 
    />
  )
}
