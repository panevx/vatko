import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Loader2, Mail, Package, Phone } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { isValidEmail, isValidPhone, savePreorder, type CustomerType, type PreorderLead } from '../lib/leads'
import { useSeo } from '../lib/seo'

const TYPES: { value: CustomerType; label: string }[] = [
  { value: 'дом', label: 'Дом' },
  { value: 'училище', label: 'Училище' },
  { value: 'офис', label: 'Офис' },
]

type Errors = Partial<Record<keyof PreorderLead, string>>

function validate(f: PreorderLead): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Моля, въведи име.'
  if (!isValidEmail(f.email)) e.email = 'Моля, въведи валиден имейл.'
  if (f.phone.trim() && !isValidPhone(f.phone)) e.phone = 'Телефонът изглежда невалиден.'
  if (!Number.isInteger(f.quantity) || f.quantity < 1 || f.quantity > 500) e.quantity = 'Въведи брой между 1 и 500.'
  return e
}

export default function Contact() {
  useSeo('Контакти и предварителна поръчка', 'Поръчай ВатКо предварително или се свържи с нас за пакет за училища и офиси.')
  const [params] = useSearchParams()
  const initialType = TYPES.find((t) => t.value === params.get('tip'))?.value ?? 'дом'

  const [form, setForm] = useState<PreorderLead>({ name: '', email: '', phone: '', quantity: 1, type: initialType, message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const set = <K extends keyof PreorderLead>(k: K, v: PreorderLead[K]) => {
    const next = { ...form, [k]: v }
    setForm(next)
    if (touched) setErrors(validate(next))
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    const errs = validate(form)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setStatus('sending')
    await savePreorder({ ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), message: form.message.trim() })
    setStatus('done')
  }

  const field = (k: keyof PreorderLead) => ({
    id: `f-${k}`,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `f-${k}-err` : undefined,
  })
  const Err = ({ k }: { k: keyof PreorderLead }) =>
    errors[k] ? (
      <p id={`f-${k}-err`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
        {errors[k]}
      </p>
    ) : null

  return (
    <>
      <PageHeader eyebrow="Контакти" title="Поръчай предварително" lead="Първата серия е ограничена. Остави данните си и ще се свържем с теб за потвърждение – без предплащане." />

      <section className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <ul className="space-y-6">
            {[
              { icon: Package, t: 'Без предплащане', d: 'Плащаш едва когато уредът е готов за доставка.' },
              { icon: Clock, t: 'Отговаряме до 24 часа', d: 'В работни дни, обикновено много по-бързо.' },
              { icon: Mail, t: 'hello@vatko.bg', d: 'За въпроси, партньорства и медии.', href: 'mailto:hello@vatko.bg' },
              { icon: Phone, t: '+359 000 000 000', d: 'Пон–пет, 9:00–18:00.', href: 'tel:+359000000000' },
            ].map((x) => (
              <li key={x.t} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-volt-500/15 text-volt-700 dark:text-volt-400">
                  <x.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-bold">{x.href ? <a href={x.href} className="hover:text-volt-600">{x.t}</a> : x.t}</p>
                  <p className="text-slate-600 dark:text-slate-400">{x.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center" role="status">
                  <CheckCircle2 className="mx-auto size-16 text-volt-500" aria-hidden />
                  <h2 className="mt-6 text-2xl font-extrabold">Благодарим, {form.name.split(' ')[0]}!</h2>
                  <p className="lead mx-auto mt-3 max-w-md">Заявката ти е получена. Ще се свържем с теб на {form.email} до 24 часа.</p>
                  <button
                    type="button"
                    className="btn-secondary mt-8"
                    onClick={() => {
                      setForm({ name: '', email: '', phone: '', quantity: 1, type: 'дом', message: '' })
                      setTouched(false)
                      setErrors({})
                      setStatus('idle')
                    }}
                  >
                    Нова заявка
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="f-name" className="label">Име и фамилия *</label>
                    <input {...field('name')} className="input" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
                    <Err k="name" />
                  </div>
                  <div>
                    <label htmlFor="f-email" className="label">Имейл *</label>
                    <input {...field('email')} type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    <Err k="email" />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="label">Телефон</label>
                    <input {...field('phone')} type="tel" className="input" autoComplete="tel" placeholder="+359 …" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                    <Err k="phone" />
                  </div>
                  <div>
                    <label htmlFor="f-quantity" className="label">Брой уреди *</label>
                    <input
                      {...field('quantity')}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={500}
                      className="input"
                      value={Number.isNaN(form.quantity) ? '' : form.quantity}
                      onChange={(e) => set('quantity', e.target.valueAsNumber)}
                    />
                    <Err k="quantity" />
                  </div>
                  <fieldset>
                    <legend className="label">Тип *</legend>
                    <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1.5 dark:bg-white/5">
                      {TYPES.map((t) => (
                        <label
                          key={t.value}
                          className={`cursor-pointer rounded-lg py-2 text-center text-sm font-bold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-volt-500 ${
                            form.type === t.value ? 'bg-white shadow-sm dark:bg-navy-700' : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <input type="radio" name="type" value={t.value} className="sr-only" checked={form.type === t.value} onChange={() => set('type', t.value)} />
                          {t.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-message" className="label">Съобщение</label>
                    <textarea {...field('message')} rows={4} className="input resize-y" value={form.message} onChange={(e) => set('message', e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">* Задължителни полета. Използваме данните ти само за връзка относно поръчката.</p>
                    <button type="submit" className="btn-primary !px-8 !py-4" disabled={status === 'sending'}>
                      {status === 'sending' && <Loader2 className="size-4 animate-spin" aria-hidden />}
                      Изпрати заявката
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>
    </>
  )
}
