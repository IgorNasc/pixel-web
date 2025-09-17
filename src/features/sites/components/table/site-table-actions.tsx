import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as React from "react"
import { Site } from "@/types/models"
import SiteActionsMenu from "@/features/sites/components/site-actions-menu"

type Props = {
  site: Site
  openEdit: (site: Site) => void
  tryDelete: (site: Site) => void
}

function SiteTableActions({ site, openEdit, tryDelete }: Props) {
  return (
    <div className="flex items-center gap-1 justify-end">
      <Button asChild size="sm" variant="outline" aria-label={`Gerenciar pixels de ${site.name}`}>
        <Link href={`/dashboard/sites/${site.id}/pixels`}>Gerenciar Pixels</Link>
      </Button>
      <SiteActionsMenu site={site} openEdit={openEdit} tryDelete={tryDelete} />
    </div>
  )
}

export default React.memo(SiteTableActions)
