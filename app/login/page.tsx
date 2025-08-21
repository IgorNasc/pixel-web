"use client"

import { useTheme } from "@/hooks/use-theme"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthCTA } from "@/features/auth/components/AuthCTA"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const { themeClasses, mounted } = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({})

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      {/* Centered login card with top ghost link */}
      <main className="container mx-auto px-4 flex-1" id="main-content">
        <div className="min-h-[70vh] grid md:grid-cols-2 gap-8 items-center py-10 md:py-16">
          {/* Left: CTA copy */}
          <AuthCTA themeClasses={themeClasses} variant="login" />

          {/* Right: Login card */}
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
                <CardTitle className="text-2xl">Entrar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              {/* Email/password starter form; wire to Neon Auth later */}
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
                  <div
                    className="mt-1 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.email}
                  </div>
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
                  <div
                    className="mt-1 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                onClick={async () => {
                  setErrors({})
                  const nextErrors: typeof errors = {}
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  if (!emailRegex.test(email)) nextErrors.email = "Informe um email válido."
                  if (!password) nextErrors.password = "Informe sua senha."
                  if (Object.keys(nextErrors).length > 0) {
                    setErrors(nextErrors)
                    return
                  }

                  setLoading(true)
                  try {
                    const res = await signIn("credentials", {
                      email,
                      password,
                      redirect: false,
                      callbackUrl: "/dashboard",
                    })
                    if (res?.ok) {
                      router.push(res.url || "/dashboard")
                      return
                    }
                    setErrors({ global: "Email ou senha inválidos." })
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                {loading ? "Logando..." : "Logar"}
              </Button>

              {/* Google login disabled */}
              

              {errors.global ? (
                <div
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
                  role="alert"
                  aria-live="assertive"
                >
                  {errors.global}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-2 text-sm">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Link href="#">Esqueci minha senha</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Link href="/register">Criar conta</Link>
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
