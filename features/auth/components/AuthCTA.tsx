"use client"

import Link from "next/link"
import { BarChart3 } from "lucide-react"
import type { ThemeClasses } from "@/lib/theme"
import { SITE_CONFIG } from "@/lib/constants"

export function AuthCTA({ themeClasses, variant }: { themeClasses: ThemeClasses; variant: "login" | "register" }) {
  const heading = variant === "login" ? "Bem-vindo de volta" : "Crie sua conta"
  const bullets =
    variant === "login"
      ? [
          "Métricas unificadas e confiáveis",
          "Integrações com principais plataformas",
          "Segurança e privacidade em primeiro lugar",
        ]
      : ["Setup rápido e guiado", "Dados confiáveis para otimização", "Suporte técnico quando precisar"]

  return (
    <section className="hidden md:block">
      <Link href="/" className="flex items-center space-x-2 mb-6">
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <span className={`text-lg md:text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
      </Link>
      <h1 className={`text-3xl font-bold mb-4 ${themeClasses.textPrimary}`}>{heading}</h1>
      <p className={`${themeClasses.textSecondary} mb-6`}>
        {variant === "login"
          ? "Acesse sua conta para acompanhar resultados, configurar integrações e gerenciar seu rastreamento server‑side com precisão."
          : "Comece a medir com precisão, recupere conversões perdidas e eleve a performance das suas campanhas."}
      </p>
      <ul className={`space-y-3 ${themeClasses.textSecondary}`}>
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
            {b}
          </li>
        ))}
      </ul>
    </section>
  )
}

