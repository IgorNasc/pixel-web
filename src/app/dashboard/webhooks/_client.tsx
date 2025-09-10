"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "@/hooks/use-theme"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Copy, Link2, MoreHorizontal, Pencil, Plus, Trash2, CheckCircle2, Ban } from "lucide-react"
import type { Webhook, Site, Pixel } from "@/types/models"
import { getSites, getPixelsBySite, getWebhooks, createWebhook, updateWebhook, deleteWebhook } from "@/lib/mock/db"
import { WebhookWizard } from "@/features/webhooks/WebhookWizard"
import { WebhookEditDialog } from "@/features/webhooks/WebhookEditDialog"

export default function WebhooksClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  const { toast } = useToast()

  const [sites, setSites] = React.useState<Site[]>([])
  const [pixelsBySite, setPixelsBySite] = React.useState<Record<string, Pixel[]>>({})
  const [webhooks, setWebhooks] = React.useState<Webhook[] | null>(null)

  const [filterSiteId, setFilterSiteId] = React.useState<string | null>(null)
  const [filterPixelId, setFilterPixelId] = React.useState<string | null>(null)
  

  const [wizardOpen, setWizardOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Webhook | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<Webhook | null>(null)
  const [disableConfirm, setDisableConfirm] = React.useState<{ open: boolean; webhook?: Webhook }>({ open: false })

  React.useEffect(() => {
    const s = getSites()
    setSites(s)
    const map: Record<string, Pixel[]> = {}
    for (const site of s) map[site.id] = getPixelsBySite(site.id)
    setPixelsBySite(map)
    setWebhooks(getWebhooks())
  }, [])

  const siteMap = React.useMemo(() => Object.fromEntries(sites.map((s) => [s.id, s])), [sites])
  const pixelMap = React.useMemo(() => {
    const entries: [string, Pixel][] = []
    for (const siteId of Object.keys(pixelsBySite)) {
      for (const p of pixelsBySite[siteId]) entries.push([p.id, p])
    }
    return Object.fromEntries(entries)
  }, [pixelsBySite])

  const filtered = React.useMemo(() => {
    const all = webhooks ?? []
    let list = all
    if (filterSiteId) list = list.filter((w) => w.siteId === filterSiteId)
    if (filterPixelId) list = list.filter((w) => w.pixelId === filterPixelId)
    return list
  }, [webhooks, filterSiteId, filterPixelId])

  function copyToClipboard(text: string) {
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

  function onCreated(w: Webhook) {
    setWebhooks((prev) => [w, ...(prev ?? [])])
    toast({ title: "Webhook criado" })
  }

  function toggleEnabled(w: Webhook) {
    const updated = updateWebhook(w.id, { enabled: !w.enabled })
    if (updated) setWebhooks((prev) => (prev ?? []).map((x) => (x.id === w.id ? updated! : x)))
  }

  function requestToggleEnabled(w: Webhook) {
    if (w.enabled) {
      setDisableConfirm({ open: true, webhook: w })
      return
    }
    toggleEnabled(w)
  }

  function doDelete(w: Webhook) {
    setDeleteTarget(w)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    const ok = deleteWebhook(deleteTarget.id)
    if (ok) {
      setWebhooks((prev) => (prev ?? []).filter((x) => x.id !== deleteTarget.id))
      toast({ title: "Webhook excluído" })
    }
    setDeleteTarget(null)
  }

  const siteOptions = sites
  const pixelOptions = filterSiteId ? pixelsBySite[filterSiteId] ?? [] : []

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Webhooks</h1>
            <p className="text-sm text-muted-foreground">Gerencie webhooks de entrada mapeados para seus sites e pixels.</p>
          </div>
          <div>
            <Button className="gap-2" onClick={() => setWizardOpen(true)} aria-label="Criar webhook">
              <Plus className="h-4 w-4" /> Novo Webhook
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Site filter */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Site</div>
            <SearchableSelect
              items={siteOptions.map((s) => ({ label: `${s.name} (${s.domain})`, value: s.id }))}
              value={filterSiteId}
              onChange={(v) => { setFilterSiteId(v); setFilterPixelId(null) }}
              placeholder="Todos os sites"
              allLabel="Todos os sites"
              inputPlaceholder="Filtrar sites..."
              emptyText="Nenhum site encontrado."
            />
          </div>

          {/* Pixel filter */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Pixel</div>
            <SearchableSelect
              items={pixelOptions.map((p) => ({ label: `${p.pixelId}${p.label ? ` • ${p.label}` : ""}`, value: p.id }))}
              value={filterPixelId}
              onChange={(v) => setFilterPixelId(v)}
              placeholder={filterSiteId ? "Todos os pixels" : "Selecione um site primeiro"}
              allLabel={filterSiteId ? "Todos os pixels" : undefined}
              inputPlaceholder={filterSiteId ? "Filtrar pixels..." : "Selecione um site primeiro"}
              emptyText={filterSiteId ? "Nenhum pixel" : ""}
              disabled={!filterSiteId}
            />
            <div className="text-xs text-muted-foreground mt-1">Apenas pixels do site selecionado.</div>
          </div>

          
        </div>

        {webhooks === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="mt-8">
            <Card>
              <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="text-lg font-medium">Nenhum webhook</div>
                <p className="text-sm text-muted-foreground">Crie seu primeiro webhook para receber eventos dos provedores.</p>
                <Button className="mt-2" onClick={() => setWizardOpen(true)}>Novo Webhook</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mt-6 hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origem</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Pixel</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última entrega</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((w) => {
                    const site = siteMap[w.siteId]
                    const pixel = pixelMap[w.pixelId]
                    return (
                      <TableRow key={w.id}>
                        <TableCell className="font-medium">{w.source}</TableCell>
                        <TableCell>
                          {site ? (
                            <Link href={`/dashboard/sites/${site.id}/pixels`} className="underline-offset-2 hover:underline">{site.name}</Link>
                          ) : (
                            <span>—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {pixel ? (
                            <span>{pixel.pixelId}{pixel.label ? ` • ${pixel.label}` : ""}</span>
                          ) : (
                            <span>—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs break-all">{w.url}</code>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(w.url)} aria-label="Copy URL"><Copy className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {w.enabled ? (
                            <Badge variant="success" className="bg-green-600 hover:bg-green-600">Ativado</Badge>
                          ) : (
                            <Badge variant="secondary">Desativado</Badge>
                          )}
                        </TableCell>
                        <TableCell>{w.lastDeliveryAt ? new Date(w.lastDeliveryAt).toLocaleString() : "—"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setEditing(w)} className="gap-2"><Pencil className="h-4 w-4" /> Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => requestToggleEnabled(w)} className="gap-2">
                                {w.enabled ? (<><Ban className="h-4 w-4" /> Desativar</>) : (<><CheckCircle2 className="h-4 w-4" /> Ativar</>)}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => doDelete(w)} className="text-red-600 focus:text-red-600 gap-2"><Trash2 className="h-4 w-4" /> Excluir</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              {filtered.map((w) => {
                const site = siteMap[w.siteId]
                const pixel = pixelMap[w.pixelId]
                return (
                  <Card key={w.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{w.source}</div>
                          <div className="text-xs text-muted-foreground">{site ? site.name : "—"} • {pixel ? pixel.pixelId : "—"}</div>
                        </div>
                        {w.enabled ? (
                          <Badge variant="success" className="bg-green-600 hover:bg-green-600">Enabled</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Link2 className="h-3 w-3" />
                        <code className="break-all flex-1">{w.url}</code>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(w.url)} aria-label="Copiar URL"><Copy className="h-4 w-4" /></Button>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditing(w)}>Editar</Button>
                        <Button size="sm" variant={w.enabled ? "secondary" : "default"} onClick={() => requestToggleEnabled(w)}>
                          {w.enabled ? "Desativar" : "Ativar"}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => doDelete(w)}>Excluir</Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        <WebhookWizard
          open={wizardOpen}
          onOpenChange={setWizardOpen}
          onCreated={(w) => onCreated(w)}
          onAfterCreate={() => setWizardOpen(false)}
        />

        <WebhookEditDialog
          open={!!editing}
          value={editing}
          onOpenChange={(open) => !open && setEditing(null)}
          onUpdated={(w) => setWebhooks((prev) => (prev ?? []).map((x) => (x.id === w.id ? w : x)))}
        />

        <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir webhook?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o webhook associado ao site "{deleteTarget ? (siteMap[deleteTarget.siteId]?.name ?? "—") : "—"}" e ao pixel "{deleteTarget ? (pixelMap[deleteTarget.pixelId]?.pixelId ?? "—") : "—"}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={disableConfirm.open} onOpenChange={(open) => setDisableConfirm((s) => ({ ...s, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Desativar este webhook?</AlertDialogTitle>
              <AlertDialogDescription>
                Os eventos deixarão de ser entregues por este webhook até que seja reativado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-sm">
              <div>
                <span className="text-muted-foreground">Origem:</span>{" "}
                <span className="font-medium">{disableConfirm.webhook?.source}</span>
              </div>
              <div>
                <span className="text-muted-foreground">URL:</span>{" "}
                <span className="font-medium break-all">{disableConfirm.webhook?.url}</span>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const w = disableConfirm.webhook
                  if (!w) return
                  const updated = updateWebhook(w.id, { enabled: false })
                  if (updated) setWebhooks((prev) => (prev ?? []).map((x) => (x.id === w.id ? updated! : x)))
                  setDisableConfirm({ open: false, webhook: undefined })
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Desativar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
