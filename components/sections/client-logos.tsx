import { CLIENT_LOGOS } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface ClientLogosProps {
  themeClasses: ThemeClasses
}

export function ClientLogos({ themeClasses }: ClientLogosProps) {
  return (
    <section className={`py-8 md:py-12 px-4 ${themeClasses.bgSecondary} border-b ${themeClasses.border}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <p className={`text-sm md:text-base ${themeClasses.textMuted} font-medium`}>
            Empresas que já confiam no AdTracker
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {CLIENT_LOGOS.map((client, index) => (
            <div
              key={index}
              className={`w-14 h-14 md:w-18 md:h-18 ${themeClasses.bgCard} ${themeClasses.borderCard} border rounded-lg flex items-center justify-center ${themeClasses.hoverBg} transition-colors`}
            >
              <span className={`text-sm md:text-lg font-bold ${themeClasses.textSecondary}`}>{client.logo}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className={`text-xs md:text-sm ${themeClasses.textMuted}`}>
            E centenas de outras empresas em todo o Brasil
          </p>
        </div>
      </div>
    </section>
  )
}
