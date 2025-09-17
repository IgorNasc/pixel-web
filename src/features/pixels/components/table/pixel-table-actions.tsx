import * as React from "react"
import type { Pixel } from "@/types/models"
import PixelActionsMenu from "@/features/pixels/components/pixel-actions-menu"

type Props = {
  pixel: Pixel
  onEdit: (p: Pixel) => void
  onDelete: (p: Pixel) => void
  onSetDefault?: (p: Pixel) => void
}

export default function PixelTableActions({ pixel, onEdit, onDelete, onSetDefault }: Props) {
  return (
    <div className="flex items-center gap-1 justify-end">
      <PixelActionsMenu pixel={pixel} onEdit={onEdit} onDelete={onDelete} onSetDefault={onSetDefault} />
    </div>
  )
}

