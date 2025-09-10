"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type EMQRow } from "@/types/analytics"

const PARAM_ORDER: (keyof EMQRow["presence"])[] = [
  "em",
  "ph",
  "fbp",
  "fbc",
  "ip",
  "ua",
  "country",
  "st",
  "ct",
  "zp",
]

import { Fragment } from "react"

export function EmqHeatmap({ data }: { data: EMQRow[] }) {
  return (
    <Card className="border">
      <CardHeader className="pb-2"><CardTitle className="text-base">EMQ by Event</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[720px] grid" style={{ gridTemplateColumns: `160px repeat(${PARAM_ORDER.length}, minmax(56px, 1fr)) 80px` }}>
            <div className="text-xs font-medium text-muted-foreground p-2">Event</div>
            {PARAM_ORDER.map((p) => (
              <div key={p} className="text-xs font-medium text-muted-foreground p-2 text-center uppercase">{p}</div>
            ))}
            <div className="text-xs font-medium text-muted-foreground p-2 text-right">EMQ</div>
            {data.map((row) => (
              <Fragment key={row.event}>
                <div className="p-2 text-sm font-medium">{row.event}</div>
                {PARAM_ORDER.map((p) => {
                  const v = row.presence[p]
                  const intensity = Math.round((v / 100) * 80) + 20 // 20..100
                  return (
                    <div
                      key={p}
                      className="p-2 text-center text-xs"
                      style={{
                        background: `hsl(221.2 83.2% ${intensity}%)`,
                        color: intensity > 55 ? "white" : "black",
                      }}
                      aria-label={`${p} presence ${v}%`}
                    >
                      {v}%
                    </div>
                  )
                })}
                <div className="p-2 text-right text-sm font-semibold">{row.emqProxy.toFixed(1)}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

