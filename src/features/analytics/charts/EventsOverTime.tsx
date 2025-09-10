"use client"

import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type TimePoint } from "@/types/analytics"

export function EventsOverTime({ data }: { data: TimePoint[] }) {
  const config = {
    pixel: { label: "Pixel", color: "hsl(221.2 83.2% 53.3%)" },
    server: { label: "Server", color: "hsl(142.1 70.6% 45.3%)" },
    final: { label: "Final", color: "hsl(346.8 77.2% 49.8%)" },
  } as const

  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Events Over Time</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area type="monotone" dataKey="pixel" stroke="var(--color-pixel)" fill="var(--color-pixel)" fillOpacity={0.2} />
            <Area type="monotone" dataKey="server" stroke="var(--color-server)" fill="var(--color-server)" fillOpacity={0.2} />
            <Line type="monotone" dataKey="final" stroke="var(--color-final)" dot={false} strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

