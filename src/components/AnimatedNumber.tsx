import { animate, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({ value, format }: { value: number; format: (v: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) {
      el.textContent = format(value)
      return
    }
    const controls = animate(prev.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    })
    prev.current = value
    return () => controls.stop()
  }, [value, format, reduce])

  return <span ref={ref}>{format(value)}</span>
}
