"use client"

import React from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"
import { IntegrationsKeysContent } from "@/features/integrations/keys/keys-content"

export default function MetaKeysClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-10 md:py-16 flex-1">
        <IntegrationsKeysContent themeClasses={themeClasses} />
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
