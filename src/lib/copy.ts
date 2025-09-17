"use client"

import { toast } from "@/hooks/use-toast"

export interface CopyOptions {
  withToast?: boolean
  successTitle?: string
  successDescription?: string
  errorTitle?: string
  errorDescription?: string
}

export async function copy(text: string, options: CopyOptions = {}): Promise<boolean> {
  const {
    withToast = true,
    successTitle = "Copiado",
    successDescription,
    errorTitle = "Falha ao copiar",
    errorDescription = "Tente novamente.",
  } = options

  let ok = false

  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
    }
  }

  if (!ok && typeof document !== "undefined") {
    try {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.setAttribute("readonly", "")
      ta.style.position = "absolute"
      ta.style.left = "-9999px"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      ok = true
    } catch {
      ok = false
    }
  }

  if (withToast) {
    if (ok) {
      toast({ title: successTitle, description: successDescription ?? text })
    } else {
      toast({ title: errorTitle, description: errorDescription, variant: "destructive" })
    }
  }

  return ok
}
