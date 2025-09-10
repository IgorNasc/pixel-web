"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getSites, getPixelsBySite, createSite, createPixel, generateWebhookUrl, generateSecret, createWebhook } from "@/lib/mock/db"
import type { Site, Pixel, Webhook } from "@/types/models"
import { SiteForm } from "@/features/sites/SiteForm"
import { PixelForm } from "@/features/pixels/PixelForm"
import { Copy, Plus, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { SecretInput } from "@/components/ui/secret-input"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (w: Webhook) => void
  onAfterCreate?: () => void
}

const EVENT_PRESETS = ["order.paid", "refund.created", "lead.created", "order.created", "order.refunded", "subscription.renewed"]
const SOURCES: Webhook["source"][] = ["Hotmart", "Shopify", "Woo", "Payments", "Email", "Custom"]

export function WebhookWizard({ open, onOpenChange, onCreated, onAfterCreate }: Props) {
  const { toast } = useToast()
  const [step, setStep] = React.useState(1)

  const [sites, setSites] = React.useState<Site[]>([])
  const [siteId, setSiteId] = React.useState<string | null>(null)
  const [pixels, setPixels] = React.useState<Pixel[]>([])
  const [pixelId, setPixelId] = React.useState<string | null>(null)

  const [createSiteOpen, setCreateSiteOpen] = React.useState(false)
  const [createPixelOpen, setCreatePixelOpen] = React.useState(false)

  const [source, setSource] = React.useState<Webhook["source"]>("Payments")
  const [events, setEvents] = React.useState<string[]>(["order.paid"])
  const [url, setUrl] = React.useState("")
  const [secret, setSecret] = React.useState("")

  React.useEffect(() => {
    setSites(getSites())
  }, [])

  React.useEffect(() => {
    if (siteId) {
      setPixels(getPixelsBySite(siteId))
      setUrl(generateWebhookUrl(siteId))
      setSecret(generateSecret(siteId))
    } else {
      setPixels([])
      setUrl("")
      setSecret("")
    }
    setPixelId(null)
  }, [siteId])

  function readyPixels(list: Pixel[]) {
    return list.filter((p) => !!p.token)
  }

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

  function next() {
    setStep((s) => Math.min(4, s + 1))
  }

  function back() {
    setStep((s) => Math.max(1, s - 1))
  }

  const selectedSite = sites.find((s) => s.id === siteId) || null
  const selectedPixel = pixels.find((p) => p.id === pixelId) || null

  const canNextFrom1 = !!siteId
  const canNextFrom2 = !!pixelId && !!selectedPixel?.token
  const canCreate = !!siteId && !!pixelId && !!url && !!secret && events.length > 0

  async function handleCreateSite(data: Parameters<typeof createSite>[0]) {
    const created = createSite(data)
    const nextSites = getSites()
    setSites(nextSites)
    setCreateSiteOpen(false)
    setSiteId(created.id)
    toast({ title: "Site criado" })
  }

  async function handleCreatePixel(data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) {
    if (!siteId) return
    const created = createPixel(siteId, data)
    setPixels(getPixelsBySite(siteId))
    setCreatePixelOpen(false)
    setPixelId(created.id)
    toast({ title: "Pixel adicionado" })
  }

  function createNow() {
    if (!canCreate || !siteId || !pixelId) return
    const w = createWebhook({
      siteId,
      pixelId,
      source,
      events,
      url,
      secret,
      enabled: true,
    })
    onCreated(w)
    toast({ title: "Webhook criado" })
    onAfterCreate?.()
    onOpenChange(false)
    setStep(1)
    setSiteId(null)
    setPixelId(null)
    setSource("Payments")
    setEvents(["order.paid"])
    setUrl("")
    setSecret("")
  }

  const siteHasDefault = React.useMemo(() => (pixels ?? []).some((p) => p.isDefault), [pixels])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Webhook</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Você pode criar um site sem sair do assistente.</div>
              <Button variant="outline" size="sm" onClick={() => setCreateSiteOpen(true)} className="gap-1"><Plus className="h-3 w-3" /> Criar site</Button>
            </div>
            <Label>Selecionar Site</Label>
            <div className="grid grid-cols-1 gap-2">
              {sites.length === 0 ? (
                <div className="text-sm text-muted-foreground border rounded-md p-3">Nenhum site encontrado.</div>
              ) : (
                sites.map((s) => {
                  const selected = s.id === siteId
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => { setSiteId(s.id); next() }}
                      className={cn(
                        "w-full border rounded-md px-4 py-3 flex items-center justify-between transition-colors",
                        selected ? "border-blue-600" : "border-border hover:border-blue-600"
                      )}
                    >
                      <div className="text-left">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.domain}</div>
                      </div>
                      {selected ? (
                        <Check className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button onClick={next} disabled={!canNextFrom1}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Você pode criar um pixel sem sair do assistente.</div>
              <Button variant="outline" size="sm" onClick={() => setCreatePixelOpen(true)} className="gap-1"><Plus className="h-3 w-3" /> Adicionar Pixel</Button>
            </div>
            <Label>Selecionar Pixel</Label>
            <div className="grid grid-cols-1 gap-2">
              {!selectedSite ? (
                <div className="text-sm text-muted-foreground border rounded-md p-3">Selecione um site primeiro.</div>
              ) : readyPixels(pixels).length === 0 ? (
                <div className="text-sm text-muted-foreground border rounded-md p-3">Nenhum pixel</div>
              ) : (
                readyPixels(pixels).map((p) => {
                  const selected = p.id === pixelId
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => { setPixelId(p.id); next() }}
                      className={cn(
                        "w-full border rounded-md px-4 py-3 flex items-center justify-between transition-colors",
                        selected ? "border-blue-600" : "border-border hover:border-blue-600"
                      )}
                    >
                      <div className="text-left">
                        <div className="font-medium">{p.pixelId}</div>
                        <div className="text-xs text-muted-foreground">{p.label ?? "—"}</div>
                      </div>
                      {selected ? (
                        <Check className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
            <div className="text-xs text-muted-foreground">Apenas pixels com token podem ser selecionados.</div>
            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={back}>Voltar</Button>
              <Button onClick={next} disabled={!canNextFrom2}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>URL do Webhook</Label>
                <div className="flex items-center gap-2">
                  <Input value={url} readOnly aria-readonly />
                  <Button variant="outline" size="icon" onClick={() => copy(url)} aria-label="Copiar URL"><Copy className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Segredo (HMAC)</Label>
                <div className="flex items-center gap-2">
                  <SecretInput value={secret} readOnly aria-readonly />
                  <Button variant="outline" size="icon" onClick={() => copy(secret)} aria-label="Copiar segredo"><Copy className="h-4 w-4" /></Button>
                </div>
                <p className="text-xs text-muted-foreground">Guarde este segredo com segurança. Use-o para assinar requisições (HMAC).</p>
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <Select value={source} onValueChange={(v: any) => setSource(v)}>
                  <SelectTrigger aria-label="Selecionar origem">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            </div>
            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={back}>Voltar</Button>
              <Button onClick={next} disabled={!canCreate}>Próximo</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-muted-foreground">Site</div>
                    <div className="font-medium">{selectedSite?.name}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Pixel</div>
                    <div className="font-medium">{selectedPixel ? `${selectedPixel.pixelId}${selectedPixel.label ? ` • ${selectedPixel.label}` : ""}` : "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Origem</div>
                    <div className="font-medium">{source}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">URL</div>
                    <div className="font-medium break-all">{url}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-muted-foreground">Segredo</div>
                    <div className="font-medium break-all">{secret}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-muted-foreground">Eventos</div>
                    <div className="font-medium">{events.join(", ")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={back}>Voltar</Button>
              <Button onClick={createNow} disabled={!canCreate}>Criar Webhook</Button>
            </div>
          </div>
        )}

        {/* Create Site Sheet */}
        <SiteForm open={createSiteOpen} mode="create" onOpenChange={setCreateSiteOpen} onSubmit={handleCreateSite} />

        {/* Create Pixel Sheet */}
        <PixelForm open={createPixelOpen} mode="create" value={undefined} siteHasDefault={siteHasDefault} onOpenChange={setCreatePixelOpen} onSubmit={handleCreatePixel} />
      </DialogContent>
    </Dialog>
  )
}
