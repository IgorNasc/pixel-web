import { MousePointer, Eye, Send } from "lucide-react"

const steps = [
  {
    icon: MousePointer,
    title: "1. Monitora Comportamento",
    description:
      "Acompanha sinais de interesse como movimento do mouse, cliques em botões, tempo de leitura e preenchimento de formulários - tudo sem cookies",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Eye,
    title: "2. Identifica Intenções",
    description:
      "Analisa os comportamentos capturados para identificar visitantes com real interesse de compra e engajamento qualificado",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Send,
    title: "3. Otimiza Meta Ads",
    description:
      "Envia essas informações diretamente para o Meta, melhorando o targeting e performance dos anúncios automaticamente",
    color: "from-green-500 to-green-600",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Como o Ad Tracker Funciona</h2>
          <p className="text-xl text-gray-600">Rastreamento inteligente direto para a API de Conversões da Meta</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div
                className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Sinais de Interesse Capturados</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                event: "Interesse",
                description:
                  "Quando o visitante demonstra interesse passando o mouse sobre produtos ou botões importantes",
                icon: "👀",
              },
              {
                event: "Engajamento",
                description: "Cliques em botões, links e chamadas para ação que indicam intenção de compra",
                icon: "👆",
              },
              {
                event: "Navegação",
                description: "Tempo gasto lendo o conteúdo e profundidade de navegação na página",
                icon: "📖",
              },
              {
                event: "Consideração",
                description: "Quando o visitante começa a preencher formulários ou campos de contato",
                icon: "✍️",
              },
              {
                event: "Conversão",
                description: "Envio completo de formulários, compras ou outras ações de conversão",
                icon: "🎯",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-gray-900 mb-2">{item.event}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
