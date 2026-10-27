import { Box, Cable, Cpu, Gauge, Ruler, ScanLine, ShieldCheck, Usb, Wifi } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Faq } from '../components/Faq'
import { PageHeader } from '../components/PageHeader'
import { Placeholder } from '../components/Placeholder'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSeo } from '../lib/seo'

// TODO: потвърди размерите и теглото след финалния прототип
const specs = [
  { icon: Gauge, label: 'Точност', value: '±3%' },
  { icon: Wifi, label: 'Свързаност', value: 'Wi-Fi 2.4 GHz' },
  { icon: Usb, label: 'Захранване', value: 'USB-C, 5 V' },
  { icon: Ruler, label: 'Размер', value: '≈ 60 × 40 × 22 мм' },
  { icon: Cable, label: 'Монтаж', value: 'Без рязане на кабели' },
  { icon: Cpu, label: 'Процесор', value: 'ESP32' },
  { icon: ScanLine, label: 'Сензор', value: 'Безконтактна токова клема' },
  { icon: ShieldCheck, label: 'Данни', value: 'Криптирана връзка' },
]

const faq = [
  {
    q: 'Безопасно ли е?',
    a: 'Да. Клемата е безконтактна – тя само обгръща кабела и измерва магнитното поле около него. Няма метален контакт с жиците и нищо не се разкача. Самият уред се захранва с безопасни 5 V през USB-C.',
  },
  {
    q: 'Трябва ли ми електротехник?',
    a: 'За измерване на отделен уред или разклонител – не, справяш се сам за няколко минути. За монтаж в електрическото табло (за да виждаш консумацията на целия дом) – да, препоръчваме това да се направи от правоспособен електротехник, защото таблото е под напрежение.',
  },
  {
    q: 'Работи ли с всеки електромер?',
    a: 'Да. ВатКо не се свързва с електромера – той измерва тока директно по кабела. Затова работи независимо от типа електромер и доставчика на ток, включително с двутарифни електромери.',
  },
  {
    q: 'Какво става, ако няма интернет?',
    a: 'Уредът продължава да измерва и пази данните в паметта си. Щом връзката се възстанови, той ги изпраща към приложението и историята ти остава пълна.',
  },
  {
    q: 'Колко ток харчи самият ВатКо?',
    a: 'Под 1 W – по-малко от 1 € годишно.',
  },
]

export default function Product() {
  useSeo('Продукт', 'Технически характеристики на ВатКо: точност ±3%, Wi-Fi 2.4 GHz, захранване USB-C, монтаж без рязане на кабели.')

  return (
    <>
      <PageHeader eyebrow="Продукт" title="Малък уред. Голяма яснота." lead="ВатКо съчетава ESP32 микроконтролер и безконтактна токова клема в компактен корпус, който се закопчава около кабела за секунди.">
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/kontakti" className="btn-primary">Поръчай за 59 €</Link>
          <a href="#faq" className="btn-secondary">Често задавани въпроси</a>
        </div>
      </PageHeader>

      <section className="container-x py-20 sm:py-24" aria-label="Изображения на продукта">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <Placeholder icon={Box} label="Рендер: ВатКо – изглед отпред" className="aspect-[4/3] h-full lg:aspect-auto" />
          </Reveal>
          <Reveal delay={0.08}>
            <Placeholder icon={Cable} label="Снимка: клемата около кабел" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.16}>
            <Placeholder icon={Usb} label="Детайл: USB-C захранване" className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900/40">
        <div className="container-x">
          <SectionHeading eyebrow="Спецификации" title="Технически характеристики" />
          <Reveal>
            <dl className="grid gap-px overflow-hidden rounded-3xl bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:bg-white/10">
              {specs.map((s) => (
                <div key={s.label} className="bg-white p-6 dark:bg-navy-900">
                  <s.icon className="size-5 text-volt-600 dark:text-volt-400" aria-hidden />
                  <dt className="mt-4 text-sm text-slate-500 dark:text-slate-400">{s.label}</dt>
                  <dd className="mt-1 text-lg font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="container-x scroll-mt-20 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-3">Често задавани въпроси</h2>
            <p className="lead mt-4">
              Не намери отговор? <Link to="/kontakti" className="font-semibold text-volt-700 underline underline-offset-4 dark:text-volt-400">Пиши ни</Link>.
            </p>
          </div>
          <Reveal>
            <Faq items={faq} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
