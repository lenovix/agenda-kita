'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Helper cek kepemilikan undangan
async function isInvitationOwner(userId: string, invId: string, supabase: any) {
  const { data: inv } = await supabase
    .from('invitations')
    .select('user_id')
    .eq('id', invId)
    .single()
  return inv?.user_id === userId
}

// 1. Create Invitation
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

// 2. Delete Invitation
export async function deleteInvitation(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('invitations').delete().eq('id', id)

  if (error) {
    console.error('Delete error:', error)
  }

  revalidatePath('/dashboard')
}

// 3. Update Invitation Content
export async function updateInvitation(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const id = formData.get('id') as string
  if (!id || id.trim() === '') return { error: 'Pilih undangan terlebih dahulu di Dashboard.' }

  const extrasRaw = formData.get('extras') as string
  let extras = {}
  try {
    if (extrasRaw) extras = JSON.parse(extrasRaw)
  } catch {
    extras = {}
  }

  const updates: Record<string, any> = {
    couple_name_male: ((formData.get('couple_name_male') as string) || (formData.get('couple_name_male_val') as string) || '').trim(),
    groom_parents: ((formData.get('groom_parents') as string) || null),
    couple_name_female: ((formData.get('couple_name_female') as string) || (formData.get('couple_name_female_val') as string) || '').trim(),
    bride_parents: ((formData.get('bride_parents') as string) || null),
    wedding_date: ((formData.get('wedding_date') as string) || (formData.get('wedding_date_val') as string) || '').trim(),
    akad_time: ((formData.get('akad_time') as string) || null),
    reception_time: ((formData.get('reception_time') as string) || null),
    location: ((formData.get('location') as string) || (formData.get('location_val') as string) || null),
    maps_url: ((formData.get('maps_url') as string) || null),
    quote: ((formData.get('quote') as string) || null),
    story: ((formData.get('story') as string) || null),
    cover_image: ((formData.get('cover_image') as string) || null),
    music_url: ((formData.get('music_url') as string) || null),
    category: (formData.get('category') as string) || 'Romantic',
    selected_template: (formData.get('selected_template') as string) || '001',
    extras,
  }

  if (!updates.wedding_date) return { error: 'Tanggal pernikahan wajib diisi.' }

  if (!(await isInvitationOwner(user.id, id, supabase))) {
    return { error: 'Undangan tidak ditemukan atau akses ditolak.' }
  }

  const { error } = await supabase
    .from('invitations')
    .update(updates)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/editor?id=${id}`)
  revalidatePath(`/inv/${id}`)
  return { success: true }
}

// 4. Guest CRUD Management
export async function addGuest(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const invitationId = formData.get('invitation_id') as string
  if (!invitationId) return { error: 'ID undangan diperlukan.' }

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const name = ((formData.get('name') as string) || '').trim()
  if (!name) return { error: 'Nama tamu wajib diisi.' }

  const guest = {
    invitation_id: invitationId,
    name,
    phone: (formData.get('phone') as string) || null,
    session: (formData.get('session') as string) || 'Sesi 1 (Akad & Resepsi)',
    pax: formData.get('pax') ? Number(formData.get('pax')) : 1,
    status: (formData.get('status') as string) || 'pending',
    notes: (formData.get('notes') as string) || null,
  }

  const { error } = await supabase.from('guests').insert(guest)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function editGuest(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const guestId = formData.get('id') as string
  const invitationId = formData.get('invitation_id') as string

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const updates = {
    name: ((formData.get('name') as string) || '').trim(),
    phone: (formData.get('phone') as string) || null,
    session: (formData.get('session') as string) || 'Sesi 1',
    pax: formData.get('pax') ? Number(formData.get('pax')) : 1,
    status: (formData.get('status') as string) || 'pending',
    notes: (formData.get('notes') as string) || null,
  }

  const { error } = await supabase.from('guests').update(updates).eq('id', guestId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function removeGuest(guestId: string, invitationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const { error } = await supabase.from('guests').delete().eq('id', guestId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// 5. QR Code Check-in Status Update
export async function checkInGuest(guestId: string, invitationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const { error } = await supabase
    .from('guests')
    .update({
      checked_in: true,
      checked_in_at: new Date().toISOString(),
      status: 'hadir',
    })
    .eq('id', guestId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// 6. Wishes & Moderation
export async function toggleHideWish(wishId: string, currentHidden: boolean, invitationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const { error } = await supabase
    .from('wishes')
    .update({ is_hidden: !currentHidden })
    .eq('id', wishId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteWish(wishId: string, invitationId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const { error } = await supabase.from('wishes').delete().eq('id', wishId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

// 7. Bulk Import CSV
export async function importGuestsBulk(invitationId: string, guestsList: Array<{ name: string; phone?: string; session?: string; pax?: number }>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  if (!(await isInvitationOwner(user.id, invitationId, supabase))) {
    return { error: 'Akses ditolak.' }
  }

  const payload = guestsList.map(g => ({
    invitation_id: invitationId,
    name: g.name.trim(),
    phone: g.phone || null,
    session: g.session || 'Sesi 1',
    pax: g.pax || 1,
    status: 'pending',
  }))

  const { error } = await supabase.from('guests').insert(payload)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true, count: payload.length }
}
