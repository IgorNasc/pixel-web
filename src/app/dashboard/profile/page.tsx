import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import ProfileClient from "./_client"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/profile`)
  }
  return <ProfileClient />
}

