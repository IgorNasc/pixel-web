"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star } from "lucide-react"
import { submitInterestForm } from "@/app/actions"
import InterestForm from "@/components/forms/interest-form"
import SuccessMessage from "@/components/ui/success-message"

export default function InterestFormSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await submitInterestForm(formData)
      setFormSubmitted(true)
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">🚀 Garanta Seu Acesso Antecipado</h2>
              <p className="text-xl opacity-90 mb-4">
                Seja um dos primeiros a usar o Ad Tracker e pague apenas <strong>R$ 49,90/mês</strong>
              </p>
              <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>+500 interessados</span>
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
