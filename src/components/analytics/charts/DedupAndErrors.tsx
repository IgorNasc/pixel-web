"use client"

import { Bar, BarChart, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type DedupDay, type RejectionDay } from "@/types/analytics"

type Row = { date: string; dedupOkPct: number; schema_invalid: number; missing_field: number; invalid_currency: number }

export function DedupAndErrors({ dedup, rejections }: { dedup: DedupDay[]; rejections: RejectionDay[] }) {
  const merged: Row[] = dedup.map((d, i) => {
    const r = rejections[i]?.reasons || []
    const m: Row = {
      date: d.date,
      dedupOkPct: d.dedupOkPct,
      schema_invalid: r.find((x) => x.reason === "schema_invalid")?.count || 0,
      missing_field: r.find((x) => x.reason === "missing_field")?.count || 0,
      invalid_currency: r.find((x) => x.reason === "invalid_currency")?.count || 0,
    }
    return m
  })

  const config = {
    dedupOkPct: { label: "Dedup OK %", color: "hsl(142.1 70.6% 45.3%)" },
    schema_invalid: { label: "Schema invalid", color: "hsl(346.8 77.2% 49.8%)" },
    missing_field: { label: "Missing field", color: "hsl(221.2 83.2% 53.3%)" },
    invalid_currency: { label: "Invalid currency", color: "hsl(217.2 91.2% 59.8%)" },
  } as const

  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Dedup & Rejections</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <ComposedChart data={merged} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar yAxisId="left" dataKey="schema_invalid" stackId="a" fill="var(--color-schema_invalid)" />
            <Bar yAxisId="left" dataKey="missing_field" stackId="a" fill="var(--color-missing_field)" />
            <Bar yAxisId="left" dataKey="invalid_currency" stackId="a" fill="var(--color-invalid_currency)" />
            <Line yAxisId="right" type="monotone" dataKey="dedupOkPct" stroke="var(--color-dedupOkPct)" dot={false} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

