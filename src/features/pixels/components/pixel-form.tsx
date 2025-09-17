"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SecretInput } from "@/components/ui/secret-input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Pixel } from "@/types/models"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PixelFormInput = {
  pixelId: string
  label?: string
  token: string
  tokenConfirm?: string
  isDefault?: boolean
}

type Props = {
  open: boolean
  mode: "create" | "edit"
  siteHasActivePixel: boolean
  value?: Pixel
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => Promise<void> | void
}

export function PixelForm({ open, mode, value, siteHasActivePixel, onOpenChange, onSubmit }: Props) {
  const { toast } = useToast()

  const [form, setForm] = React.useState<PixelFormInput>(() =>
    value
      ? { pixelId: value.pixelId, label: value.label, token: value.token, isDefault: value.isActive }
      : { pixelId: "", label: "", token: "", tokenConfirm: "", isDefault: !siteHasActivePixel }
  )
  const [errors, setErrors] = React.useState<{ pixelId?: string; token?: string; tokenConfirm?: string }>({})
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (value) {
      setForm({ pixelId: value.pixelId, label: value.label, token: value.token, isDefault: value.isActive })
      setErrors({})
    } else {
      setForm({ pixelId: "", label: "", token: "", tokenConfirm: "", isDefault: !siteHasActivePixel })
      setErrors({})
    }
  }, [value, siteHasActivePixel])

  const validPixelId = /^\d{10,16}$/.test(form.pixelId)
  const tokenRequired = form.token.trim().length > 0
  const tokenMatchOk = mode === "edit" || form.token === form.tokenConfirm
  const canSave = validPixelId && tokenRequired && tokenMatchOk

  function validate(): boolean {
    const next: typeof errors = {}
    if (!validPixelId) next.pixelId = "Informe um ID de Pixel válido"
    if (!tokenRequired) next.token = "Token é obrigatório"
    if (mode === "create" && !tokenMatchOk) next.tokenConfirm = "Os tokens não correspondem"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit({ pixelId: form.pixelId, label: form.label, token: form.token, isDefault: form.isDefault })
      onOpenChange(false)
    } finally {
      setSubmitting(false)
    }
  }

  function copyToken() {
    const text = form.token
    if (!text) return
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Adicionar Pixel" : "Editar Pixel"}</SheetTitle>
          <SheetDescription>Conecte um Pixel da Meta a este site.</SheetDescription>
        </SheetHeader>
        <form id="pixel-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-6 px-1 space-y-5" aria-label="Formulário de pixel">
          <div className="space-y-2">
            <Label htmlFor="pixelId">ID do Pixel</Label>
            <Input
              id="pixelId"
              value={form.pixelId}
              onChange={(e) => setForm((f) => ({ ...f, pixelId: e.target.value }))}
              placeholder="123456789012345"
              inputMode="numeric"
              aria-invalid={!!errors.pixelId}
            />
            {errors.pixelId ? <p className="text-sm text-red-500">{errors.pixelId}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Rótulo</Label>
            <Input id="label" value={form.label ?? ""} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Pixel Principal" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="token">Token</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-muted-foreground underline decoration-dotted cursor-help">O que é isso?</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Token de acesso da Meta necessário para enviar eventos para este pixel.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <SecretInput id="token" value={form.token} onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))} aria-invalid={!!errors.token} />
              <Button type="button" variant="outline" size="sm" onClick={copyToken} aria-label="Copiar token" className="gap-2">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {errors.token ? <p className="text-sm text-red-500">{errors.token}</p> : null}
          </div>

          {mode === "create" && (
            <div className="space-y-2">
              <Label htmlFor="tokenConfirm">Confirmar token</Label>
              <Input id="tokenConfirm" type="password" value={form.tokenConfirm ?? ""} onChange={(e) => setForm((f) => ({ ...f, tokenConfirm: e.target.value }))} aria-invalid={!!errors.tokenConfirm} placeholder="Cole novamente para confirmar" />
              {errors.tokenConfirm ? <p className="text-sm text-red-500">{errors.tokenConfirm}</p> : <p className="text-xs text-muted-foreground">Cole novamente para confirmar</p>}
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <div>
              <Label htmlFor="isDefault">Definir como ativo</Label>
              {!siteHasActivePixel && form.token ? (
                <p className="text-xs text-muted-foreground">Ainda não há pixel ativo. Recomendamos definir este como ativo.</p>
              ) : null}
            </div>
            <Switch id="isDefault" checked={!!form.isDefault} onCheckedChange={(v) => setForm((f) => ({ ...f, isDefault: v }))} />
          </div>

          <div className="h-20" />
        </form>

        <div className="sticky bottom-0 -mx-6 px-6 py-4 border-t bg-background">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} aria-label="Cancelar edição">Cancelar</Button>
            <Button type="submit" form="pixel-form" aria-label="Salvar" disabled={!canSave || submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

