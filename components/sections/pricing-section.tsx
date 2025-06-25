"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Star } from "lucide-react"
import { useGoogleAnalytics } from "@/components/analytics/google-analytics"

interface PricingSectionProps {
  scrollToSection: (sectionId: string) => void
}

const plans = [
  {
    name: "Starter",
    price: "29,90",
    originalPrice: "59,90",
    description: "Para quem quer recuperar conversões perdidas",
    popular: false,
    features: [
      "Captura 94% das conversões (vs 65% tradicional)",
      "Reduz CPA em até 35%",
      "Aumenta ROAS em até 45%",
      "Até 50.000 eventos/mês",
      "Setup em 5 minutos",
      "Suporte por email",
      "Conformidade LGPD total",
    ],
    limitations: ["Relatórios básicos", "Eventos personalizados limitados"],
  },
  {
    name: "Professional",
    price: "39,90",
    originalPrice: "79,90",
    description: "Para quem quer dominar a concorrência",
    popular: true,
    features: [
      "Captura 94% das conversões (vs 65% tradicional)",
      "Reduz CPA em até 35%",
      "Aumenta ROAS em até 45%",
      "Eventos ILIMITADOS",
      "Dashboard avançado com IA",
      "Eventos personalizados ilimitados",
      "Relatórios completos + exportação",
      "Suporte prioritário (chat + email)",
      "Setup em 5 minutos",
      "Conformidade LGPD/GDPR",
      "Alertas inteligentes",
      "Análise de funil completa",
    ],
    limitations: [],
  },
]

export default function PricingSection({ scrollToSection }: PricingSectionProps) {
  const { trackButtonClick } = useGoogleAnalytics()

  const handlePricingCTA = (planName: string, price: string) => {
    trackButtonClick(`garantir_plano_${planName.toLowerCase()}`, "pricing")
    scrollToSection("interest-form")
  }

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Pare de Desperdiçar Seu Orçamento</h2>
          <p className="text-xl text-gray-600 mb-8">Invista R$ 29,90 para economizar milhares todo mês</p>
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-blue-100 text-blue-800 border border-blue-200">
            🔥 PROMOÇÃO LIMITADA - 50% OFF
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${plan.popular
                  ? "from-blue-50 to-purple-50 border-2 border-blue-200 scale-105"
                  : "from-gray-50 to-gray-100 border border-gray-200"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Mais Escolhido
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg text-gray-500 line-through">R$ {plan.originalPrice}</span>
                  <span
                    className={`text-5xl font-bold ${plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900"
                      }`}
                  >
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-600">/mês</span>
                </div>

                <div className="text-xs text-blue-600 mt-1">50% OFF - Promoção de Lançamento</div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start gap-3 opacity-60">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className={`w-full text-lg py-4 shadow-lg transition-all duration-300 ${plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                onClick={() => handlePricingCTA(plan.name, plan.price)}
              >
                Garantir 50% de Desconto
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center space-y-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600">Empresas já demonstraram interesse</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">45%</div>
              <div className="text-sm text-gray-600">Aumento médio no ROAS</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">35%</div>
              <div className="text-sm text-gray-600">Redução média no CPA</div>
            </div>
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            ✅ <strong>Sem compromisso</strong> • ✅ <strong>Cancele quando quiser</strong> • ✅{" "}
            <strong>Setup gratuito</strong> • ✅ <strong>Suporte incluído</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
