"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import { SiteForm } from "@/features/sites/components/site-form"
import type { Site } from "@/types/models"
import { getSites, countPixelsBySite } from "@/lib/mock/db"
import SiteTableEmpty from "@/features/sites/components/table/site-table-empty";
import SiteDeleteDialog from "@/features/sites/components/site-delete-dialog";
import SitesList from "@/features/sites/components/sites-list";
import PageTitlesSection from "@/components/sections/page-title-section";
import { useSiteForm } from "@/features/sites/hooks/use-site-form";
import { Create, Update, deleteSiteWithChecks } from "@/features/sites/services/site-service";

export default function SitesClient() {
  const { toast } = useToast()
  const { openCreate, openEdit, formProps } = useSiteForm({
    onCreate: Create,
    onUpdate: Update,
    onSuccess: (site, mode) => {
      setSites((prev) => {
        const list = prev ?? []
        if (mode === "create") return [site, ...list]
        return list.map((s) => (s.id === site.id ? site : s))
      })
      toast({ title: "Site salvo", description: "Agora você pode adicionar pixels a este site." })
    },
    onError: () => toast({ title: "Erro ao salvar o site", variant: "destructive" }),
  })

  const [sites, setSites] = React.useState<Site[] | null>(null)
  const [search, setSearch] = React.useState("")
  const deferredSearch = React.useDeferredValue(search)
  const [guard, setGuard] = React.useState<{ open: boolean; site?: Site; pixels: number; webhooks: number }>({ open: false, pixels: 0, webhooks: 0 })

  React.useEffect(() => {
    setSites(getSites())
  }, [])

  const filtered = React.useMemo(() => {
    const list = sites ?? []
    const term = deferredSearch.trim().toLowerCase()
    return list.filter((s) => s.name.toLowerCase().includes(term) || s.domain.toLowerCase().includes(term))
  }, [sites, deferredSearch])

  const onChangeSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const itemsWithPixels = React.useMemo(() => {
    return filtered.map((s) => ({ ...s, pixels: countPixelsBySite(s.id) }))
  }, [filtered])

  const tryDelete = React.useCallback(
    async (site: Site) => {
      const confirmed = window.confirm(`Excluir site "${site.name}"?`)
      if (!confirmed) return

      const res = await deleteSiteWithChecks(site)
      if (!res.success) {
        setGuard({ open: true, site, pixels: res.pixels, webhooks: res.webhooks })
        return
      }

      setSites((prev) => (prev ?? []).filter((s) => s.id !== site.id))
      toast({ title: "Site excluído" })
    },
    [toast]
  )

  return (
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <PageTitlesSection title="Sites" description="Gerencie domínios e ambientes para seus pixels e webhooks.">
          <Button className="gap-2" onClick={openCreate} aria-label="Criar novo site">
            <Plus className="h-4 w-4" /> Novo Site
          </Button>
        </PageTitlesSection>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <Input
                placeholder="Buscar por nome ou domínio"
                value={search}
                onChange={onChangeSearch}
                aria-label="Texto do filtro" />
          </div>
        </div>

        {sites === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <SiteTableEmpty openCreate={openCreate} />
        ) : (
          <SitesList items={itemsWithPixels} openEdit={openEdit} tryDelete={tryDelete} />
        )}

        <SiteForm {...formProps} />

        <SiteDeleteDialog guard={guard} setGuard={setGuard} />
      </main>
  )
}
