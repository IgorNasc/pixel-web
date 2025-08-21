export interface ThemeClasses {
  bgPrimary: string
  bgSecondary: string
  bgGradient: string
  bgCard: string
  bgInput: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  border: string
  borderCard: string
  borderInput: string
  bgSuccess: string
  bgError: string
  bgBlue: string
  hoverCard: string
  hoverBg: string
}

export const getThemeClasses = (isDarkMode: boolean): ThemeClasses => ({
  bgPrimary: isDarkMode ? "bg-gray-950" : "bg-white",
  bgSecondary: isDarkMode ? "bg-gray-900" : "bg-gray-50",
  bgGradient: isDarkMode ? "bg-gradient-to-b from-gray-950 to-gray-900" : "bg-gradient-to-b from-white to-gray-50",
  bgCard: isDarkMode ? "bg-gray-800" : "bg-white",
  bgInput: isDarkMode ? "bg-gray-700" : "bg-white",
  textPrimary: isDarkMode ? "text-white" : "text-gray-900",
  textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
  textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
  border: isDarkMode ? "border-gray-800" : "border-gray-200",
  borderCard: isDarkMode ? "border-gray-700" : "border-gray-200",
  borderInput: isDarkMode ? "border-gray-600" : "border-gray-300",
  bgSuccess: isDarkMode ? "bg-green-600/20" : "bg-green-100",
  bgError: isDarkMode ? "bg-red-600/20" : "bg-red-100",
  bgBlue: isDarkMode ? "bg-blue-600/20" : "bg-blue-100",
  hoverCard: isDarkMode ? "hover:border-blue-600/50" : "hover:border-blue-400/50",
  hoverBg: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100",
})
