"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { MoreHorizontal, Plus, Pencil, Trash2, Copy } from "lucide-react"
import { SiteForm } from "@/features/sites/SiteForm"
import type { Site, SiteInput } from "@/types/models"
import { getSites, createSite, updateSite, deleteSite, countPixelsBySite, countWebhooksBySite } from "@/lib/mock/db"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"

export default function SitesClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  const { toast } = useToast()
  const [sites, setSites] = React.useState<Site[] | null>(null)
  const [q, setQ] = React.useState("")

  const [formOpen, setFormOpen] = React.useState(false)
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create")
  const [editing, setEditing] = React.useState<Site | undefined>(undefined)

  const [guard, setGuard] = React.useState<{ open: boolean; site?: Site; pixels: number; webhooks: number }>({ open: false, pixels: 0, webhooks: 0 })

  React.useEffect(() => {
    setSites(getSites())
  }, [])

  const filtered = React.useMemo(() => {
    const list = sites ?? []
    const term = q.trim().toLowerCase()
    return list.filter((s) => s.name.toLowerCase().includes(term) || s.domain.toLowerCase().includes(term))
  }, [sites, q])

  function openCreate() {
    setFormMode("create")
    setEditing(undefined)
    setFormOpen(true)
  }
  function openEdit(site: Site) {
    setFormMode("edit")
    setEditing(site)
    setFormOpen(true)
  }

  async function handleCreate(input: SiteInput) {
    const created = createSite(input)
    setSites((prev) => [created, ...(prev ?? [])])
    toast({
      title: "Site salvo",
      description: "Agora você pode adicionar pixels a este site.",
      action: (
        <Button asChild variant="default" className="h-8 px-3">
          <Link href={`/dashboard/sites/${created.id}/pixels`}>Ir para Pixels</Link>
        </Button>
      ),
    })
  }

  async function handleUpdate(input: SiteInput) {
    if (!editing) return
    const updated = updateSite(editing.id, input)
    if (updated) setSites((prev) => (prev ?? []).map((s) => (s.id === updated!.id ? updated! : s)))
    if (editing) {
      toast({
        title: "Site salvo",
        description: "Agora você pode adicionar pixels a este site.",
        action: (
          <Button asChild variant="default" className="h-8 px-3">
            <Link href={`/dashboard/sites/${editing.id}/pixels`}>Ir para Pixels</Link>
          </Button>
        ),
      })
    }
  }

  function tryDelete(site: Site) {
    const pixels = countPixelsBySite(site.id)
    const webhooks = countWebhooksBySite(site.id)
    if (pixels > 0 || webhooks > 0) {
      setGuard({ open: true, site, pixels, webhooks })
      return
    }
    const ok = window.confirm(`Excluir site "${site.name}"?`)
    if (!ok) return
    const success = deleteSite(site.id)
    if (success) {
      setSites((prev) => (prev ?? []).filter((s) => s.id !== site.id))
      toast({ title: "Site excluído" })
    }
  }

  function copy(text: string) {
    try {
      navigator.clipboard?.writeText(text)
      toast({ title: "Copiado", description: text })
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      toast({ title: "Copiado", description: text })
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sites</h1>
            <p className="text-sm text-muted-foreground">Gerencie domínios e ambientes para seus pixels e webhooks.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2" onClick={openCreate} aria-label="Criar novo site">
              <Plus className="h-4 w-4" /> Novo Site
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <Input placeholder="Buscar por nome ou domínio" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Texto do filtro" />
          </div>
        </div>

        {sites === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="mt-8">
            <Card>
              <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="text-lg font-medium">Nenhum site encontrado</div>
                <p className="text-sm text-muted-foreground">Crie seu primeiro site para começar a adicionar pixels e integrações.</p>
                <Button className="mt-2" onClick={openCreate}>Novo Site</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mt-6 hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[320px]">Nome</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pixels</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((site) => {
                    const pixels = countPixelsBySite(site.id)
                    return (
                      <TableRow key={site.id} className="group">
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
                            <Button variant="ghost" size="sm" onClick={() => copy(site.domain)} aria-label="Copiar URL"><Copy className="h-3 w-3" /></Button>
                          </div>

                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">Não configurado</span>
                        </TableCell>
                        <TableCell>{pixels}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button asChild size="sm" variant="outline" aria-label={`Gerenciar pixels de ${site.name}`}>
                              <Link href={`/dashboard/sites/${site.id}/pixels`}>Gerenciar Pixels</Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openEdit(site)} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Editar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => tryDelete(site)} className="text-red-600 focus:text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              {filtered.map((site) => {
                const pixels = countPixelsBySite(site.id)
                return (
                  <Card key={site.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-medium">
                            {site.id ? (
                              <Link href={`/dashboard/sites/${site.id}/pixels`} aria-label={`Manage pixels for ${site.name}`} className="hover:underline">
                                {site.name}
                              </Link>
                            ) : (
                              <span>{site.name}</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground" onClick={() => copy(site.domain)}><Copy className="h-4 w-4" />{site.domain}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(site)} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => tryDelete(site)} className="text-red-600 focus:text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-3">
                        <Button asChild className="w-full" aria-label={`Manage pixels for ${site.name}`}>
                          {site.id ? (
                            <Link href={`/dashboard/sites/${site.id}/pixels`}>Manage Pixels</Link>
                          ) : (
                            <span className="pointer-events-none opacity-60">Manage Pixels</span>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
              )
            })}
          </div>
          </>
        )}

        <SiteForm
          open={formOpen}
          mode={formMode}
          site={editing}
          onOpenChange={setFormOpen}
          onSubmit={formMode === "create" ? handleCreate : handleUpdate}
        />

        <AlertDialog open={guard.open} onOpenChange={(open) => setGuard((g) => ({ ...g, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Não é possível excluir este site</AlertDialogTitle>
              <AlertDialogDescription>
                Este site possui {guard.pixels} pixels e {guard.webhooks} webhooks associados. Remova-os primeiro para excluir o site.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fechar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/pixels` : "#"}>Ver Pixels</Link>
              </AlertDialogAction>
              <AlertDialogAction asChild>
                <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/webhooks` : "#"}>Ver Webhooks</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
