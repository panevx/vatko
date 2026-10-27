import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { isValidEmail, saveNewsletter } from '../lib/leads'
import { Reveal } from './Reveal'

export function EmailCta() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) return setError('Моля, въведи валиден имейл адрес.')
    setError('')
    setStatus('sending')
    await saveNewsletter({ email: email.trim() })
    setStatus('done')
  }

  return (
    <section className="container-x py-20 sm:py-28" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -top-32 -left-20 size-96 rounded-full bg-volt-500/25 blur-3xl" />
          <div aria-hidden className="absolute -right-20 -bottom-32 size-96 rounded-full bg-sun-400/15 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold tracking-[0.18em] text-volt-400 uppercase">Ограничена първа серия</p>
            <h2 id="cta-title" className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Бъди сред първите 100 клиенти
            </h2>
            <p className="mt-4 text-lg text-slate-300">Запиши се и ще ти пишем първи, когато ВатКо е готов за доставка.</p>

            {status === 'done' ? (
              <p className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full bg-volt-500/15 px-6 py-4 font-semibold text-volt-400" role="status">
                <CheckCircle2 className="size-5" aria-hidden /> Благодарим! Ще се свържем с теб скоро.
              </p>
            ) : (
              <form onSubmit={submit} noValidate className="mx-auto mt-8 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="cta-email" className="sr-only">Имейл адрес</label>
                  <input
                    id="cta-email"
                    type="email"
                    autoComplete="email"
                    placeholder="твоят@имейл.bg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'cta-error' : undefined}
                    className="input !border-white/15 !bg-white/10 !text-white placeholder:!text-slate-400 sm:flex-1"
                  />
                  <button type="submit" className="btn-primary !py-3.5" disabled={status === 'sending'}>
                    {status === 'sending' && <Loader2 className="size-4 animate-spin" aria-hidden />}
                    Запиши ме
                  </button>
                </div>
                {error && (
                  <p id="cta-error" className="mt-2 text-left text-sm text-red-300" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
