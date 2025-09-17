import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import * as React from "react"
import { Site } from "@/types/models"
import { copy } from "@/lib/copy"
import SiteTableActions from "@/features/sites/components/table/site-table-actions"

type SiteView = Site & { pixels: number }

type Props = {
  items: SiteView[]
  openEdit: (site: Site) => void
  tryDelete: (site: Site) => void
}

const SiteRow = React.memo(function SiteRow({ site, openEdit, tryDelete }: { site: SiteView; openEdit: (s: Site) => void; tryDelete: (s: Site) => void }) {
  return (
    <TableRow className="group">
      <TableCell>
        <div className="font-medium">
          {site.id ? (
            <Link
              href={`/dashboard/sites/${site.id}/pixels`}
              aria-label={`Gerenciar pixels de ${site.name}`}
              className="hover:underline focus:outline-none focus:underline"
            >
              {site.name}
            </Link>
          ) : (
            <span>{site.name}</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <code className="text-xs break-all">{site.domain}</code>
          <Button variant="ghost" size="sm" onClick={() => copy(site.domain)} aria-label="Copiar URL">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">Não configurado</span>
      </TableCell>
      <TableCell>{site.pixels}</TableCell>
      <TableCell className="text-right">
        <SiteTableActions site={site} openEdit={openEdit} tryDelete={tryDelete} />
      </TableCell>
    </TableRow>
  )
})

function SiteTableBodyComponent({ items, openEdit, tryDelete }: Props) {
  return (
    <TableBody>
      {items.map((site) => (
        <SiteRow key={site.id} site={site} openEdit={openEdit} tryDelete={tryDelete} />
      ))}
    </TableBody>
  )
}

const SiteTableBody = React.memo(SiteTableBodyComponent)
SiteTableBody.displayName = "SiteTableBody"

export default SiteTableBody
