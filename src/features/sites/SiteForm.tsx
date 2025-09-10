"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import type { Site, SiteInput } from "@/types/models"

type Props = {
  open: boolean
  mode: "create" | "edit"
  site?: Site
  onOpenChange: (open: boolean) => void
  onSubmit: (data: SiteInput) => Promise<void> | void
}

const DEFAULTS: SiteInput = {
  name: "",
  domain: ""
}

export function SiteForm({ open, mode, site, onOpenChange, onSubmit }: Props) {
  const [values, setValues] = React.useState<SiteInput>(site ? { ...site } : DEFAULTS)
  const [errors, setErrors] = React.useState<{ name?: string; domain?: string }>({})
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    setValues(site ? { name: site.name, domain: site.domain } : DEFAULTS)
    setErrors({})
  }, [site, open])

  function validate(input: SiteInput) {
    const next: { name?: string; domain?: string } = {}
    if (!input.name.trim()) next.name = "Nome é obrigatório"
    const hostLike = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/
    if (!hostLike.test(input.domain.trim())) next.domain = "Informe um domínio válido (ex.: example.com)"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate(values)) return
    try {
      setSubmitting(true)
      await onSubmit(values)
      onOpenChange(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Novo Site" : "Editar Site"}</SheetTitle>
          <SheetDescription>
            {mode === "create" ? "Crie um novo site para organizar pixels, webhooks e integrações." : "Atualize os detalhes do site."}
          </SheetDescription>
        </SheetHeader>
        <form id="site-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-6 px-1 space-y-5" aria-label="Formulário de site">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="Minha Loja"
              aria-invalid={!!errors.name}
            />
            {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domínio</Label>
            <Input
              id="domain"
              value={values.domain}
              onChange={(e) => setValues((v) => ({ ...v, domain: e.target.value }))}
              placeholder="example.com"
              aria-invalid={!!errors.domain}
            />
            {errors.domain ? <p className="text-sm text-red-500">{errors.domain}</p> : null}
          </div>

          <div className="h-20" />
        </form>

        <div className="sticky bottom-0 -mx-6 px-6 py-4 border-t bg-background">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} aria-label="Cancelar edição">
              Cancelar
            </Button>
            <Button type="submit" form="site-form" aria-label="Salvar" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
