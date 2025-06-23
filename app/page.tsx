"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { Shield, Zap, Target, Eye, TrendingUp, Globe, CheckCircle, ArrowRight } from "lucide-react"

const conversionData = [
  { name: "Mon", traditional: 45, cookieless: 78 },
  { name: "Tue", traditional: 52, cookieless: 85 },
  { name: "Wed", traditional: 38, cookieless: 72 },
  { name: "Thu", traditional: 61, cookieless: 94 },
  { name: "Fri", traditional: 55, cookieless: 89 },
  { name: "Sat", traditional: 67, cookieless: 98 },
  { name: "Sun", traditional: 43, cookieless: 76 },
]

const audienceData = [
  { name: "Desktop", value: 65, color: "#8884d8" },
  { name: "Mobile", value: 30, color: "#82ca9d" },
  { name: "Tablet", value: 5, color: "#ffc658" },
]

const performanceData = [
  { metric: "Página visulizadas", value: "2.4M", change: "+23%" },
  { metric: "Visitantes unicos", value: "847K", change: "+18%" },
  { metric: "Taxa de conversão", value: "4.2%", change: "+31%" },
  { metric: "Ad gasto em ROI", value: "3.8x", change: "+45%" },
]

export default function Home() {
  const [activeDemo, setActiveDemo] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AdTrack Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Recursos
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              Como Funciona
            </a>
            <a href="#interest-form" className="text-gray-600 hover:text-gray-900">
              Acesso Antecipado
            </a>
            <Button onClick={() => document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" })}>
              Entrar na Lista
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Em Breve - Analytics Focado em Privacidade
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Turbine Seus Anúncios Meta Sem Cookies
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Rastreie o comportamento do usuário, otimize o desempenho dos anúncios e aumente as conversões com nossa
            solução de analytics sem cookies. Contorne bloqueios de navegador e restrições de privacidade mantendo total
            conformidade.
          </p>
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <Button
              size="lg"
              className="text-lg px-8 w-full"
              onClick={() => document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Target className="w-5 h-5 mr-2" />
              Entrar na Lista de Espera
            </Button>
            <p className="text-sm text-gray-500">Seja o primeiro a saber quando lançarmos</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {performanceData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.metric}</div>
                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por Que Escolher o AdTrack Pro?</h2>
            <p className="text-xl text-gray-600">
              Rastreamento avançado que funciona mesmo quando os cookies não funcionam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Rastreamento Sem Cookies</CardTitle>
                <CardDescription>
                  Fingerprinting avançado e rastreamento server-side que contorna bloqueadores de cookies e extensões de
                  privacidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Não requer cookies de terceiros
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Contorna bloqueadores de anúncios
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Compatível com GDPR e CCPA
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Otimização de Anúncios Meta</CardTitle>
                <CardDescription>
                  Integração direta com a API de Conversões do Meta para melhor segmentação e atribuição de anúncios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Rastreamento de conversões em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Insights aprimorados de audiência
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    ROAS melhorado em 45%
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Analytics em Tempo Real</CardTitle>
                <CardDescription>
                  Insights instantâneos e recomendações de otimização automatizadas com machine learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Atualizações do dashboard ao vivo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Insights com IA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Alertas automatizados
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Prévia do Conceito do Produto</h2>
            <p className="text-xl text-gray-600">Veja o que estamos construindo - dashboard conceitual interativo</p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dashboard">Dashboard de Analytics</TabsTrigger>
              <TabsTrigger value="comparison">Com Cookies vs Sem Cookies</TabsTrigger>
              <TabsTrigger value="audience">Insights de Audiência</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Visitantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">847,392</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +18.2%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Conversões</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35,642</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +31.4%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Receita</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$2.1M</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +28.7%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">ROAS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.8x</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +45.2%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Semanal</CardTitle>
                  <CardDescription>Rastreamento de conversões na última semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      conversions: {
                        label: "Conversions",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <LineChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="cookieless"
                        stroke="var(--color-conversions)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-conversions)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rastreamento Tradicional vs Sem Cookies</CardTitle>
                  <CardDescription>Comparação da precisão do rastreamento de conversões</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      traditional: {
                        label: "Traditional (Cookies)",
                        color: "#ef4444",
                      },
                      cookieless: {
                        label: "Cookie-less Tracking",
                        color: "#22c55e",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="traditional" fill="var(--color-traditional)" />
                      <Bar dataKey="cookieless" fill="var(--color-cookieless)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Rastreamento Tradicional com Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Precisão dos Dados</span>
                      <span className="text-red-600 font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Taxa de Bloqueio do Navegador</span>
                      <span className="text-red-600 font-medium">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Conformidade de Privacidade</span>
                      <span className="text-red-600 font-medium">Limitada</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-600">Rastreamento Sem Cookies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Precisão dos Dados</span>
                      <span className="text-green-600 font-medium">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Taxa de Bloqueio do Navegador</span>
                      <span className="text-green-600 font-medium">2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Conformidade de Privacidade</span>
                      <span className="text-green-600 font-medium">Total</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Dispositivo</CardTitle>
                    <CardDescription>Divisão da audiência por tipo de dispositivo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        desktop: { label: "Desktop", color: "#8884d8" },
                        mobile: { label: "Mobile", color: "#82ca9d" },
                        tablet: { label: "Tablet", color: "#ffc658" },
                      }}
                      className="h-[300px]"
                    >
                      <PieChart>
                        <Pie
                          data={audienceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {audienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Insights de Audiência</CardTitle>
                    <CardDescription>Dados demográficos principais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age 25-34</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age 35-44</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age 18-24</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Age 45+</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">Tecnologia de rastreamento avançada que respeita a privacidade</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rastreamento Server-Side</h3>
              <p className="text-gray-600">
                A coleta de dados acontece no seu servidor, contornando bloqueadores client-side e garantindo 100% de
                captura de dados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fingerprinting com Foco em Privacidade</h3>
              <p className="text-gray-600">
                Identificação avançada de usuários usando técnicas compatíveis com privacidade que não dependem de dados
                pessoais
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integração com API do Meta</h3>
              <p className="text-gray-600">
                Integração direta com a API de Conversões do Meta para melhor segmentação e precisão de atribuição
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Implementação Técnica</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Coleta de Dados</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Snippet JavaScript leve</li>
                    <li>• Processamento de eventos server-side</li>
                    <li>• Streaming de dados em tempo real</li>
                    <li>• Transmissão de dados criptografada</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">Privacidade e Conformidade</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Nenhuma coleta de dados pessoais</li>
                    <li>• Compatível com GDPR e CCPA</li>
                    <li>• Anonimização automática de dados</li>
                    <li>• Integração com gerenciamento de consentimento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Form Section */}
      <section id="interest-form" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Obtenha Acesso Antecipado</h2>
            <p className="text-xl opacity-90">
              Esteja entre os primeiros a experimentar analytics sem cookies para otimização de anúncios Meta
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Sobrenome *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Endereço de Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="monthlyAdSpend" className="block text-sm font-medium mb-2">
                    Investimento Mensal em Anúncios Meta
                  </label>
                  <select
                    id="monthlyAdSpend"
                    name="monthlyAdSpend"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-gray-900">
                      Selecione a faixa...
                    </option>
                    <option value="under-1k" className="text-gray-900">
                      Menos de R$ 5.000
                    </option>
                    <option value="1k-5k" className="text-gray-900">
                      R$ 5.000 - R$ 25.000
                    </option>
                    <option value="5k-10k" className="text-gray-900">
                      R$ 25.000 - R$ 50.000
                    </option>
                    <option value="10k-25k" className="text-gray-900">
                      R$ 50.000 - R$ 125.000
                    </option>
                    <option value="25k-50k" className="text-gray-900">
                      R$ 125.000 - R$ 250.000
                    </option>
                    <option value="50k-plus" className="text-gray-900">
                      R$ 250.000+
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                    Qual é o seu maior desafio com o rastreamento atual de anúncios?
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    placeholder="Conte-nos sobre seus desafios atuais de rastreamento..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="updates"
                    name="updates"
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 focus:ring-2 focus:ring-white/50"
                  />
                  <label htmlFor="updates" className="text-sm opacity-90">
                    Gostaria de receber atualizações sobre o AdTrack Pro e oportunidades de acesso antecipado
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 text-lg py-4"
                >
                  Entrar na Lista de Espera
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-center text-sm opacity-75">Nunca enviaremos spam. Cancele a qualquer momento.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">AdTrack Pro</span>
              </div>
              <p className="text-gray-400 text-sm">Analytics com foco em privacidade para publicidade moderna</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentação da API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrações
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Termos de Serviço
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GDPR
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Segurança
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AdTrack Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
