import { ArrowLeft, Clock, Lightbulb } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmailCta } from '../components/EmailCta'
import { Reveal } from '../components/Reveal'
import { articles, findArticle, formatDate } from '../data/articles'
import { useSeo } from '../lib/seo'
import { accentStyles } from './Blog'
import NotFound from './NotFound'

export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = findArticle(slug)
  useSeo(article?.title ?? 'Статията не е намерена', article?.excerpt)

  if (!article) return <NotFound />

  const { bg, icon: Icon } = accentStyles[article.accent]
  const others = articles.filter((a) => a.slug !== slug)

  return (
    <>
      <article className="pt-28 sm:pt-36">
        <header className="container-x max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden /> Всички статии
          </Link>
          <Reveal>
            <p className="eyebrow mt-8">{article.category}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{article.title}</h1>
            <p className="lead mt-4">{article.excerpt}</p>
            <p className="mt-6 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden /> {article.readMinutes} мин четене
              </span>
            </p>
          </Reveal>
        </header>

        <div className="container-x mt-10 max-w-4xl">
          <div className={`grid aspect-[21/9] place-items-center rounded-3xl bg-gradient-to-br ${bg}`} role="img" aria-label={`Илюстрация към „${article.title}“`}>
            <Icon className="size-16 text-white/90" aria-hidden strokeWidth={1.5} />
          </div>
        </div>

        <div className="container-x mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {article.body.map((b, i) => {
            switch (b.type) {
              case 'h2':
                return <h2 key={i} className="!mt-12 text-2xl font-extrabold tracking-tight text-navy-900 dark:text-white">{b.text}</h2>
              case 'ul':
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-volt-500">
                    {b.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                )
              case 'tip':
                return (
                  <aside key={i} className="!mt-12 flex gap-4 rounded-3xl bg-volt-500/10 p-6 ring-1 ring-volt-500/30">
                    <Lightbulb className="mt-1 size-6 shrink-0 text-volt-600 dark:text-volt-400" aria-hidden />
                    <p className="text-base text-navy-900 dark:text-slate-100">{b.text}</p>
                  </aside>
                )
              default:
                return <p key={i}>{b.text}</p>
            }
          })}
        </div>
      </article>

      <section className="container-x mt-20 max-w-3xl border-t border-slate-200 pt-12 dark:border-white/10" aria-labelledby="more">
        <h2 id="more" className="text-xl font-bold">Прочети още</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((a) => (
            <li key={a.slug}>
              <Link to={`/blog/${a.slug}`} className="card block h-full p-6 transition hover:-translate-y-0.5">
                <p className="text-xs font-semibold text-volt-700 dark:text-volt-400">{a.category}</p>
                <p className="mt-2 font-bold">{a.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <EmailCta />
    </>
  )
}
