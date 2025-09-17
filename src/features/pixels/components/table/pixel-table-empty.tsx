import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = { onCreate: () => void }

export default function PixelTableEmpty({ onCreate }: Props) {
  return (
    <div className="mt-8">
      <Card>
        <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
          <div className="text-lg font-medium">Nenhum pixel ainda</div>
          <p className="text-sm text-muted-foreground">Adicione seu primeiro pixel para começar a enviar eventos.</p>
          <Button className="mt-2" onClick={onCreate}>Adicionar Pixel</Button>
        </CardContent>
      </Card>
    </div>
  )
}

