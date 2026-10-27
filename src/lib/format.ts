const eur = new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num = new Intl.NumberFormat('bg-BG', { maximumFractionDigits: 1 })

export const formatEur = (v: number) => eur.format(v)
export const formatNum = (v: number) => num.format(v)

/** Средна цена на kWh за битов клиент в България (евро), ползва се за демо и калкулатор. */
export const PRICE_PER_KWH = 0.13
