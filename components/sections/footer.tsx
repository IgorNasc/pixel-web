"use client"

import { BarChart3, Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="py-16 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl">Ad Tracker</span>
                <div className="text-xs text-gray-400">Analytics Sem Cookies</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A solução mais avançada para rastreamento de anúncios Meta no Brasil. 94% de precisão, conformidade LGPD e
              suporte especializado.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@adtracker.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">
                  Recursos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors">
                  Preços
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrações
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Guias Meta Ads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cases de Sucesso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Centro de Ajuda
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">&copy; 2024 Ad Tracker Brasil. Todos os direitos reservados.</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>CNPJ: 00.000.000/0001-00</span>
              <span>|</span>
              <span>São Paulo, SP</span>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Ad Tracker é uma marca registrada. Meta, Facebook e Instagram são marcas registradas da Meta Platforms,
              Inc. Não somos afiliados ao Meta/Facebook. Todos os direitos reservados aos respectivos proprietários.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
