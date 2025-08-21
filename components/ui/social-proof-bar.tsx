import { TrendingUp, Clock, Award } from "lucide-react"
import { SOCIAL_PROOF } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface SocialProofBarProps {
  themeClasses: ThemeClasses
}

export function SocialProofBar({ themeClasses }: SocialProofBarProps) {
  return (
    <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} py-2 md:py-3`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
          {/* Prova Social */}
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 ${themeClasses.bgBlue} rounded-full flex items-center justify-center`}>
              <TrendingUp className="w-3 h-3 text-blue-600" />
            </div>
            <span className={`${themeClasses.textSecondary} font-medium`}>{SOCIAL_PROOF.text}</span>
          </div>

          {/* Urgência */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-orange-600" />
            </div>
            <span className="text-orange-600 font-medium text-xs md:text-sm">{SOCIAL_PROOF.urgency}</span>
          </div>

          {/* Autoridade */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-purple-600" />
            </div>
            <span className={`${themeClasses.textMuted} text-xs`}>{SOCIAL_PROOF.authority}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
