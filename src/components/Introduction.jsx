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
      className="scroll-mt-16 relative overflow-hidden bg-grid-paper"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-200/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-200/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
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
