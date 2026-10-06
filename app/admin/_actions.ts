'use server'

import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Helper auth check admin
export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirectTo=/admin')

  // Cek apakah user adalah admin
  const adminClient = createServerClient()
  const { data: roleData } = await adminClient
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  // Jika belum ada di user_roles atau bukan admin, bisa berikan fallback untuk dev / user pertama
  if (roleData?.role !== 'admin' && process.env.NODE_ENV !== 'development') {
    redirect('/dashboard')
  }

  return { user, isAdmin: true }
}

// 1. MANAJEMEN TEMA (Templates)
export async function createTemplate(formData: FormData) {
  await requireAdmin()
  const adminClient = createServerClient()

  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const image_url = (formData.get('image_url') as string) || 'https://placehold.co/400x600/ffffff/333333?text=New+Template'
  const status = (formData.get('status') as string) || 'active'

  await adminClient.from('templates').insert({
    title,
    category,
    description,
    image_url,
    status,
  })

  revalidatePath('/admin/themes')
}

export async function toggleTemplateStatus(templateId: string, currentStatus: string) {
  await requireAdmin()
  const adminClient = createServerClient()
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

  await adminClient
    .from('templates')
    .update({ status: newStatus })
    .eq('id', templateId)

  revalidatePath('/admin/themes')
}

export async function deleteTemplate(templateId: string) {
  await requireAdmin()
  const adminClient = createServerClient()

  await adminClient.from('templates').delete().eq('id', templateId)
  revalidatePath('/admin/themes')
}

// 2. MANAJEMEN ORDER & PEMBAYARAN
export async function verifyOrderPayment(orderId: string) {
  await requireAdmin()
  const adminClient = createServerClient()

  await adminClient
    .from('orders')
    .update({
      status: 'paid',
      verified_at: new Date().toISOString(),
    })
    .eq('id', orderId)

  revalidatePath('/admin/orders')
}

export async function cancelOrder(orderId: string) {
  await requireAdmin()
  const adminClient = createServerClient()

  await adminClient
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)

  revalidatePath('/admin/orders')
}

// 3. MANAJEMEN PENGGUNA
export async function resetUserPassword(userId: string, newPassword: string) {
  await requireAdmin()
  const adminClient = createServerClient()

  await adminClient.auth.admin.updateUserById(userId, {
    password: newPassword,
  })

  revalidatePath('/admin/users')
}

export async function setUserRole(userId: string, role: 'admin' | 'user') {
  await requireAdmin()
  const adminClient = createServerClient()

  await adminClient
    .from('user_roles')
    .upsert({ user_id: userId, role }, { onConflict: 'user_id' })

  revalidatePath('/admin/users')
}
