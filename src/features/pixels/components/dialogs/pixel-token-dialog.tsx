import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as React from "react"
import type { Pixel } from "@/types/models"
import { SecretInput } from "@/components/ui/secret-input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import {copy} from "@/lib/copy";

type Props = {
  open: boolean
  pixel?: Pixel
  onOpenChange: (open: boolean) => void
}

export default function PixelTokenDialog({ open, pixel, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Token do Pixel</DialogTitle>
          <DialogDescription>
            Mantenha este token em segredo. Use-o para autenticar seus eventos do pixel.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <div className="text-xs text-muted-foreground">Pixel</div>
          <div className="text-sm font-medium">{pixel?.pixelId}{pixel?.label ? ` · ${pixel?.label}` : ""}</div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <SecretInput value={pixel?.token ?? ""} readOnly aria-readonly />
            <Button
              variant="default"
              size="sm"
              onClick={() => pixel?.token && copy(pixel.token)}
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
  )
}

