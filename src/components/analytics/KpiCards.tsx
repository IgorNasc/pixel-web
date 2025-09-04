"use client"

import { InfoIcon, NetworkIcon, ShoppingCartIcon, TimerIcon, CheckCircle2, ShieldX, BinaryIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { type KPIs } from "@/types/analytics"
import { AnimatedCounter } from "@/components/ui/animated-counter"

function Delta({ value }: { value: number }) {
  const up = value >= 0
  const sign = up ? "▲" : "▼"
  return <span className={`ml-2 text-xs ${up ? "text-green-600" : "text-red-600"}`}>{sign} {Math.abs(value)}%</span>
}

export function KpiCards({ kpis, compareDelta }: { kpis: KPIs; compareDelta?: Partial<Record<keyof KPIs, number>> }) {
  const items = [
    {
      key: "dedupFinal" as const,
      title: "Deduplicated Events",
      icon: CheckCircle2,
      hint: "Final = deduplicated merge of pixel + server streams.",
      value: kpis.dedupFinal.toLocaleString(),
    },
    {
      key: "recoveredPct" as const,
      title: "% Recovered Server-Side",
      icon: NetworkIcon,
      hint: "Recovered server-side = events that arrived only via server after deduplication.",
      value: `${kpis.recoveredPct}%`,
    },
    {
      key: "trackedRevenue" as const,
      title: "Tracked Revenue",
      icon: ShoppingCartIcon,
      hint: "Sum of Purchase.value across final events (mocked).",
      value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(kpis.trackedRevenue),
    },
    {
      key: "emqAverage" as const,
      title: "EMQ Average",
      icon: BinaryIcon,
      hint: "EMQ proxy 0–10 based on presence of user_data parameters: em, ph, fbp, fbc, ip, ua, country, st, ct, zp.",
      value: kpis.emqAverage.toFixed(1),
    },
    {
      key: "dedupOkPct" as const,
      title: "Dedup OK %",
      icon: CheckCircle2,
      hint: "Successful deduplication ratio across days (mocked).",
      value: `${kpis.dedupOkPct}%`,
    },
    {
      key: "latencyP95" as const,
      title: "Latency p95 (ms)",
      icon: TimerIcon,
      hint: "Latency p95: 95th percentile from interaction to CAPI send (mocked).",
      value: <AnimatedCounter value={kpis.latencyP95} duration={800} />,
    },
    {
      key: "capiRejectionPct" as const,
      title: "CAPI Rejections %",
      icon: ShieldX,
      hint: "Share of events rejected by CAPI over final volume (mocked).",
      value: `${kpis.capiRejectionPct}%`,
    },
  ]

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.key} className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.title}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" aria-label="Info" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="max-w-xs text-xs">
                    {item.hint}
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{item.value as any}{compareDelta && compareDelta[item.key] != null ? <Delta value={compareDelta[item.key]!} /> : null}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
