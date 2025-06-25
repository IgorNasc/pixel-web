"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SuccessMessageProps {
  onReset: () => void
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-2xl p-12">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold mb-4">🎉 Cadastro Realizado com Sucesso!</h3>
        <p className="text-xl opacity-90 mb-6">
          Obrigado pelo interesse! Você receberá um email de confirmação em breve.
        </p>
        <div className="bg-white/20 rounded-xl p-6 mb-6">
          <h4 className="font-semibold mb-3">📧 Próximos Passos:</h4>
          <ul className="text-left space-y-2 text-sm opacity-90">
            <li>✅ Confirme seu email (verifique a caixa de spam)</li>
            <li>📱 Siga nossas redes sociais para atualizações</li>
            <li>🚀 Aguarde o convite para acesso antecipado</li>
            <li>💰 Garanta o preço especial de R$ 29,90/mês</li>
          </ul>
        </div>
        <Button onClick={onReset} variant="outline" className="border-white/30 text-white hover:bg-white/20">
          Cadastrar Outro Email
        </Button>
      </div>
    </div>
  )
}
