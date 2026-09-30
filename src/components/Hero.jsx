import { useEffect, useRef, useState } from 'react'
import TechText from './TechText'
import FolderFloat from './FolderFloat'

export default function Hero() {
  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeScreenTab, setActiveScreenTab] = useState('Beranda')

  const screenNavLinks = ['Beranda', 'Pendahuluan', 'SWOT', 'Kesimpulan', 'Quiz', 'About Us']

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting)
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px',
      }
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animations = Array.from(hero.querySelectorAll('[data-hero-enter]')).map((element, index) => {
      const fromLeft = element.dataset.heroEnter === 'left'
      const opacity = getComputedStyle(element).opacity
      const animation = element.animate(
        [
          {
            translate: fromLeft ? '-96px 0px' : '0px -36px',
            opacity: 0,
          },
          {
            translate: '0px 0px',
            opacity,
          },
        ],
        {
          duration: fromLeft ? 1300 : 1100,
          delay: fromLeft ? 0 : Math.min(index * 80, 640),
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both',
        }
      )
      animation.onfinish = () => animation.cancel()
      return animation
    })

    return () => animations.forEach((animation) => animation.cancel())
  }, [heroVisible])

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative min-h-screen bg-grid-paper pt-24 pb-20 overflow-hidden flex flex-col items-center justify-center selection:bg-purple-200 selection:text-purple-900 transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* =========================================================================
          TOP BADGES (Inspired by 'Case', 'Design', 'Multi-page website' in image_0.png)
         ========================================================================= */}
      <div data-hero-enter="top" className="z-10 mb-8 flex flex-wrap items-center justify-center gap-3 px-4" style={{ zoom: 0.8 }}>
        {/* Badge 1: Case (Purple with solid border & block shadow) */}
        <div className="border-2 border-slate-900 bg-purple-600 text-white shadow-[3px_3px_0px_0px_#0f172a] px-6 py-2 rounded-xl font-black text-sm tracking-wide transform -rotate-1 hover:rotate-0 transition-transform">
          PPKN Case
        </div>

        {/* Badge 2: Design (Lime Green with solid border & block shadow) */}
        <div className="border-2 border-slate-900 bg-[#bef264] text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] px-7 py-2 rounded-xl font-black text-sm tracking-wide transform rotate-1 hover:rotate-0 transition-transform">
          Analisis Strategis
        </div>

        {/* Badge 3: Multi-page website (Yellow with solid border & block shadow) */}
        <div className="border-2 border-slate-900 bg-[#fde047] text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] px-8 py-2 rounded-xl font-black text-sm tracking-wide transform -rotate-1 hover:rotate-0 transition-transform">
          Kilas Bangsa Interactive
        </div>
      </div>

      {/* =========================================================================
          HERO MAIN STAGE (Antigravity Floating Laptop & Indonesian 3D Orbit Elements)
         ========================================================================= */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* -----------------------------------------------------------------------
            PLAYFUL PASTEL FLOATING DOODLES & ICONS (Directly matching image_0.png)
           ----------------------------------------------------------------------- */}

        {/* 1. Pastel Periwinkle 4-Point Star Sparkle (Top-Left) */}
        <div data-hero-enter="top" className="pointer-events-none absolute -top-8 left-4 sm:left-12 z-20 animate-float-1">
          <svg className="h-10 w-10 sm:h-14 sm:w-14 text-[#c4b5fd] drop-shadow-xs" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 2C24 14 14 24 2 24C14 24 24 34 24 46C24 34 34 24 46 24C34 24 24 14 24 2Z" />
          </svg>
        </div>

        {/* 2. Pastel Lime-Green 6-Petal Flower (Mid-Left) */}
        <div data-hero-enter="top" className="pointer-events-none absolute top-1/4 -left-6 sm:-left-12 z-20 animate-float-2">
          <svg className="h-16 w-16 sm:h-22 sm:w-22 drop-shadow-xs transform -rotate-12" viewBox="0 0 100 100" fill="none">
            {/* 6 Rounded Flower Petals */}
            <circle cx="50" cy="22" r="16" fill="#bef264" />
            <circle cx="74" cy="36" r="16" fill="#bef264" />
            <circle cx="74" cy="64" r="16" fill="#bef264" />
            <circle cx="50" cy="78" r="16" fill="#bef264" />
            <circle cx="26" cy="64" r="16" fill="#bef264" />
            <circle cx="26" cy="36" r="16" fill="#bef264" />
            {/* Center Circle */}
            <circle cx="50" cy="50" r="15" fill="#fde047" />
            <circle cx="50" cy="50" r="8" fill="#fef08a" />
          </svg>
        </div>

        {/* 3. Cute Stylized Pastel 3D Tower / Lighthouse (Near Yellow Sparkle) */}
        <div data-hero-enter="top" className="pointer-events-none absolute top-1/3 mt-12 right-4 sm:right-8 z-20 animate-float-3">
          <svg className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md" viewBox="0 0 80 80" fill="none">
            {/* Soft Purple Round Base Platform */}
            <ellipse cx="40" cy="66" rx="28" ry="10" fill="#c7d2fe" />
            <ellipse cx="40" cy="64" rx="24" ry="8" fill="#e0e7ff" />
            {/* Tower Body */}
            <path d="M28 62L34 32H46L52 62Z" fill="#f87171" />
            <path d="M30 52L32 42H48L50 52Z" fill="#ffffff" />
            {/* Balcony Railing */}
            <rect x="30" y="29" width="20" height="4" rx="2" fill="#818cf8" />
            {/* Lantern Room */}
            <rect x="33" y="21" width="14" height="8" rx="2" fill="#fef08a" />
            {/* Roof Dome */}
            <path d="M32 21C32 15 48 15 48 21Z" fill="#ef4444" />
            <circle cx="40" cy="13" r="2.5" fill="#f59e0b" />
          </svg>
        </div>

        {/* 4. Pastel Sunburst / Sparkle Lines Doodle (Top-Right) */}
        <div data-hero-enter="top" className="pointer-events-none absolute -top-8 right-6 sm:right-16 z-20 animate-icon-slow">
          <svg className="h-12 w-12 sm:h-16 sm:w-16 text-[#c4b5fd]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="32" y1="6" x2="32" y2="18" />
            <line x1="32" y1="46" x2="32" y2="58" />
            <line x1="6" y1="32" x2="18" y2="32" />
            <line x1="46" y1="32" x2="58" y2="32" />
            <line x1="14" y1="14" x2="23" y2="23" />
            <line x1="41" y1="41" x2="50" y2="50" />
            <line x1="14" y1="50" x2="23" y2="41" />
            <line x1="41" y1="23" x2="50" y2="14" />
          </svg>
        </div>

        {/* Element 5 replacement: Pastel Plus / Cross Doodle (Bottom Left of Laptop) */}
        <div data-hero-enter="top" className="pointer-events-none absolute bottom-20 -left-2 sm:left-6 z-20 animate-float-2 opacity-90">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <rect x="20" y="4" width="12" height="44" rx="6" fill="#bef264" />
            <rect x="4" y="20" width="44" height="12" rx="6" fill="#bef264" />
          </svg>
        </div>

        {/* Element 6 replacement: Cute Pastel Rocket (Bottom Right of Laptop) */}
        <div data-hero-enter="top" className="pointer-events-none absolute bottom-16 -right-2 sm:right-6 z-20 animate-float-3 opacity-90">
          <svg width="52" height="62" viewBox="0 0 52 62" fill="none">
            {/* Rocket body */}
            <rect x="16" y="18" width="20" height="28" rx="6" fill="#f87171" />
            {/* Nose cone */}
            <ellipse cx="26" cy="16" rx="10" ry="13" fill="#38bdf8" />
            {/* Left fin */}
            <path d="M16 42 L6 56 L18 50 Z" fill="#60a5fa" />
            {/* Right fin */}
            <path d="M36 42 L46 56 L34 50 Z" fill="#60a5fa" />
            {/* Flame */}
            <ellipse cx="26" cy="49" rx="5" ry="7" fill="#fde047" opacity="0.85" />
            {/* Window */}
            <circle cx="26" cy="30" r="5" fill="white" opacity="0.8" />
          </svg>
        </div>

        {/* Small Pastel Doodles (replacing old star/rocket/flower icons) */}
        {/* Doodle Arrow */}
        <div data-hero-enter="top" className="pointer-events-none absolute top-10 left-1/4 animate-icon-drift opacity-85">
          <svg width="44" height="36" viewBox="0 0 44 36" fill="none">
            <path d="M4 28 Q14 4 36 12" stroke="#a78bfa" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" fill="none" />
            <path d="M28 6 L38 14 L26 16" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Pink 8-petal flower */}
        <div data-hero-enter="top" className="pointer-events-none absolute top-6 right-1/4 animate-icon-slow opacity-85">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <ellipse cx="19" cy="10" rx="4.5" ry="7" fill="#fda4af" />
            <ellipse cx="19" cy="28" rx="4.5" ry="7" fill="#fda4af" />
            <ellipse cx="10" cy="19" rx="7" ry="4.5" fill="#fda4af" />
            <ellipse cx="28" cy="19" rx="7" ry="4.5" fill="#fda4af" />
            <ellipse cx="12.5" cy="12.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(45 12.5 12.5)" />
            <ellipse cx="25.5" cy="12.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(-45 25.5 12.5)" />
            <ellipse cx="12.5" cy="25.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(-45 12.5 25.5)" />
            <ellipse cx="25.5" cy="25.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(45 25.5 25.5)" />
            <circle cx="19" cy="19" r="5.5" fill="#fb7185" />
          </svg>
        </div>

        {/* Soft cloud doodle */}
        <div data-hero-enter="top" className="pointer-events-none absolute bottom-10 left-1/4 animate-icon-drift opacity-75">
          <svg width="52" height="34" viewBox="0 0 52 34" fill="none">
            <circle cx="18" cy="22" r="10" fill="#e0e7ff" />
            <circle cx="32" cy="22" r="10" fill="#e0e7ff" />
            <circle cx="25" cy="16" r="12" fill="#e0e7ff" />
            <rect x="8" y="22" width="36" height="10" rx="5" fill="#e0e7ff" />
          </svg>
        </div>

        {/* Yellow diamond sparkle */}
        <div data-hero-enter="top" className="pointer-events-none absolute top-1/3 right-6 animate-icon-slow opacity-80">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z" fill="#fde047" />
          </svg>
        </div>

        {/* Cyan wavy loop doodle */}
        <div data-hero-enter="top" className="pointer-events-none absolute bottom-14 right-1/4 animate-icon-drift opacity-75">
          <svg width="46" height="28" viewBox="0 0 46 28" fill="none">
            <path d="M4 20 Q10 4 18 14 Q26 24 34 12 Q40 4 44 14" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* -----------------------------------------------------------------------
            THE CENTERPIECE: FLOATING ANTIGRAVITY LAPTOP
           ----------------------------------------------------------------------- */}
        <div data-hero-enter="left" className="relative mx-auto max-w-4xl animate-antigravity pt-4" style={{ zoom: 0.8 }}>
          
          {/* Antigravity Glow & Shadow underneath */}
          <div className="absolute -bottom-8 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-slate-900/15 blur-2xl"></div>

          {/* Laptop Outer Bezel & Body */}
          <div className="relative rounded-3xl bg-slate-900 p-3 sm:p-4 shadow-[10px_10px_0px_0px_#0f172a] border-2 border-slate-900">
            
            {/* Webcam / Notch Area */}
            <div className="absolute top-[6px] left-1/2 flex -translate-x-1/2 items-center gap-1.5 z-30">
              <div className="h-2 w-2 rounded-full bg-slate-700 ring-1 ring-slate-600"></div>
              <div className="h-1 w-1 rounded-full bg-[#bef264]"></div>
            </div>

            {/* LAPTOP SCREEN BEZEL */}
            <div className="relative overflow-hidden rounded-2xl bg-[#fefdf8] border-2 border-slate-900">
              
              {/* Screen Top Bar / Window Header */}
              <div className="flex h-9 items-center justify-between border-b-2 border-slate-900 bg-[#faf6e8] px-4">
                {/* Window Dots (Neo-brutalist style) */}
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400 border border-slate-900"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400 border border-slate-900"></div>
                  <div className="h-3 w-3 rounded-full bg-[#bef264] border border-slate-900"></div>
                </div>

                {/* Minimal Header Navigation Bar on Laptop Screen */}
                <div className="hidden sm:flex items-center gap-2 md:gap-4 overflow-x-auto text-[11px] font-bold text-slate-600">
                  {screenNavLinks.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveScreenTab(item)}
                      className={`transition-all px-2 py-0.5 rounded-full ${
                        activeScreenTab === item
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'hover:text-purple-700 hover:bg-amber-100/60'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Indonesian Flag Pill in Screen Header */}
                <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 border border-slate-200 shadow-2xs">
                  <div className="h-2.5 w-4 overflow-hidden rounded-xs border border-slate-300">
                    <div className="h-1/2 bg-red-600"></div>
                    <div className="h-1/2 bg-white"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">ID</span>
                </div>
              </div>

              {/* SCREEN MAIN BODY (Website Content Redesign) */}
              <div
                className="relative px-6 py-8 sm:px-12 sm:py-12 text-center"
                style={{
                  backgroundColor: '#fffdf4',
                  backgroundImage: [
                    'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 180 180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.12%22/%3E%3C/svg%3E")',
                    'radial-gradient(ellipse at top left, rgba(196, 181, 253, 0.2), transparent 36%)',
                    'radial-gradient(ellipse at top right, rgba(253, 224, 71, 0.17), transparent 36%)',
                    'radial-gradient(ellipse at bottom left, rgba(253, 224, 71, 0.14), transparent 38%)',
                    'radial-gradient(ellipse at bottom right, rgba(196, 181, 253, 0.18), transparent 38%)',
                  ].join(', '),
                  backgroundBlendMode: 'soft-light, normal, normal, normal, normal',
                }}
              >
                
                {/* Decorative Doodles on Screen (like arrows & heart in image_0.png) */}
                <div className="pointer-events-none absolute top-6 left-8 text-purple-400 hidden sm:block">
                  {/* Curved hand-drawn style arrow */}
                  <svg className="h-12 w-12 transform -rotate-12" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M6 36C14 20 28 14 42 18M42 18L34 14M42 18L38 26"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="pointer-events-none absolute top-10 right-10 text-rose-400 hidden sm:block">
                  {/* Cute doodle heart */}
                  <svg className="h-7 w-7 transform rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                {/* HERO TITLE: Single Interactive <TechText /> Component from React Bits */}
                <h1 className="sr-only">KILAS BANGSA</h1>
                <div className="mx-auto my-2 w-full max-w-5xl flex items-center justify-center">
                  <div className="relative w-full h-24 sm:h-32 md:h-40 lg:h-48 px-4">
                    <TechText
                      text="KILAS BANGSA"
                      fontWeight={900}
                      fontSize={110}
                      letterSpacing={-0.03}
                      color="#0f172a"
                      accentColor="#7c3aed"
                      reveal="letter"
                      dashLength={4}
                      dashGap={2}
                      specks={16}
                      draggable={true}
                      sweep={true}
                      speed={1}
                    />
                  </div>
                </div>

                {/* SUBTITLE — Neo-Brutalist text box */}
                <div className="mt-1 flex justify-center">
                  <div className="inline-block rounded-[10px] border-[2.5px] border-[#11172E] bg-[#FAF8EC] px-5 py-2 shadow-[4px_4px_0px_0px_#11172E]">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 tracking-tight">
                      Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia.
                    </p>
                  </div>
                </div>

                {/* -----------------------------------------------------------------
                    KEY SECTIONS: 4 Interactive <FolderFloat /> Components from React Bits
                    (Pendahuluan, SWOT, Kesimpulan, Quiz) with physics and direct section links
                   ----------------------------------------------------------------- */}
                <div className="mt-14 sm:mt-16 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-3 justify-items-center items-end">
                  
                  {/* Folder 1: Pendahuluan */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#pendahuluan"
                      label="Pendahuluan"
                      sublabel="Latar Belakang & Urgensi"
                      items={['Latar Belakang', 'Tujuan Kajian', 'Wawasan Nusantara']}
                      folderColor="#7c3aed"
                      frontColor="#8b5cf6"
                      paperColor="#FAF8EC"
                      itemColor="#FAF8EC"
                      itemTextColor="#4c1d95"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={8}
                      spread={88}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 2: SWOT */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#swot"
                      label="SWOT"
                      sublabel="4 Pilar Analisis"
                      items={['Strengths (Kekuatan)', 'Weaknesses (Kelemahan)', 'Opportunities (Peluang)', 'Threats (Ancaman)']}
                      folderColor="#84cc16"
                      frontColor="#bef264"
                      paperColor="#FAF8EC"
                      itemColor="#FAF8EC"
                      itemTextColor="#14532d"
                      labelColor="#0f172a"
                      width={144}
                      height={104}
                      radius={8}
                      spread={98}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 3: Kesimpulan */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#kesimpulan"
                      label="Kesimpulan"
                      sublabel="Rangkuman & Solusi"
                      items={['Sintesis Kebijakan', 'Rekomendasi Strategis', 'Aksi Pemuda 2045']}
                      folderColor="#f59e0b"
                      frontColor="#fde047"
                      paperColor="#FAF8EC"
                      itemColor="#FAF8EC"
                      itemTextColor="#78350f"
                      labelColor="#0f172a"
                      width={144}
                      height={104}
                      radius={8}
                      spread={88}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 4: Quiz */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#quiz"
                      label="Quiz"
                      sublabel="Uji Pemahaman"
                      items={['Mulai Uji Materi', 'Evaluasi Pemahaman', 'Skor & Prestasi']}
                      folderColor="#e11d48"
                      frontColor="#fb7185"
                      paperColor="#FAF8EC"
                      itemColor="#FAF8EC"
                      itemTextColor="#881337"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={8}
                      spread={88}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                </div>

                {/* -----------------------------------------------------------------
                    BUTTON & TEAM AVATAR (Kelompok 1)
                   ----------------------------------------------------------------- */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Prominent Green Button: "Explore →" */}
                  <a
                    href="#swot"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#bef264] px-8 py-3.5 text-base font-black text-slate-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    <span>Explore</span>
                    <span className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
                  </a>

                  {/* Team Avatar: Labeled "Kelompok 1" */}
                  <a
                    href="#about-us"
                    className="flex items-center gap-3 rounded-xl bg-white py-1.5 px-3.5 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#0f172a] transition-all"
                  >
                    <div className="flex -space-x-2 overflow-hidden">
                      {/* Avatar icon 1 */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 border border-slate-900 text-xs font-bold text-white shadow-xs">
                        🎓
                      </span>
                      {/* Avatar icon 2 */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 border border-slate-900 text-xs font-bold text-slate-950 shadow-xs">
                        🇮🇩
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-black text-slate-900 leading-tight">
                        Kelompok 1
                      </span>
                      <span className="block text-[10px] text-purple-700 font-black">
                        PPKN Project
                      </span>
                    </div>
                  </a>
                </div>

              </div>
            </div>

            {/* Laptop Base Hinge Bar & Opening Lip */}
            <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-slate-700"></div>
          </div>

          {/* Laptop Base Bottom Lip (Antigravity Perspective) */}
          <div className="mx-auto h-3 w-[92%] rounded-b-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg border-t border-slate-600/50"></div>
        </div>

      </div>

      {/* =========================================================================
          LOWER HIGHLIGHT BANNER (Neo-brutalist)
         ========================================================================= */}
      <div data-hero-enter="top" className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10" style={{ zoom: 0.8 }}>
        <div className="rounded-3xl bg-[#7c3aed] p-6 sm:p-8 text-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-slate-900">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-snug">
                Eksplorasi Analisis Strategis untuk Masa Depan Kebangsaan Indonesia
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-purple-100 font-medium">
                Memahami posisi strategis geopolitik dan ketahanan nasional dalam menyongsong Indonesia Emas 2045.
              </p>
            </div>

            {/* Hashtag Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-xl bg-white text-slate-950 px-3 py-1 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                #SWOTNasional
              </span>
              <span className="rounded-xl bg-[#bef264] text-slate-950 px-3 py-1 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                #IndonesiaEmas2045
              </span>
              <span className="rounded-xl bg-[#fde047] text-slate-950 px-3 py-1 text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                #WawasanNusantara
              </span>
            </div>
          </div>

          {/* 4 Feature Columns in Neo-Brutalism */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Strengths */}
            <div className="rounded-2xl bg-[#ecfccb] text-slate-950 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="text-xl mb-2">💪</div>
              <h4 className="text-sm font-black text-slate-950">Kekuatan (Strengths)</h4>
              <p className="mt-1 text-xs text-slate-800 font-medium leading-relaxed">
                Kekayaan biodiversitas, posisi silang maritim dunia, dan bonus demografi generasi muda produktif.
              </p>
            </div>

            {/* Card 2: Weaknesses */}
            <div className="rounded-2xl bg-[#fee2e2] text-slate-950 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="text-xl mb-2">⚖️</div>
              <h4 className="text-sm font-black text-slate-950">Kelemahan (Weaknesses)</h4>
              <p className="mt-1 text-xs text-slate-800 font-medium leading-relaxed">
                Kesenjangan infrastruktur konektivitas antarwilayah dan pemerataan akses pendidikan berkualitas.
              </p>
            </div>

            {/* Card 3: Opportunities */}
            <div className="rounded-2xl bg-[#fef9c3] text-slate-950 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="text-xl mb-2">🚀</div>
              <h4 className="text-sm font-black text-slate-950">Peluang (Opportunities)</h4>
              <p className="mt-1 text-xs text-slate-800 font-medium leading-relaxed">
                Hilirisasi industri sumber daya alam, transisi energi hijau terbarukan, dan kepemimpinan di ASEAN.
              </p>
            </div>

            {/* Card 4: Threats */}
            <div className="rounded-2xl bg-[#f3e8ff] text-slate-950 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="text-xl mb-2">🛡️</div>
              <h4 className="text-sm font-black text-slate-950">Ancaman (Threats)</h4>
              <p className="mt-1 text-xs text-slate-800 font-medium leading-relaxed">
                Rivalitas geopolitik kawasan, disrupsi keamanan siber, dan kerentanan dampak krisis iklim global.
              </p>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
