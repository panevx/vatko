// Lucide вече не включва лога на марки, затова иконите са вградени SVG.
const icons = {
  Instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
  ),
  TikTok: (
    <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 0 1-5.2 1.7 2.9 2.9 0 0 1 3.2-4.5V9.4a6.3 6.3 0 0 0-5.4 10.7 6.3 6.3 0 0 0 10.8-4.4v-7a8.2 8.2 0 0 0 4.8 1.5V6.8a4.8 4.8 0 0 1-1-.1z" />
  ),
  Facebook: (
    <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z" />
  ),
}

// TODO: замени с реалните профили на компанията
const links: Record<keyof typeof icons, string> = {
  Instagram: 'https://instagram.com/',
  TikTok: 'https://tiktok.com/',
  Facebook: 'https://facebook.com/',
}

export function SocialIcons() {
  return (
    <ul className="flex gap-3">
      {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
        <li key={name}>
          <a
            href={links[name]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`ВатКо в ${name}`}
            className="grid size-10 place-items-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-volt-500 hover:text-navy-900"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              {icons[name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
