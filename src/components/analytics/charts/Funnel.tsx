"use client"

import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { type FunnelCounts } from "@/types/analytics"

export function Funnel({ data, mode }: { data: FunnelCounts; mode: "pixel" | "final" }) {
  const rows = [
    { name: "PageView", value: data.pageView },
    { name: "ViewContent", value: data.viewContent },
    { name: "AddToCart", value: data.addToCart },
    { name: "InitiateCheckout", value: data.initiateCheckout },
    { name: "Purchase", value: data.purchase },
  ]
  const config = { value: { label: mode === "pixel" ? "Pixel" : "Final", color: "hsl(221.2 83.2% 53.3%)" } } as const
  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">Conversion Funnel ({mode === "pixel" ? "Pixel-only" : "Final"})</CardTitle></CardHeader>
      <CardContent>
        <ChartContainer config={config as any} className="h-72">
          <BarChart data={rows} layout="vertical" margin={{ left: 24, right: 8, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={6}>
              <LabelList dataKey="value" position="right" className="fill-foreground" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

