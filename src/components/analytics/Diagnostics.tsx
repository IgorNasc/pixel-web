"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type TopPageRow, type RejectionDay } from "@/types/analytics"

export function Diagnostics({ topPages, rejections }: { topPages: TopPageRow[]; rejections: RejectionDay[] }) {
  const reasonsAgg = Object.values(
    rejections
      .flatMap((d) => d.reasons)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.reason] = (acc[r.reason] || 0) + r.count
        return acc
      }, {})
  )
  const topReasons = Object.entries(
    rejections
      .flatMap((d) => d.reasons)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.reason] = (acc[r.reason] || 0) + r.count
        return acc
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const hints: Record<string, string> = {
    schema_invalid: "Check event payload schema against platform requirements.",
    missing_field: "Provide required fields: event_name, event_time, user_data.",
    invalid_currency: "Ensure ISO 4217 currency codes (e.g., BRL, USD).",
  }

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="top-pages">
        <AccordionTrigger>
          <div className="text-left">
            <div className="font-medium">Top Pages/Products</div>
            <div className="text-xs text-muted-foreground">ViewContent, AddToCart, Purchase, Revenue</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card className="border">
            <CardHeader className="pb-2"><CardTitle className="text-base">Top Pages/Products</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">ViewContent</TableHead>
                    <TableHead className="text-right">AddToCart</TableHead>
                    <TableHead className="text-right">Purchase</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPages.map((r) => (
                    <TableRow key={r.page}>
                      <TableCell className="font-medium">{r.page}</TableCell>
                      <TableCell className="text-right">{r.viewContent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{r.addToCart.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{r.purchase.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(r.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="errors">
        <AccordionTrigger>
          <div className="text-left">
            <div className="font-medium">Error Map</div>
            <div className="text-xs text-muted-foreground">Top rejection reasons and hints</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Card className="border">
            <CardHeader className="pb-2"><CardTitle className="text-base">Top Rejection Reasons</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead>Hint</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topReasons.map(([reason, count]) => (
                    <TableRow key={reason}>
                      <TableCell className="font-medium">{reason}</TableCell>
                      <TableCell className="text-right">{count.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{hints[reason] || "Review payload and mapping."}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

