import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50 pt-32 pb-16 dark:border-white/10 dark:bg-navy-900/60 sm:pt-40 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-volt-500/15 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="lead mt-5 max-w-2xl">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </header>
  )
}
