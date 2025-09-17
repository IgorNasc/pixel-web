import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import PageTitlesSection from "@/components/sections/page-title-section";
import ProfileLeftSide from "@/features/profiles/sections/profile-left-side";
import ProfileRightSide from "@/features/profiles/sections/profile-right-side";
import * as React from "react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/dashboard/profile`)
  }

  return (
      <main id="main-content" className="container mx-auto px-4 py-10 md:py-16 flex-1">
        <PageTitlesSection title="Perfil" description="Gerencie suas informações e acompanhe seu plano." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start my-6">
          <ProfileLeftSide />
          <ProfileRightSide />
        </div>
      </main>
  )
}

