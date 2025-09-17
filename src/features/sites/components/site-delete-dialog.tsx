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
import type { Site } from "@/types/models"

type Props = {
  guard: { open: boolean; site?: Site; pixels: number; webhooks: number }
  setGuard: React.Dispatch<
    React.SetStateAction<{
      open: boolean
      site?: Site
      pixels: number
      webhooks: number
    }>
  >
}

export default function SiteDeleteDialog({ guard, setGuard }: Props) {
  return (
    <AlertDialog open={guard.open} onOpenChange={(open) => setGuard((g) => ({ ...g, open }))}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Não é possível excluir este site</AlertDialogTitle>
          <AlertDialogDescription>
            Este site possui {guard.pixels} pixels e {guard.webhooks} webhooks associados. Remova-os primeiro para excluir o site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/pixels` : "#"}>Ver Pixels</Link>
          </AlertDialogAction>
          <AlertDialogAction asChild>
            <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/webhooks` : "#"}>Ver Webhooks</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

