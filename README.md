# ВатКо ⚡

**Виж къде отиват парите ти за ток.**

Уебсайт на учебна компания „ВатКо“ (Junior Achievement България, сектор енергетика). ВатКо е малък уред (ESP32 + безконтактна токова клема), който измерва консумацията на ток в реално време и я показва в мобилно приложение – в евро, по часове, с прогноза за сметката и съвети.

## Технологии

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts · Lucide · React Router

## Стартиране

```bash
npm install
npm run dev      # http://localhost:5173/vatko/
npm run build    # продукционна версия в dist/
```

## Структура

```
src/
  components/   общи компоненти (Navbar, Footer, LiveDemo, SavingsCalculator, Pricing, AppScreens…)
  pages/        страници: Начало, Продукт, Приложението, За нас, Блог, Статия, Контакти
  data/         статии за блога
  lib/          тема, SEO, форматиране, запис на заявки
```

## Какво трябва да се попълни

| Какво | Къде |
| --- | --- |
| Имена и снимки на екипа | `src/pages/About.tsx` (`team`) |
| Имейл, телефон | `src/components/Footer.tsx`, `src/pages/Contact.tsx` |
| Профили в социалните мрежи | `src/components/SocialIcons.tsx` (`links`) |
| Снимки/рендери на продукта | `src/pages/Product.tsx` (компоненти `Placeholder`) |
| Размери на уреда | `src/pages/Product.tsx` (`specs`) |
| Реални отзиви от бета теста | `src/pages/Home.tsx` (секция „Отзиви“) |

## Формите (предварителна поръчка и имейл)

В момента заявките се записват в `localStorage` на браузъра. За реално събиране на данни свържи **Formspree** или **Supabase** във функцията `save()` в `src/lib/leads.ts` – там има готов пример и за двата варианта.

## Публикуване

При всеки push към `main` GitHub Actions автоматично публикува сайта в GitHub Pages. Ако репото се преименува или се ползва собствен домейн, смени `base` във `vite.config.ts` (за собствен домейн – `'/'`).

---

Учебна компания по програма на Junior Achievement България · © 2026
