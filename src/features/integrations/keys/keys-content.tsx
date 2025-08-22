"use client"

import React, { useMemo, useState } from "react"
import { Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ThemeClasses } from "@/lib/theme"
import { MetaKeysCard } from "@/features/integrations/keys/meta/meta-keys-card"
import { SidebarMeta } from "@/features/integrations/keys/meta/meta-sidebar"
import { SidebarComingSoon } from "@/features/integrations/keys/common/coming-soon-sidebar"
import { UpcomingIntegrationsGrid } from "@/features/integrations/keys/common/upcoming-integrations-grid"

export function IntegrationsKeysContent({ themeClasses }: { themeClasses: ThemeClasses }) {
  const [tab, setTab] = useState("meta")
  const upcomingIntegrations = useMemo(
    () => [
      { name: "Google", availableAt: new Date("2025-10-15") },
    ],
    []
  )

  return (
    <>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Conectar serviços</h1>
        <p className={`mt-2 ${themeClasses.textSecondary}`}>
          Escolha um serviço abaixo e cole as chaves. Precisa de ajuda? Veja as dicas ao lado.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
              <TabsTrigger value="meta" className="gap-2">Meta</TabsTrigger>
              <TabsTrigger value="other" className="gap-2">
                <Shield className="h-4 w-4" /> Em breve
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meta">
              <MetaKeysCard />
            </TabsContent>

            <TabsContent value="other">
              <UpcomingIntegrationsGrid items={upcomingIntegrations} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {tab === "meta" ? <SidebarMeta /> : <SidebarComingSoon />}
        </div>
      </div>
    </>
  )
}

