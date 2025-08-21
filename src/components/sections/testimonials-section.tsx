import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { TESTIMONIALS } from "@/lib/constants"
import type { ThemeClasses } from "@/lib/theme"

interface TestimonialsSectionProps {
  themeClasses: ThemeClasses
}

export function TestimonialsSection({ themeClasses }: TestimonialsSectionProps) {
  return (
    <section className={`py-12 md:py-20 px-4 ${themeClasses.bgSecondary}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}>
            Histórias reais de <span className="text-blue-600">sucesso</span>
          </h2>
          <p className={`text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Veja como nossos clientes transformaram seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className={`${themeClasses.bgCard} ${themeClasses.borderCard} h-full`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4 md:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote
                  className={`text-base md:text-lg ${themeClasses.textSecondary} mb-4 md:mb-6 leading-relaxed`}
                >
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <span className="text-white font-semibold text-sm md:text-base">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className={`font-semibold ${themeClasses.textPrimary} text-sm md:text-base`}>
                      {testimonial.name}
                    </div>
                    <div className={`${themeClasses.textMuted} text-xs md:text-sm`}>{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
