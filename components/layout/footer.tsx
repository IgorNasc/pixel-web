import { BarChart3, Mail } from "lucide-react"
import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface FooterProps {
  themeClasses: ThemeClasses
}

export function Footer({ themeClasses }: FooterProps) {
  return (
    <footer className={`${themeClasses.bgPrimary} border-t ${themeClasses.border} py-8 md:py-12 px-4`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className={`text-lg md:text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
            </div>
            <p className={`${themeClasses.textMuted} text-sm mb-3 md:mb-4`}>{SITE_CONFIG.description}</p>
            <p className={`${themeClasses.textMuted} text-sm`}>
              Recupere até 40% dos dados perdidos e maximize seu ROI.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3 md:mb-4 text-sm md:text-base`}>Contato</h4>
            <div className={`space-y-2 md:space-y-3 text-sm ${themeClasses.textMuted}`}>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 ${themeClasses.bgBlue} rounded flex items-center justify-center flex-shrink-0`}
                >
                  <Mail className="w-3 h-3 text-blue-600" />
                </div>
                <Link
                  href={`mailto:${SITE_CONFIG.email}`}
                  className={`hover:${themeClasses.textPrimary} transition-colors break-all`}
                >
                  {SITE_CONFIG.email}
                </Link>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3 md:mb-4 text-sm md:text-base`}>
              Horário de Atendimento
            </h4>
            <div className={`space-y-2 text-sm ${themeClasses.textMuted}`}>
              <div>
                <strong className={themeClasses.textPrimary}>Suporte Técnico:</strong>
                <br />
                24 horas por dia, 7 dias por semana
              </div>
              <div className="mt-3 md:mt-4">
                <strong className={themeClasses.textPrimary}>Vendas:</strong>
                <br />
                24 horas por dia, 7 dias por semana
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${themeClasses.border} mt-6 md:mt-8 pt-6 md:pt-8 text-center`}>
          <p className={`${themeClasses.textMuted} text-sm`}>
            © 2025 {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
