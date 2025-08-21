"use client"

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"

export default function DashboardClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-10 md:py-16 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Dashboard</h1>
        <p className={themeClasses.textSecondary}>Bem-vindo! Sua conta está conectada.</p>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
