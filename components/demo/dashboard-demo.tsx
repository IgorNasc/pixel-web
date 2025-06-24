import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar, ComposedChart } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock } from "lucide-react"

const conversionData = [
  { name: "Seg", traditional: 45, cookieless: 78, cost: 2.5, revenue: 195, profit: 150, margin: 76.9 },
  { name: "Ter", traditional: 52, cookieless: 85, cost: 2.8, revenue: 238, profit: 185, margin: 77.7 },
  { name: "Qua", traditional: 38, cookieless: 72, cost: 2.2, revenue: 180, profit: 142, margin: 78.9 },
  { name: "Qui", traditional: 61, cookieless: 94, cost: 3.1, revenue: 282, profit: 220, margin: 78.0 },
  { name: "Sex", traditional: 55, cookieless: 89, cost: 2.9, revenue: 267, profit: 209, margin: 78.3 },
  { name: "Sáb", traditional: 67, cookieless: 98, cost: 3.2, revenue: 294, profit: 230, margin: 78.2 },
  { name: "Dom", traditional: 43, cookieless: 76, cost: 2.4, revenue: 190, profit: 148, margin: 77.9 },
]

const hourlyData = [
  { hour: "00h", conversions: 12, cost: 45 },
  { hour: "04h", conversions: 8, cost: 32 },
  { hour: "08h", conversions: 35, cost: 89 },
  { hour: "12h", conversions: 52, cost: 124 },
  { hour: "16h", conversions: 48, cost: 118 },
  { hour: "20h", conversions: 41, cost: 98 },
]

const funnelData = [
  { stage: "Impressões", value: 125000, percentage: 100 },
  { stage: "Cliques", value: 3750, percentage: 3 },
  { stage: "Visitantes", value: 3200, percentage: 2.56 },
  { stage: "Leads", value: 480, percentage: 0.38 },
  { stage: "Vendas", value: 96, percentage: 0.077 },
]

const campaignData = [
  { name: "Campanha A", roas: 4.2, spend: 15000, revenue: 63000 },
  { name: "Campanha B", roas: 3.8, spend: 12000, revenue: 45600 },
  { name: "Campanha C", roas: 5.1, spend: 8000, revenue: 40800 },
  { name: "Campanha D", roas: 2.9, spend: 10000, revenue: 29000 },
]

const detailedCostAnalysis = [
  {
    name: "Seg",
    adSpend: 1200,
    revenue: 4680,
    profit: 3480,
    cpa: 25.5,
    roas: 3.9,
    conversions: 47,
    cpc: 2.8,
  },
  {
    name: "Ter",
    adSpend: 1350,
    revenue: 5265,
    profit: 3915,
    cpa: 27.2,
    roas: 3.9,
    conversions: 50,
    cpc: 3.1,
  },
  {
    name: "Qua",
    adSpend: 1100,
    revenue: 4290,
    profit: 3190,
    cpa: 24.8,
    roas: 3.9,
    conversions: 44,
    cpc: 2.65,
  },
  {
    name: "Qui",
    adSpend: 1450,
    revenue: 5655,
    profit: 4205,
    cpa: 26.9,
    roas: 3.9,
    conversions: 54,
    cpc: 2.95,
  },
  {
    name: "Sex",
    adSpend: 1380,
    revenue: 5382,
    profit: 4002,
    cpa: 26.5,
    roas: 3.9,
    conversions: 52,
    cpc: 2.85,
  },
  {
    name: "Sáb",
    adSpend: 1520,
    revenue: 5928,
    profit: 4408,
    cpa: 28.1,
    roas: 3.9,
    conversions: 54,
    cpc: 3.2,
  },
  {
    name: "Dom",
    adSpend: 1180,
    revenue: 4602,
    profit: 3422,
    cpa: 25.2,
    roas: 3.9,
    conversions: 47,
    cpc: 2.7,
  },
]

const metrics = [
  {
    title: "Total de Visitantes",
    value: "847,392",
    change: "+18.2%",
    trend: "up",
    color: "from-blue-50 to-blue-100",
    textColor: "text-blue-700",
    valueColor: "text-blue-900",
    icon: Users,
  },
  {
    title: "Conversões",
    value: "35,642",
    change: "+31.4%",
    trend: "up",
    color: "from-green-50 to-green-100",
    textColor: "text-green-700",
    valueColor: "text-green-900",
    icon: Target,
  },
  {
    title: "Receita",
    value: "R$ 2.1M",
    change: "+28.7%",
    trend: "up",
    color: "from-purple-50 to-purple-100",
    textColor: "text-purple-700",
    valueColor: "text-purple-900",
    icon: DollarSign,
  },
  {
    title: "CPA Médio",
    value: "R$ 58,90",
    change: "-12.3%",
    trend: "down",
    color: "from-orange-50 to-orange-100",
    textColor: "text-orange-700",
    valueColor: "text-orange-900",
    icon: Clock,
  },
]

export default function DashboardDemo() {
  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`bg-gradient-to-br ${metric.color} border-${metric.textColor.split("-")[1]}-200`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-sm font-medium ${metric.textColor}`}>{metric.title}</CardTitle>
                <metric.icon className={`w-4 h-4 ${metric.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.valueColor} mb-1`}>{metric.value}</div>
              <div
                className={`text-sm flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance Semanal</CardTitle>
            <CardDescription>Conversões e receita - últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                conversions: { label: "Conversões", color: "#3B82F6" },
                revenue: { label: "Receita (R$)", color: "#10B981" },
              }}
              className="h-[300px]"
            >
              <AreaChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="cookieless"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Area type="monotone" dataKey="revenue" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance por Horário</CardTitle>
            <CardDescription>Conversões ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                conversions: { label: "Conversões", color: "#8B5CF6" },
                cost: { label: "Custo (R$)", color: "#F59E0B" },
              }}
              className="h-[300px]"
            >
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="conversions" fill="#8B5CF6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>ROAS por Campanha</CardTitle>
            <CardDescription>Retorno sobre investimento publicitário</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignData.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-600">Investimento: R$ {campaign.spend.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{campaign.roas}x</div>
                    <div className="text-sm text-gray-600">R$ {campaign.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
            <CardDescription>Jornada do usuário</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-gray-600">{stage.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(stage.percentage * 10, 5)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {stage.value.toLocaleString()} {stage.stage.toLowerCase()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Cost Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Análise Detalhada de Custos vs Receita</CardTitle>
          <CardDescription>Investimento, receita, lucro e métricas de performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              adSpend: { label: "Investimento (R$)", color: "#EF4444" },
              revenue: { label: "Receita (R$)", color: "#10B981" },
              profit: { label: "Lucro (R$)", color: "#3B82F6" },
              roas: { label: "ROAS", color: "#8B5CF6" },
            }}
            className="h-[400px]"
          >
            <ComposedChart data={detailedCostAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => {
                  if (name === "roas") return [`${value}x`, name]
                  return [`R$ ${value}`, name]
                }}
              />
              <Bar yAxisId="left" dataKey="adSpend" fill="#EF4444" />
              <Bar yAxisId="left" dataKey="profit" fill="#3B82F6" />
              <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#8B5CF6" strokeWidth={3} />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Additional Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Métricas de Custo</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPA Médio</span>
                <span className="font-bold text-lg">R$ 26,18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPC Médio</span>
                <span className="font-bold text-lg">R$ 2,89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CTR Médio</span>
                <span className="font-bold text-lg">2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taxa de Conversão</span>
                <span className="font-bold text-lg">4.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance Financeira</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Receita Total</span>
                <span className="font-bold text-lg text-green-600">R$ 35.802</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lucro Total</span>
                <span className="font-bold text-lg text-blue-600">R$ 26.622</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Margem Média</span>
                <span className="font-bold text-lg">78.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROAS Médio</span>
                <span className="font-bold text-lg text-purple-600">3.9x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Tendências</CardTitle>
            <CardDescription>Comparado com semana anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversões</span>
                <span className="font-bold text-lg text-green-600">+31.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Receita</span>
                <span className="font-bold text-lg text-green-600">+28.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPA</span>
                <span className="font-bold text-lg text-green-600">-12.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROAS</span>
                <span className="font-bold text-lg text-green-600">+18.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
