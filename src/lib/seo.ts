import { useEffect } from 'react'

const SITE = 'ВатКо'

/** Задава <title> и meta description за текущата страница. */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} — Виж къде отиват парите ти за ток`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  }, [title, description])
}
