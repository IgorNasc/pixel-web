"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, TrendingUp } from "lucide-react"
import StatsGrid from "@/components/ui/stats-grid"
import { useGoogleAnalytics } from "@/components/analytics/google-analytics"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

const performanceData = [
  { metric: "Visualizações", value: "2.4M", change: "+23%" },
  { metric: "Visitantes Únicos", value: "847K", change: "+18%" },
  { metric: "Taxa de Conversão", value: "4.2%", change: "+31%" },
  { metric: "ROI dos Anúncios", value: "3.8x", change: "+45%" },
]

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { trackButtonClick } = useGoogleAnalytics()

  const handleCTAClick = () => {
    trackButtonClick("garantir_acesso_antecipado", "hero")
    scrollToSection("interest-form")
  }

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center max-w-5xl">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-blue-100 text-blue-800 border border-blue-200">
          <Shield className="w-4 h-4 mr-2" />🚀 Em Breve - Revolucione Seus Anúncios Meta
        </Badge>
        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
          Maximize Seus Anúncios Meta Sem Cookies
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
          Rastreie conversões com <strong>94% de precisão</strong>, contorne bloqueadores de anúncios e aumente seu ROAS
          em até <strong>45%</strong> com nossa tecnologia sem cookies.
        </p>

        <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 w-full">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">R$ 49,90</div>
              <div className="text-gray-600 mb-4">por mês</div>
              <Button
                size="lg"
                className="text-lg px-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                onClick={handleCTAClick}
              >
                <Target className="w-5 h-5 mr-2" />
                Garantir Acesso Antecipado
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">✨ Seja o primeiro a usar quando lançarmos</p>
        </div>

        <StatsGrid
          data={performanceData.map((stat, index) => ({
            ...stat,
            render: () => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-700 mb-1">{stat.metric}</div>
                <div className="text-sm text-green-700 font-medium flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  )
}
