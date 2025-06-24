"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, CheckCircle, User, Building, DollarSign, MessageSquare } from "lucide-react"

interface InterestFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  isSubmitting: boolean
}

export default function InterestForm({ onSubmit, isSubmitting }: InterestFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    monthlyAdSpend: "",
    challenges: "",
    goals: "",
    updates: false,
  })

  const totalSteps = 4

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value.toString())
    })
    await onSubmit(form)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email
      case 2:
        return formData.company && formData.role
      case 3:
        return formData.monthlyAdSpend
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step <= currentStep
                  ? "bg-white text-blue-600 shadow-lg"
                  : "bg-white/20 text-white/60 border border-white/30"
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 transition-all ${step < currentStep ? "bg-white" : "bg-white/20"}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Informações Pessoais */}
        {currentStep === 1 && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Informações Pessoais</h3>
                  <p className="text-white/70 text-sm">Vamos começar com seus dados básicos</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Nome *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    placeholder="João"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Sobrenome *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    placeholder="Silva"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email Profissional *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    placeholder="joao@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">WhatsApp (opcional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Informações da Empresa */}
        {currentStep === 2 && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Informações da Empresa</h3>
                  <p className="text-white/70 text-sm">Conte-nos sobre sua empresa</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Nome da Empresa *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                    placeholder="Sua Empresa Ltda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Seu Cargo *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  >
                    <option value="" className="text-gray-900">
                      Selecione seu cargo...
                    </option>
                    <option value="ceo" className="text-gray-900">
                      CEO/Fundador
                    </option>
                    <option value="marketing-director" className="text-gray-900">
                      Diretor de Marketing
                    </option>
                    <option value="marketing-manager" className="text-gray-900">
                      Gerente de Marketing
                    </option>
                    <option value="performance-manager" className="text-gray-900">
                      Gerente de Performance
                    </option>
                    <option value="media-buyer" className="text-gray-900">
                      Media Buyer
                    </option>
                    <option value="analyst" className="text-gray-900">
                      Analista de Marketing
                    </option>
                    <option value="other" className="text-gray-900">
                      Outro
                    </option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Investimento em Anúncios */}
        {currentStep === 3 && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Investimento em Anúncios</h3>
                  <p className="text-white/70 text-sm">Qual seu investimento atual em Meta Ads?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "under-5k", label: "Menos de R$ 5.000", popular: false },
                  { value: "5k-15k", label: "R$ 5.000 - R$ 15.000", popular: true },
                  { value: "15k-30k", label: "R$ 15.000 - R$ 30.000", popular: true },
                  { value: "30k-50k", label: "R$ 30.000 - R$ 50.000", popular: false },
                  { value: "50k-100k", label: "R$ 50.000 - R$ 100.000", popular: false },
                  { value: "100k-plus", label: "Mais de R$ 100.000", popular: false },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.monthlyAdSpend === option.value
                        ? "border-white bg-white/10"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => handleInputChange("monthlyAdSpend", option.value)}
                  >
                    {option.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">Popular</Badge>
                    )}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          formData.monthlyAdSpend === option.value ? "border-white bg-white" : "border-white/40"
                        }`}
                      />
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Desafios e Objetivos */}
        {currentStep === 4 && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Desafios e Objetivos</h3>
                  <p className="text-white/70 text-sm">Ajude-nos a entender suas necessidades</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Qual seu maior desafio com rastreamento de anúncios?
                  </label>
                  <textarea
                    value={formData.challenges}
                    onChange={(e) => handleInputChange("challenges", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 resize-none transition-all"
                    placeholder="Ex: Perda de dados por bloqueadores, dificuldade em medir ROAS real, problemas com iOS 14.5..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    Qual seu principal objetivo com o Ad Tracker?
                  </label>
                  <select
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                  >
                    <option value="" className="text-gray-900">
                      Selecione seu objetivo...
                    </option>
                    <option value="increase-roas" className="text-gray-900">
                      Aumentar ROAS
                    </option>
                    <option value="better-tracking" className="text-gray-900">
                      Melhorar rastreamento
                    </option>
                    <option value="reduce-costs" className="text-gray-900">
                      Reduzir custos
                    </option>
                    <option value="scale-campaigns" className="text-gray-900">
                      Escalar campanhas
                    </option>
                    <option value="compliance" className="text-gray-900">
                      Conformidade LGPD
                    </option>
                    <option value="other" className="text-gray-900">
                      Outro
                    </option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="updates"
                    checked={formData.updates}
                    onChange={(e) => handleInputChange("updates", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/20 focus:ring-2 focus:ring-white/50"
                  />
                  <label htmlFor="updates" className="text-sm text-white/90">
                    Quero receber atualizações sobre o lançamento, dicas exclusivas de otimização de anúncios Meta e
                    conteúdos sobre marketing digital
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            onClick={prevStep}
            variant="outline"
            className={`border-white/30 text-white hover:bg-white/20 hover:text-white ${currentStep === 1 ? "invisible" : ""}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !isStepValid()}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  🎯 Garantir Acesso Antecipado
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="text-center space-y-2 pt-4 border-t border-white/20">
        <p className="text-sm text-white/75">✅ Sem compromisso • ✅ Dados protegidos • ✅ Cancele quando quiser</p>
        <p className="text-xs text-white/60">
          Ao se cadastrar, você concorda em receber emails sobre o Ad Tracker. Nunca compartilhamos seus dados.
        </p>
      </div>
    </div>
  )
}
