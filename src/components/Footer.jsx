export default function Footer() {
  return (
    <footer className="border-t border-amber-200/80 bg-[#fbf9ee] py-12 text-slate-600">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-black text-white text-xs shadow-xs">
              KB
            </span>
            <div>
              <span className="font-extrabold text-slate-900">Kilas Bangsa</span>
              <p className="text-xs text-slate-500">Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <a href="#hero" className="hover:text-purple-700 transition-colors">Beranda</a>
            <a href="#pendahuluan" className="hover:text-purple-700 transition-colors">Pendahuluan</a>
            <a href="#swot" className="hover:text-purple-700 transition-colors">SWOT</a>
            <a href="#kesimpulan" className="hover:text-purple-700 transition-colors">Kesimpulan</a>
            <a href="#quiz" className="hover:text-purple-700 transition-colors">Quiz</a>
            <a href="#about-us" className="hover:text-purple-700 transition-colors">About Us</a>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-100 border border-purple-200 px-3 py-1 text-xs font-bold text-purple-800">
              Kelompok 1 • PPKN
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-amber-200/60 pt-6 text-center text-xs text-slate-400">
          &copy; 2026 Kilas Bangsa. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
