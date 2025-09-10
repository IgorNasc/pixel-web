import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import WebhooksClient from "./_client"

export default async function WebhooksPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/webhooks`)
  }
  return <WebhooksClient />
}

