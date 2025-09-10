"use client"

import { Card, CardContent } from "@/components/ui/card"

export function KpiCards({ items }: { items: { label: string; value: string; delta?: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((k, i) => (
        <Card key={i} className="border">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="text-xl font-semibold">{k.value}</div>
            {k.delta ? <div className="text-xs text-muted-foreground">{k.delta}</div> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

