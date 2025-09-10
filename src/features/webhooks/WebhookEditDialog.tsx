"use client"

import * as React from "react"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription} from "@/components/ui/sheet"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { Webhook } from "@/types/models"
import { updateWebhook, generateSecret } from "@/lib/mock/db"
import { Copy, RefreshCw } from "lucide-react"

type Props = {
  open: boolean
  value: Webhook | null
  onOpenChange: (open: boolean) => void
  onUpdated: (w: Webhook) => void
}

const EVENT_PRESETS = ["order.paid", "refund.created", "lead.created", "order.created", "order.refunded", "subscription.renewed"]

export function WebhookEditDialog({ open, value, onOpenChange, onUpdated }: Props) {
  const { toast } = useToast()
  const [enabled, setEnabled] = React.useState<boolean>(!!value?.enabled)
  const [events, setEvents] = React.useState<string[]>(value?.events ?? [])
  const [secret, setSecret] = React.useState<string>(value?.secret ?? "")
  const [rotateOpen, setRotateOpen] = React.useState(false)

  React.useEffect(() => {
    setEnabled(!!value?.enabled)
    setEvents(value?.events ?? [])
    setSecret(value?.secret ?? "")
  }, [value, open])

  function copy(text: string) {
    try {
      navigator.clipboard?.writeText(text)
      toast({ title: "Copiado" })
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      toast({ title: "Copiado" })
    }
  }

  function save() {
    if (!value) return
    const updated = updateWebhook(value.id, { enabled, events, secret })
    if (updated) onUpdated(updated)
    toast({ title: "Webhook atualizado" })
    onOpenChange(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    save()
  }

  function rotateSecretConfirmed() {
    if (!value) return
    const newSecret = generateSecret(value.siteId)
    setSecret(newSecret)
    const updated = updateWebhook(value.id, { secret: newSecret })
    if (updated) onUpdated(updated)
    toast({ title: "Segredo rotacionado" })
    setRotateOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar Webhook</SheetTitle>
          <SheetDescription>Atualize as configurações de entrega e os eventos assinados.</SheetDescription>
        </SheetHeader>

        {!value ? (
          <div className="text-sm text-muted-foreground">Carregando...</div>
        ) : (
          <>
            <form id="webhook-edit-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-6 px-1 space-y-5" aria-label="Webhook edit form">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="enabled">Ativado</Label>
                  <div className="text-xs text-muted-foreground">Alterne para ativar ou desativar entregas.</div>
                </div>
                <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Segredo</Label>
                <div className="flex items-center gap-2">
                  <Input value={secret} readOnly aria-readonly />
                  <Button variant="outline" size="icon" onClick={() => copy(secret)} aria-label="Copiar segredo"><Copy className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" onClick={() => setRotateOpen(true)} aria-label="Rotacionar segredo"><RefreshCw className="h-4 w-4" /></Button>
                </div>
                <p className="text-xs text-muted-foreground">Guarde este segredo com segurança. Use-o para assinar requisições (HMAC).</p>
              </div>

              <div className="space-y-2">
                <Label>Eventos</Label>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_PRESETS.map((ev) => (
                    <label key={ev} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={events.includes(ev)} onCheckedChange={(v) => {
                        const checked = !!v
                        setEvents((curr) => (checked ? Array.from(new Set([...curr, ev])) : curr.filter((x) => x !== ev)))
                      }} />
                      {ev}
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-20" />
            </form>

            <div className="sticky bottom-0 -mx-6 px-6 py-4 border-t bg-background">
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} aria-label="Cancelar edição">Cancelar</Button>
                <Button type="submit" form="webhook-edit-form" aria-label="Salvar">Salvar</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>

      <AlertDialog open={rotateOpen} onOpenChange={setRotateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rotacionar segredo?</AlertDialogTitle>
            <AlertDialogDescription>
              Entregas existentes assinadas com o segredo antigo podem falhar na verificação. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={rotateSecretConfirmed}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Rotacionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}
