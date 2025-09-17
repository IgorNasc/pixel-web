import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  openCreate: () => void
}

export default function SiteTableEmpty({ openCreate }: Props) {
  return (
    <div className="mt-8">
      <Card>
        <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
          <div className="text-lg font-medium">Nenhum site encontrado</div>
          <p className="text-sm text-muted-foreground">Crie seu primeiro site para começar a adicionar pixels e integrações.</p>
          <Button className="mt-2" onClick={openCreate}>Novo Site</Button>
        </CardContent>
      </Card>
    </div>
  )
}

