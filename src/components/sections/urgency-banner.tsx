import { AlertTriangle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ThemeClasses } from "@/lib/theme"

interface UrgencyBannerProps {
  themeClasses: ThemeClasses
}

export function UrgencyBanner({ themeClasses }: UrgencyBannerProps) {
  return (
    <div className={`${themeClasses.bgSecondary} border-y ${themeClasses.border} py-3 md:py-4`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className={`${themeClasses.textPrimary} font-semibold text-sm md:text-base`}>
              Você pode estar perdendo dinheiro e nem sabe
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-red-500" />
            <Badge className="bg-red-100 text-red-700 text-xs md:text-sm hover:bg-red-200 hover:text-red-800 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/70">
              Vagas limitadas no plano Free
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
