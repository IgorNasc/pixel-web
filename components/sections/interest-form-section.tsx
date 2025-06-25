"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star } from "lucide-react"
import { submitInterestForm } from "@/app/actions"
import InterestForm from "@/components/forms/interest-form"
import SuccessMessage from "@/components/ui/success-message"
import { useGoogleAnalytics } from "@/components/analytics/google-analytics"

export default function InterestFormSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackFormSubmission, trackSectionView } = useGoogleAnalytics()

  useEffect(() => {
    trackSectionView("interest_form")
  }, [trackSectionView])

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await submitInterestForm(formData)
      setFormSubmitted(true)
      trackFormSubmission("interest_form")
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="interest-form"
      className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto max-w-2xl relative z-10">
        {!formSubmitted ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">🔥 Garanta Seu Desconto de 50%</h2>
              <p className="text-xl opacity-90 mb-6">
                Seja um dos primeiros a usar o Ad Tracker e pague apenas <strong>R$ 29,90</strong> (ao invés de R$
                59,90)
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">💰 Promoção de Lançamento - 50% OFF</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg line-through opacity-75">R$ 59,90</span>
                      <span className="text-3xl font-bold">R$ 29,90</span>
                    </div>
                    <div className="text-sm opacity-90">Plano Starter</div>
                    <div className="text-xs opacity-75 text-green-200">Economia de R$ 30/mês</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg line-through opacity-75">R$ 79,90</span>
                      <span className="text-3xl font-bold">R$ 39,90</span>
                    </div>
                    <div className="text-sm opacity-90">Plano Professional</div>
                    <div className="text-xs opacity-75 text-green-200">Economia de R$ 40/mês</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm opacity-80 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>500+ interessados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Lançamento em breve</span>
                </div>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <InterestForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
              </CardContent>
            </Card>
          </>
        ) : (
          <SuccessMessage onReset={() => setFormSubmitted(false)} />
        )}
      </div>
    </section>
  )
}
