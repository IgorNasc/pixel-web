import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { PRICING_PLANS } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface PricingSectionProps {
  themeClasses: ThemeClasses
}

export function PricingSection({ themeClasses }: PricingSectionProps) {
  return (
    <section id="precos" className={`py-12 md:py-20 px-4 ${themeClasses.bgGradient}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}>
            Planos que <span className="text-blue-600">se pagam</span>
          </h2>
          <p className={`text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Comece grátis e veja o impacto imediato nos seus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <Card
              key={index}
              className={`${themeClasses.bgCard} ${plan.isRecommended ? "border-blue-600" : themeClasses.borderCard} relative`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 md:px-4 py-1 text-xs md:text-sm hover:bg-blue-700">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4 md:pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`text-xl md:text-2xl ${themeClasses.textPrimary} mb-2`}>
                      {plan.name}
                    </CardTitle>
                    <CardDescription className={`${themeClasses.textSecondary} text-sm md:text-base`}>
                      {plan.description}
                    </CardDescription>
                  </div>
                  {!plan.isRecommended && plan.name !== "Free" && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gray-200 text-gray-700 text-xs hover:bg-gray-400 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  {plan.name === "Free" && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-red-500 text-white text-xs hover:bg-red-600">
                        Vagas Limitadas
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="mt-4 md:mt-6">
                  <span className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>R$ {plan.price}</span>
                  <span className={`${themeClasses.textMuted} text-sm md:text-base`}>/mês</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`${themeClasses.textSecondary} text-sm md:text-base`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm md:text-base py-2 md:py-3" asChild>
                  <Link href="#cadastro">
                    {plan.name === "Free" ? "Começar Grátis" : "Quero rastrear com precisão"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 px-4">
          <p className={`${themeClasses.textMuted} mb-3 md:mb-4 text-sm md:text-base`}>
            💳 Sem compromisso • ❌ Cancele quando quiser • 🔒 Dados seguros
          </p>
          <p className={`text-xs md:text-sm ${themeClasses.textMuted}`}>
            Todos os planos incluem 7 dias de teste grátis. Não cobramos taxa de setup.
          </p>
        </div>
      </div>
    </section>
  )
}
