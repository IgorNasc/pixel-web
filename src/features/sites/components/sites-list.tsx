import * as React from "react"
import { Table } from "@/components/ui/table"
import { Site } from "@/types/models"
import SiteTableHead from "@/features/sites/components/table/site-table-head"
import SiteTableBody from "@/features/sites/components/table/site-table-body"
import SiteMobileList from "@/features/sites/components/site-mobile-list"

type SiteView = Site & { pixels: number }

type Props = {
  items: SiteView[]
  openEdit: (site: Site) => void
  tryDelete: (site: Site) => void
}

function SitesListComponent({ items, openEdit, tryDelete }: Props) {
  return (
    <>
      <div className="mt-6 hidden md:block">
        <Table>
          <SiteTableHead />
          <SiteTableBody items={items} openEdit={openEdit} tryDelete={tryDelete} />
        </Table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
        <SiteMobileList items={items} openEdit={openEdit} tryDelete={tryDelete} />
      </div>
    </>
  )
}

const SitesList = React.memo(SitesListComponent)
SitesList.displayName = "SitesList"

export default SitesList
