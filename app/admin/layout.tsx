import { redirect } from 'next/navigation'
import { requireAdmin } from './_actions'
import AdminSidebar from './_components/AdminSidebar'
import AdminHeader from './_components/AdminHeader'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden bg-slate-900 p-6">{children}</main>
      </div>
    </div>
  )
}
