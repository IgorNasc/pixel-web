"use client"

import { useCallback, useState } from "react"
import type { Pixel } from "@/types/models"

export type PixelFormMode = "create" | "edit"

export interface UsePixelFormOptions {
  onCreate?: (data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => Pixel | Promise<Pixel>
  onUpdate?: (pixelId: string, data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => Pixel | Promise<Pixel>
  onSuccess?: (pixel: Pixel, mode: PixelFormMode) => void
  onError?: (error: unknown) => void
}

export interface UsePixelFormReturn {
  open: boolean
  mode: PixelFormMode
  editing?: Pixel
  openCreate: () => void
  openEdit: (pixel: Pixel) => void
  closeForm: () => void
  setOpen: (open: boolean) => void
  setEditing: (pixel: Pixel | undefined) => void
  onSubmit: (data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => Promise<void>
  formProps: {
    open: boolean
    mode: PixelFormMode
    value?: Pixel
    onOpenChange: (open: boolean) => void
    onSubmit: (data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => Promise<void>
  }
}

export function usePixelForm(options: UsePixelFormOptions = {}): UsePixelFormReturn {
  const { onCreate, onUpdate, onSuccess, onError } = options

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<PixelFormMode>("create")
  const [editing, setEditing] = useState<Pixel | undefined>(undefined)

  const openCreate = useCallback(() => {
    setMode("create")
    setEditing(undefined)
    setOpen(true)
  }, [])

  const openEdit = useCallback((pixel: Pixel) => {
    setMode("edit")
    setEditing(pixel)
    setOpen(true)
  }, [])

  const closeForm = useCallback(() => setOpen(false), [])

  const onSubmit = useCallback(
    async (data: { pixelId: string; label?: string; token: string; isDefault?: boolean }) => {
      try {
        let result: Pixel
        if (mode === "create") {
          if (!onCreate) throw new Error("usePixelForm: onCreate handler is required for create mode")
          result = await onCreate(data)
        } else {
          if (!editing) throw new Error("usePixelForm: editing pixel is missing for edit mode")
          if (!onUpdate) throw new Error("usePixelForm: onUpdate handler is required for edit mode")
          result = await onUpdate(editing.id, data)
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
    value: editing,
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

