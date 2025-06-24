"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"

interface PricingSectionProps {
  scrollToSection: (sectionId: string) => void
}

const features = [
  "Rastreamento sem cookies",
  "Integração com Meta Ads API",
  "Dashboard em tempo real",
  "Relatórios avançados",
  "Suporte técnico incluído",
  "Conformidade LGPD/GDPR",
  "Atualizações automáticas",
  "Garantia de 30 dias",
]

export default function PricingSection({ scrollToSection }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">Preço Simples e Transparente</h2>
        <p className="text-xl text-gray-600 mb-12">Uma solução completa por um preço justo</p>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">🔥 Oferta de Lançamento</Badge>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Ad Tracker Pro</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                R$ 49,90
              </span>
              <span className="text-gray-600">/mês</span>
            </div>
            <p className="text-gray-600">Tudo que você precisa para otimizar seus anúncios Meta</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full text-lg py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            onClick={() => scrollToSection("interest-form")}
          >
            Garantir Preço de Lançamento
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
