import { TrendingUp } from "lucide-react"

interface StatData {
  metric: string
  value: string
  change: string
}

interface StatsGridProps {
  data: StatData[]
}

export default function StatsGrid({ data }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
      {data.map((stat, index) => (
        <div key={index} className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-600 mb-1">{stat.metric}</div>
          <div className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  )
}
