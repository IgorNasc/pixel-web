import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import MetaKeysClient from "./_client"

export default async function MetaKeysPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/meta-keys`)
  }
  return <MetaKeysClient />
}

