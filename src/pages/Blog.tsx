import { ArrowUpRight, Clock, Moon, Plug, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { articles, formatDate, type Article } from '../data/articles'
import { useSeo } from '../lib/seo'

export const accentStyles: Record<Article['accent'], { bg: string; icon: typeof Zap }> = {
  volt: { bg: 'from-volt-500 to-emerald-700', icon: Zap },
  sky: { bg: 'from-navy-700 to-navy-950', icon: Moon },
  sun: { bg: 'from-sun-400 to-amber-600', icon: Plug },
}

export default function Blog() {
  useSeo('Съвети', 'Практични съвети за по-ниска сметка за ток: нощна тарифа, режим на готовност, уредите, които харчат най-много.')

  return (
    <>
      <PageHeader eyebrow="Блог" title="Съвети за по-ниска сметка" lead="Кратки и практични статии за това как работи токът у дома и как да плащаш по-малко за него." />

      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => {
            const { bg, icon: Icon } = accentStyles[a.accent]
            return (
              <Reveal key={a.slug} delay={i * 0.08} className="h-full">
                <article className="group card relative flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`relative grid aspect-[16/9] place-items-center bg-gradient-to-br ${bg}`}>
                    <Icon className="size-14 text-white/90 transition duration-500 group-hover:scale-110" aria-hidden strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-navy-900 dark:bg-white/10 dark:text-white">{a.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden /> {a.readMinutes} мин
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-balance">
                      <Link to={`/blog/${a.slug}`} className="after:absolute after:inset-0">
                        {a.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-slate-600 dark:text-slate-400">{a.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between text-sm">
                      <time dateTime={a.date} className="text-slate-500 dark:text-slate-400">{formatDate(a.date)}</time>
                      <ArrowUpRight className="size-5 text-volt-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-volt-400" aria-hidden />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
