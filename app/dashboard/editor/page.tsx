import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StudioEditorClient from './_components/StudioEditorClient'

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { id } = await searchParams
  let initialData = null

  if (id) {
    const { data } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    initialData = data
  }

  return <StudioEditorClient initialData={initialData} />
}
