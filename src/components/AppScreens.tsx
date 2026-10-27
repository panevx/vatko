import { CalendarClock, Lightbulb, TrendingDown, WashingMachine, Zap } from 'lucide-react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts'
import { ScreenTitle } from './LiveScreen'

export { LiveScreen } from './LiveScreen'

const hourly = [0.04, 0.03, 0.03, 0.03, 0.03, 0.04, 0.09, 0.14, 0.11, 0.06, 0.05, 0.07, 0.1, 0.07, 0.05, 0.05, 0.06, 0.09, 0.16, 0.19, 0.15, 0.11, 0.07, 0.05].map(
  (v, h) => ({ h: `${h}`, v }),
)

/** Екран 2: дневна графика по часове в евро. */
export function DailyScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenTitle kicker="Вторник, 27 окт." title="Разход по часове" />
      <p className="text-3xl font-extrabold">1,92 €</p>
      <p className="text-[11px] text-volt-400">−12% спрямо миналия вторник</p>
      <div className="mt-4 h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourly} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="h" tick={{ fill: '#94A3B8', fontSize: 8 }} tickLine={false} axisLine={false} interval={5} />
            <Bar dataKey="v" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {hourly.map((d) => (
                <Cell key={d.h} fill={d.v > 0.12 ? '#FACC15' : '#22C55E'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Най-скъпи уреди днес</p>
      {[
        ['Бойлер', '0,74 €', 'w-[78%]'],
        ['Готварска печка', '0,41 €', 'w-[44%]'],
        ['Пералня', '0,22 €', 'w-[24%]'],
      ].map(([n, v, w]) => (
        <div key={n} className="mb-2">
          <div className="flex justify-between text-[11px]">
            <span>{n}</span>
            <span className="font-semibold">{v}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/10">
            <div className={`h-full rounded-full bg-volt-500 ${w}`} />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Екран 3: прогноза за месечната сметка. */
export function ForecastScreen() {
  const pct = 0.62
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="flex h-full flex-col">
      <ScreenTitle kicker="Октомври" title="Прогноза за сметката" />
      <div className="relative mx-auto my-2 size-40">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="10" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="text-[10px] text-slate-400">очаквано</p>
          <p className="text-2xl font-extrabold">47,80 €</p>
          <p className="text-[10px] text-slate-400">до 31 окт.</p>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10">
          <span className="text-[11px] text-slate-400">Изразходвано</span>
          <span className="text-sm font-bold">29,60 €</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10">
          <span className="text-[11px] text-slate-400">Миналия месец</span>
          <span className="text-sm font-bold">54,10 €</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-volt-500/15 px-3 py-2.5 ring-1 ring-volt-500/30">
          <TrendingDown className="size-4 text-volt-400" aria-hidden />
          <span className="text-[11px]">С <b className="text-volt-400">6,30 €</b> по-малко от септември</span>
        </div>
      </div>
    </div>
  )
}

/** Екран 4: персонални съвети. */
export function TipsScreen() {
  const tips = [
    { icon: WashingMachine, title: 'Пералня след 22:00', text: 'Нощната тарифа е по-евтина. Спестяване ~3,20 €/мес.', tone: 'text-volt-400 bg-volt-500/15' },
    { icon: Zap, title: 'Бойлерът е на 70 °C', text: 'Свали на 55 °C – същият комфорт, по-малка сметка.', tone: 'text-sun-400 bg-sun-400/15' },
    { icon: Lightbulb, title: 'Режим на готовност: 38 W', text: 'Уредите в покой харчат ~3,60 €/мес. Ползвай разклонител с ключ.', tone: 'text-sky-300 bg-sky-400/15' },
    { icon: CalendarClock, title: 'Седмичен отчет', text: 'Тази седмица харчиш 9% по-малко. Продължавай!', tone: 'text-volt-400 bg-volt-500/15' },
  ]
  return (
    <div className="flex h-full flex-col">
      <ScreenTitle kicker="Персонално за теб" title="Съвети" />
      <ul className="space-y-2.5">
        {tips.map((t) => (
          <li key={t.title} className="flex gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
            <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${t.tone}`}>
              <t.icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-bold">{t.title}</p>
              <p className="mt-0.5 text-[10.5px] leading-snug text-slate-400">{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
