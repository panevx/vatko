import type { LucideIcon } from 'lucide-react'

/** Временно изображение (до качването на реални снимки/рендери). */
export function Placeholder({ icon: Icon, label, className = '' }: { icon: LucideIcon; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white ${className}`}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.25),transparent_55%)]" />
      <div aria-hidden className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex flex-col items-center gap-3 p-6 text-center">
        <Icon className="size-10 text-volt-400" aria-hidden strokeWidth={1.5} />
        <span className="text-xs font-semibold tracking-wide text-slate-300">{label}</span>
      </div>
    </div>
  )
}
