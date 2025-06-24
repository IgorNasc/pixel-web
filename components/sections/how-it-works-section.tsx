import { Globe, Eye, Target } from "lucide-react"

const steps = [
  {
    icon: Globe,
    title: "1. Coleta Server-Side",
    description:
      "Os dados são coletados diretamente no servidor, contornando todos os bloqueadores e garantindo 100% de captura",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Eye,
    title: "2. Identificação Inteligente",
    description: "Usamos técnicas avançadas de fingerprinting que respeitam a privacidade e não coletam dados pessoais",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Target,
    title: "3. Otimização Meta",
    description:
      "Integração direta com a API do Meta para enviar dados de conversão e melhorar a performance dos anúncios",
    color: "from-green-500 to-green-600",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Como o Ad Tracker Funciona</h2>
          <p className="text-xl text-gray-600">Tecnologia avançada que respeita a privacidade dos usuários</p>
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
      </div>
    </section>
  )
}
