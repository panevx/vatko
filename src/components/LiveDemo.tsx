import { Coffee, Power, WashingMachine } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PRICE_PER_KWH, formatEur } from '../lib/format'

const BASELINE = 160 // хладилник + рутер + уреди в режим на готовност
const POINTS = 60

type Point = { t: number; w: number }

const noise = () => (Math.random() - 0.5) * 40

export function LiveDemo() {
  const [kettle, setKettle] = useState(false)
  const [washer, setWasher] = useState(false)
  const [data, setData] = useState<Point[]>(() => Array.from({ length: POINTS }, (_, i) => ({ t: i - POINTS, w: BASELINE + noise() })))
  const load = useRef(0)
  load.current = (kettle ? 2000 : 0) + (washer ? 500 : 0)

  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1]
        const target = BASELINE + load.current
        // плавно доближаване до целевата мощност – като истински уред
        const w = Math.max(0, last.w + (target - last.w) * 0.6 + noise())
        return [...d.slice(1), { t: last.t + 1, w }]
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const current = Math.round(data[data.length - 1].w)
  const perHour = (current / 1000) * PRICE_PER_KWH

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-6 border-b border-slate-200/80 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8 dark:border-white/10">
        <div className="flex gap-8 sm:gap-12">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Текуща мощност</p>
            <p className="mt-1 text-4xl font-extrabold tabular-nums sm:text-5xl" aria-live="polite" aria-atomic>
              {current.toLocaleString('bg-BG')}
              <span className="ml-1 text-xl font-bold text-slate-400">W</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Цена на час</p>
            <p className="mt-1 text-4xl font-extrabold text-volt-600 tabular-nums sm:text-5xl dark:text-volt-400">{formatEur(perHour)}</p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sun-400/20 px-3 py-1 text-xs font-bold text-yellow-800 dark:text-sun-400">
          <span className="size-1.5 rounded-full bg-sun-500" aria-hidden />
          Демо данни
        </span>
      </div>

      <div className="h-64 px-2 pt-6 text-slate-400 sm:h-80 sm:px-6 dark:text-slate-500">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="demoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.2} />
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 3000]} ticks={[0, 1000, 2000, 3000]} tick={{ fill: 'currentColor', fontSize: 12 }} tickLine={false} axisLine={false} width={44} unit=" W" />
            <Tooltip
              formatter={(v) => [`${Math.round(Number(v))} W`, 'Мощност']}
              labelFormatter={() => ''}
              contentStyle={{ borderRadius: 12, border: 'none', background: '#0B1F3A', color: '#fff', fontSize: 12 }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="w" stroke="#22C55E" strokeWidth={2.5} fill="url(#demoFill)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-3 sm:p-8">
        <DemoButton active={kettle} onClick={() => setKettle((k) => !k)} icon={Coffee} label="Включи чайник" activeLabel="Чайникът е включен" watts="+2000 W" />
        <DemoButton active={washer} onClick={() => setWasher((w) => !w)} icon={WashingMachine} label="Включи пералня" activeLabel="Пералнята е включена" watts="+500 W" />
        <button
          type="button"
          onClick={() => {
            setKettle(false)
            setWasher(false)
          }}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-4 text-sm font-bold transition hover:bg-slate-50 dark:border-white/15 dark:hover:bg-white/5"
        >
          <Power className="size-4" aria-hidden />
          Изключи всичко
        </button>
      </div>
    </div>
  )
}

function DemoButton({ active, onClick, icon: Icon, label, activeLabel, watts }: { active: boolean; onClick: () => void; icon: typeof Coffee; label: string; activeLabel: string; watts: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-4 text-left text-sm font-bold transition ${
        active ? 'bg-volt-500 text-navy-900 shadow-lg shadow-volt-500/30' : 'bg-navy-900 text-white hover:bg-navy-800 dark:bg-white/10 dark:hover:bg-white/15'
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="size-4" aria-hidden />
        {active ? activeLabel : label}
      </span>
      <span className={`text-xs ${active ? 'text-navy-900/70' : 'text-volt-400'}`}>{watts}</span>
    </button>
  )
}
