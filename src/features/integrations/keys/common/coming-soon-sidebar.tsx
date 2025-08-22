"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SidebarComingSoon() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Em breve</CardTitle>
        <CardDescription>Veja as datas de lançamento abaixo.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>Quando cada integração for liberada, mostraremos aqui as instruções passo a passo.</p>
      </CardContent>
    </Card>
  )
}
