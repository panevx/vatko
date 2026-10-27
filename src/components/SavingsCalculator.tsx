import { Calculator, Moon, Users } from 'lucide-react'
import { useId, useState } from 'react'
import { formatEur, formatNum } from '../lib/format'
import { AnimatedNumber } from './AnimatedNumber'

const DEVICE_PRICE = 59

export function SavingsCalculator() {
  const [bill, setBill] = useState(60)
  const [people, setPeople] = useState(3)
  const [nightTariff, setNightTariff] = useState(true)
  const ids = { bill: useId(), people: useId() }

  const rate = nightTariff ? 0.14 : 0.08
  const monthly = Math.max(0, bill) * rate
  const yearly = monthly * 12
  const payback = monthly > 0 ? DEVICE_PRICE / monthly : 0

  return (
    <div className="card grid overflow-hidden lg:grid-cols-2">
      <form className="space-y-7 p-6 sm:p-10" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor={ids.bill} className="label flex items-center gap-2">
              <Calculator className="size-4 text-volt-600 dark:text-volt-400" aria-hidden /> Месечна сметка за ток
            </label>
            <span className="text-lg font-extrabold tabular-nums">{formatEur(bill)}</span>
          </div>
          <input
            id={ids.bill}
            type="range"
            min={10}
            max={300}
            step={5}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="mt-2 w-full accent-volt-500"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>10 €</span>
            <span>300 €</span>
          </div>
        </div>

        <div>
          <label htmlFor={ids.people} className="label flex items-center gap-2">
            <Users className="size-4 text-volt-600 dark:text-volt-400" aria-hidden /> Членове в домакинството
          </label>
          <div className="mt-2 flex items-center gap-3">
            <button type="button" className="btn-secondary size-11 !p-0 text-lg" onClick={() => setPeople((p) => Math.max(1, p - 1))} aria-label="По-малко членове">
              −
            </button>
            <input
              id={ids.people}
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              value={people}
              onChange={(e) => setPeople(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
              className="input w-20 text-center font-bold"
            />
            <button type="button" className="btn-secondary size-11 !p-0 text-lg" onClick={() => setPeople((p) => Math.min(12, p + 1))} aria-label="Повече членове">
              +
            </button>
          </div>
        </div>

        <fieldset>
          <legend className="label flex items-center gap-2">
            <Moon className="size-4 text-volt-600 dark:text-volt-400" aria-hidden /> Имате ли нощна тарифа?
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-white/5">
            {[
              [true, 'Да'],
              [false, 'Не'],
            ].map(([v, l]) => (
              <label
                key={String(v)}
                className={`cursor-pointer rounded-xl py-2.5 text-center text-sm font-bold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-volt-500 ${
                  nightTariff === v ? 'bg-white shadow-sm dark:bg-navy-700' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <input type="radio" name="night" className="sr-only" checked={nightTariff === v} onChange={() => setNightTariff(v as boolean)} />
                {l as string}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="relative flex flex-col justify-center overflow-hidden bg-navy-900 p-6 text-white sm:p-10" aria-live="polite">
        <div aria-hidden className="absolute -right-24 -bottom-24 size-72 rounded-full bg-volt-500/20 blur-3xl" />
        <p className="relative text-sm font-semibold text-slate-300">Може да спестиш</p>
        <p className="relative mt-1 text-6xl font-extrabold tracking-tight text-volt-400 tabular-nums sm:text-7xl">
          <AnimatedNumber value={yearly} format={(v) => formatEur(v)} />
        </p>
        <p className="relative text-slate-300">на година</p>

        <dl className="relative mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div>
            <dt className="text-xs text-slate-400">На месец</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">
              <AnimatedNumber value={monthly} format={(v) => formatEur(v)} />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-400">ВатКо се изплаща за</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">
              <AnimatedNumber value={payback} format={(v) => `${formatNum(v)} мес.`} />
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-slate-400">Спестяване на човек годишно</dt>
            <dd className="mt-1 text-lg font-bold tabular-nums">{formatEur(yearly / people)}</dd>
          </div>
        </dl>
        <p className="relative mt-6 text-xs text-slate-400">
          Ориентировъчно: {nightTariff ? '14%' : '8%'} спестяване {nightTariff ? 'с нощна тарифа' : 'без нощна тарифа'}. Реалният резултат зависи от навиците ви.
        </p>
      </div>
    </div>
  )
}
