import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, CheckCircle2 } from "lucide-react"
import * as React from "react"
import type { Pixel } from "@/types/models"

type Props = {
  pixel: Pixel
  onEdit: (p: Pixel) => void
  onDelete: (p: Pixel) => void
  onSetDefault?: (p: Pixel) => void
}

export default function PixelActionsMenu({ pixel, onEdit, onDelete, onSetDefault }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        {!pixel.isDefault && onSetDefault ? (
          <DropdownMenuItem onClick={() => onSetDefault(pixel)} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Definir ativo
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={() => onEdit(pixel)} className="flex items-center gap-2">
          <Pencil className="h-4 w-4" /> Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(pixel)} className="text-red-600 focus:text-red-600">
          <Trash2 className="h-4 w-4 mr-2" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

