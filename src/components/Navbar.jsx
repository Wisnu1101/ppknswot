import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Pendahuluan', href: '#pendahuluan' },
    { label: 'SWOT', href: '#swot' },
    { label: 'Kesimpulan', href: '#kesimpulan' },
    { label: 'Quiz', href: '#quiz' },
    { label: 'About Us', href: '#about-us' },
  ]

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-amber-200/70 bg-[#fdfbf3]/85 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-sm ring-2 ring-red-200 transition-transform group-hover:scale-105">
              <span className="text-base font-black tracking-tighter">KB</span>
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors text-base sm:text-lg">
                KILAS BANGSA
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                SWOT Nasional Indonesia
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-amber-100/80 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right badge & CTA */}
          <div className="hidden sm:flex sm:items-center sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-100/80 px-3 py-1 text-xs font-bold text-purple-800 shadow-xs">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              Kelompok 1
            </span>
            <a
              href="#swot"
              className="inline-flex items-center justify-center rounded-full bg-[#84cc16] px-4 py-1.5 text-xs font-bold text-slate-900 shadow-sm transition-all hover:bg-[#65a30d] hover:shadow-md active:scale-95"
            >
              Explore -&gt;
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-bold text-purple-700 sm:hidden">
              Kel. 1
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-amber-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-b border-amber-200 bg-[#fdfbf3]/95 px-4 pt-2 pb-4 shadow-lg backdrop-blur-md md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-amber-100 hover:text-slate-950 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
              Kelompok 1 PPKN
            </span>
            <a
              href="#swot"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-[#84cc16] px-4 py-1.5 text-xs font-bold text-slate-900 hover:bg-[#65a30d]"
            >
              Explore -&gt;
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
