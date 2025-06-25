import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { MapPin, Clock, ShoppingCart, Smartphone } from "lucide-react"

const audienceData = [
  { name: "Desktop", value: 65, color: "#8884d8" },
  { name: "Mobile", value: 30, color: "#82ca9d" },
  { name: "Tablet", value: 5, color: "#ffc658" },
]

const ageGroups = [
  { label: "25-34 anos", percentage: 42, color: "bg-blue-600", conversions: 180, revenue: 45000 },
  { label: "35-44 anos", percentage: 28, color: "bg-purple-600", conversions: 120, revenue: 38000 },
  { label: "18-24 anos", percentage: 20, color: "bg-green-600", conversions: 85, revenue: 18000 },
  { label: "45+ anos", percentage: 10, color: "bg-orange-600", conversions: 45, revenue: 15000 },
]

const genderData = [
  { name: "Feminino", value: 58, color: "#EC4899", conversions: 248, avgOrder: 125 },
  { name: "Masculino", value: 42, color: "#3B82F6", conversions: 182, avgOrder: 98 },
]

const locationData = [
  { city: "São Paulo", users: 35, conversions: 156, revenue: 42000 },
  { city: "Rio de Janeiro", users: 22, conversions: 98, revenue: 28000 },
  { city: "Belo Horizonte", users: 12, conversions: 54, revenue: 15000 },
  { city: "Brasília", users: 8, conversions: 36, revenue: 12000 },
  { city: "Porto Alegre", users: 7, conversions: 32, revenue: 9500 },
  { city: "Outras", users: 16, conversions: 54, revenue: 14500 },
]

const behaviorData = [
  { behavior: "Primeira Compra", percentage: 45, value: 1950, avgValue: 89 },
  { behavior: "Comprador Recorrente", percentage: 35, value: 1520, avgValue: 156 },
  { behavior: "Cliente VIP", percentage: 12, value: 520, avgValue: 340 },
  { behavior: "Reativado", percentage: 8, value: 350, avgValue: 78 },
]

const timeData = [
  { hour: "06h", users: 120, conversions: 8 },
  { hour: "09h", users: 450, conversions: 28 },
  { hour: "12h", users: 680, conversions: 45 },
  { hour: "15h", users: 720, conversions: 52 },
  { hour: "18h", users: 890, conversions: 68 },
  { hour: "21h", users: 650, conversions: 48 },
  { hour: "00h", users: 280, conversions: 15 },
]

const deviceDetailData = [
  { device: "iPhone", users: 1250, conversions: 89, conversionRate: 7.1 },
  { device: "Samsung Galaxy", users: 980, conversions: 65, conversionRate: 6.6 },
  { device: "Desktop Windows", users: 2100, conversions: 168, conversionRate: 8.0 },
  { device: "MacBook", users: 850, conversions: 78, conversionRate: 9.2 },
  { device: "iPad", users: 320, conversions: 18, conversionRate: 5.6 },
  { device: "Outros", users: 500, conversions: 32, conversionRate: 6.4 },
]

const interestData = [
  { interest: "Moda e Beleza", percentage: 28, engagement: 8.5 },
  { interest: "Tecnologia", percentage: 22, engagement: 7.2 },
  { interest: "Casa e Decoração", percentage: 18, engagement: 6.8 },
  { interest: "Fitness e Saúde", percentage: 15, engagement: 9.1 },
  { interest: "Viagens", percentage: 10, engagement: 5.4 },
  { interest: "Outros", percentage: 7, engagement: 4.2 },
]

export default function AudienceDemo() {
  return (
    <div className="space-y-6">
      {/* Top Row - Main Demographics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Dispositivos
            </CardTitle>
            <CardDescription>Distribuição por tipo de dispositivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Gênero</CardTitle>
            <CardDescription>Distribuição e performance por gênero</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Faixa Etária</CardTitle>
            <CardDescription>Dados demográficos detalhados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ageGroups.map((group, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{group.label}</span>
                  <span className="text-sm font-medium">{group.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${group.color} h-2 rounded-full`} style={{ width: `${group.percentage}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{group.conversions} conversões</span>
                  <span>R$ {group.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Geographic and Time Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Localização Geográfica
            </CardTitle>
            <CardDescription>Performance por cidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{location.city}</div>
                    <div className="text-sm text-gray-600">{location.users}% dos usuários</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{location.conversions}</div>
                    <div className="text-xs text-gray-500">R$ {location.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atividade por Horário
            </CardTitle>
            <CardDescription>Usuários e conversões ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Details and Behavior */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Dispositivos Detalhados</CardTitle>
            <CardDescription>Performance por modelo de dispositivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceDetailData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="device" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Comportamento de Compra
            </CardTitle>
            <CardDescription>Segmentação por tipo de cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {behaviorData.map((behavior, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{behavior.behavior}</span>
                    <span className="text-sm text-gray-600">{behavior.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${behavior.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{behavior.value} clientes</span>
                    <span>Ticket médio: R$ {behavior.avgValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interests and Engagement */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Interesses e Engajamento</CardTitle>
          <CardDescription>Categorias de interesse da audiência e taxa de engajamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Distribuição de Interesses</h4>
              <div className="space-y-3">
                {interestData.map((interest, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{interest.interest}</span>
                      <span className="text-sm text-gray-600">{interest.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${interest.percentage * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-700">Taxa de Engajamento</h4>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={interestData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="interest" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-900 mb-2">847K</div>
            <div className="text-sm text-blue-700">Usuários Únicos</div>
            <div className="text-xs text-green-600 mt-1">+18.2% vs semana anterior</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-900 mb-2">4.2%</div>
            <div className="text-sm text-purple-700">Taxa de Conversão</div>
            <div className="text-xs text-green-600 mt-1">+0.8% vs semana anterior</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-900 mb-2">R$ 127</div>
            <div className="text-sm text-green-700">Ticket Médio</div>
            <div className="text-xs text-green-600 mt-1">+12.5% vs semana anterior</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-900 mb-2">2.8x</div>
            <div className="text-sm text-orange-700">LTV/CAC Ratio</div>
            <div className="text-xs text-green-600 mt-1">+0.3x vs semana anterior</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
