import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../lib/theme'
import { Logo } from './Logo'

export const NAV = [
  { to: '/', label: 'Начало' },
  { to: '/produkt', label: 'Продукт' },
  { to: '/prilozhenie', label: 'Приложението' },
  { to: '/za-nas', label: 'За нас' },
  { to: '/blog', label: 'Съвети' },
  { to: '/kontakti', label: 'Контакти' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-navy-900/5 text-navy-900 dark:bg-white/10 dark:text-white'
        : 'text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/80'
          : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-volt-500 focus:px-4 focus:py-2 focus:text-navy-900">
        Към съдържанието
      </a>
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Основна навигация">
        <Link to="/" aria-label="ВатКо – начало">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.to === '/'} className={linkClass}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Светла тема' : 'Тъмна тема'}
            className="grid size-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
          </button>
          <Link to="/kontakti" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Поръчай
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full text-navy-900 transition hover:bg-slate-100 lg:hidden dark:text-white dark:hover:bg-white/10"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-y-auto lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-6">
              {NAV.map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3.5 text-2xl font-bold ${isActive ? 'bg-volt-500/10 text-volt-700 dark:text-volt-400' : ''}`
                    }
                  >
                    {n.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="mt-6">
                <Link to="/kontakti" className="btn-primary w-full !py-4 !text-base">
                  Поръчай предварително
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
