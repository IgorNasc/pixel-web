"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EmptyState({ message = "No data in the selected range. Try expanding the date range or removing filters." }) {
  return (
    <Card className="border">
      <CardContent className="py-8 flex flex-col items-center justify-center text-center gap-3">
        <div className="text-sm text-muted-foreground">{message}</div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

