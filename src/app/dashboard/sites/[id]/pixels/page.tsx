import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import PixelsClient from "./_client"
import {TooltipProvider} from "@/components/ui/tooltip";

export default async function PixelsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/sites`)
  }
  return (
    <TooltipProvider>
      <PixelsClient />
    </TooltipProvider>
  )

}

