import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t-2 border-slate-900 bg-[#fbf9ed] py-12 text-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand with Mascot Logo */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border-2 border-slate-900 p-1 shadow-[2px_2px_0px_0px_#0f172a] overflow-hidden">
              <img src="/logo.png" alt="Kilas Bangsa Mascot Logo" className="w-full h-full object-contain" />
            </span>
            <div>
              <span className="font-black text-slate-900 text-base">KILAS BANGSA</span>
              <p className="text-xs font-semibold text-slate-600">Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia</p>
            </div>
          </div>

          {/* Nav Links in Neo-Brutalism */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black uppercase tracking-wider">
            <a href="#hero" className="hover:text-purple-700 transition-colors">Beranda</a>
            <a href="#pendahuluan" className="hover:text-purple-700 transition-colors">Pendahuluan</a>
            <a href="#swot" className="hover:text-purple-700 transition-colors">SWOT</a>
            <a href="#kesimpulan" className="hover:text-purple-700 transition-colors">Kesimpulan</a>
            <a href="#quiz" className="hover:text-purple-700 transition-colors">Quiz</a>
            <a href="#about-us" className="hover:text-purple-700 transition-colors">About Us</a>
            <a href="#komentar" className="hover:text-purple-700 transition-colors">Komentar</a>
          </div>

          {/* Project Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-xl border-2 border-slate-900 bg-[#fef9c3] px-3.5 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              Kelompok 1 • PPKN 2026
            </span>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t-2 border-slate-900 pt-6 text-center text-xs font-bold text-slate-600">
          &copy; 2026 Kilas Bangsa. Seluruh hak cipta dilindungi. Dibuat dengan gaya Neo-Brutalism untuk Indonesia Emas 2045.
        </div>
      </div>
    </footer>
  )
}
