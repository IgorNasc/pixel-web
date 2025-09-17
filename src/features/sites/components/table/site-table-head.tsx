import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as React from "react"

function SiteTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[320px]">Nome</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Pixels</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default React.memo(SiteTableHead)
