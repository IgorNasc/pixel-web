import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import SitesClient from "./_client"

export default async function SitesPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/sites`)
  }
  return <SitesClient />
}

