import * as React from "react"
import type { Pixel } from "@/types/models"
import { Table } from "@/components/ui/table"
import PixelTableHead from "@/features/pixels/components/table/pixel-table-head"
import PixelTableBody from "@/features/pixels/components/table/pixel-table-body"
import PixelMobileList from "@/features/pixels/components/pixel-mobile-list"

type Props = {
  items: Pixel[]
  onEdit: (p: Pixel) => void
  onDelete: (p: Pixel) => void
  onSetDefault: (p: Pixel) => void
  onToggleActive: (p: Pixel, active: boolean) => void
  onOpenToken: (p: Pixel) => void
}

export default function PixelsList({ items, onEdit, onDelete, onSetDefault, onToggleActive, onOpenToken }: Props) {
  return (
    <>
      <div className="mt-6 hidden md:block">
        <Table>
          <PixelTableHead />
          <PixelTableBody
            items={items}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            onToggleActive={onToggleActive}
            onOpenToken={onOpenToken}
          />
        </Table>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
        <PixelMobileList items={items} onEdit={onEdit} onDelete={onDelete} onSetDefault={onSetDefault} onOpenToken={onOpenToken} />
      </div>
    </>
  )
}

