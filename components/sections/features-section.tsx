import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, CheckCircle, AlertTriangle } from "lucide-react"

const features = [
  {
    icon: AlertTriangle,
    title: "Você Está Perdendo Dinheiro",
    description:
      "40% das conversões não chegam ao Meta. Isso significa CPA mais alto, ROAS menor e orçamento desperdiçado todo mês.",
    color: "from-red-400 to-red-500",
    hoverColor: "hover:border-red-200",
    benefits: ["40% dos dados são perdidos", "CPA até 50% mais alto", "ROAS 35% abaixo do potencial"],
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    icon: Activity,
    title: "Rastreamento Que Funciona",
    description:
      "Ad Tracker captura 94% das conversões mesmo com bloqueadores ativos. Seus concorrentes ainda não descobriram isso.",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:border-blue-200",
    benefits: ["94% de precisão comprovada", "Funciona com bloqueadores", "Dados em tempo real"],
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: BarChart3,
    title: "Resultados Imediatos",
    description: "Clientes relatam redução de 35% no CPA e aumento de 45% no ROAS em apenas 30 dias. O ROI é imediato.",
    color: "from-green-400 to-green-500",
    hoverColor: "hover:border-green-200",
    benefits: ["CPA -35% em 30 dias", "ROAS +45% comprovado", "ROI de 1.200%+"],
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Por Que Você PRECISA do Ad Tracker</h2>
          <p className="text-xl text-gray-600">Cada dia sem dados completos = dinheiro perdido</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-2 ${feature.hoverColor} ${feature.bgColor} ${feature.borderColor} transition-all duration-300 hover:shadow-xl backdrop-blur-sm`}
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base font-medium">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2">
                      {index === 2 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full ${index === 0 ? "bg-red-400" : "bg-blue-500"} flex items-center justify-center`}
                        >
                          <span className="text-white text-xs font-bold">{index === 0 ? "!" : "✓"}</span>
                        </div>
                      )}
                      <span className={index === 0 ? "text-red-600" : index === 1 ? "text-blue-700" : "text-green-600"}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">💰 Calculadora de Economia Real</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/20 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">R$ 10.000</div>
              <div className="text-sm opacity-90 mb-4">Seu investimento mensal em ads</div>
              <div className="text-red-200 font-medium">Perdendo R$ 4.000/mês</div>
              <div className="text-xs opacity-75 mt-2">40% de dados perdidos</div>
            </div>
            <div className="bg-white/20 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">R$ 30</div>
              <div className="text-sm opacity-90 mb-4">Custo do Ad Tracker</div>
              <div className="text-green-200 font-medium">✅ Economia de R$ 3.970</div>
              <div className="text-xs opacity-75 mt-2">ROI de 13.233%</div>
            </div>
            <div className="bg-white/20 rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">R$ 47.640</div>
              <div className="text-sm opacity-90 mb-4">Economia anual</div>
              <div className="text-green-200 font-medium">✅ Investindo apenas R$ 360</div>
              <div className="text-xs opacity-75 mt-2">Diferença de R$ 47.280</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
