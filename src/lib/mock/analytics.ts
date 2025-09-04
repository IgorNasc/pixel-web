import {
  type AnalyticsData,
  type AnalyticsFilters,
  type CampaignRow,
  type DedupDay,
  type EMQParamPresence,
  type EMQRow,
  type EngagementPoint,
  type FunnelCounts,
  type ImpactByEvent,
  type KPIs,
  type LatencyDay,
  type LeadQualityPoint,
  type RejectionDay,
  type Site,
  type Pixel,
  type TimePoint,
  type TopPageRow,
  type EventName,
} from "@/types/analytics"

// Simple seeded RNG for consistent results per filter set
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

export const MOCK_SITES: Site[] = [
  { id: "all", name: "All Sites", domain: "*" },
  { id: "site-1", name: "Pixel Store", domain: "pixel.store" },
  { id: "site-2", name: "Gadgets Pro", domain: "gadgets.pro" },
]

export const MOCK_PIXELS: Pixel[] = [
  { id: "all", name: "All Pixels", siteId: "all" },
  { id: "px-1", name: "Main Pixel", siteId: "site-1" },
  { id: "px-2", name: "Checkout Pixel", siteId: "site-1" },
  { id: "px-3", name: "Marketing Pixel", siteId: "site-2" },
]

const EVENTS: EventName[] = [
  "PageView",
  "ViewContent",
  "Search",
  "AddToCart",
  "InitiateCheckout",
  "Lead",
  "Purchase",
]

function eachDay(from: Date, to: Date): Date[] {
  const out: Date[] = []
  const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()))
  const end = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()))
  while (d <= end) {
    out.push(new Date(d))
    d.setUTCDate(d.getUTCDate() + 1)
  }
  return out
}

function emqScore(p: EMQParamPresence): number {
  // EMQ proxy suggestion (0..10):
  // em(2) + ph(2) + fbp(1) + fbc(1) + (ip&ua)(1) + (name/address fields combined)(1) + country/st/ct/zp coverage(2)
  // We approximate: em, ph up to 2 each; fbp,fbc up to 1 each; ip+ua up to 1 combined; country+st+ct+zp up to 2 combined.
  const clamp = (v: number, max: number) => Math.min(max, Math.max(0, v))
  const two = (n: number) => clamp(Math.round((n / 100) * 2), 2)
  const one = (n: number) => clamp(Math.round((n / 100) * 1), 1)
  const addr = Math.round(((p.country + p.st + p.ct + p.zp) / 400) * 2)
  const ipua = Math.round(((p.ip + p.ua) / 200) * 1)
  const score = two(p.em) + two(p.ph) + one(p.fbp) + one(p.fbc) + ipua + one((p.ct + p.st) / 2) + addr
  return Math.max(0, Math.min(10, score))
}

function genSeries(rng: () => number, days: Date[]): { series: TimePoint[]; recoveredByDay: number[] } {
  const series: TimePoint[] = []
  const rec: number[] = []
  let base = 800 + Math.floor(rng() * 400)
  for (let i = 0; i < days.length; i++) {
    const wave = Math.sin((i / Math.max(1, days.length - 1)) * Math.PI * 2) * 0.15 + 0.85
    const pixel = Math.max(50, Math.round(base * wave * (0.9 + rng() * 0.2)))
    const server = Math.max(40, Math.round(base * wave * (0.6 + rng() * 0.3)))
    // Overlap between pixel and server (events seen on both)
    const overlap = Math.round(Math.min(pixel, server) * (0.55 + rng() * 0.2))
    const final = pixel + server - overlap
    const recovered = Math.max(0, server - overlap)
    series.push({ date: days[i].toISOString().slice(0, 10), pixel, server, final })
    rec.push(recovered)
    // slow drift
    base += Math.round((rng() - 0.5) * 20)
  }
  return { series, recoveredByDay: rec }
}

function genImpact(rng: () => number, recoveredTotal: number, finalTotal: number): ImpactByEvent[] {
  const weights = [0.4, 0.25, 0.05, 0.12, 0.08, 0.03, 0.07]
  return EVENTS.map((event, i) => {
    const base = Math.max(1, Math.round(finalTotal * weights[i] * (0.9 + rng() * 0.2)))
    const rec = Math.max(0, Math.round(recoveredTotal * weights[i] * (0.9 + rng() * 0.2)))
    const liftPct = Math.min(100, Math.round((rec / Math.max(1, base)) * 100))
    return { event, recovered: rec, final: base, liftPct }
  })
}

function genFunnel(rng: () => number): FunnelCounts {
  const pageView = 100000 + Math.round(rng() * 5000)
  const viewContent = Math.round(pageView * (0.45 + rng() * 0.05))
  const addToCart = Math.round(viewContent * (0.15 + rng() * 0.05))
  const initiateCheckout = Math.round(addToCart * (0.45 + rng() * 0.08))
  const purchase = Math.round(initiateCheckout * (0.45 + rng() * 0.1))
  return { pageView, viewContent, addToCart, initiateCheckout, purchase }
}

function genEngagement(rng: () => number, days: Date[]): EngagementPoint[] {
  return days.map((d, i) => {
    const base = 40 + rng() * 20
    const pctScroll70 = Math.max(10, Math.min(95, Math.round(base + Math.sin(i / 4) * 8)))
    const pctDwell40 = Math.max(5, Math.min(90, Math.round(base - 5 + Math.cos(i / 5) * 6)))
    return { date: d.toISOString().slice(0, 10), pctScroll70, pctDwell40 }
  })
}

function genLeadQuality(rng: () => number): LeadQualityPoint[] {
  const b1 = 400 + Math.round(rng() * 100)
  const b2 = 300 + Math.round(rng() * 80)
  const b3 = 180 + Math.round(rng() * 60)
  return [
    { bucket: "0-2", count: b1, medianTimeSec: 9 + Math.round(rng() * 5) },
    { bucket: "3-5", count: b2, medianTimeSec: 17 + Math.round(rng() * 6) },
    { bucket: "6+", count: b3, medianTimeSec: 26 + Math.round(rng() * 8) },
  ]
}

function genEMQ(rng: () => number): EMQRow[] {
  return EVENTS.map((event) => {
    const presence: EMQParamPresence = {
      em: 50 + Math.round(rng() * 45),
      ph: 48 + Math.round(rng() * 45),
      fbp: 60 + Math.round(rng() * 35),
      fbc: 55 + Math.round(rng() * 35),
      ip: 65 + Math.round(rng() * 30),
      ua: 70 + Math.round(rng() * 25),
      country: 75 + Math.round(rng() * 20),
      st: 55 + Math.round(rng() * 25),
      ct: 52 + Math.round(rng() * 25),
      zp: 50 + Math.round(rng() * 25),
    }
    const emqProxy = emqScore(presence)
    return { event, presence, emqProxy }
  })
}

function genDedupAndRejections(rng: () => number, days: Date[]): { dedup: DedupDay[]; rejections: RejectionDay[] } {
  const dedup: DedupDay[] = []
  const rejections: RejectionDay[] = []
  const reasons = ["schema_invalid", "missing_field", "invalid_currency"]
  for (let i = 0; i < days.length; i++) {
    const date = days[i].toISOString().slice(0, 10)
    const dedupOkPct = Math.max(70, Math.min(99, Math.round(90 + Math.sin(i / 6) * 6 + (rng() - 0.5) * 5)))
    dedup.push({ date, dedupOkPct })
    const total = 30 + Math.round(rng() * 60)
    const r = reasons.map((reason) => ({ reason, count: Math.max(0, Math.round(total * (0.2 + rng() * 0.5))) }))
    rejections.push({ date, reasons: r })
  }
  return { dedup, rejections }
}

function genLatency(rng: () => number, days: Date[]): LatencyDay[] {
  return days.map((d, i) => {
    const p50 = Math.max(200, Math.round(300 + Math.sin(i / 5) * 60 + (rng() - 0.5) * 40))
    const p95 = p50 + 300 + Math.round(rng() * 120)
    const p99 = p95 + 300 + Math.round(rng() * 150)
    return { date: d.toISOString().slice(0, 10), p50, p95, p99 }
  })
}

function genTopPages(rng: () => number): TopPageRow[] {
  const pages = [
    "/",
    "/category/promo",
    "/product/alpha",
    "/product/beta",
    "/product/gamma",
    "/checkout",
  ]
  return pages.map((p) => {
    const viewContent = 1000 + Math.round(rng() * 1500)
    const addToCart = Math.round(viewContent * (0.1 + rng() * 0.1))
    const purchase = Math.round(addToCart * (0.2 + rng() * 0.2))
    const revenue = Math.round(purchase * (80 + rng() * 120))
    return { page: p, viewContent, addToCart, purchase, revenue }
  })
}

export type BuiltAnalytics = { data: AnalyticsData; kpis: KPIs }

export function buildMockAnalytics(filters: AnalyticsFilters): BuiltAnalytics {
  const key = `${filters.range.from.toISOString().slice(0, 10)}|${filters.range.to.toISOString().slice(0, 10)}|${filters.siteId}|${filters.pixelId}`
  const rng = mulberry32(hashString(key))
  const days = eachDay(filters.range.from, filters.range.to)

  const { series, recoveredByDay } = genSeries(rng, days)
  const impact = genImpact(rng, recoveredByDay.reduce((a, b) => a + b, 0), series.reduce((a, p) => a + p.final, 0))
  const funnel = genFunnel(rng)
  const engagement = genEngagement(rng, days)
  const leadQuality = genLeadQuality(rng)
  const emq = genEMQ(rng)
  const { dedup, rejections } = genDedupAndRejections(rng, days)
  const latency = genLatency(rng, days)
  const topPages = genTopPages(rng)

  const data: AnalyticsData = {
    sites: MOCK_SITES,
    pixels: MOCK_PIXELS,
    series,
    impact,
    funnel,
    engagement,
    leadQuality,
    emq,
    dedup,
    rejections,
    latency,
    topPages,
  }

  const kpis: KPIs = computeKPIs(data)
  return { data, kpis }
}

export function computeKPIs(data: AnalyticsData): KPIs {
  const finalTotal = data.series.reduce((a, p) => a + p.final, 0)
  const recovered = data.impact.reduce((a, r) => a + r.recovered, 0)
  const recoveredPct = Math.round((recovered / Math.max(1, finalTotal)) * 100)
  const trackedRevenue = data.topPages.reduce((a, r) => a + r.revenue, 0)
  const emqAverage = Math.round((data.emq.reduce((a, r) => a + r.emqProxy, 0) / Math.max(1, data.emq.length)) * 10) / 10
  const dedupOkPct = Math.round(data.dedup.reduce((a, d) => a + d.dedupOkPct, 0) / Math.max(1, data.dedup.length))
  const latencyP95 = Math.round(data.latency.reduce((a, l) => a + l.p95, 0) / Math.max(1, data.latency.length))
  const rejected = data.rejections.reduce((a, d) => a + d.reasons.reduce((x, r) => x + r.count, 0), 0)
  const capiRejectionPct = Math.min(100, Math.round((rejected / Math.max(1, finalTotal)) * 100))
  return { dedupFinal: finalTotal, recoveredPct, trackedRevenue, emqAverage, dedupOkPct, latencyP95, capiRejectionPct }
}

export function applyFilters(data: AnalyticsData, filters: AnalyticsFilters): AnalyticsData {
  // For mock mode, the generator already used filters in seed; here we could filter by site/pixel if not "all"
  // In this MVP, sites/pixels affect the seed (above), so we return as-is.
  return data
}

export function defaultDateRange(daysBack = 30) {
  const to = new Date()
  const from = new Date()
  from.setDate(to.getDate() - (daysBack - 1))
  return { from, to }
}

export const currencyBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

