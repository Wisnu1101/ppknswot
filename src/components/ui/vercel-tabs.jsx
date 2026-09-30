import { useLayoutEffect, useRef, useState } from 'react'

export const cn = (...classes) => classes.filter(Boolean).join(' ')

export function Tabs({ tabs, activeTab, onTabChange, className = '', ...props }) {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(activeTab ?? tabs[0]?.id)
  const [hoveredTab, setHoveredTab] = useState(null)
  const [hoverStyle, setHoverStyle] = useState({ left: '0px', width: '0px' })
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' })
  const tabRefs = useRef(new Map())
  const selectedTab = activeTab ?? uncontrolledActiveTab ?? tabs[0]?.id

  useLayoutEffect(() => {
    const measureActiveTab = () => {
      const element = tabRefs.current.get(selectedTab)
      if (!element) return
      setActiveStyle({ left: `${element.offsetLeft}px`, width: `${element.offsetWidth}px` })
    }

    measureActiveTab()
    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(measureActiveTab)
    tabRefs.current.forEach((element) => resizeObserver?.observe(element))
    window.addEventListener('resize', measureActiveTab)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measureActiveTab)
    }
  }, [selectedTab, tabs])

  useLayoutEffect(() => {
    const element = tabRefs.current.get(hoveredTab)
    if (!element) return
    setHoverStyle({ left: `${element.offsetLeft}px`, width: `${element.offsetWidth}px` })
  }, [hoveredTab, tabs])

  return (
    <div className={cn('relative', className)} {...props}>
      <div className="relative">
        {/* Neo-brutalist hover marker */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-0 h-8 -translate-y-1/2 rounded-lg bg-amber-100/90 border border-slate-900/20 transition-all duration-300 ease-in-out"
          style={{ ...hoverStyle, opacity: hoveredTab ? 1 : 0 }}
        />
        {/* Neo-brutalist active underline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 z-10 h-[3px] bg-slate-900 transition-all duration-300 ease-in-out"
          style={activeStyle}
        />
        <div className="relative z-20 flex h-11 items-center gap-1" role="tablist" aria-label="Navigasi halaman">
          {tabs.map((tab) => {
            const isActive = tab.id === selectedTab
            return (
              <a
                key={tab.id}
                ref={(element) => {
                  if (element) tabRefs.current.set(tab.id, element)
                  else tabRefs.current.delete(tab.id)
                }}
                href={`#${tab.id}`}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => {
                  setUncontrolledActiveTab(tab.id)
                  onTabChange?.(tab.id)
                }}
                className={cn(
                  'relative inline-flex h-8 items-center justify-center rounded-lg px-3.5 text-xs font-black uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900',
                  isActive
                    ? 'text-slate-950 font-black'
                    : 'text-slate-600 hover:text-slate-950 font-extrabold'
                )}
              >
                {tab.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}