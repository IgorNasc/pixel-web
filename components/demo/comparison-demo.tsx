import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Tooltip, ResponsiveContainer } from "recharts"
import { AlertTriangle, CheckCircle, TrendingUp, Shield } from "lucide-react"

const conversionData = [
  { name: "Seg", traditional: 45, cookieless: 78, traditionalCost: 3.2, cookielessCost: 2.1 },
  { name: "Ter", traditional: 52, cookieless: 85, traditionalCost: 3.5, cookielessCost: 2.3 },
  { name: "Qua", traditional: 38, cookieless: 72, traditionalCost: 2.8, cookielessCost: 1.9 },
  { name: "Qui", traditional: 61, cookieless: 94, traditionalCost: 3.8, cookielessCost: 2.5 },
  { name: "Sex", traditional: 55, cookieless: 89, traditionalCost: 3.4, cookielessCost: 2.2 },
  { name: "Sáb", traditional: 67, cookieless: 98, traditionalCost: 3.9, cookielessCost: 2.6 },
  { name: "Dom", traditional: 43, cookieless: 76, traditionalCost: 3.1, cookielessCost: 2.0 },
]

const accuracyData = [
  { method: "Cookies Tradicionais", accuracy: 65, blocked: 35 },
  { method: "Ad Tracker", accuracy: 94, blocked: 6 },
]

const deviceBlockingData = [
  { device: "Desktop", traditional: 25, adtracker: 2 },
  { device: "Mobile iOS", traditional: 45, adtracker: 3 },
  { device: "Mobile Android", traditional: 30, adtracker: 2 },
  { device: "Tablet", traditional: 20, adtracker: 1 },
]

const complianceData = [
  { name: "LGPD Compliant", traditional: 60, adtracker: 100 },
  { name: "GDPR Compliant", traditional: 55, adtracker: 100 },
  { name: "CCPA Compliant", traditional: 50, adtracker: 100 },
]

const costSavingsData = [
  { name: "Jan", traditional: 15000, adtracker: 12000, savings: 3000 },
  { name: "Fev", traditional: 16500, adtracker: 13200, savings: 3300 },
  { name: "Mar", traditional: 18000, adtracker: 14400, savings: 3600 },
  { name: "Abr", traditional: 17200, adtracker: 13760, savings: 3440 },
  { name: "Mai", traditional: 19000, adtracker: 15200, savings: 3800 },
  { name: "Jun", traditional: 20500, adtracker: 16400, savings: 4100 },
]

export default function ComparisonDemo() {
  return (
    <div className="space-y-6">
      {/* Main Comparison Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Método Tradicional vs Ad Tracker</CardTitle>
          <CardDescription>Comparação de conversões rastreadas com precisão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="traditional" fill="#EF4444" />
                <Bar dataKey="cookieless" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-700" />
              <CardTitle className="text-red-800">❌ Método Tradicional</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-700">65%</div>
                <div className="text-sm text-gray-700">Precisão dos Dados</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-700">35%</div>
                <div className="text-sm text-gray-700">Taxa de Bloqueio</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Conformidade LGPD</span>
                <span className="text-red-600 font-bold">Limitada</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Custo por Conversão</span>
                <span className="text-red-600 font-bold">R$ 3,40</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dados Perdidos</span>
                <span className="text-red-600 font-bold">~40%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-700" />
              <CardTitle className="text-green-800">✅ Ad Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-700">94%</div>
                <div className="text-sm text-gray-700">Precisão dos Dados</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-700">2%</div>
                <div className="text-sm text-gray-700">Taxa de Bloqueio</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Conformidade LGPD</span>
                <span className="text-green-600 font-bold">Total</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Custo por Conversão</span>
                <span className="text-green-600 font-bold">R$ 2,20</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dados Perdidos</span>
                <span className="text-green-600 font-bold">~6%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Blocking Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Taxa de Bloqueio por Dispositivo</CardTitle>
          <CardDescription>Porcentagem de dados bloqueados por tipo de dispositivo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceBlockingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="traditional" fill="#EF4444" />
                <Bar dataKey="adtracker" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cost Savings Over Time */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Economia de Custos ao Longo do Tempo</CardTitle>
          <CardDescription>Comparativo de custos mensais e economia gerada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="traditional"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="adtracker"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Conformidade Regulatória</CardTitle>
            <CardDescription>Nível de conformidade com regulamentações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.name}</span>
                    <div className="flex gap-4">
                      <span className="text-red-600">{item.traditional}%</span>
                      <span className="text-green-600">{item.adtracker}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full bg-red-100 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${item.traditional}%` }} />
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.adtracker}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Resumo dos Benefícios</CardTitle>
            <CardDescription>Principais vantagens do Ad Tracker</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">+45% Precisão</div>
                  <div className="text-sm text-green-600">Mais dados capturados</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">100% Conformidade</div>
                  <div className="text-sm text-blue-600">LGPD, GDPR e CCPA</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-800">-35% Custo</div>
                  <div className="text-sm text-purple-600">Menor CPA médio</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-orange-800">+28% ROAS</div>
                  <div className="text-sm text-orange-600">Melhor retorno</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
