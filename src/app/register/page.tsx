"use client"

import { useTheme } from "@/hooks/use-theme"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BarChart3 } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { SITE_CONFIG } from "@/lib/constants"
import { Footer } from "@/components/layout/footer"

export default function RegisterPage() {
  const { themeClasses, mounted } = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; global?: string }>({})

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <main className="container mx-auto px-4 flex-1" id="main-content">
        <div className="min-h-[70vh] grid md:grid-cols-2 gap-8 items-center py-10 md:py-16">
          {/* Left: CTA copy */}
          <section className="hidden md:block">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className={`text-lg md:text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
            </Link>
            <h1 className={`text-3xl font-bold mb-4 ${themeClasses.textPrimary}`}>Crie sua conta</h1>
            <p className={`${themeClasses.textSecondary} mb-6`}>
              Comece a medir com precisão, recupere conversões perdidas e eleve a performance das suas campanhas.
            </p>
            <ul className={`space-y-3 ${themeClasses.textSecondary}`}>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                Setup rápido e guiado
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                Dados confiáveis para otimização
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                Suporte técnico quando precisar
              </li>
            </ul>
          </section>

          {/* Right: Register card */}
          <div className="w-full max-w-md md:ml-auto">
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={`px-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary}`}
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para a Home
                </Link>
              </Button>
            </div>

            <Card className={`${themeClasses.bgCard} ${themeClasses.borderCard} w-full`}>
              <CardHeader>
                <CardTitle className="text-2xl">Criar conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    className={themeClasses.bgInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="voce@empresa.com"
                    className={themeClasses.bgInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email ? (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={themeClasses.bgInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password ? (
                    <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                  ) : null}
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  disabled={loading}
                  onClick={async () => {
                    setErrors({})
                    // Client-side validation
                    const nextErrors: typeof errors = {}
                    if (!name || name.trim().length < 2) nextErrors.name = "Informe seu nome completo."
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(email)) nextErrors.email = "Informe um email válido."
                    if (!password || password.length < 8) nextErrors.password = "A senha deve ter ao menos 8 caracteres."

                    if (Object.keys(nextErrors).length > 0) {
                      setErrors(nextErrors)
                      return
                    }

                    try {
                      setLoading(true)
                      const res = await fetch("/api/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, password }),
                      })
                      if (!res.ok) {
                        const data = await res.json().catch(() => ({}))
                        if (res.status === 409) {
                          setErrors({ email: "Este email já está cadastrado.", global: data?.error })
                        } else if (res.status === 400) {
                          setErrors({ global: "Dados inválidos. Verifique os campos." })
                        } else {
                          setErrors({ global: data?.error || "Não foi possível criar sua conta." })
                        }
                        return
                      }
                      await signIn("credentials", { email, password, callbackUrl: "/dashboard" })
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  {loading ? "Criando..." : "Criar conta"}
                </Button>

                {errors.global ? (
                  <p className="text-sm text-red-600" role="alert">{errors.global}</p>
                ) : null}

                <div className="flex items-center justify-between text-sm">
                  <span className={themeClasses.textMuted}>Já tem conta?</span>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Link href="/login">Entrar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
