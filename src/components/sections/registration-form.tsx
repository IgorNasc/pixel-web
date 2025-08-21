"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { FormField } from "@/components/ui/form-field"
import { registrationSchema, type RegistrationFormData } from "@/lib/validations"
import type { ThemeClasses } from "@/types"

interface RegistrationFormProps {
  themeClasses: ThemeClasses
  isDarkMode: boolean
}

export function RegistrationForm({ themeClasses }: RegistrationFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      let result
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
      } else {
        // Se não for JSON, pegar como texto para debug
        const textResponse = await response.text()
        console.error("Resposta não-JSON:", textResponse)
        throw new Error("Resposta inválida do servidor")
      }

      if (!response.ok) {
        throw new Error(result?.error || "Erro ao enviar formulário")
      }

      if (!result.success) {
        throw new Error(result.error || "Erro desconhecido")
      }

      console.log("Email enviado com sucesso:", result)
      setFormSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setSubmitError(error instanceof Error ? error.message : "Erro inesperado. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormSubmitted(false)
    setSubmitError(null)
    reset()
  }

  return (
    <section
      id="cadastro"
      className={`py-12 md:py-20 px-4 ${themeClasses.bgSecondary}`}
      aria-labelledby="registration-heading"
    >
      <div className="container mx-auto max-w-2xl">
        <header className="text-center mb-8 md:mb-12">
          <h2
            id="registration-heading"
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
          >
            Comece seu <span className="text-blue-600">teste grátis</span>
          </h2>
          <p className={`text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Preencha os dados abaixo e tenha acesso imediato à plataforma por 7 dias.
          </p>
        </header>

        <Card className={`${themeClasses.bgCard} ${themeClasses.borderCard}`}>
          <CardContent className="p-4 md:p-6 lg:p-8">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" noValidate>
                {submitError && (
                  <div className={`${themeClasses.bgError} border border-red-500/30 rounded-lg p-3 md:p-4 mb-4`}>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    label="Nome Completo"
                    required
                    {...register("fullName")}
                    error={errors.fullName?.message}
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />

                  <FormField
                    label="Email"
                    type="email"
                    required
                    {...register("email")}
                    error={errors.email?.message}
                    placeholder="seu@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    label="Nome da Empresa"
                    required
                    {...register("company")}
                    error={errors.company?.message}
                    placeholder="Sua empresa"
                    autoComplete="organization"
                  />

                  <FormField
                    label="Telefone"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message}
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    description="Opcional"
                  />
                </div>

                <FormField
                  label="Site da Empresa"
                  type="url"
                  {...register("website")}
                  error={errors.website?.message}
                  placeholder="https://seusite.com.br"
                  autoComplete="url"
                  description="Opcional"
                />

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms")}
                    className={`mt-1 w-4 h-4 text-blue-600 ${themeClasses.bgInput} border ${themeClasses.borderInput} rounded focus:ring-blue-600 focus:ring-2 flex-shrink-0`}
                    aria-describedby={errors.terms ? "terms-error" : undefined}
                  />
                  <div>
                    <label htmlFor="terms" className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                      Concordo com os{" "}
                      <Link href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link href="#" className="text-blue-600 hover:text-blue-500 underline">
                        Política de Privacidade
                      </Link>
                      . Autorizo o contato para demonstração do produto.
                    </label>
                    {errors.terms && (
                      <p id="terms-error" className="text-sm text-red-600 mt-1" role="alert">
                        {errors.terms.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm md:text-lg py-3 md:py-4 disabled:opacity-50"
                  disabled={!isValid || isSubmitting}
                  aria-label="Enviar formulário de cadastro"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                      Começar Teste Grátis Agora
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className={`text-xs md:text-sm ${themeClasses.textMuted}`}>
                    ✅ Sem cartão de crédito • ✅ Acesso imediato • ✅ Suporte incluído
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 md:py-8" role="status" aria-live="polite">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 ${themeClasses.bgSuccess} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6`}
                >
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500" aria-hidden="true" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${themeClasses.textPrimary} mb-3 md:mb-4`}>
                  Cadastro Realizado com Sucesso!
                </h3>
                <p className={`${themeClasses.textSecondary} mb-4 md:mb-6 leading-relaxed text-sm md:text-base px-2`}>
                  Obrigado pelo seu interesse no AdTracker! <br />
                  <strong className={themeClasses.textPrimary}>Nossa equipe recebeu seus dados</strong> e entrará em
                  contato em breve para iniciar seu período de teste grátis de 7 dias.
                </p>
                <div className={`${themeClasses.bgBlue} border border-blue-600/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6`}>
                  <p className="text-blue-600 text-xs md:text-sm">
                    📧 Aguarde nosso contato por email ou telefone <br />🚀 Nossa equipe entrará em contato para ajudar
                    na implementação
                  </p>
                </div>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className={`${themeClasses.borderInput} ${themeClasses.textPrimary} ${themeClasses.hoverBg} bg-transparent text-sm md:text-base`}
                  aria-label="Fazer um novo cadastro"
                >
                  Fazer Novo Cadastro
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
