import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Smartphone, Lock, Globe, Clock, Users } from "lucide-react"
import { FEATURES } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface FeaturesSectionProps {
  themeClasses: ThemeClasses
}

const iconMap = {
  BarChart3,
  Smartphone,
  Lock,
  Globe,
  Clock,
  Users,
}

export function FeaturesSection({ themeClasses }: FeaturesSectionProps) {
  return (
    <section id="funcionalidades" className={`py-12 md:py-20 px-4 ${themeClasses.bgSecondary}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}>
            Funcionalidades <span className="text-blue-600">Avançadas</span>
          </h2>
          <p className={`text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Tudo que você precisa para maximizar seus resultados em anúncios pagos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <Card
                key={index}
                className={`${themeClasses.bgCard} ${themeClasses.borderCard} ${themeClasses.hoverCard} transition-colors h-full`}
              >
                <CardHeader className="pb-3 md:pb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 ${themeClasses.bgBlue} rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <CardTitle className={`${themeClasses.textPrimary} text-lg md:text-xl`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`${themeClasses.textSecondary} text-sm md:text-base leading-relaxed`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
