"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"
import { getSites, getPixelsBySite, createPixel, updatePixel, deletePixel, setDefaultPixel, countWebhooksByPixel } from "@/lib/mock/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { PixelForm } from "@/features/pixels/PixelForm"
import { Copy, MoreHorizontal, Pencil, Plus, ShieldCheck, Trash2, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Pixel } from "@/types/models"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SecretInput } from "@/components/ui/secret-input"

function maskToken(token: string, show: boolean) {
  if (show) return token
  const tail = token.slice(-4)
  return `••••••••••${tail}`
}

export default function PixelsClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  const { toast } = useToast()
  const params = useParams<{ id: string }>()
  const siteId = params?.id as string
  const site = React.useMemo(() => getSites().find((s) => s.id === siteId), [siteId])

  const [pixels, setPixels] = React.useState<Pixel[] | null>(null)
  // Token dialog state
  const [tokenDialog, setTokenDialog] = React.useState<{ open: boolean; pixel?: Pixel; reveal: boolean }>({ open: false, reveal: false })
  const [formOpen, setFormOpen] = React.useState(false)
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create")
  const [editing, setEditing] = React.useState<Pixel | undefined>(undefined)
  const [guard, setGuard] = React.useState<{ open: boolean; pixel?: Pixel; webhooks: number }>({ open: false, webhooks: 0 })
  const [disableConfirm, setDisableConfirm] = React.useState<{ open: boolean; pixel?: Pixel }>({ open: false })
  const [deleteConfirm, setDeleteConfirm] = React.useState<{ open: boolean; pixel?: Pixel }>({ open: false })

  React.useEffect(() => {
    if (!siteId) return
    setPixels(getPixelsBySite(siteId))
  }, [siteId])

  const siteHasDefault = React.useMemo(() => (pixels ?? []).some((p) => p.isDefault), [pixels])

  function openCreate() {
    setFormMode("create")
    setEditing(undefined)
    setFormOpen(true)
  }
  function openEdit(p: Pixel) {
    setFormMode("edit")
    setEditing(p)
    setFormOpen(true)
  }

  async function handleCreate(data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) {
    const created = createPixel(siteId, data)
    setPixels((prev) => [created, ...(prev ?? [])])
    toast({ title: "Pixel salvo" })
  }

  async function handleUpdate(data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) {
    if (!editing) return
    const updated = updatePixel(editing.id, data)
    if (updated) setPixels((prev) => (prev ?? []).map((p) => (p.id === updated!.id ? updated! : p)))
    toast({ title: "Pixel salvo" })
  }

  function doDelete(p: Pixel) {
    const used = countWebhooksByPixel(p.id)
    if (used > 0) {
      setGuard({ open: true, pixel: p, webhooks: used })
      return
    }
    setDeleteConfirm({ open: true, pixel: p })
  }

  function onSetDefault(p: Pixel) {
    setDefaultPixel(p.siteId, p.id)
    setPixels(getPixelsBySite(siteId))
  }

  function onToggleActive(p: Pixel, active: boolean) {
    if (!active) {
      // Ask for confirmation before disabling
      setDisableConfirm({ open: true, pixel: p })
      return
    }
    const updated = updatePixel(p.id, { isActive: true })
    if (updated) setPixels((prev) => (prev ?? []).map((x) => (x.id === p.id ? updated! : x)))
  }

  function confirmDisable() {
    const p = disableConfirm.pixel
    if (!p) return
    const updated = updatePixel(p.id, { isActive: false })
    if (updated) setPixels((prev) => (prev ?? []).map((x) => (x.id === p.id ? updated! : x)))
    setDisableConfirm({ open: false, pixel: undefined })
  }

  function confirmDelete() {
    const p = deleteConfirm.pixel
    if (!p) return
    if (deletePixel(p.id)) setPixels((prev) => (prev ?? []).filter((x) => x.id !== p.id))
    setDeleteConfirm({ open: false, pixel: undefined })
  }

  function copy(text: string) {
    try {
      navigator.clipboard?.writeText(text)
      toast({ title: "Copiado", description: "Token copiado." })
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      toast({ title: "Copiado", description: "Token copiado." })
  }
  }

  function openTokenDialog(p: Pixel) {
    setTokenDialog({ open: true, pixel: p, reveal: false })
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/sites">Voltar para Sites</Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{site?.name ?? "Site"}</span>
            {site?.domain ? <Badge variant="secondary" className="ml-2">{site.domain}</Badge> : null}
          </div>
          <div>
            <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Adicionar Pixel</Button>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-semibold tracking-tight">Pixels</h1>
          <p className="text-sm text-muted-foreground">Gerencie os pixels deste site.</p>
        </div>

        {pixels === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Carregando...</div>
        ) : pixels.length === 0 ? (
          <div className="mt-8">
            <Card>
              <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="text-lg font-medium">Nenhum pixel ainda</div>
                <p className="text-sm text-muted-foreground">Adicione seu primeiro pixel para começar a enviar eventos.</p>
                <Button className="mt-2" onClick={openCreate}>Adicionar Pixel</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mt-6 hidden md:block">
              <Table>
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
                <TableBody>
                  {pixels.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.pixelId}</TableCell>
                      <TableCell>{p.label ?? "—"}</TableCell>
                      <TableCell>
                        <Switch checked={!!p.isActive} onCheckedChange={(v) => onToggleActive(p, v)} aria-label={`Alternar ativo do pixel ${p.pixelId}`} />
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => openTokenDialog(p)}
                              className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-blue-100 hover:text-accent-foreground transition-colors cursor-pointer"
                              aria-label={`Ver token de ${p.pixelId}`}
                            >
                              <code className="text-xs select-none">{maskToken(p.token, false)}</code>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Clique para ver o token</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {p.token ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="success">Pronto</Badge>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Pronto para enviar eventos.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">Bloqueado</Badge>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Bloqueado = token ausente.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEdit(p)} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Editar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => doDelete(p)} className="text-red-600 focus:text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              {pixels.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium">{p.pixelId}</div>
                        <div className="text-xs text-muted-foreground">{p.label ?? "—"}</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!p.isActive && <DropdownMenuItem onClick={() => onSetDefault(p)}>Definir ativo</DropdownMenuItem>}
                          <DropdownMenuItem onClick={() => openEdit(p)}>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => doDelete(p)} className="text-red-600 focus:text-red-600">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {p.isActive ? <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /></Badge> : <Badge variant="secondary">—</Badge>}
                        {p.token ? <Badge variant="success" className="bg-green-600 hover:bg-green-600">Pronto</Badge> : <Badge variant="destructive">Bloqueado</Badge>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => openTokenDialog(p)} aria-label={`Ver token de ${p.pixelId}`}>Ver token</Button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs">
                      <button
                        type="button"
                        onClick={() => openTokenDialog(p)}
                        className="rounded-md px-1 py-0.5 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                        aria-label={`Ver token de ${p.pixelId}`}
                      >
                        <code className="select-none">{maskToken(p.token, false)}</code>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <PixelForm
          open={formOpen}
          mode={formMode}
          value={editing}
          siteHasActivePixel={siteHasDefault}
          onOpenChange={setFormOpen}
          onSubmit={formMode === "create" ? handleCreate : handleUpdate}
        />

        <AlertDialog open={guard.open} onOpenChange={(open) => setGuard((g) => ({ ...g, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Não é possível excluir este pixel</AlertDialogTitle>
              <AlertDialogDescription>
                Este pixel possui {guard.webhooks} webhooks vinculados. Reatribua ou remova-os primeiro.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fechar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href={guard.pixel ? `/dashboard/webhooks?pixelId=${guard.pixel.id}` : "#"}>Ver Webhooks</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={deleteConfirm.open} onOpenChange={(open) => setDeleteConfirm((s) => ({ ...s, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir este pixel?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. O pixel será removido permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-sm">
              <span className="text-muted-foreground">Pixel:</span>{" "}
              <span className="font-medium">{deleteConfirm.pixel?.pixelId}</span>
              {deleteConfirm.pixel?.label ? <span className="text-muted-foreground"> · {deleteConfirm.pixel?.label}</span> : null}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={disableConfirm.open} onOpenChange={(open) => setDisableConfirm((s) => ({ ...s, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Desativar este pixel?</AlertDialogTitle>
              <AlertDialogDescription>
                Eventos que usam este pixel deixarão de ser aceitos até ser reativado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-sm">
              <span className="text-muted-foreground">Pixel:</span>{" "}
              <span className="font-medium">{disableConfirm.pixel?.pixelId}</span>
              {disableConfirm.pixel?.label ? <span className="text-muted-foreground"> · {disableConfirm.pixel?.label}</span> : null}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDisable}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Desativar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={tokenDialog.open} onOpenChange={(open) => setTokenDialog((s) => ({ ...s, open }))}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Token do Pixel</DialogTitle>
              <DialogDescription>
                Mantenha este token em segredo. Use-o para autenticar seus eventos do pixel.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <div className="text-xs text-muted-foreground">Pixel</div>
              <div className="text-sm font-medium">{tokenDialog.pixel?.pixelId}{tokenDialog.pixel?.label ? ` · ${tokenDialog.pixel?.label}` : ""}</div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <SecretInput value={tokenDialog.pixel?.token ?? ""} readOnly aria-readonly />
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => tokenDialog.pixel && copy(tokenDialog.pixel.token)}
                  aria-label="Copiar token"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" /> Copiar
                </Button>
              </div>
            </div>
            <DialogFooter />
          </DialogContent>
        </Dialog>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
