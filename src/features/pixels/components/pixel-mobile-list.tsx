import { Card, CardContent } from "@/components/ui/card"
import * as React from "react"
import type { Pixel } from "@/types/models"
import PixelActionsMenu from "@/features/pixels/components/pixel-actions-menu"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SecretInput } from "@/components/ui/secret-input"

type Props = {
  items: Pixel[]
  onEdit: (p: Pixel) => void
  onDelete: (p: Pixel) => void
  onSetDefault: (p: Pixel) => void
  onOpenToken: (p: Pixel) => void
}

export default function PixelMobileList({ items, onEdit, onDelete, onSetDefault, onOpenToken }: Props) {
  return items.map((p) => (
    <Card key={p.id}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-medium">{p.pixelId}</div>
            <div className="text-xs text-muted-foreground">{p.label ?? "—"}</div>
          </div>
          <PixelActionsMenu pixel={p} onEdit={onEdit} onDelete={onDelete} onSetDefault={!p.isActive ? onSetDefault : undefined} />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {p.isActive ? <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /></Badge> : <Badge variant="secondary">—</Badge>}
            {p.token ? <Badge variant="success" className="bg-green-600 hover:bg-green-600">Pronto</Badge> : <Badge variant="destructive">Bloqueado</Badge>}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => onOpenToken(p)} aria-label={`Ver token de ${p.pixelId}`}>Ver token</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ))
}

