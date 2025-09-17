import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as React from "react"

export default function PixelTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>ID do Pixel</TableHead>
        <TableHead>Rótulo</TableHead>
        <TableHead>Ativo</TableHead>
        <TableHead>Token</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}

