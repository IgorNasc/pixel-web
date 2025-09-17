import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { copy } from "@/lib/copy"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Site } from "@/types/models"
import SiteActionsMenu from "@/features/sites/components/site-actions-menu"

type SiteView = Site & { pixels: number }

type Props = {
  items: SiteView[]
  openEdit: (site: Site) => void
  tryDelete: (site: Site) => void
}

const SiteCard = React.memo(function SiteCard({ site, openEdit, tryDelete }: { site: SiteView; openEdit: (s: Site) => void; tryDelete: (s: Site) => void }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-medium">
              {site.id ? (
                <Link href={`/dashboard/sites/${site.id}/pixels`} aria-label={`Gerenciar pixels de ${site.name}`} className="hover:underline">
                  {site.name}
                </Link>
              ) : (
                <span>{site.name}</span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <code className="break-all">{site.domain}</code>
              <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => copy(site.domain)} aria-label="Copiar domínio">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Pixels: {site.pixels}</div>
          </div>
          <SiteActionsMenu site={site} openEdit={openEdit} tryDelete={tryDelete} />
        </div>
        <div className="mt-3">
          <Button asChild className="w-full" aria-label={`Gerenciar pixels de ${site.name}`}>
            {site.id ? <Link href={`/dashboard/sites/${site.id}/pixels`}>Gerenciar Pixels</Link> : <span className="pointer-events-none opacity-60">Gerenciar Pixels</span>}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

function SiteMobileList({ items, openEdit, tryDelete }: Props) {
  return items.map((site) => <SiteCard key={site.id} site={site} openEdit={openEdit} tryDelete={tryDelete} />)
}

export default React.memo(SiteMobileList)
