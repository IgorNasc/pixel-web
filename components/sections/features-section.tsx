import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Target, Zap, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Rastreamento Sem Cookies",
    description: "Tecnologia avançada que contorna bloqueadores e garante 94% de precisão nos dados",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:border-blue-200",
    benefits: ["Não depende de cookies de terceiros", "Funciona com bloqueadores ativos", "100% compatível com LGPD"],
  },
  {
    icon: Target,
    title: "Otimização Meta Ads",
    description: "Integração direta com a API do Meta para máxima performance dos seus anúncios",
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:border-purple-200",
    benefits: ["Conversões rastreadas em tempo real", "Audiências mais precisas", "ROAS aumentado em até 45%"],
  },
  {
    icon: Zap,
    title: "Analytics Inteligente",
    description: "Dashboard completo com insights automáticos e recomendações de IA",
    color: "from-orange-500 to-orange-600",
    hoverColor: "hover:border-orange-200",
    benefits: ["Relatórios em tempo real", "Sugestões automáticas de IA", "Alertas personalizados"],
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Por Que Escolher o Ad Tracker?</h2>
          <p className="text-xl text-gray-600">A solução mais avançada para rastreamento de anúncios Meta no Brasil</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-2 ${feature.hoverColor} transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm`}
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
