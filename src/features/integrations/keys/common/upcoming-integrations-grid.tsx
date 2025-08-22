"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type UpcomingIntegration = {
  name: string
  availableAt: Date
}

export function UpcomingIntegrationsGrid({ items }: { items: UpcomingIntegration[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <Card key={i.name}>
          <CardHeader>
            <CardTitle>{i.name}</CardTitle>
            <CardDescription>
              {i.availableAt.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
