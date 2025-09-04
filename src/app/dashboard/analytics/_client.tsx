"use client"

import { useMemo, useState } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"
import { FiltersBar } from "@/components/analytics/FiltersBar"
import { KpiCards } from "@/components/analytics/KpiCards"
import { EventsOverTime } from "@/components/analytics/charts/EventsOverTime"
import { ImpactByEvent } from "@/components/analytics/charts/ImpactByEvent"
import { Funnel } from "@/components/analytics/charts/Funnel"
import { Engagement } from "@/components/analytics/charts/Engagement"
import { LeadQuality } from "@/components/analytics/charts/LeadQuality"
import { EmqHeatmap } from "@/components/analytics/charts/EmqHeatmap"
import { DedupAndErrors } from "@/components/analytics/charts/DedupAndErrors"
import { Latency } from "@/components/analytics/charts/Latency"
import { Diagnostics } from "@/components/analytics/Diagnostics"
import { EmptyState } from "@/components/analytics/EmptyState"
import { buildMockAnalytics, defaultDateRange } from "@/lib/mock/analytics"
import { type AnalyticsFilters } from "@/types/analytics"

export default function AnalyticsClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()

  const [mockMode, setMockMode] = useState(true)
  const [filters, setFilters] = useState<AnalyticsFilters>(() => ({
    range: defaultDateRange(30),
    compare: false,
    siteId: "all",
    pixelId: "all",
    funnelMode: "final",
  }))

  const current = useMemo(() => buildMockAnalytics(filters), [filters])
  const compare = useMemo(() => {
    if (!filters.compare) return undefined
    const diffMs = filters.range.to.getTime() - filters.range.from.getTime()
    const prevTo = new Date(filters.range.from.getTime() - 24 * 3600 * 1000)
    const prevFrom = new Date(prevTo.getTime() - diffMs)
    const prev = buildMockAnalytics({ ...filters, range: { from: prevFrom, to: prevTo } })
    return prev
  }, [filters])

  const compareDelta = useMemo(() => {
    if (!compare) return undefined
    const c = current.kpis
    const p = compare.kpis
    const pct = (a: number, b: number) => Math.round(((a - b) / Math.max(1, b)) * 100)
    return {
      dedupFinal: pct(c.dedupFinal, p.dedupFinal),
      recoveredPct: c.recoveredPct - p.recoveredPct,
      trackedRevenue: pct(c.trackedRevenue, p.trackedRevenue),
      emqAverage: Math.round((c.emqAverage - p.emqAverage) * 10),
      dedupOkPct: c.dedupOkPct - p.dedupOkPct,
      latencyP95: pct(c.latencyP95, p.latencyP95),
      capiRejectionPct: c.capiRejectionPct - p.capiRejectionPct,
    }
  }, [current, compare])

  if (!mounted) return null

  const noData = current.data.series.length === 0

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
            <p className={`${themeClasses.textSecondary} mt-1`}>Server + Pixel analytics with deduplication and EMQ.</p>
          </div>
        </div>

        <FiltersBar
          value={filters}
          onChange={setFilters}
          sites={current.data.sites}
          pixels={current.data.pixels}
          mockMode={mockMode}
          onToggleMockMode={() => setMockMode((v) => !v)}
        />

        <div className="mt-6" />

        <KpiCards kpis={current.kpis} compareDelta={compareDelta} />

        {noData ? (
          <div className="mt-6"><EmptyState /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <EventsOverTime data={current.data.series} />
            </div>
            <ImpactByEvent data={current.data.impact} />
            <Funnel data={current.data.funnel} mode={filters.funnelMode} />
            <Engagement data={current.data.engagement} />
            <LeadQuality data={current.data.leadQuality} />
            <div className="lg:col-span-2">
              <EmqHeatmap data={current.data.emq} />
            </div>
            <div className="lg:col-span-2">
              <DedupAndErrors dedup={current.data.dedup} rejections={current.data.rejections} />
            </div>
            <Latency data={current.data.latency} />
          </div>
        )}

        <div className="mt-8">
          <Diagnostics topPages={current.data.topPages} rejections={current.data.rejections} />
        </div>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
