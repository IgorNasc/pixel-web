"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
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
  domain: "",
  env: "production",
  timezone: "America/Sao_Paulo",
  currency: "BRL",
}

export function SiteForm({ open, mode, site, onOpenChange, onSubmit }: Props) {
  const { toast } = useToast()
  const [values, setValues] = React.useState<SiteInput>(site ? { ...site, id: undefined as never } : DEFAULTS)
  const [errors, setErrors] = React.useState<{ name?: string; domain?: string }>({})
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    setValues(site ? { name: site.name, domain: site.domain, env: site.env, timezone: site.timezone, currency: site.currency } : DEFAULTS)
    setErrors({})
  }, [site, open])

  function validate(input: SiteInput) {
    const next: { name?: string; domain?: string } = {}
    if (!input.name.trim()) next.name = "Name is required"
    // Very loose host validation: letters/digits/dashes + dots
    const hostLike = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/
    if (!hostLike.test(input.domain.trim())) next.domain = "Enter a valid domain (e.g. example.com)"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate(values)) return
    try {
      setSubmitting(true)
      await onSubmit(values)
      toast({ title: mode === "create" ? "Site created" : "Site updated" })
      onOpenChange(false)
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err?.message ?? "Please try again", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "New Site" : "Edit Site"}</SheetTitle>
          <SheetDescription>
            {mode === "create" ? "Create a new site to organize pixels, webhooks and integrations." : "Update site details."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-6 space-y-5" aria-label="Site form">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="My Store"
              required
              aria-invalid={!!errors.name}
            />
            {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              value={values.domain}
              onChange={(e) => setValues((v) => ({ ...v, domain: e.target.value }))}
              placeholder="example.com"
              required
              aria-invalid={!!errors.domain}
            />
            {errors.domain ? <p className="text-sm text-red-500">{errors.domain}</p> : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="env">Environment</Label>
              <Select value={values.env} onValueChange={(val: "production" | "staging") => setValues((v) => ({ ...v, env: val }))}>
                <SelectTrigger id="env" aria-label="Environment">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={values.timezone}
                onChange={(e) => setValues((v) => ({ ...v, timezone: e.target.value }))}
                placeholder="America/Sao_Paulo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={values.currency}
                onChange={(e) => setValues((v) => ({ ...v, currency: e.target.value }))}
                placeholder="BRL"
              />
            </div>
          </div>

          <div className="h-20" />
        </form>

        <div className="sticky bottom-0 -mx-6 px-6 py-4 border-t bg-background">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} aria-label="Cancel editing">
              Cancel
            </Button>
            <Button type="submit" form="site-form" aria-label="Save" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
