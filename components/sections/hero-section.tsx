import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { ThemeClasses } from "@/types"

interface HeroSectionProps {
  themeClasses: ThemeClasses
}

export function HeroSection({ themeClasses }: HeroSectionProps) {
  return (
    <section className={`py-12 md:py-20 px-4 text-center ${themeClasses.bgGradient}`} aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-4xl">
        <Badge
          className={`mb-4 md:mb-6 ${themeClasses.bgBlue} text-blue-600 border-blue-600/30 text-xs md:text-sm hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/50 dark:hover:text-blue-400`}
          role="status"
          aria-label="Novidade para 2025"
        >
          🚀 Revolucione seu tracking em 2025
        </Badge>

        <h1
          id="hero-heading"
          className={`text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight ${themeClasses.textPrimary} px-2`}
        >
          Veja o que o <span className="text-blue-600">pixel não mostra</span>
        </h1>

        <p className={`text-lg md:text-xl lg:text-2xl ${themeClasses.textSecondary} mb-6 md:mb-8 leading-relaxed px-2`}>
          Rastreamento server-side que ignora adblockers, cookies e políticas do iOS 14+.
          <br className="hidden sm:block" />
          <strong className={themeClasses.textPrimary}>Recupere até 40% dos dados perdidos</strong> nos seus anúncios.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            asChild
            aria-label="Iniciar teste gratuito de 7 dias"
          >
            <Link href="#cadastro">Teste 7 Dias Grátis</Link>
          </Button>
        </div>

        <ul
          className={`flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs md:text-sm ${themeClasses.textMuted}`}
          aria-label="Benefícios do teste gratuito"
        >
          <li className="flex items-center">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" aria-hidden="true" />
            Sem cartão de crédito
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" aria-hidden="true" />
            Setup em 5 minutos
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" aria-hidden="true" />
            Suporte 24/7
          </li>
        </ul>
      </div>
    </section>
  )
}
