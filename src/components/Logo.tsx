import { Zap } from 'lucide-react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <span className="grid size-8 place-items-center rounded-xl bg-navy-900 text-volt-500 ring-1 ring-white/10 dark:bg-volt-500 dark:text-navy-900">
        <Zap className="size-4.5" fill="currentColor" aria-hidden />
      </span>
      <span className="text-xl">
        Ват<span className="text-volt-600 dark:text-volt-400">Ко</span>
      </span>
    </span>
  )
}
