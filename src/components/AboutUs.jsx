import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { members, memberAccents, getInitials } from '../data/members'
import { Cursor } from './ui/cursor'

const MEMBER_ROLE_LABELS = {
  3: 'Front-End (Conceptor)',
  5: 'Front-End (Detailing)',
  4: 'Front-End & Back-End',
}

function getMemberRoleLabel(member) {
  return MEMBER_ROLE_LABELS[member.id] ?? 'Pemateri'
}

function getLoopedTrackPosition(distance, groupWidth) {
  if (!groupWidth) return 0
  let loopDistance = distance % groupWidth
  if (loopDistance > 0) loopDistance -= groupWidth
  return -groupWidth + loopDistance
}

// ---------------------------------------------------------------------------
// Kartu anggota (neo-brutalist)
// - Default: hitam-putih (grayscale)
// - Hover: penuh warna, tanpa click untuk mengaktifkan
// ---------------------------------------------------------------------------
function MemberCard({ member, accent, index, isHovered, isTouch, onHoverStart, onHoverEnd, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showFallback = imageFailed || !member.photo

  // Di perangkat sentuh tidak ada event hover, jadi jobdesk dibuka lewat ketukan.
  const handleMouseEnter = () => {
    if (isTouch) return
    onHoverStart(member.id)
  }
  const handleMouseLeave = () => {
    if (isTouch) return
    onHoverEnd()
  }
  const handleFocus = () => {
    if (isTouch) return
    onHoverStart(member.id)
  }
  const handleBlur = () => {
    if (isTouch) return
    onHoverEnd()
  }
  const handleClick = () => {
    if (!isTouch) return
    onSelect(member.id)
  }

  return (
    <div
      className={`about-member group relative mr-5 w-[190px] shrink-0 cursor-pointer text-left transition-transform duration-500 ease-out sm:mr-6 sm:w-[220px] ${
        isHovered ? '-translate-y-2' : 'hover:-translate-y-1'
      }`}
      style={{ rotate: `${index % 2 === 0 ? -1.6 : 1.6}deg` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      tabIndex={0}
    >
      <div
        className="about-bob"
        style={{ animationDelay: `${(index % 7) * -0.45}s` }}
      >
        <div
          className={`relative rounded-2xl border-2 border-slate-900 bg-white p-2 transition-all duration-500 ${
            isHovered ? 'shadow-[7px_7px_0px_0px_#0f172a]' : 'shadow-[4px_4px_0px_0px_#0f172a]'
          }`}
        >
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
                className={`h-full w-full object-cover transition-[filter,transform,opacity] duration-700 ease-out ${
                  isHovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale contrast-[1.05] group-hover:contrast-100'
                }`}
              />
            )}

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-slate-900/25 transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100 group-hover:opacity-60'
              }`}
            />

            <span className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-slate-900 bg-[#fbf9ed] text-[11px] font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              {String(member.id).padStart(2, '0')}
            </span>

            {/* Jobdesk — khusus perangkat sentuh, muncul saat kartu diketuk */}
            {isTouch && (
              <span
                className={`absolute inset-x-2 bottom-2 z-10 rounded-lg border-2 border-slate-900 bg-[#fef9c3] px-2 py-1 text-center text-[10px] font-black uppercase tracking-[0.12em] text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] transition-all duration-300 ${
                  isHovered ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                }`}
              >
                {getMemberRoleLabel(member)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2.5 px-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-sm border border-slate-900 transition-colors duration-300 ${
                isHovered ? accent.solid : 'bg-slate-300'
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
    </div>
  )
}

export default function AboutUs() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [hoveredMemberId, setHoveredMemberId] = useState(null)
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const firstGroupRef = useRef(null)
  const sectionRef = useRef(null)
  const hoveredMemberIdRef = useRef(null)
  const distanceRef = useRef(0)
  const groupWidthRef = useRef(0)
  const cardStrideRef = useRef(0)
  const manualAnimationRef = useRef(null)
  const navigationQueueRef = useRef([])
  const reducedMotionRef = useRef(false)

  const hoveredMember = useMemo(
    () => members.find((member) => member.id === hoveredMemberId) ?? null,
    [hoveredMemberId]
  )

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

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateCursorState = () => {
      const canHover = hoverQuery.matches
      setCursorEnabled(canHover)
      setIsTouch(!canHover)
    }

    updateCursorState()
    hoverQuery.addEventListener?.('change', updateCursorState)

    return () => hoverQuery.removeEventListener?.('change', updateCursorState)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const firstGroup = firstGroupRef.current
    if (!track || !firstGroup) return undefined

    let frameId
    let previousTime
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const measureCarousel = () => {
      const cards = firstGroup.querySelectorAll('.about-member')
      // offsetWidth uses the same CSS-pixel coordinate space as offsetLeft and
      // translate3d, including when the About Us content is scaled with `zoom`.
      const groupWidth = firstGroup.offsetWidth
      if (!groupWidth) return

      const cardStride = cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : cards[0]?.offsetWidth ?? 0

      groupWidthRef.current = groupWidth
      cardStrideRef.current = cardStride
      track.style.transform = `translate3d(${getLoopedTrackPosition(distanceRef.current, groupWidth)}px, 0, 0)`
    }

    const updateMotionPreference = () => {
      reducedMotionRef.current = motionPreference.matches
    }

    const getManualPosition = (time) => {
      const animation = manualAnimationRef.current
      if (!animation) return distanceRef.current
      const progress = Math.min((time - animation.startTime) / animation.duration, 1)
      const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2
      return animation.from + (animation.to - animation.from) * easedProgress
    }

    const animate = (time) => {
      const elapsed = previousTime === undefined ? 0 : Math.min(time - previousTime, 50)
      previousTime = time

      const manualAnimation = manualAnimationRef.current
      if (manualAnimation) {
        distanceRef.current = getManualPosition(time)
        if (time - manualAnimation.startTime >= manualAnimation.duration) {
          distanceRef.current = manualAnimation.to
          manualAnimationRef.current = null
        }
      }

      if (!manualAnimationRef.current && navigationQueueRef.current.length > 0) {
        const direction = navigationQueueRef.current.shift()
        const from = distanceRef.current
        const to = from + (direction === 'right' ? -1 : 1) * cardStrideRef.current
        manualAnimationRef.current = {
          from,
          to,
          startTime: time,
          duration: 500,
        }
      } else if (!manualAnimationRef.current && !hoveredMemberIdRef.current && !reducedMotionRef.current) {
        distanceRef.current -= (groupWidthRef.current / 42000) * elapsed
      }

      track.style.transform = `translate3d(${getLoopedTrackPosition(distanceRef.current, groupWidthRef.current)}px, 0, 0)`
      frameId = window.requestAnimationFrame(animate)
    }

    measureCarousel()
    updateMotionPreference()
    const resizeObserver = new ResizeObserver(measureCarousel)
    resizeObserver.observe(firstGroup)
    motionPreference.addEventListener?.('change', updateMotionPreference)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      motionPreference.removeEventListener?.('change', updateMotionPreference)
    }
  }, [])

  const handleNavigation = (direction) => {
    const directionOffset = direction === 'right' ? -1 : 1
    if (reducedMotionRef.current) {
      distanceRef.current += directionOffset * cardStrideRef.current
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${getLoopedTrackPosition(distanceRef.current, groupWidthRef.current)}px, 0, 0)`
      }
      return
    }

    navigationQueueRef.current.push(direction)
  }

  const handleMemberHover = (id) => {
    hoveredMemberIdRef.current = id
    setHoveredMemberId(id)
  }

  const handleMemberLeave = () => {
    hoveredMemberIdRef.current = null
    setHoveredMemberId(null)
  }

  // Perangkat sentuh: ketuk kartu untuk buka/tutup jobdesk.
  const handleCardSelect = (id) => {
    const nextId = hoveredMemberIdRef.current === id ? null : id
    hoveredMemberIdRef.current = nextId
    setHoveredMemberId(nextId)
  }

  const dynamicCursorLabel = hoveredMember ? getMemberRoleLabel(hoveredMember) : 'Pemateri'

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="scroll-mt-16 relative overflow-hidden bg-[#fbf9ed] py-20 sm:py-24"
    >
      <Cursor
        parentRef={carouselRef}
        attachToParent
        label={dynamicCursorLabel}
        visible={Boolean(hoveredMember && cursorEnabled)}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8" style={{ zoom: 0.85 }}>
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

        <div
          className={`transition-all duration-700 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: sectionVisible ? '240ms' : '0ms' }}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-black text-slate-900 sm:text-xl">Tim Kami</h3>
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-[#fef9c3] px-3 py-1 text-[11px] font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span aria-hidden="true">{isTouch ? '👆' : '🖱️'}</span>
              {isTouch ? 'Ketuk foto untuk detail anggota' : 'Hover foto untuk detail anggota'}
            </span>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="about-marquee relative overflow-hidden py-8"
        >
          <div ref={trackRef} className="about-marquee-track flex w-max">
            {[0, 1, 2].map((copy) => (
              <div
                className="flex shrink-0"
                key={copy}
                ref={copy === 0 ? firstGroupRef : undefined}
              >
                {loopedMembers.map(({ member, accent }, index) => (
                  <MemberCard
                    key={`${copy}-${member.id}`}
                    member={member}
                    accent={accent}
                    index={index}
                    isHovered={hoveredMemberId === member.id}
                    isTouch={isTouch}
                    onHoverStart={handleMemberHover}
                    onHoverEnd={handleMemberLeave}
                    onSelect={handleCardSelect}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-[20px]">
            <button
              type="button"
              aria-label="Geser ke kiri"
              onClick={() => handleNavigation('left')}
              className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-900 bg-[#fde68a] text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] transition hover:-translate-y-1 hover:bg-[#facc15] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0f172a] sm:h-12 sm:w-12"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              aria-label="Geser ke kanan"
              onClick={() => handleNavigation('right')}
              className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-900 bg-[#d9f99d] text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] transition hover:-translate-y-1 hover:bg-[#bef264] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0f172a] sm:h-12 sm:w-12"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
