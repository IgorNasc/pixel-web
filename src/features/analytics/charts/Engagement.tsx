"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type EngagementPoint } from "@/types/analytics"

export function Engagement({ data }: { data: EngagementPoint[] }) {
  const config = {
    pctScroll70: { label: "% pages scroll ≥70%", color: "hsl(217.2 91.2% 59.8%)" },
    pctDwell40: { label: "% pages dwell ≥40s", color: "hsl(142.1 70.6% 45.3%)" },
  } as const
  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Content Engagement</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="pctScroll70" stroke="var(--color-pctScroll70)" dot={false} />
            <Line type="monotone" dataKey="pctDwell40" stroke="var(--color-pctDwell40)" dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

