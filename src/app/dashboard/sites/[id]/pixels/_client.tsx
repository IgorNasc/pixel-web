"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getSites, getPixelsBySite, createPixel, updatePixel, deletePixel, setDefaultPixel, countWebhooksByPixel } from "@/lib/mock/db"
import { useToast } from "@/hooks/use-toast"
import { PixelForm } from "@/features/pixels/components/pixel-form"
import { Plus } from "lucide-react"
import PixelsList from "@/features/pixels/components/pixels-list"
import PixelDeleteGuardDialog from "@/features/pixels/components/dialogs/pixel-delete-guard-dialog"
import PixelDeleteConfirmDialog from "@/features/pixels/components/dialogs/pixel-delete-confirm-dialog"
import PixelDisableConfirmDialog from "@/features/pixels/components/dialogs/pixel-disable-confirm-dialog"
import PixelTokenDialog from "@/features/pixels/components/dialogs/pixel-token-dialog"
import { usePixelForm } from "@/features/pixels/hooks/use-pixel-form"
import type { Pixel } from "@/types/models"
import PageTitlesSection from "@/components/sections/page-title-section"
import PixelTableEmpty from "@/features/pixels/components/table/pixel-table-empty";

export default function PixelsClient() {
  const { toast } = useToast()
  const params = useParams<{ id: string }>()
  const siteId = params?.id as string
  const site = React.useMemo(() => getSites().find((s) => s.id === siteId), [siteId])

  const [pixels, setPixels] = React.useState<Pixel[] | null>(null)
  const [tokenDialog, setTokenDialog] = React.useState<{ open: boolean; pixel?: Pixel; reveal: boolean }>({ open: false, reveal: false })
  const { openCreate, openEdit, formProps } = usePixelForm({
    onCreate: (data) => createPixel(siteId, data),
    onUpdate: (id, data) => {
      const updated = updatePixel(id, data)
      if (!updated) throw new Error("Pixel not found")
      return updated
    },
    onSuccess: (pixel, mode) => {
      setPixels((prev) => {
        const list = prev ?? []
        if (mode === "create") return [pixel, ...list]
        return list.map((p) => (p.id === pixel.id ? pixel : p))
      })
      toast({ title: "Pixel salvo" })
    },
    onError: () => toast({ title: "Erro ao salvar o pixel", variant: "destructive" }),
  })

  const [guard, setGuard] = React.useState<{ open: boolean; pixel?: Pixel; webhooks: number }>({ open: false, webhooks: 0 })
  const [disableConfirm, setDisableConfirm] = React.useState<{ open: boolean; pixel?: Pixel }>({ open: false })
  const [deleteConfirm, setDeleteConfirm] = React.useState<{ open: boolean; pixel?: Pixel }>({ open: false })

  React.useEffect(() => {
    if (!siteId) return
    setPixels(getPixelsBySite(siteId))
  }, [siteId])

  const siteHasDefault = React.useMemo(() => (pixels ?? []).some((p) => p.isDefault), [pixels])

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

  function openTokenDialog(p: Pixel) {
    setTokenDialog({ open: true, pixel: p, reveal: false })
  }

  return (
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
        </div>

        <div className="mt-6" />

        <PageTitlesSection title="Pixels" description="Gerencie os pixels deste site.">
          <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Adicionar Pixel</Button>
        </PageTitlesSection>

        {pixels === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Carregando...</div>
        ) : pixels.length === 0 ? (
          <PixelTableEmpty onCreate={openCreate} />
        ) : (
          <PixelsList
            items={pixels}
            onEdit={openEdit}
            onDelete={doDelete}
            onSetDefault={onSetDefault}
            onToggleActive={onToggleActive}
            onOpenToken={openTokenDialog}
          />
        )}

        <PixelForm
          open={formProps.open}
          mode={formProps.mode}
          value={formProps.value}
          siteHasActivePixel={siteHasDefault}
          onOpenChange={formProps.onOpenChange}
          onSubmit={formProps.onSubmit}
        />

        <PixelDeleteGuardDialog
            open={guard.open}
            pixel={guard.pixel}
            webhooks={guard.webhooks}
            onOpenChange={(open) => setGuard((g) => ({ ...g, open }))} />

        <PixelDeleteConfirmDialog
            open={deleteConfirm.open}
            pixel={deleteConfirm.pixel}
            onOpenChange={(open) => setDeleteConfirm((s) => ({ ...s, open }))}
            onConfirm={confirmDelete} />

        <PixelDisableConfirmDialog
            open={disableConfirm.open}
            pixel={disableConfirm.pixel}
            onOpenChange={(open) => setDisableConfirm((s) => ({ ...s, open }))}
            onConfirm={confirmDisable} />

        <PixelTokenDialog
            open={tokenDialog.open}
            pixel={tokenDialog.pixel}
            onOpenChange={(open) => setTokenDialog((s) => ({ ...s, open }))} />
      </main>
  )
}
