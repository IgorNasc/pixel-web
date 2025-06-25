"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Target, TrendingUp, AlertCircle } from "lucide-react"
import StatsGrid from "@/components/ui/stats-grid"
import { useGoogleAnalytics } from "@/components/analytics/google-analytics"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

const performanceData = [
  { metric: "Dados Perdidos", value: "40%", change: "com métodos tradicionais" },
  { metric: "Precisão Ad Tracker", value: "94%", change: "vs 65% tradicional" },
  { metric: "Melhoria no ROAS", value: "45%", change: "média dos clientes" },
  { metric: "Redução no CPA", value: "35%", change: "economia comprovada" },
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
          <Shield className="w-4 h-4 mr-2" />🚀 Em Breve - Rastreamento Inteligente de Comportamento
        </Badge>

        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
          Recupere as Conversões que Você Está Perdendo
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
          <strong>40% das suas conversões nunca chegam ao Meta</strong> por causa de bloqueadores e iOS 14.5+. Isso
          significa que você está <strong>pagando mais caro por cliques de baixa qualidade</strong> e perdendo vendas
          reais.
        </p>

        {/* Problema vs Solução - Nova Abordagem */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Situação Atual</h3>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Bloqueadores afetam 40% dos dados</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">iOS 14.5+ limita rastreamento</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Meta otimiza com informações incompletas</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">CPA mais alto que deveria ser</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Com Ad Tracker</h3>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Captura 94% das conversões reais</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Funciona mesmo com bloqueadores</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Meta recebe dados completos</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">CPA reduz até 35% automaticamente</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 w-full">
            <div className="text-center">
              <div className="text-sm text-blue-600 mb-2 font-medium">🔥 Promoção de Lançamento</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg text-gray-500 line-through">R$ 59,90</span>
                <span className="text-3xl font-bold text-gray-900">R$ 29,90</span>
              </div>
              <div className="text-gray-600 mb-4">por mês (50% OFF)</div>
              <Button
                size="lg"
                className="text-lg px-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                onClick={handleCTAClick}
              >
                <Target className="w-5 h-5 mr-2" />
                Recuperar Minhas Conversões
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">⚡ Setup em 5 minutos • 💰 Economia imediata • 🔒 Sem compromisso</p>
        </div>

        <StatsGrid
          data={performanceData.map((stat, index) => ({
            ...stat,
            render: () => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className={`text-3xl font-bold ${index === 0 ? "text-red-500" : "text-green-600"}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 mb-1">{stat.metric}</div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  )
}
