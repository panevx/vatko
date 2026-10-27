import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarX2, Clock, HelpCircle, MessageSquareQuote, Plug, Smartphone, Wifi } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { LiveScreen } from '../components/LiveScreen'
import { EmailCta } from '../components/EmailCta'
import { PhoneFrame } from '../components/PhoneFrame'
import { Pricing } from '../components/Pricing'
import { Reveal } from '../components/Reveal'
import { SavingsCalculator } from '../components/SavingsCalculator'
import { SectionHeading } from '../components/SectionHeading'
import { useSeo } from '../lib/seo'

// Recharts тежи ~150 KB – зарежда се чак когато демото е нужно
const LiveDemo = lazy(() => import('../components/LiveDemo').then((m) => ({ default: m.LiveDemo })))

const problems = [
  { icon: CalendarX2, title: 'Сметката идва веднъж месечно – твърде късно', text: 'Разбираш колко си похарчил, когато вече нищо не може да се промени.' },
  { icon: HelpCircle, title: 'Не знаеш кой уред харчи най-много', text: 'Бойлерът? Хладилникът? Духалката? Без данни е само догадка.' },
  { icon: Clock, title: 'Пропускаш евтините часове на нощната тарифа', text: 'Пералнята в 18:00 струва повече от същото пране в 22:30.' },
]

const steps = [
  { icon: Plug, title: 'Закопчай клемата', text: 'Щракни клемата около захранващия кабел. Без рязане на жици и без инструменти.' },
  { icon: Wifi, title: 'Свържи с Wi-Fi', text: 'Приложението те води стъпка по стъпка. Готово за под 5 минути.' },
  { icon: Smartphone, title: 'Следи и спестявай', text: 'Виж разхода в евро по часове, прогнозата за сметката и персонални съвети.' },
]

export default function Home() {
  useSeo('', 'ВатКо измерва консумацията на ток в реално време и ти казва как да спестиш. Безконтактна клема + мобилно приложение. 59 €.')
  const reduce = useReducedMotion()

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 size-[36rem] rounded-full bg-volt-500/15 blur-3xl dark:bg-volt-500/10" />
          <div className="absolute top-40 -left-40 size-[28rem] rounded-full bg-sun-400/10 blur-3xl" />
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(11,31,58,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)] dark:[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]" />
        </div>

        <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-volt-500/30 bg-volt-500/10 px-3 py-1 text-xs font-bold text-volt-700 dark:text-volt-400"
            >
              <span className="size-1.5 rounded-full bg-volt-500" aria-hidden />
              Предварителни поръчки – първа серия
            </motion.p>
            <h1
              className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Виж къде отиват парите ти за{' '}
              <span className="relative whitespace-nowrap text-volt-600 dark:text-volt-400">
                ток
                <svg aria-hidden viewBox="0 0 120 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                  <path d="M2 8 Q 30 2 60 6 T 118 4" fill="none" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="lead mt-6 max-w-xl sm:text-xl">ВатКо измерва консумацията в реално време и ти казва как да спестиш.</p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/kontakti" className="btn-primary !px-7 !py-4 !text-base">
                Поръчай предварително <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href="#kak-raboti" className="btn-secondary !px-7 !py-4 !text-base">
                Как работи?
              </a>
            </motion.div>
            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-6 dark:border-white/10"
            >
              {[
                ['59 €', 'цена на уреда'],
                ['±3%', 'точност'],
                ['5 мин', 'инсталация'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-2xl font-extrabold">{v}</dd>
                  <dd className="text-xs text-slate-500 dark:text-slate-400">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div aria-hidden className="absolute inset-x-8 top-16 bottom-0 rounded-full bg-volt-500/30 blur-3xl" />
            <PhoneFrame label="Приложението ВатКо – табло в реално време">
              <LiveScreen />
            </PhoneFrame>
          </motion.div>
        </div>
      </section>

      {/* ПРОБЛЕМ */}
      <section className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900/40" aria-labelledby="problem">
        <div className="container-x">
          <SectionHeading eyebrow="Проблемът" title={<span id="problem">Токът е невидим. Сметката – не.</span>} />
          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <article className="card h-full p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sun-400/20 text-yellow-700 dark:text-sun-400">
                    <p.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-balance">{p.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* КАК РАБОТИ */}
      <section id="kak-raboti" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="how">
        <div className="container-x">
          <SectionHeading eyebrow="Как работи" title={<span id="how">Три стъпки до пълна яснота</span>} lead="Без електротехник за уреда в дома, без рязане на кабели, без абонамент по подразбиране." />
          <div className="relative grid gap-6 md:grid-cols-3">
            <div aria-hidden className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-volt-500/50 to-transparent md:block" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <span className="relative mx-auto grid size-20 place-items-center rounded-3xl bg-navy-900 text-volt-400 shadow-xl shadow-navy-900/20 dark:bg-navy-800 dark:ring-1 dark:ring-white/10">
                    <s.icon className="size-8" aria-hidden />
                    <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-volt-500 text-sm font-extrabold text-navy-900">{i + 1}</span>
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-slate-600 dark:text-slate-400">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ЖИВО ДЕМО */}
      <section id="demo" className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900/40" aria-labelledby="demo-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Живо демо"
            title={<span id="demo-title">Пробвай сам</span>}
            lead="Включи уред и виж как реагира графиката – точно както в приложението на ВатКо."
          />
          <Reveal>
            <Suspense fallback={<div className="card h-[34rem]" />}>
              <LiveDemo />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* КАЛКУЛАТОР */}
      <section id="kalkulator" className="py-20 sm:py-28" aria-labelledby="calc-title">
        <div className="container-x">
          <SectionHeading eyebrow="Калкулатор" title={<span id="calc-title">Колко можеш да спестиш?</span>} lead="Въведи месечната си сметка и виж за колко време ВатКо се изплаща сам." />
          <Reveal>
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      {/* ЦЕНИ */}
      <section id="ceni" className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900/40" aria-labelledby="pricing-title">
        <div className="container-x">
          <SectionHeading eyebrow="Цени" title={<span id="pricing-title">Просто и прозрачно</span>} lead="Купуваш уреда веднъж. Абонаментът е по избор." />
          <Pricing />
        </div>
      </section>

      {/* ОТЗИВИ */}
      <section className="py-20 sm:py-28" aria-labelledby="reviews-title">
        <div className="container-x">
          <SectionHeading eyebrow="Отзиви" title={<span id="reviews-title">Резултати от бета теста – очаквайте скоро</span>} lead="В момента ВатКо се тества в реални домакинства. Тук ще публикуваме истинските им резултати." />
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-56 flex-col justify-between rounded-3xl border-2 border-dashed border-slate-200 p-8 dark:border-white/10" aria-hidden>
                  <MessageSquareQuote className="size-8 text-slate-300 dark:text-white/20" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-white/5" />
                    <div className="h-2.5 w-4/5 rounded-full bg-slate-100 dark:bg-white/5" />
                    <div className="h-2.5 w-2/5 rounded-full bg-slate-100 dark:bg-white/5" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EmailCta />
    </>
  )
}
