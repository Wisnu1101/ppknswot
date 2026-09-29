import { useLayoutEffect, useRef, useState } from 'react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-md bg-purple-100/80 transition-all duration-300 ease-out"
          style={{ ...hoverStyle, opacity: hoveredTab ? 1 : 0 }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-purple-600 transition-all duration-300 ease-out"
          style={activeStyle}
        />
        <div className="relative flex h-11 items-center gap-1" role="tablist" aria-label="Navigasi halaman">
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
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onFocus={() => setHoveredTab(tab.id)}
                onBlur={() => setHoveredTab(null)}
                onClick={() => {
                  setUncontrolledActiveTab(tab.id)
                  onTabChange?.(tab.id)
                }}
                className={cn(
                  'relative z-10 inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400',
                  isActive ? 'text-purple-900' : 'text-slate-700 hover:text-slate-950'
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