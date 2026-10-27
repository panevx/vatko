/**
 * Съхранение на заявки (предварителни поръчки и абонаменти за имейл).
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  ТУК се свързва реален бекенд.                                    │
 * │  В момента данните се пазят само в localStorage на браузъра.      │
 * │                                                                   │
 * │  Formspree:                                                       │
 * │    await fetch('https://formspree.io/f/<ID>', {                   │
 * │      method: 'POST',                                              │
 * │      headers: { 'Content-Type': 'application/json',               │
 * │                 Accept: 'application/json' },                     │
 * │      body: JSON.stringify(record) })                              │
 * │                                                                   │
 * │  Supabase:                                                        │
 * │    const supabase = createClient(URL, ANON_KEY)                   │
 * │    await supabase.from(kind).insert(record)                       │
 * └──────────────────────────────────────────────────────────────────┘
 */

export type CustomerType = 'дом' | 'училище' | 'офис'

export interface PreorderLead {
  name: string
  email: string
  phone: string
  quantity: number
  type: CustomerType
  message: string
}

export interface NewsletterLead {
  email: string
}

type LeadKind = 'preorders' | 'newsletter'

async function save<T extends object>(kind: LeadKind, data: T): Promise<void> {
  const record = { ...data, createdAt: new Date().toISOString() }

  // TODO: замени с заявка към Supabase / Formspree (виж коментара по-горе)
  const key = `vatko-${kind}`
  const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[]
  localStorage.setItem(key, JSON.stringify([...existing, record]))

  await new Promise((r) => setTimeout(r, 500)) // имитира мрежова заявка
}

export const savePreorder = (lead: PreorderLead) => save('preorders', lead)
export const saveNewsletter = (lead: NewsletterLead) => save('newsletter', lead)

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isValidPhone = (v: string) => /^\+?[\d\s()-]{7,}$/.test(v.trim())
