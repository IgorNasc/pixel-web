import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import * as React from "react"
import type { Pixel } from "@/types/models"

type Props = {
  open: boolean
  pixel?: Pixel
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function PixelDeleteConfirmDialog({ open, pixel, onOpenChange, onConfirm }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir este pixel?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O pixel será removido permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-sm">
          <span className="text-muted-foreground">Pixel:</span>{" "}
          <span className="font-medium">{pixel?.pixelId}</span>
          {pixel?.label ? <span className="text-muted-foreground"> · {pixel?.label}</span> : null}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

