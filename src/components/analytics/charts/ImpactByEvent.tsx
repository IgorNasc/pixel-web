"use client"

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type ImpactByEvent } from "@/types/analytics"

export function ImpactByEvent({ data }: { data: ImpactByEvent[] }) {
  const config = {
    recovered: { label: "Recovered", color: "hsl(217.2 91.2% 59.8%)" },
    final: { label: "Final", color: "hsl(221.2 83.2% 53.3%)" },
  } as const

  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Server-Side Impact by Event</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <BarChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="event" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="recovered" fill="var(--color-recovered)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="final" fill="var(--color-final)" radius={[4, 4, 0, 0]} opacity={0.6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

