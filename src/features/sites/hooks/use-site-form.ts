"use client"

import { useCallback, useState } from "react"
import type { Site, SiteInput } from "@/types/models"

export type SiteFormMode = "create" | "edit"

export interface UseSiteFormOptions {
  onCreate?: (input: SiteInput) => Site | Promise<Site>
  onUpdate?: (siteId: string, input: SiteInput) => Site | Promise<Site>
  onSuccess?: (site: Site, mode: SiteFormMode) => void
  onError?: (error: unknown) => void
}

export interface UseSiteFormReturn {
  open: boolean
  mode: SiteFormMode
  editing?: Site
  openCreate: () => void
  openEdit: (site: Site) => void
  closeForm: () => void
  setOpen: (open: boolean) => void
  setEditing: (site: Site | undefined) => void
  onSubmit: (input: SiteInput) => Promise<void>
  formProps: {
    open: boolean
    mode: SiteFormMode
    site?: Site
    onOpenChange: (open: boolean) => void
    onSubmit: (input: SiteInput) => Promise<void>
  }
}

export function useSiteForm(options: UseSiteFormOptions = {}): UseSiteFormReturn {
  const { onCreate, onUpdate, onSuccess, onError } = options

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<SiteFormMode>("create")
  const [editing, setEditing] = useState<Site | undefined>(undefined)

  const openCreate = useCallback(() => {
    setMode("create")
    setEditing(undefined)
    setOpen(true)
  }, [])

  const openEdit = useCallback((site: Site) => {
    setMode("edit")
    setEditing(site)
    setOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setOpen(false)
  }, [])

  const onSubmit = useCallback(
    async (input: SiteInput) => {
      try {
        let result: Site
        if (mode === "create") {
          if (!onCreate) throw new Error("useSiteForm: onCreate handler is required for create mode")
          result = await onCreate(input)
        } else {
          if (!editing) throw new Error("useSiteForm: editing site is missing for edit mode")
          if (!onUpdate) throw new Error("useSiteForm: onUpdate handler is required for edit mode")
          result = await onUpdate(editing.id, input)
        }
        onSuccess?.(result, mode)
        setOpen(false)
      } catch (err) {
        onError?.(err)
        throw err
      }
    },
    [mode, editing, onCreate, onUpdate, onSuccess, onError]
  )

  const formProps = {
    open,
    mode,
    site: editing,
    onOpenChange: setOpen,
    onSubmit,
  }

  return {
    open,
    mode,
    editing,
    openCreate,
    openEdit,
    closeForm,
    setOpen,
    setEditing,
    onSubmit,
    formProps,
  }
}
