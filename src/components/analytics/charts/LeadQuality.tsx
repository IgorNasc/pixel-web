"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ComposedChart, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type LeadQualityPoint } from "@/types/analytics"

export function LeadQuality({ data }: { data: LeadQualityPoint[] }) {
  const config = {
    count: { label: "Leads", color: "hsl(221.2 83.2% 53.3%)" },
    medianTimeSec: { label: "Median time (s)", color: "hsl(346.8 77.2% 49.8%)" },
  } as const

  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Lead Quality</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <ComposedChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bucket" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="medianTimeSec" stroke="var(--color-medianTimeSec)" dot={false} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

