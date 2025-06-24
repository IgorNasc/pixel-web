"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, BarChart3 } from "lucide-react"
import { useGoogleAnalytics } from "@/components/analytics/google-analytics"

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  scrollToSection: (sectionId: string) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, scrollToSection }: HeaderProps) {
  const { trackButtonClick } = useGoogleAnalytics()

  const handleNavClick = (section: string) => {
    trackButtonClick(`nav_${section}`, "header")
    scrollToSection(section)
  }

  const handleCTAClick = () => {
    trackButtonClick("comecar_agora", "header")
    scrollToSection("interest-form")
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ad Tracker
              </span>
              <div className="text-xs text-gray-500 font-medium">Analytics Sem Cookies</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick("features")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleNavClick("pricing")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Preços
            </button>
            <Button
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              Começar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick("features")}
                className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Recursos
              </button>
              <button
                onClick={() => handleNavClick("how-it-works")}
                className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Como Funciona
              </button>
              <button
                onClick={() => handleNavClick("pricing")}
                className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Preços
              </button>
              <Button
                onClick={handleCTAClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
              >
                Começar Agora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
