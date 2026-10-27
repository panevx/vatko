import type { ReactNode } from 'react'

export function PhoneFrame({ children, className = '', label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <figure
      aria-label={label}
      className={`relative mx-auto aspect-[9/19] w-full max-w-[290px] rounded-[2.75rem] bg-navy-950 p-2.5 shadow-[0_40px_80px_-20px_rgba(11,31,58,0.45)] ring-1 ring-white/15 ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-[#07162B] text-white">
        <div aria-hidden className="absolute top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-slate-300" aria-hidden>
          <span>9:41</span>
          <span className="flex gap-1">
            <span className="h-2 w-3 rounded-sm bg-slate-300" />
            <span className="h-2 w-4 rounded-sm bg-slate-300" />
          </span>
        </div>
        <div className="h-[calc(100%-1.75rem)] overflow-hidden px-4 pt-6 pb-4">{children}</div>
      </div>
    </figure>
  )
}
