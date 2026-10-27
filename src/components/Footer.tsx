import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV } from './Navbar'
import { SocialIcons } from './SocialIcons'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 dark:border-t dark:border-white/10">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" aria-label="ВатКо – начало" className="text-white">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-slate-400">Виж къде отиват парите ти за ток. Умен енергиен монитор, създаден в България.</p>
          <div className="mt-6">
            <SocialIcons />
          </div>
        </div>

        <nav className="md:col-span-3" aria-label="Навигация във футъра">
          <h2 className="text-sm font-bold tracking-wide text-white">Навигация</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition hover:text-volt-400">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* TODO: попълни реалните контакти на компанията */}
        <div className="md:col-span-4">
          <h2 className="text-sm font-bold tracking-wide text-white">Контакти</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-volt-400" aria-hidden />
              <a href="mailto:hello@vatko.bg" className="hover:text-volt-400">hello@vatko.bg</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-volt-400" aria-hidden />
              <a href="tel:+359000000000" className="hover:text-volt-400">+359 000 000 000</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-volt-400" aria-hidden />
              <span>България</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Учебна компания по програма на Junior Achievement България</p>
          <p>© 2026 ВатКо. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  )
}
