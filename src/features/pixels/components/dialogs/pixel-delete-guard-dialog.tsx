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
import Link from "next/link"
import * as React from "react"
import type { Pixel } from "@/types/models"

type Props = {
  open: boolean
  pixel?: Pixel
  webhooks: number
  onOpenChange: (open: boolean) => void
}

export default function PixelDeleteGuardDialog({ open, pixel, webhooks, onOpenChange }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Não é possível excluir este pixel</AlertDialogTitle>
          <AlertDialogDescription>
            Este pixel possui {webhooks} webhooks vinculados. Reatribua ou remova-os primeiro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={pixel ? `/dashboard/webhooks?pixelId=${pixel.id}` : "#"}>Ver Webhooks</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

