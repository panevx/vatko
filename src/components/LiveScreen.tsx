import { Bell, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ScreenTitle = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-4">
    <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">{kicker}</p>
    <p className="text-lg font-bold">{title}</p>
  </div>
)

/** Лека SVG графика (без Recharts), за да не тежи на първото зареждане. */
function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values) * 1.1
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 40 - (v / max) * 38])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${line} L100,40 L0,40 Z`} fill="url(#liveFill)" />
      <path d={line} fill="none" stroke="#22C55E" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

const seed = () => Array.from({ length: 24 }, (_, i) => ({ i, w: 380 + Math.sin(i / 2.5) * 140 + Math.random() * 120 }))

/** Екран 1: табло в реално време (с анимирана графика). */
export function LiveScreen({ animate = true }: { animate?: boolean }) {
  const [data, setData] = useState(seed)

  useEffect(() => {
    if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1].w
        const spike = Math.random() < 0.12 ? 900 : 0
        const next = Math.max(180, Math.min(2200, last * 0.7 + 420 * 0.3 + (Math.random() - 0.5) * 160 + spike))
        return [...d.slice(1), { i: d[d.length - 1].i + 1, w: next }]
      })
    }, 1200)
    return () => clearInterval(id)
  }, [animate])

  const now = Math.round(data[data.length - 1].w)
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <ScreenTitle kicker="Добро утро" title="Моят дом" />
        <Bell className="size-4 text-slate-400" aria-hidden />
      </div>
      <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-volt-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-volt-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-volt-400" />
          </span>
          НА ЖИВО
        </p>
        <p className="mt-1 text-3xl font-extrabold tabular-nums">
          {now.toLocaleString('bg-BG')} <span className="text-base font-semibold text-slate-400">W</span>
        </p>
        <p className="text-[11px] text-slate-400 tabular-nums">≈ {((now / 1000) * 0.13).toFixed(2).replace('.', ',')} € на час</p>
        <div className="mt-3 h-24">
          <Sparkline values={data.map((d) => d.w)} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <p className="text-[10px] text-slate-400">Днес</p>
          <p className="text-base font-bold">1,42 €</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <p className="text-[10px] text-slate-400">Прогноза</p>
          <p className="text-base font-bold">48 €<span className="text-[10px] text-slate-400">/мес</span></p>
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-volt-500/15 p-3 ring-1 ring-volt-500/30">
        <Moon className="mt-0.5 size-4 shrink-0 text-volt-400" aria-hidden />
        <p className="text-[11px] leading-snug text-slate-200">Пусни пералнята след 22:00 и спести <b className="text-volt-400">0,18 €</b>.</p>
      </div>
    </div>
  )
}
