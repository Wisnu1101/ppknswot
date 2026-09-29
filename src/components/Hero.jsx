import { useState } from 'react'
import TechText from './TechText'
import FolderFloat from './FolderFloat'

export default function Hero() {
  const [activeScreenTab, setActiveScreenTab] = useState('Beranda')

  const screenNavLinks = ['Beranda', 'Pendahuluan', 'SWOT', 'Kesimpulan', 'Quiz', 'About Us']

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-grid-paper pt-24 pb-20 overflow-hidden flex flex-col items-center justify-center selection:bg-purple-200 selection:text-purple-900"
    >
      {/* =========================================================================
          TOP BADGES (Inspired by 'Case', 'Design', 'Multi-page website' in image_0.png)
         ========================================================================= */}
      <div className="z-10 mb-8 flex flex-wrap items-center justify-center gap-3 px-4">
        {/* Badge 1: Case (Purple with dashed border) */}
        <div className="pill-badge-dashed border-purple-400 bg-purple-600/90 text-white shadow-sm px-6 py-2 rounded-full font-bold text-sm tracking-wide transform -rotate-1 hover:rotate-0 transition-transform">
          PPKN Case
        </div>

        {/* Badge 2: Design (Lime Green with dashed border) */}
        <div className="pill-badge-dashed border-lime-500 bg-[#bef264] text-lime-950 shadow-sm px-7 py-2 rounded-full font-extrabold text-sm tracking-wide transform rotate-1 hover:rotate-0 transition-transform">
          Analisis Strategis
        </div>

        {/* Badge 3: Multi-page website (Yellow-Lime with dashed border) */}
        <div className="pill-badge-dashed border-amber-400 bg-[#fde047] text-amber-950 shadow-sm px-8 py-2 rounded-full font-extrabold text-sm tracking-wide transform -rotate-1 hover:rotate-0 transition-transform">
          Kilas Bangsa Interactive
        </div>
      </div>

      {/* =========================================================================
          HERO MAIN STAGE (Antigravity Floating Laptop & Indonesian 3D Orbit Elements)
         ========================================================================= */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* -----------------------------------------------------------------------
            FLOATING ELEMENTS AROUND LAPTOP (Indonesian & Antigravity 3D Elements)
           ----------------------------------------------------------------------- */}
        
        {/* Element 1: Bendera Merah Putih (Top Left) */}
        <div className="absolute -top-6 left-2 sm:left-6 z-20 animate-float-1 hidden sm:block">
          <div className="group relative flex items-center gap-2 rounded-2xl bg-white/90 p-2.5 shadow-xl backdrop-blur-md border border-amber-200/80 transition-transform hover:scale-110">
            <div className="relative h-10 w-14 overflow-hidden rounded-lg shadow-sm border border-slate-200">
              <div className="h-1/2 w-full bg-red-600"></div>
              <div className="h-1/2 w-full bg-white"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="pr-1 text-left">
              <span className="block text-[11px] font-black text-slate-800 leading-tight">Merah Putih</span>
              <span className="block text-[9px] font-semibold text-red-600">Identitas Bangsa</span>
            </div>
          </div>
        </div>

        {/* Element 2: Monas (Monumen Nasional) (Top Right) */}
        <div className="absolute -top-8 right-3 sm:right-10 z-20 animate-float-2 hidden sm:block">
          <div className="group flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 shadow-xl backdrop-blur-md border border-amber-200/80 hover:scale-110 transition-transform">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/90 text-amber-700 shadow-inner">
              {/* Stylized Monas Icon */}
              <svg viewBox="0 0 64 64" className="h-8 w-8 drop-shadow-sm" fill="none">
                <path d="M32 6L35 18H29L32 6Z" fill="#F59E0B" />
                <path d="M30 18H34L33 42H31L30 18Z" fill="#D97706" />
                <rect x="25" y="42" width="14" height="6" rx="1" fill="#92400E" />
                <rect x="20" y="48" width="24" height="4" rx="1" fill="#78350F" />
                <circle cx="32" cy="11" r="3" fill="#FDE047" className="animate-pulse" />
              </svg>
            </div>
            <div className="pr-1 text-left">
              <span className="block text-xs font-black text-slate-800">Monas</span>
              <span className="block text-[9px] font-semibold text-amber-600">Simbol Kedaulatan</span>
            </div>
          </div>
        </div>

        {/* Element 3: Wayang Mask (Traditional Culture) (Mid-Left) */}
        <div className="absolute top-1/3 -left-4 sm:-left-8 z-20 animate-float-3 hidden md:block">
          <div className="group flex items-center gap-2 rounded-2xl bg-purple-900 text-white p-2.5 shadow-2xl border border-purple-400/40 hover:scale-110 transition-transform">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-800 shadow-inner">
              {/* Stylized Wayang / Gunungan SVG */}
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber-400" fill="currentColor">
                <path d="M12 2L6 9C6 13 8 16 12 22C16 16 18 13 18 9L12 2ZM12 6.5C12.8 6.5 13.5 7.2 13.5 8C13.5 8.8 12.8 9.5 12 9.5C11.2 9.5 10.5 8.8 10.5 8C10.5 7.2 11.2 6.5 12 6.5ZM9 13C9.6 13 10 13.4 10 14C10 14.6 9.6 15 9 15C8.4 15 8 14.6 8 14C8 13.4 8.4 13 9 13ZM15 13C15.6 13 16 13.4 16 14C16 14.6 15.6 15 15 15C14.4 15 14 14.6 14 14C14 13.4 14.4 13 15 13Z" />
              </svg>
            </div>
            <div className="pr-2 text-left">
              <span className="block text-xs font-bold text-amber-300">Wayang Heritage</span>
              <span className="block text-[9px] text-purple-200">Kearifan Budaya</span>
            </div>
          </div>
        </div>

        {/* Element 4: Angklung & Nada Kebersamaan (Mid-Right) */}
        <div className="absolute top-1/3 -right-4 sm:-right-8 z-20 animate-float-1 hidden md:block">
          <div className="group flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 shadow-xl border border-amber-200 hover:scale-110 transition-transform">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 shadow-inner">
              {/* Stylized Bamboo Angklung SVG */}
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="3" width="3" height="18" rx="1.5" fill="#D97706" />
                <rect x="10.5" y="6" width="3" height="15" rx="1.5" fill="#B45309" />
                <rect x="17" y="9" width="3" height="12" rx="1.5" fill="#92400E" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="#78350F" strokeWidth="2" />
              </svg>
            </div>
            <div className="pr-2 text-left">
              <span className="block text-xs font-bold text-slate-800">Harmoni Angklung</span>
              <span className="block text-[9px] font-semibold text-amber-700">Persatuan Bangsa</span>
            </div>
          </div>
        </div>

        {/* Element 5: Garuda Pancasila Emblem (Bottom Left of Laptop) */}
        <div className="absolute bottom-16 -left-3 sm:left-4 z-20 animate-float-2 hidden sm:block">
          <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white p-2.5 shadow-xl border border-amber-300 hover:scale-105 transition-transform">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs">
              {/* Garuda Emblem representation */}
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M12 2L15 7H19L16 11L18 16L12 13L6 16L8 11L5 7H9L12 2Z" />
              </svg>
            </div>
            <div className="pr-1 text-left">
              <span className="block text-xs font-black">Garuda Pancasila</span>
              <span className="block text-[9px] text-amber-100 font-semibold">Bhinneka Tunggal Ika</span>
            </div>
          </div>
        </div>

        {/* Element 6: Archipelago Nusantara Map & Data Chart (Bottom Right of Laptop) */}
        <div className="absolute bottom-14 -right-2 sm:right-4 z-20 animate-float-3 hidden sm:block">
          <div className="flex items-center gap-2.5 rounded-2xl bg-slate-900 text-white p-2.5 shadow-2xl border border-purple-500/40 hover:scale-105 transition-transform">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/40 text-purple-300">
              {/* Archipelago map and trend icon */}
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div className="pr-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Kepulauan Nusantara</span>
                <span className="rounded bg-emerald-500/20 px-1 py-0.5 text-[8px] font-bold text-emerald-400">+17.508 Pulau</span>
              </div>
              <span className="block text-[9px] text-slate-400">Peluang Geopolitik Global</span>
            </div>
          </div>
        </div>

        {/* Small Antigravity Doodles (Stars, Spaceship, Cloud, Flower) */}
        <div className="pointer-events-none absolute top-12 left-1/4 text-amber-400 animate-icon-drift opacity-80">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
          </svg>
        </div>

        <div className="pointer-events-none absolute top-4 right-1/3 text-lime-500 animate-icon-slow opacity-80">
          {/* Cute Rocket / Spaceship */}
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/3 text-purple-400 animate-icon-drift opacity-70">
          {/* Flower / Star */}
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="6" r="2.5" />
            <circle cx="12" cy="18" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="12" r="2.5" />
          </svg>
        </div>

        {/* -----------------------------------------------------------------------
            THE CENTERPIECE: FLOATING ANTIGRAVITY LAPTOP
           ----------------------------------------------------------------------- */}
        <div className="relative mx-auto max-w-4xl animate-antigravity pt-4">
          
          {/* Antigravity Glow & Shadow underneath */}
          <div className="absolute -bottom-8 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-slate-900/15 blur-2xl"></div>

          {/* Laptop Outer Bezel & Body */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-800 to-slate-950 p-3 sm:p-4 shadow-[0_30px_70px_rgba(15,23,42,0.35)] ring-1 ring-white/20">
            
            {/* Webcam / Notch Area */}
            <div className="absolute top-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 z-30">
              <div className="h-2 w-2 rounded-full bg-slate-700 ring-1 ring-slate-600"></div>
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            {/* LAPTOP SCREEN BEZEL */}
            <div className="relative overflow-hidden rounded-2xl bg-[#fefdf8] border border-slate-200/90 shadow-inner">
              
              {/* Screen Top Bar / Window Header */}
              <div className="flex h-9 items-center justify-between border-b border-amber-200/70 bg-[#faf6e8] px-4">
                {/* Window Dots (macOS style) */}
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/90 shadow-xs"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/90 shadow-xs"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/90 shadow-xs"></div>
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
              <div className="relative px-6 py-8 sm:px-12 sm:py-12 text-center bg-gradient-to-b from-[#fefefc] to-[#fbf8ee]">
                
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
                <div className="mx-auto my-2 w-full max-w-2xl sm:max-w-3xl flex items-center justify-center">
                  <div className="relative w-full h-14 sm:h-20 md:h-24 lg:h-28">
                    <TechText
                      text="KILAS BANGSA"
                      fontWeight={900}
                      fontSize={130}
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

                {/* SUBTITLE */}
                <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base font-semibold text-slate-600 sm:font-medium">
                  Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia.
                </p>

                {/* -----------------------------------------------------------------
                    KEY SECTIONS: 4 Interactive <FolderFloat /> Components from React Bits
                    (Pendahuluan, SWOT, Kesimpulan, Quiz) with physics and direct section links
                   ----------------------------------------------------------------- */}
                <div className="mt-14 sm:mt-16 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-3 justify-items-center items-end">
                  
                  {/* Folder 1: Pendahuluan (Pastel Indigo/Sky) */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#pendahuluan"
                      label="Pendahuluan"
                      sublabel="Latar Belakang & Urgensi"
                      items={['Latar Belakang', 'Tujuan Kajian', 'Wawasan Nusantara']}
                      folderColor="#4f46e5"
                      frontColor="#6366f1"
                      paperColor="#e0e7ff"
                      itemColor="#ffffff"
                      itemTextColor="#312e81"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={12}
                      spread={88}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 2: SWOT (Pastel Royal Purple) */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#swot"
                      label="SWOT"
                      sublabel="4 Pilar Analisis"
                      items={['Strengths (Kekuatan)', 'Weaknesses (Kelemahan)', 'Opportunities (Peluang)', 'Threats (Ancaman)']}
                      folderColor="#9333ea"
                      frontColor="#a855f7"
                      paperColor="#f3e8ff"
                      itemColor="#ffffff"
                      itemTextColor="#581c87"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={12}
                      spread={98}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 3: Kesimpulan (Pastel Warm Amber/Coral) */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#kesimpulan"
                      label="Kesimpulan"
                      sublabel="Rangkuman & Solusi"
                      items={['Sintesis Kebijakan', 'Rekomendasi Strategis', 'Aksi Pemuda 2045']}
                      folderColor="#ea580c"
                      frontColor="#f97316"
                      paperColor="#ffedd5"
                      itemColor="#ffffff"
                      itemTextColor="#7c2d12"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={12}
                      spread={88}
                      lift={22}
                      trigger="hover"
                      physics={true}
                    />
                  </div>

                  {/* Folder 4: Quiz (Pastel Emerald/Mint) */}
                  <div className="flex flex-col items-center">
                    <FolderFloat
                      href="#quiz"
                      label="Quiz"
                      sublabel="Uji Pemahaman"
                      items={['Mulai Uji Materi', 'Evaluasi Pemahaman', 'Skor & Prestasi']}
                      folderColor="#059669"
                      frontColor="#10b981"
                      paperColor="#d1fae5"
                      itemColor="#ffffff"
                      itemTextColor="#064e3b"
                      labelColor="#ffffff"
                      width={144}
                      height={104}
                      radius={12}
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
                  {/* Prominent Green Button: "Explore ->" */}
                  <a
                    href="#swot"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#84cc16] px-8 py-3.5 text-base font-extrabold text-slate-900 shadow-md shadow-lime-500/30 transition-all hover:bg-[#65a30d] hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer ring-2 ring-lime-300"
                  >
                    <span>Explore</span>
                    <span className="font-mono text-lg font-black transition-transform group-hover:translate-x-1">-&gt;</span>
                  </a>

                  {/* Team Avatar: Labeled "Kelompok 1" */}
                  <a
                    href="#about-us"
                    className="flex items-center gap-3 rounded-full bg-white/90 py-1.5 px-3.5 shadow-sm border border-slate-200 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex -space-x-2 overflow-hidden">
                      {/* Avatar icon 1 */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 ring-2 ring-white text-xs font-bold text-white shadow-xs">
                        🎓
                      </span>
                      {/* Avatar icon 2 */}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white text-xs font-bold text-white shadow-xs">
                        🇮🇩
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-black text-slate-800 leading-tight">
                        Kelompok 1
                      </span>
                      <span className="block text-[10px] font-semibold text-purple-700">
                        Penyusun Materi PPKN
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
          LOWER HIGHLIGHT BANNER (Matching the Lower Purple Section in image_0.png)
         ========================================================================= */}
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#5b21b6] p-6 sm:p-8 text-white shadow-2xl border border-purple-400/40">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-purple-400/30">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-snug">
                Eksplorasi Analisis Strategis untuk Masa Depan Kebangsaan Indonesia
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-purple-200">
                Memahami posisi strategis geopolitik dan ketahanan nasional dalam menyongsong Indonesia Emas 2045.
              </p>
            </div>

            {/* Hashtag Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-500/50 px-3 py-1 text-xs font-bold text-purple-100 border border-purple-300/40">
                #SWOTNasional
              </span>
              <span className="rounded-full bg-lime-400 text-slate-950 px-3 py-1 text-xs font-black shadow-xs">
                #IndonesiaEmas2045
              </span>
              <span className="rounded-full bg-purple-500/50 px-3 py-1 text-xs font-bold text-purple-100 border border-purple-300/40">
                #WawasanNusantara
              </span>
            </div>
          </div>

          {/* 4 Feature Columns */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Strengths */}
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors">
              <div className="text-xl mb-2">💪</div>
              <h4 className="text-sm font-extrabold text-white">Kekuatan (Strengths)</h4>
              <p className="mt-1 text-xs text-purple-100 leading-relaxed">
                Kekayaan biodiversitas, posisi silang maritim dunia, dan bonus demografi generasi muda produktif.
              </p>
            </div>

            {/* Card 2: Weaknesses */}
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors">
              <div className="text-xl mb-2">⚖️</div>
              <h4 className="text-sm font-extrabold text-white">Kelemahan (Weaknesses)</h4>
              <p className="mt-1 text-xs text-purple-100 leading-relaxed">
                Kesenjangan infrastruktur konektivitas antarwilayah dan pemerataan akses pendidikan berkualitas.
              </p>
            </div>

            {/* Card 3: Opportunities */}
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors">
              <div className="text-xl mb-2">🚀</div>
              <h4 className="text-sm font-extrabold text-white">Peluang (Opportunities)</h4>
              <p className="mt-1 text-xs text-purple-100 leading-relaxed">
                Hilirisasi industri sumber daya alam, transisi energi hijau terbarukan, dan kepemimpinan di ASEAN.
              </p>
            </div>

            {/* Card 4: Threats */}
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/15 hover:bg-white/15 transition-colors">
              <div className="text-xl mb-2">🛡️</div>
              <h4 className="text-sm font-extrabold text-white">Ancaman (Threats)</h4>
              <p className="mt-1 text-xs text-purple-100 leading-relaxed">
                Rivalitas geopolitik kawasan, disrupsi keamanan siber, dan kerentanan dampak krisis iklim global.
              </p>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}
