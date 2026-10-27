import { Check, School, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

const plans = [
  {
    icon: Zap,
    name: 'Уред ВатКо',
    price: '59 €',
    period: 'еднократно',
    desc: 'Всичко, от което имаш нужда, за да видиш консумацията си.',
    features: ['Безконтактна токова клема', 'Измерване в реално време', 'Безплатно приложение', 'Разход в евро по часове', '2 години гаранция'],
    cta: 'Поръчай предварително',
    to: '/kontakti',
  },
  {
    icon: Sparkles,
    name: 'ВатКо Плюс',
    price: '1,99 €',
    period: '/месец',
    desc: 'За тези, които искат да спестят максимално.',
    features: ['Всичко от уреда', 'Разширени анализи', 'Неограничена история', 'Персонални съвети', 'Прогноза за сметката', 'Известия за аномалии'],
    cta: 'Започни с Плюс',
    to: '/kontakti',
    featured: true,
  },
  {
    icon: School,
    name: 'За училища и офиси',
    price: 'По запитване',
    period: '',
    desc: 'Пакет с няколко уреда и общо табло за цялата сграда.',
    features: ['Няколко уреда с отстъпка', 'Общо табло за сградата', 'Образователни материали', 'Отчети за ръководството'],
    cta: 'Свържи се с нас',
    to: '/kontakti?tip=училище',
  },
]

export function Pricing() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.08} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-3xl p-8 ${
              p.featured
                ? 'bg-navy-900 text-white shadow-2xl shadow-navy-900/30 ring-2 ring-volt-500 lg:-translate-y-3 dark:bg-navy-800'
                : 'card'
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-volt-500 px-3 py-1 text-xs font-bold text-navy-900">Най-популярно</span>
            )}
            <p.icon className={`size-6 ${p.featured ? 'text-volt-400' : 'text-volt-600 dark:text-volt-400'}`} aria-hidden />
            <h3 className="mt-4 text-lg font-bold">{p.name}</h3>
            <p className={`mt-1 text-sm ${p.featured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{p.desc}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
              {p.period && <span className={`text-sm ${p.featured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{p.period}</span>}
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? 'text-volt-400' : 'text-volt-600 dark:text-volt-400'}`} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <Link to={p.to} className={`mt-8 w-full ${p.featured ? 'btn-primary' : 'btn-secondary'}`}>
              {p.cta}
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
