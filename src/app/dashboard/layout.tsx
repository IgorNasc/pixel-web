"use client"

import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"
import {Toaster} from "@/components/ui/toaster";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        themeClasses={themeClasses}
      />
      <div className="flex-1">
        {children}
      </div>
      <Toaster />
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
