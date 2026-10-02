import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Cursor({ parentRef, label, visible = false, attachToParent = true }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const parent = attachToParent ? parentRef?.current : null
    if (!parent || !visible) {
      setIsVisible(false)
      return undefined
    }

    const handlePointerMove = (event) => {
      setPosition({
        x: event.clientX + 18,
        y: event.clientY + 18,
      })
      setIsVisible(true)
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
    }

    parent.addEventListener('pointermove', handlePointerMove)
    parent.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove)
      parent.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [attachToParent, parentRef, visible])

  if (!visible) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.72 }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 24,
            mass: 0.7,
            duration: reduceMotion ? 0 : undefined,
          }}
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{
            x: position.x,
            y: position.y,
            translateX: '-12%',
            translateY: '-12%',
          }}
        >
          <div className="rounded-xl border-2 border-slate-900 bg-[#fef9c3] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]">
            {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
