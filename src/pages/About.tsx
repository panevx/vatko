import { Eye, Leaf, Lightbulb, User } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSeo } from '../lib/seo'

// TODO: попълни имената и добави снимки (photo: '/vatko/team/ime.jpg')
const team: { name: string; role: string; photo?: string }[] = [
  { name: 'Име Фамилия', role: 'Изпълнителен директор' },
  { name: 'Име Фамилия', role: 'Технически директор' },
  { name: 'Име Фамилия', role: 'Маркетинг' },
  { name: 'Име Фамилия', role: 'Финанси' },
  { name: 'Име Фамилия', role: 'Продажби' },
]

const values = [
  { icon: Eye, title: 'Прозрачност', text: 'Ясни цени, ясни данни. Показваме ти точно колко харчиш – и казваме честно какво можем и какво не.' },
  { icon: Leaf, title: 'Устойчивост', text: 'Всеки спестен киловатчас е по-малко разход за теб и по-малко натоварване за планетата.' },
  { icon: Lightbulb, title: 'Иновации', text: 'Достъпна технология, която допреди години беше само за големите компании.' },
]

export default function About() {
  useSeo('За нас', 'ВатКо е учебна компания към Junior Achievement България. Мисията ни е да направим енергията видима.')

  return (
    <>
      <PageHeader
        eyebrow="За нас"
        title="Правим енергията видима."
        lead="ВатКо е учебна компания към Junior Achievement България. Мисията ни е да направим енергията видима и да помогнем на домакинствата да харчат по-малко."
      />

      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow="Екипът" title="Хората зад ВатКо" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={m.role} delay={i * 0.06}>
              <article className="card overflow-hidden">
                {m.photo ? (
                  <img src={m.photo} alt={`${m.name} – ${m.role}`} className="aspect-square w-full object-cover" loading="lazy" />
                ) : (
                  <div className="grid aspect-square place-items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-800 dark:to-navy-700" role="img" aria-label={`Снимка на ${m.role.toLowerCase()} – предстои`}>
                    <User className="size-12 text-slate-400" aria-hidden strokeWidth={1.5} />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-bold">{m.name}</p>
                  <p className="text-sm text-volt-700 dark:text-volt-400">{m.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900/40">
        <div className="container-x">
          <SectionHeading eyebrow="Ценности" title="В какво вярваме" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="h-full">
                <article className="card h-full p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-volt-500/15 text-volt-700 dark:text-volt-400">
                    <v.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Junior Achievement България</p>
          <p className="mt-4 text-2xl font-bold text-balance sm:text-3xl">
            Създаваме ВатКо като ученици в програмата „Учебна компания“, където реални идеи се превръщат в реален бизнес.
          </p>
        </Reveal>
      </section>
    </>
  )
}
