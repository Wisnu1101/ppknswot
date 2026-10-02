import { useEffect, useMemo, useRef, useState } from 'react'
import { members, memberAccents, getInitials } from '../data/members'

// ---------------------------------------------------------------------------
// Kartu anggota (neo-brutalist)
// - Default: hitam-putih (grayscale)
// - Sesudah diklik: berwarna penuh & ditandai sebagai aktif
// ---------------------------------------------------------------------------
function MemberCard({ member, accent, index, isActive, onActivate }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showFallback = imageFailed || !member.photo

  return (
    <button
      type="button"
      onClick={() => onActivate(member.id)}
      aria-pressed={isActive}
      aria-label={`Tampilkan foto ${member.name}`}
      className={`about-member group relative mr-5 w-[190px] shrink-0 cursor-pointer text-left transition-transform duration-500 ease-out sm:mr-6 sm:w-[220px] ${
        isActive ? '-translate-y-2' : 'hover:-translate-y-1'
      }`}
      style={{ rotate: `${index % 2 === 0 ? -1.6 : 1.6}deg` }}
    >
      {/* Wrapper animasi naik-turun (bob), di-stagger per kartu */}
      <div
        className="about-bob"
        style={{ animationDelay: `${(index % 7) * -0.45}s` }}
      >
        {/* Frame foto */}
        <div
          className={`relative rounded-2xl border-2 border-slate-900 bg-white p-2 transition-all duration-500 ${
            isActive
              ? 'shadow-[7px_7px_0px_0px_#0f172a]'
              : 'shadow-[4px_4px_0px_0px_#0f172a]'
          }`}
        >
          {/* Selotip dekorasi */}
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 z-20 h-5 w-14 -translate-x-1/2 rotate-2 rounded-[2px] border border-slate-400/60 bg-white/70 backdrop-blur-sm"
          />

          <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-slate-900 bg-slate-200">
            {showFallback ? (
              <div
                className={`flex h-full w-full items-center justify-center text-4xl font-black text-slate-900 ${accent.bg}`}
              >
                {member.initials ?? getInitials(member.name)}
              </div>
            ) : (
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                draggable="false"
                onError={() => setImageFailed(true)}
                style={{ objectPosition: member.id === 6 ? '60% center' : 'center' }}
                className={`h-full w-full object-cover transition-[filter,transform] duration-700 ease-out ${
                  isActive
                    ? 'scale-105 grayscale-0'
                    : 'scale-100 grayscale contrast-[1.05] group-hover:contrast-100'
                }`}
              />
            )}

            {/* Overlay gelap lembut saat belum aktif */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-slate-900/25 transition-opacity duration-500 ${
                isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-60'
              }`}
            />

            {/* Badge nomor */}
            <span className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-slate-900 bg-[#fbf9ed] text-[11px] font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              {String(member.id).padStart(2, '0')}
            </span>

            {/* Badge status aktif */}
            <span
              className={`absolute right-2 top-2 z-10 rounded-lg border-2 border-slate-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide transition-all duration-300 ${
                isActive
                  ? 'translate-y-0 bg-[#bef264] text-slate-950 opacity-100 shadow-[2px_2px_0px_0px_#0f172a]'
                  : '-translate-y-1 opacity-0'
              }`}
            >
              Aktif
            </span>
          </div>
        </div>

        {/* Nama & peran */}
        <div className="mt-2.5 px-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-sm border border-slate-900 transition-colors duration-300 ${
                isActive ? accent.solid : 'bg-slate-300'
              }`}
            />
            <p className="line-clamp-2 text-sm font-black leading-snug text-slate-900">
              {member.name}
            </p>
          </div>
          <p className={`mt-0.5 pl-[18px] text-[11px] font-bold ${accent.text}`}>
            {member.role}
          </p>
        </div>
      </div>
    </button>
  )
}

export default function AboutUs() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const trackRef = useRef(null)
  const sectionRef = useRef(null)

  // Duplikat daftar supaya marquee bisa berputar mulus (loop tak terbatas)
  const loopedMembers = useMemo(
    () => members.map((member, index) => ({ member, accent: memberAccents[index % memberAccents.length] })),
    []
  )

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.08 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Klik di luar kartu -> lepas semua pilihan (kembali hitam-putih)
  useEffect(() => {
    if (!activeId) return undefined
    const handlePointerDown = (event) => {
      if (trackRef.current && !trackRef.current.contains(event.target)) {
        setActiveId(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeId])

  const handleActivate = (id) => {
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="scroll-mt-16 relative overflow-hidden bg-[#fbf9ed] py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8" style={{ zoom: 0.85 }}>
        {/* ============================ Section Header ============================ */}
        <div
          className={`mb-12 sm:mb-14 transition-all duration-700 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-purple-200 px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-900" />
              About Us
            </span>
            <span className="inline-flex items-center rounded-xl border-2 border-slate-900 bg-[#bef264] px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              Kelompok 1 • PPKN 2026
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tentang Kami
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Kenali tim di balik <span className="font-bold text-slate-700">Kilas Bangsa</span> —
            sekelompok pelajar yang mengemas analisis SWOT Indonesia Emas 2045 menjadi pengalaman belajar
            yang interaktif dan menyenangkan.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* ============================ Deskripsi Proyek ============================ */}
        <div
          className={`relative mb-14 rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_#0f172a] transition-all duration-700 ease-out sm:p-8 ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: sectionVisible ? '120ms' : '0ms' }}
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-lg font-black text-slate-900 sm:text-xl">
                Siapa Kami?
              </h3>
              <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                Website ini adalah hasil kolaborasi <span className="font-black">Kelompok 1</span> dalam
                mata pelajaran PPKN. Kami mengangkat tema <span className="font-black">Peta Kekuatan,
                Kelemahan, Peluang, dan Ancaman Indonesia</span> sebagai wujud kepedulian generasi muda
                terhadap ketahanan nasional. Melalui analisis SWOT berbasis nilai Pancasila dan Wawasan
                Nusantara, kami berharap dapat menumbuhkan rasa nasionalisme serta mengajak teman-teman
                semua untuk ikut serta menyongsong <span className="font-black">Indonesia Emas 2045</span>.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <div className="rounded-xl border-2 border-slate-900 bg-[#f3e8ff] p-3 shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="block text-2xl font-black text-purple-700">7</span>
                <span className="text-xs font-bold text-slate-700">Anggota Kelompok</span>
              </div>
              <div className="rounded-xl border-2 border-slate-900 bg-[#ecfccb] p-3 shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="block text-2xl font-black text-lime-700">1</span>
                <span className="text-xs font-bold text-slate-700">Tujuan Bersama</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================ Marquee Foto Anggota ============================ */}
        <div
          className={`transition-all duration-700 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: sectionVisible ? '240ms' : '0ms' }}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-black text-slate-900 sm:text-xl">Tim Kami</h3>
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-[#fef9c3] px-3 py-1 text-[11px] font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span aria-hidden="true">👆</span>
              Klik foto untuk melihat versi berwarna
            </span>
          </div>
        </div>

        {/* Area marquee dengan fade di kedua sisi */}
        <div className="about-marquee relative overflow-hidden py-8">
          <div
            ref={trackRef}
            className={`about-marquee-track flex w-max ${activeId ? 'is-paused' : ''}`}
          >
            {[0, 1].map((copy) => (
              <div className="flex shrink-0" key={copy} inert={copy === 1}>
                {loopedMembers.map(({ member, accent }, index) => (
                  <MemberCard
                    key={`${copy}-${member.id}`}
                    member={member}
                    accent={accent}
                    index={index}
                    isActive={activeId === member.id}
                    onActivate={handleActivate}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
