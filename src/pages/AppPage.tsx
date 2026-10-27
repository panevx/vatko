import { DailyScreen, ForecastScreen, LiveScreen, TipsScreen } from '../components/AppScreens'
import { PageHeader } from '../components/PageHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { Reveal } from '../components/Reveal'
import { useSeo } from '../lib/seo'

const screens = [
  { title: 'Табло в реално време', text: 'Текущата мощност във ватове и колко струва в евро на час. Обновява се на всяка секунда.', Screen: LiveScreen },
  { title: 'Дневна графика', text: 'Разходът в евро за всеки час от деня. Виж кога харчиш най-много и кои уреди стоят зад пиковете.', Screen: DailyScreen },
  { title: 'Прогноза за сметката', text: 'Още в средата на месеца знаеш колко ще излезе сметката – и можеш да реагираш навреме.', Screen: ForecastScreen },
  { title: 'Персонални съвети', text: 'Конкретни препоръки според твоите навици: кога да пуснеш пералнята, колко харчи режимът на готовност и още.', Screen: TipsScreen },
]

function StoreBadge({ store }: { store: 'Google Play' | 'App Store' }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled
      className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl bg-navy-900 px-5 py-3 text-left text-white opacity-70 dark:bg-white/10"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
        {store === 'App Store' ? (
          <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z" />
        ) : (
          <path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1zm11.3 11.3 2.4 2.4-11 6.3 8.6-8.7zm3.6-3.6 2.8 1.6c.8.5.8 1.3 0 1.8l-2.8 1.6-2.6-2.5 2.6-2.5zM6.3 2.2l11 6.3-2.4 2.4-8.6-8.7z" />
        )}
      </svg>
      <span>
        <span className="block text-[10px] leading-none text-slate-300">Скоро в</span>
        <span className="block text-base font-bold">{store}</span>
      </span>
    </button>
  )
}

export default function AppPage() {
  useSeo('Приложението', 'Мобилното приложение на ВатКо: табло в реално време, дневна графика, прогноза за сметката и персонални съвети.')

  return (
    <>
      <PageHeader eyebrow="Приложението" title="Твоят ток – в джоба ти." lead="Всичко, което ВатКо измерва, се превръща в ясни числа в евро и конкретни съвети.">
        <div className="mt-8 flex flex-wrap gap-3">
          <StoreBadge store="Google Play" />
          <StoreBadge store="App Store" />
        </div>
      </PageHeader>

      <section className="container-x space-y-24 py-20 sm:space-y-32 sm:py-28">
        {screens.map(({ title, text, Screen }, i) => (
          <div key={title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className={i % 2 ? 'md:order-2' : ''}>
              <div className="relative">
                <div aria-hidden className="absolute inset-10 rounded-full bg-volt-500/20 blur-3xl" />
                <PhoneFrame label={`Екран „${title}“`}>
                  <Screen />
                </PhoneFrame>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-6xl font-extrabold text-volt-600 dark:text-volt-400" aria-hidden>
                0{i + 1}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
              <p className="lead mt-4 max-w-md">{text}</p>
            </Reveal>
          </div>
        ))}
      </section>
    </>
  )
}
