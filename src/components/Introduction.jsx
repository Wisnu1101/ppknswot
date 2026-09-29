import { useState, useEffect, useRef } from 'react'

const cards = [
  {
    num: '01',
    title: 'Latar Belakang',
    body: 'Indonesia memiliki kekayaan budaya, sumber daya alam, dan potensi SDM yang melimpah. Di era digital dan globalisasi, potensi ini menghadirkan peluang sekaligus tantangan nyata bagi keutuhan bangsa. Platform website interaktif ini hadir sebagai sarana edukasi untuk mengkaji posisi Indonesia melalui analisis SWOT (Kekuatan, Kelemahan, Peluang, dan Tantangan) berbasis nilai Pancasila guna menguatkan rasa nasionalisme generasi muda.',
    accent: 'purple',   // will map to website purple palette
  },
  {
    num: '02',
    title: 'Tujuan',
    body: null, // uses bullet list
    bullets: [
      'Menganalisis potensi dan tantangan bangsa Indonesia (analisis SWOT) di kancah global.',
      'Menyediakan media edukasi digital yang interaktif dan mudah diakses.',
      'Menumbuhkan jiwa nasionalisme serta mempromosikan keunggulan bangsa di era modern.',
    ],
    accent: 'lime',
  },
  {
    num: '03',
    title: 'Wawasan Nusantara',
    body: 'Wawasan Nusantara adalah cara pandang bangsa Indonesia terhadap keberagaman dan wilayahnya sebagai satu kesatuan yang utuh. Konsep ini menjadi fondasi utama dalam website kami untuk memandang setiap kekuatan dan peluang bangsa dalam bingkai menjaga keutuhan NKRI di tengah persaingan dunia.',
    accent: 'amber',
  },
]

// Accent color mapping matching website palette
const accentStyles = {
  purple: {
    card: 'bg-purple-50/80 border-purple-200/60 hover:border-purple-300',
    cardActive: 'bg-purple-100/90 border-purple-300',
    num: 'text-purple-400',
    title: 'text-purple-900',
    arrow: 'bg-purple-600 text-white',
    arrowHover: 'bg-purple-700',
    dot: 'bg-purple-400',
  },
  lime: {
    card: 'bg-[#f0fdd4]/80 border-lime-200/60 hover:border-lime-300',
    cardActive: 'bg-[#e4fba8]/90 border-lime-300',
    num: 'text-lime-500',
    title: 'text-lime-950',
    arrow: 'bg-[#84cc16] text-slate-900',
    arrowHover: 'bg-[#65a30d]',
    dot: 'bg-lime-400',
  },
  amber: {
    card: 'bg-amber-50/80 border-amber-200/60 hover:border-amber-300',
    cardActive: 'bg-amber-100/90 border-amber-300',
    num: 'text-amber-400',
    title: 'text-amber-950',
    arrow: 'bg-amber-500 text-white',
    arrowHover: 'bg-amber-600',
    dot: 'bg-amber-400',
  },
}

// Arrow Icon SVG component
function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

// Individual Card Component with scroll-triggered animation
// Desktop-only staggered layouts and rotations
const cardTransforms = [
  'md:translate-y-0 md:-rotate-1 hover:md:-translate-y-2 hover:md:rotate-0',
  'md:-translate-y-10 md:rotate-1 hover:md:-translate-y-12 hover:md:rotate-0',
  'md:translate-y-0 md:rotate-0 hover:md:-translate-y-2 hover:md:rotate-0',
]

function IntroCard({ card, index }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const style = accentStyles[card.accent]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex flex-col rounded-3xl border-2 p-6 sm:p-7 lg:p-8
        shadow-sm transition-all duration-500 ease-out cursor-default
        ${isHovered ? style.cardActive : style.card}
        ${isHovered ? 'shadow-lg scale-[1.02] -translate-y-2' : 'shadow-sm translate-y-0'}
        ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}
        ${isVisible ? cardTransforms[index] : ''}
      `}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      {/* Header: Number + Arrow */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-3xl sm:text-4xl font-black tracking-tighter ${style.num}`}>
          {card.num}
        </span>
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-xl
            transition-all duration-300
            ${style.arrow}
            ${isHovered ? `${style.arrowHover} rotate-45 scale-110` : ''}
          `}
        >
          <ArrowIcon />
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-3 ${style.title}`}>
        {card.title}
      </h3>

      {/* Divider line */}
      <div className={`h-0.5 w-12 rounded-full mb-4 transition-all duration-500 ${style.dot} ${isHovered ? 'w-20' : 'w-12'}`} />

      {/* Body Content */}
      {card.bullets ? (
        <ul className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-slate-600 flex-1">
          {card.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 flex-1">
          {card.body}
        </p>
      )}
    </div>
  )
}

export default function Introduction() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="pendahuluan"
      ref={sectionRef}
      className="scroll-mt-16 relative overflow-hidden bg-[#fbf9ed] shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2 z-0 hidden w-14 xl:block">
        <svg className="absolute top-[9%] h-[430px] w-full overflow-visible opacity-75" viewBox="0 0 56 430" fill="none">
          <path d="M30 0C54 42 8 75 30 116S51 190 28 230S9 300 31 344S46 395 26 430" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />
          <g fill="#bef264" stroke="#a3e635" strokeWidth="1">
            <circle cx="28" cy="124" r="7" />
            <circle cx="40" cy="131" r="7" />
            <circle cx="40" cy="145" r="7" />
            <circle cx="28" cy="152" r="7" />
            <circle cx="16" cy="145" r="7" />
            <circle cx="16" cy="131" r="7" />
          </g>
          <circle cx="28" cy="138" r="5" fill="#fde047" />
          <path d="M35 262L38 273L49 276L38 279L35 290L32 279L21 276L32 273Z" fill="#fde047" />
          <path d="M22 348L24 355L31 357L24 359L22 366L20 359L13 357L20 355Z" fill="#c4b5fd" />
        </svg>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2 z-0 hidden w-14 xl:block">
        <svg className="absolute top-[13%] h-[430px] w-full overflow-visible opacity-75" viewBox="0 0 56 430" fill="none">
          <path d="M26 0C4 43 49 78 27 120S5 192 29 234S50 302 27 346S11 396 32 430" stroke="#bef264" strokeWidth="2" strokeDasharray="3 8" strokeLinecap="round" />
          <path d="M26 57L29 68L40 71L29 74L26 85L23 74L12 71L23 68Z" fill="#c4b5fd" />
          <g fill="#fda4af" stroke="#fb7185" strokeWidth="1">
            <circle cx="28" cy="291" r="7" />
            <circle cx="40" cy="298" r="7" />
            <circle cx="40" cy="312" r="7" />
            <circle cx="28" cy="319" r="7" />
            <circle cx="16" cy="312" r="7" />
            <circle cx="16" cy="298" r="7" />
          </g>
          <circle cx="28" cy="305" r="5" fill="#fde047" />
          <path d="M35 365L37 372L44 374L37 376L35 383L33 376L26 374L33 372Z" fill="#c4b5fd" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28" style={{ zoom: 0.8 }}>
        {/* Section Header */}
        <div
          className={`mb-14 sm:mb-16 transition-all duration-700 ease-out ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Top pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 border border-purple-200/80 px-4 py-1.5 text-xs font-bold text-purple-800 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              Pendahuluan
            </span>
            <span className="inline-flex items-center rounded-full bg-[#e8fccf] border border-lime-200/80 px-4 py-1.5 text-xs font-bold text-lime-900 shadow-xs">
              Latar Belakang & Urgensi
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Pendahuluan
          </h2>

          {/* Section Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed">
            Memahami latar belakang, tujuan, dan kerangka berpikir dalam mengkaji posisi strategis Indonesia melalui analisis SWOT berbasis nilai Pancasila dan Wawasan Nusantara.
          </p>

          {/* Decorative accent bar */}
          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 md:items-start md:pb-16">
          {cards.map((card, index) => (
            <IntroCard key={card.num} card={card} index={index} />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className={`mt-14 sm:mt-16 flex items-center justify-center gap-3 transition-all duration-700 delay-500 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-purple-300/60" />
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span className="h-2 w-2 rounded-full bg-[#bef264]" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-amber-300/60" />
        </div>
      </div>
    </section>
  )
}
