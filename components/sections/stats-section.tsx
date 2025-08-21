import { AnimatedCounter } from "@/components/ui/animated-counter"
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import type { ThemeClasses } from "@/lib/theme"

interface StatsSectionProps {
  themeClasses: ThemeClasses
}

export function StatsSection({ themeClasses }: StatsSectionProps) {
  const stats = [
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      label: "Mais dados capturados",
      color: "text-green-500",
    },
    {
      icon: Users,
      value: 1200,
      prefix: "+",
      label: "Sites monitorados",
      color: "text-blue-500",
    },
    {
      icon: DollarSign,
      value: 65,
      suffix: "%",
      label: "Melhoria no ROI",
      color: "text-purple-500",
    },
    {
      icon: Clock,
      value: 5,
      suffix: " min",
      label: "Tempo de setup",
      color: "text-orange-500",
    },
  ]

  return (
    <section className={`py-12 md:py-16 px-4 ${themeClasses.bgGradient}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${themeClasses.textPrimary}`}>
            Números que <span className="text-blue-600">impressionam</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 ${themeClasses.bgCard} ${themeClasses.borderCard} border rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4`}
                >
                  <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${themeClasses.textPrimary} mb-1 md:mb-2`}>
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className={`text-sm md:text-base ${themeClasses.textSecondary}`}>{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
