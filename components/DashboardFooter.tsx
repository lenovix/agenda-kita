export default function DashboardFooter() {
  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} AgendaKita Studio. Semua Hak Dilindungi.
        </p>
        <div className="flex gap-4 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">Bantuan</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  )
}
