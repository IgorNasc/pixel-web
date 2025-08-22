"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SidebarMeta() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Como funciona</CardTitle>
          <CardDescription>Passo a passo (Meta).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>1. Abra a aba Meta.</p>
          <p>2. Copie o ID do Pixel no Events Manager.</p>
          <p>3. Gere o token de acesso do servidor (Conversions API).</p>
          <p>4. Cole os dois campos aqui e clique em Salvar.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ajuda rápida</CardTitle>
          <CardDescription>Onde encontrar no Meta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>ID do Pixel: Events Manager → Conjuntos de dados → selecione o Pixel → copiar ID.</li>
            <li>Token do servidor: Events Manager → Configurações → Conversions API → Gerar token.</li>
            <li>Google: estará disponível em breve na aba “Em breve”.</li>
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
