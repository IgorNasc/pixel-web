"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { RegistrationForm } from "@/components/sections/registration-form"
import { useTheme } from "@/hooks/use-theme"

// Import other sections
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Zap, Target, Users, TrendingUp, X, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { FAQ_ITEMS } from "@/lib/constants"

// Import new components
import { VideoModal } from "@/components/ui/video-modal"
import { SocialProofBar } from "@/components/ui/social-proof-bar"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { UrgencyBanner } from "@/components/sections/urgency-banner"
import { StatsSection } from "@/components/sections/stats-section"
import { ClientLogos } from "@/components/sections/client-logos"

export default function LandingPage() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()

  // Evitar hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200"></div>
          <div className="h-96 bg-gray-100"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}
    >
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <SocialProofBar themeClasses={themeClasses} />

      <main id="main-content">
        <HeroSection themeClasses={themeClasses} />
        <UrgencyBanner themeClasses={themeClasses} />

        {/* Problem Section */}
        <section className={`py-12 md:py-20 px-4 ${themeClasses.bgSecondary}`} aria-labelledby="problems-heading">
          <div className="container mx-auto max-w-6xl">
            <header className="text-center mb-12 md:mb-16">
              <h2
                id="problems-heading"
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
              >
                Seus pixels estão <span className="text-red-500">perdendo dados</span>
              </h2>
              <p className={`text-lg md:text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto px-4`}>
                Adblockers, políticas de privacidade e cookies bloqueados fazem você perder informações valiosas sobre
                seus clientes.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <Card className={`${themeClasses.bgCard} ${themeClasses.borderCard} h-full`}>
                <CardHeader className="pb-3 md:pb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 ${themeClasses.bgError} rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                    aria-hidden="true"
                  >
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                  </div>
                  <CardTitle className={`${themeClasses.textPrimary} text-lg md:text-xl`}>
                    40% dos dados perdidos
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`${themeClasses.textSecondary} text-sm md:text-base leading-relaxed`}>
                    Adblockers e políticas do iOS 14+ bloqueiam pixels tradicionais, causando perda massiva de dados de
                    conversão.
                  </p>
                </CardContent>
              </Card>

              <Card className={`${themeClasses.bgCard} ${themeClasses.borderCard} h-full`}>
                <CardHeader className="pb-3 md:pb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 ${themeClasses.bgError} rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                    aria-hidden="true"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                  </div>
                  <CardTitle className={`${themeClasses.textPrimary} text-lg md:text-xl`}>
                    Otimização prejudicada
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`${themeClasses.textSecondary} text-sm md:text-base leading-relaxed`}>
                    Sem dados precisos, o algoritmo do Meta e Google não consegue otimizar suas campanhas adequadamente.
                  </p>
                </CardContent>
              </Card>

              <Card className={`${themeClasses.bgCard} ${themeClasses.borderCard} h-full`}>
                <CardHeader className="pb-3 md:pb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 ${themeClasses.bgError} rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                    aria-hidden="true"
                  >
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                  </div>
                  <CardTitle className={`${themeClasses.textPrimary} text-lg md:text-xl`}>ROI impreciso</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`${themeClasses.textSecondary} text-sm md:text-base leading-relaxed`}>
                    Decisões baseadas em dados incompletos levam a desperdício de budget e oportunidades perdidas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className={`py-12 md:py-20 px-4 ${themeClasses.bgGradient}`} aria-labelledby="solution-heading">
          <div className="container mx-auto max-w-6xl">
            <header className="text-center mb-12 md:mb-16">
              <h2
                id="solution-heading"
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
              >
                Rastreamento <span className="text-blue-600">Server-Side</span> Inteligente
              </h2>
              <p className={`text-lg md:text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto px-4`}>
                Nossa tecnologia captura dados diretamente no servidor, ignorando completamente bloqueios do lado do
                cliente.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 ${themeClasses.bgBlue} rounded-lg flex items-center justify-center flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>
                        Rastreia Todas as Ações
                      </h3>
                      <p className={`${themeClasses.textSecondary} mb-2 md:mb-3 text-sm md:text-base`}>
                        Captura automaticamente todas as interações dos usuários no seu site:
                      </p>
                      <ul className={`text-xs md:text-sm ${themeClasses.textMuted} space-y-1`}>
                        <li>
                          • <strong>Cliques:</strong> botões, links, produtos
                        </li>
                        <li>
                          • <strong>Visualizações:</strong> páginas, seções, produtos
                        </li>
                        <li>
                          • <strong>Formulários:</strong> preenchimento, envio, abandono
                        </li>
                        <li>
                          • <strong>Navegação:</strong> tempo na página, scroll, saída
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 ${themeClasses.bgBlue} rounded-lg flex items-center justify-center flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>
                        Imune a Bloqueios
                      </h3>
                      <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>
                        Funciona mesmo com adblockers ativos, cookies desabilitados e políticas restritivas do iOS.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 ${themeClasses.bgBlue} rounded-lg flex items-center justify-center flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <Target className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 ${themeClasses.textPrimary}`}>
                        Integração Automática
                      </h3>
                      <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>
                        Envia dados diretamente para Meta Ads, Google Ads e outras plataformas via API server-to-server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className={`${themeClasses.bgCard} rounded-lg p-4 md:p-6 border ${themeClasses.borderCard}`}>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className={`text-xs md:text-sm ${themeClasses.textMuted}`}>Dados Capturados</span>
                    <Badge
                      className={`${themeClasses.bgSuccess} text-green-600 text-xs hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/50 dark:hover:text-green-400`}
                    >
                      100% Precisão
                    </Badge>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`${themeClasses.textSecondary} text-sm md:text-base`}>Conversões</span>
                      <span className="text-green-500 font-semibold text-sm md:text-base">+40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`${themeClasses.textSecondary} text-sm md:text-base`}>Eventos de Página</span>
                      <span className="text-green-500 font-semibold text-sm md:text-base">+65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`${themeClasses.textSecondary} text-sm md:text-base`}>Dados de Formulário</span>
                      <span className="text-green-500 font-semibold text-sm md:text-base">+80%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection themeClasses={themeClasses} />
        <StatsSection themeClasses={themeClasses} />
        <ClientLogos themeClasses={themeClasses} />

        {/* Implementation Support Section */}
        <section
          className={`py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-y ${themeClasses.border}`}
          aria-labelledby="implementation-heading"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <header className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 ${themeClasses.bgBlue} rounded-lg flex items-center justify-center mb-3 md:mb-0 md:mr-4`}
                aria-hidden="true"
              >
                <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h2
                id="implementation-heading"
                className={`text-xl md:text-2xl lg:text-3xl font-bold ${themeClasses.textPrimary} text-center md:text-left`}
              >
                <span className="text-blue-600">Implementação Gratuita</span> Incluída
              </h2>
            </header>
            <p className={`text-lg md:text-xl ${themeClasses.textSecondary} mb-6 md:mb-8 px-4`}>
              Nossa equipe técnica especializada ajuda você a implementar o AdTracker no seu site,
              <br className="hidden md:block" />
              <strong className={themeClasses.textPrimary}>sem custo adicional</strong> e com suporte completo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2" aria-hidden="true">
                  🛠️
                </div>
                <h3 className={`font-semibold ${themeClasses.textPrimary} mb-2 text-sm md:text-base`}>
                  Setup Personalizado
                </h3>
                <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
                  Configuramos tudo para seu tipo de negócio
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2" aria-hidden="true">
                  👨‍💻
                </div>
                <h3 className={`font-semibold ${themeClasses.textPrimary} mb-2 text-sm md:text-base`}>
                  Suporte Técnico
                </h3>
                <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
                  Acompanhamento durante toda implementação
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2" aria-hidden="true">
                  ⚡
                </div>
                <h3 className={`font-semibold ${themeClasses.textPrimary} mb-2 text-sm md:text-base`}>
                  Resultados Rápidos
                </h3>
                <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>Dados fluindo em menos de 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className={`py-12 md:py-20 px-4 ${themeClasses.bgGradient}`} aria-labelledby="demo-heading">
          <div className="container mx-auto max-w-4xl text-center">
            <h2
              id="demo-heading"
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
            >
              Veja o AdTracker em <span className="text-blue-600">Ação</span>
            </h2>
            <p className={`text-lg md:text-xl ${themeClasses.textSecondary} mb-8 md:mb-12 px-4`}>
              Demonstração real mostrando como nosso sistema ignora bloqueios e captura 100% dos dados.
            </p>

            <VideoModal themeClasses={themeClasses} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">40%</div>
                <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>Mais conversões rastreadas</p>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">65%</div>
                <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>Melhoria no ROI médio</p>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2">5min</div>
                <p className={`${themeClasses.textSecondary} text-sm md:text-base`}>Tempo de implementação</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection themeClasses={themeClasses} />
        <PricingSection themeClasses={themeClasses} />
        <RegistrationForm themeClasses={themeClasses} isDarkMode={isDarkMode} />

        {/* FAQ Section */}
        <section id="faq" className={`py-12 md:py-20 px-4 ${themeClasses.bgSecondary}`} aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-4xl">
            <header className="text-center mb-12 md:mb-16">
              <h2
                id="faq-heading"
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
              >
                Perguntas <span className="text-blue-600">Frequentes</span>
              </h2>
              <p className={`text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
                Tire suas dúvidas técnicas sobre nossa solução.
              </p>
            </header>

            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className={`${themeClasses.bgCard} ${themeClasses.borderCard} rounded-lg px-4 md:px-6`}
                >
                  <AccordionTrigger
                    className={`${themeClasses.textPrimary} hover:text-blue-600 text-left text-sm md:text-base py-4 md:py-6`}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${themeClasses.textSecondary} text-sm md:text-base leading-relaxed pb-4 md:pb-6`}
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`py-12 md:py-20 px-4 ${themeClasses.bgGradient} border-t ${themeClasses.border}`}
          aria-labelledby="final-cta-heading"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2
              id="final-cta-heading"
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.textPrimary}`}
            >
              <span className="text-red-500">Pare de perder dinheiro</span> com dados incompletos
            </h2>
            <p className={`text-lg md:text-xl ${themeClasses.textSecondary} mb-6 md:mb-8 px-4`}>
              Cada dia sem o AdTracker é dinheiro jogado fora. Seus concorrentes já estão na frente.
              <br className="hidden md:block" />
              <strong className={themeClasses.textPrimary}>Não deixe para amanhã o que pode mudar hoje.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                asChild
                aria-label="Começar teste gratuito agora"
              >
                <Link href="#cadastro">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                  Começar Teste Grátis
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${themeClasses.borderInput} ${themeClasses.textPrimary} ${themeClasses.hoverBg} text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-transparent border-2`}
                asChild
                aria-label="Entrar na lista de espera"
              >
                <Link href="mailto:suporte@adtracker.com.br?subject=Interesse no AdTracker - Solicito Contato&body=Olá, tenho interesse no AdTracker e gostaria de receber mais informações sobre a implementação.">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                  Entrar na Lista
                </Link>
              </Button>
            </div>

            <p className={`text-xs md:text-sm ${themeClasses.textMuted}`}>
              ⚡ Setup em 5 minutos • 🎯 Resultados imediatos • 🔒 Sem compromisso
            </p>
          </div>
        </section>
      </main>

      <Footer themeClasses={themeClasses} />
    </div>
  )
}
