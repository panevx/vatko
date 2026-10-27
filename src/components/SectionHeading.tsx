import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, lead, center = true }: { eyebrow: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 mt-3">{title}</h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </Reveal>
  )
}
