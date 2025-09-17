import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import * as React from "react"
import type { Pixel } from "@/types/models"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import PixelTableActions from "@/features/pixels/components/table/pixel-table-actions"
import {Button} from "@/components/ui/button";

function maskToken(token: string) {
  const tail = token.slice(-4)
  return `••••••••••${tail}`
}

type Props = {
  items: Pixel[]
  onEdit: (p: Pixel) => void
  onDelete: (p: Pixel) => void
  onSetDefault: (p: Pixel) => void
  onToggleActive: (p: Pixel, active: boolean) => void
  onOpenToken: (p: Pixel) => void
}

export default function PixelTableBody({ items, onEdit, onDelete, onSetDefault, onToggleActive, onOpenToken }: Props) {
  return (
    <TableBody>
      {items.map((p) => (
        <TableRow key={p.id}>
          <TableCell className="font-medium">{p.pixelId}</TableCell>
          <TableCell>{p.label ?? "—"}</TableCell>
          <TableCell>
            <Switch checked={!!p.isActive} onCheckedChange={(v) => onToggleActive(p, v)} aria-label={`Alternar ativo do pixel ${p.pixelId}`} />
          </TableCell>
          <TableCell>
            <Button variant="ghost" onClick={() => onOpenToken(p)}>
              <code className="text-xs select-none">{maskToken(p.token)}</code>
            </Button>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {p.isActive ? <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /></Badge> : <Badge variant="secondary">—</Badge>}
              {p.token ? <Badge variant="success" className="bg-green-600 hover:bg-green-600">Pronto</Badge> : <Badge variant="destructive">Bloqueado</Badge>}
            </div>
          </TableCell>
          <TableCell className="text-right">
            <PixelTableActions pixel={p} onEdit={onEdit} onDelete={onDelete} onSetDefault={!p.isActive ? onSetDefault : undefined} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

