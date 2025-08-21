"use client"

import { X, Menu, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  themeClasses: ThemeClasses
  isDarkMode: boolean
}

export function MobileMenu({ isOpen, onToggle, onClose, themeClasses, isDarkMode }: MobileMenuProps) {
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={`md:hidden ${themeClasses.textSecondary} ${themeClasses.hoverBg} p-2`}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Menu Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-80 ${themeClasses.bgPrimary} shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto border-l ${themeClasses.border}`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${themeClasses.border} ${isDarkMode ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20" : "bg-gradient-to-r from-blue-50 to-purple-50"} sticky top-0 z-10`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} p-2 rounded-lg`}
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="p-6">
              <div className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between py-4 px-4 ${themeClasses.textSecondary} hover:text-blue-600 ${themeClasses.hoverBg} hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-100 dark:hover:border-blue-800`}
                  >
                    <span className="font-medium text-base">{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>

              {/* CTA Section */}
              <div
                className={`mt-8 p-4 ${isDarkMode ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800" : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100"} rounded-2xl border`}
              >
                <div className="text-center mb-4">
                  <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-2`}>
                    Comece seu teste <span className="text-blue-600">grátis</span>
                  </h3>
                  <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                    7 dias gratuitos • Sem cartão de crédito • Setup em 5 minutos
                  </p>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href="#cadastro" onClick={onClose}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Teste Grátis Agora
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  asChild
                >
                  <Link href="/login" onClick={onClose}>
                    Entrar
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className={`mt-6 pt-6 border-t ${themeClasses.border}`}>
                <div className="text-center">
                  <p className={`text-sm ${themeClasses.textMuted} mb-2`}>Precisa de ajuda?</p>
                  <Link
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={onClose}
                  >
                    {SITE_CONFIG.email}
                  </Link>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-4 text-center">
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-2 ${isDarkMode ? "bg-green-900/20 border-green-800" : "bg-green-50 border-green-100"} rounded-full border`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs ${isDarkMode ? "text-green-400" : "text-green-700"} font-medium`}>
                    +1.200 sites monitorados
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
