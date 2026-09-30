import React, { useEffect, useState } from 'react'
import { Tabs } from './ui/vercel-tabs'

const navItems = [
  { id: 'hero', label: 'Beranda' },
  { id: 'pendahuluan', label: 'Pendahuluan' },
  { id: 'swot', label: 'SWOT' },
  { id: 'kesimpulan', label: 'Kesimpulan' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'about-us', label: 'About Us' },
  { id: 'komentar', label: 'Komentar' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('hero')
  const isClickScrolling = React.useRef(false)
  const clickScrollTimeout = React.useRef(null)

  useEffect(() => {
    let frameId = 0

    const updateActiveSection = () => {
      if (isClickScrolling.current) return

      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.3
        let nextActiveTab = navItems[0].id

        navItems.forEach((item) => {
          const section = document.getElementById(item.id)
          if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
            nextActiveTab = item.id
          }
        })

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          nextActiveTab = navItems[navItems.length - 1].id
        }

        setActiveTab((current) => current === nextActiveTab ? current : nextActiveTab)
      })
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    updateActiveSection()

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current)
    }
  }, [])

  const handleTabClick = (id) => {
    setActiveTab(id)
    isClickScrolling.current = true
    if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current)
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b-2 border-slate-900 bg-[#fbf9ed] transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand with Mascot Logo */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center p-0.5 shadow-[2px_2px_0px_0px_#0f172a] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all overflow-hidden">
              <img src="/logo.png" alt="Kilas Bangsa Mascot Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tight text-slate-900 text-base sm:text-lg leading-none">
                KILAS BANGSA
              </span>
              <span className="text-[10px] font-black text-purple-700 tracking-wider uppercase mt-0.5">
                SWOT Nasional Indonesia
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <Tabs
            className="hidden md:flex"
            tabs={navItems}
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />

          {/* Right badge & CTA */}
          <div className="hidden sm:flex sm:items-center sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-[#bef264] px-3.5 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-900 animate-pulse"></span>
              Kelompok 1
            </span>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="inline-flex items-center rounded-lg border border-slate-900 bg-[#bef264] px-2 py-0.5 text-[11px] font-black text-slate-950 sm:hidden">
              Kel. 1
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 border-2 border-slate-900 bg-white text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-100 transition-all cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
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
        <div className="border-b-2 border-slate-900 bg-[#fbf9ed] px-4 pt-3 pb-5 shadow-[0_4px_0px_0px_#0f172a] md:hidden">
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
                aria-current={activeTab === item.id ? 'page' : undefined}
                className={`block rounded-xl border-2 border-slate-900 px-3.5 py-2 text-sm font-black transition-all ${
                  activeTab === item.id
                    ? 'bg-[#bef264] text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-white text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t-2 border-slate-900 flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 bg-purple-200 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#0f172a]">
              Kelompok 1 PPKN
            </span>
            <a
              href="#swot"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border-2 border-slate-900 bg-[#bef264] px-4 py-1.5 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              Explore →
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
