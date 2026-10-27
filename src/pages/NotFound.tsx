import { ZapOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Страницата не е намерена')
  return (
    <section className="container-x grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <ZapOff className="mx-auto size-14 text-sun-500" aria-hidden />
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Тук няма ток</h1>
        <p className="lead mt-4">Страницата, която търсиш, не съществува или е преместена.</p>
        <Link to="/" className="btn-primary mt-8">Към началото</Link>
      </div>
    </section>
  )
}
