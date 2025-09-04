"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type LatencyDay } from "@/types/analytics"

export function Latency({ data }: { data: LatencyDay[] }) {
  const config = {
    p50: { label: "p50", color: "hsl(217.2 91.2% 59.8%)" },
    p95: { label: "p95", color: "hsl(221.2 83.2% 53.3%)" },
    p99: { label: "p99", color: "hsl(346.8 77.2% 49.8%)" },
  } as const
  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Pipeline Latency</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="p50" stroke="var(--color-p50)" dot={false} />
            <Line type="monotone" dataKey="p95" stroke="var(--color-p95)" dot={false} />
            <Line type="monotone" dataKey="p99" stroke="var(--color-p99)" dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

