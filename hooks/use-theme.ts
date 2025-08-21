"use client"

import { useState, useEffect } from "react"
import { getThemeClasses, type ThemeClasses } from "@/lib/theme"

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detectar preferência do sistema e localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("adtracker-theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }

    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode

    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("adtracker-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("adtracker-theme", "light")
    }
  }

  const themeClasses: ThemeClasses = getThemeClasses(isDarkMode)

  return {
    isDarkMode,
    toggleTheme,
    themeClasses,
    mounted, // Para evitar hydration mismatch
  }
}
