export type EventName =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead"
  | "Purchase"

export type TimePoint = { date: string; pixel: number; server: number; final: number }
export type ImpactByEvent = { event: EventName; recovered: number; final: number; liftPct: number }
export type FunnelCounts = {
  pageView: number
  viewContent: number
  addToCart: number
  initiateCheckout: number
  purchase: number
}
export type EngagementPoint = { date: string; pctScroll70: number; pctDwell40: number }
export type LeadQualityPoint = { bucket: "0-2" | "3-5" | "6+"; count: number; medianTimeSec: number }
export type EMQParamPresence = {
  em: number
  ph: number
  fbp: number
  fbc: number
  ip: number
  ua: number
  country: number
  st: number
  ct: number
  zp: number
}
export type EMQRow = { event: EventName; presence: EMQParamPresence; emqProxy: number }
export type DedupDay = { date: string; dedupOkPct: number }
export type RejectionDay = { date: string; reasons: Array<{ reason: string; count: number }> }
export type LatencyDay = { date: string; p50: number; p95: number; p99: number }
export type TopPageRow = { page: string; viewContent: number; addToCart: number; purchase: number; revenue: number }
export type CampaignRow = { campaign: string; final: number; pixelOnly: number; serverLiftPct: number }

export type Site = { id: string; name: string; domain: string }
export type Pixel = { id: string; name: string; siteId: string }

export type DateRange = { from: Date; to: Date }

export type AnalyticsFilters = {
  range: DateRange
  compare: boolean
  siteId: string | "all"
  pixelId: string | "all"
  funnelMode: "pixel" | "final"
}

export type AnalyticsData = {
  sites: Site[]
  pixels: Pixel[]
  series: TimePoint[]
  impact: ImpactByEvent[]
  funnel: FunnelCounts
  engagement: EngagementPoint[]
  leadQuality: LeadQualityPoint[]
  emq: EMQRow[]
  dedup: DedupDay[]
  rejections: RejectionDay[]
  latency: LatencyDay[]
  topPages: TopPageRow[]
}

export type KPIs = {
  dedupFinal: number
  recoveredPct: number
  trackedRevenue: number
  emqAverage: number
  dedupOkPct: number
  latencyP95: number
  capiRejectionPct: number
}

