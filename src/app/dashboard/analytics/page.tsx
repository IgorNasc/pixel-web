import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AnalyticsClient from "./_client"

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/analytics`)
  }
  return <AnalyticsClient />
}

