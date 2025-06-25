import type React from "react"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ad Tracker - Recupere 40% das Conversões Perdidas no Meta Ads | R$ 29,90",
  description:
    "Pare de perder conversões! 40% dos seus dados nunca chegam ao Meta por causa de bloqueadores. Ad Tracker captura 94% das conversões reais e reduz seu CPA em 35%. A partir de R$ 29,90/mês.",
  keywords: [
    // Para pessoas leigas
    "anúncios facebook não funcionam",
    "facebook ads perdendo dinheiro",
    "instagram ads caro demais",
    "anúncios meta não convertem",
    "como melhorar anúncios facebook",
    "facebook ads não traz vendas",
    "anúncios instagram sem resultado",
    "meta ads muito caro",
    "facebook pixel não funciona",
    "anúncios bloqueados celular",
    "ios bloqueia anúncios",
    "anúncios não aparecem iphone",
    "facebook ads sem conversão",
    "instagram ads desperdício",
    "como rastrear vendas facebook",

    // Para pessoas técnicas
    "meta conversions api",
    "facebook pixel alternativa",
    "server side tracking meta",
    "ios 14.5 facebook ads",
    "attribution modeling meta",
    "cookieless tracking facebook",
    "meta ads optimization",
    "facebook capi implementation",
    "ad blockers meta ads",
    "safari itp facebook tracking",
    "first party data meta",
    "enhanced conversions meta",
    "facebook ads attribution",
    "meta pixel bypass",
    "conversion tracking solution",

    // Termos comerciais
    "meta ads brasil",
    "facebook ads rastreamento",
    "instagram ads analytics",
    "ROAS otimização",
    "CPA redução",
    "marketing digital brasil",
    "performance marketing",
    "media buyer ferramentas",
    "ads manager analytics",
    "LGPD compliance ads",
    "bloqueador anúncios solução",
    "rastreamento comportamental",
    "analytics sem cookies",
    "conversões perdidas meta",
    "dados perdidos facebook ads",
  ],
  authors: [{ name: "Ad Tracker Brasil" }],
  creator: "Ad Tracker Brasil",
  publisher: "Ad Tracker Brasil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adtracker.com.br"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://adtracker.com.br",
    title: "Ad Tracker - Recupere 40% das Conversões Perdidas no Meta Ads | R$ 29,90",
    description:
      "Pare de perder conversões! 40% dos seus dados nunca chegam ao Meta por causa de bloqueadores. Ad Tracker captura 94% das conversões reais e reduz seu CPA em 35%. A partir de R$ 29,90/mês.",
    siteName: "Ad Tracker Brasil",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ad Tracker - Recupere Conversões Perdidas no Meta Ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Tracker - Recupere 40% das Conversões Perdidas no Meta Ads",
    description:
      "Pare de perder conversões! 40% dos dados nunca chegam ao Meta. Captura 94% das conversões reais. R$ 29,90/mês.",
    images: ["/twitter-image.jpg"],
    creator: "@adtrackerbrasil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="BR" />
        <meta name="geo.country" content="Brazil" />
        <meta name="geo.placename" content="Brasil" />
        <meta name="language" content="Portuguese" />
        <meta name="target_country" content="BR" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data - Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Ad Tracker",
              description:
                "Solução para recuperar conversões perdidas no Meta Ads. Captura 94% das conversões mesmo com bloqueadores ativos. Reduz CPA em 35% e aumenta ROAS em 45%.",
              url: "https://adtracker.com.br",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  name: "Plano Starter",
                  price: "29.90",
                  priceCurrency: "BRL",
                  priceValidUntil: "2024-12-31",
                  availability: "https://schema.org/PreOrder",
                  description: "Recupere conversões perdidas com rastreamento comportamental avançado",
                },
                {
                  "@type": "Offer",
                  name: "Plano Professional",
                  price: "39.90",
                  priceCurrency: "BRL",
                  priceValidUntil: "2024-12-31",
                  availability: "https://schema.org/PreOrder",
                  description: "Solução completa para maximizar ROAS e reduzir CPA",
                },
              ],
              provider: {
                "@type": "Organization",
                name: "Ad Tracker Brasil",
                url: "https://adtracker.com.br",
                logo: "https://adtracker.com.br/logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+55-11-99999-9999",
                  contactType: "customer service",
                  availableLanguage: "Portuguese",
                },
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "BR",
                  addressRegion: "SP",
                },
              },
              featureList: [
                "Rastreamento de conversões sem cookies",
                "Captura 94% das conversões reais",
                "Reduz CPA em até 35%",
                "Aumenta ROAS em até 45%",
                "Funciona com bloqueadores ativos",
                "Compatível com iOS 14.5+",
                "Integração Meta Conversions API",
                "Dashboard analytics avançado",
                "Conformidade LGPD total",
                "Setup em 5 minutos",
              ],
              screenshot: "https://adtracker.com.br/screenshot.jpg",
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ad Tracker Brasil",
              description:
                "Especialistas em recuperação de conversões perdidas no Meta Ads. Solução para bloqueadores e iOS 14.5+",
              url: "https://adtracker.com.br",
              telephone: "+55-11-99999-9999",
              email: "contato@adtracker.com.br",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
                addressRegion: "SP",
                addressLocality: "São Paulo",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-23.5505",
                longitude: "-46.6333",
              },
              openingHours: "Mo-Fr 09:00-18:00",
              priceRange: "R$ 29,90 - R$ 39,90/mês",
              serviceArea: {
                "@type": "Country",
                name: "Brasil",
              },
            }),
          }}
        />

        {/* FAQ Schema - Para pessoas leigas e técnicas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Por que meus anúncios do Facebook não estão trazendo vendas?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "40% das conversões nunca chegam ao Meta por causa de bloqueadores de anúncios e iOS 14.5+. Isso significa que o Meta otimiza suas campanhas com dados incompletos, resultando em CPA mais alto e ROAS menor. O Ad Tracker resolve isso capturando 94% das conversões reais.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O que é o iOS 14.5 e como afeta meus anúncios?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O iOS 14.5 introduziu o App Tracking Transparency, que permite aos usuários bloquear o rastreamento entre apps. Isso afeta drasticamente a capacidade do Facebook Pixel de rastrear conversões, resultando em dados perdidos e campanhas menos eficientes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como o Ad Tracker funciona tecnicamente?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O Ad Tracker usa rastreamento comportamental server-side que monitora ações do usuário (cliques, tempo na página, formulários) e envia esses dados diretamente para a Meta Conversions API, contornando bloqueadores e limitações do iOS.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual a diferença entre Facebook Pixel e Meta Conversions API?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O Facebook Pixel é client-side e pode ser bloqueado. A Meta Conversions API é server-side, enviando dados diretamente do servidor para o Meta, garantindo maior precisão e contornando bloqueadores.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quanto posso economizar com o Ad Tracker?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Clientes relatam redução média de 35% no CPA e aumento de 45% no ROAS. Para quem investe R$ 10.000/mês em ads, isso representa economia de até R$ 3.500 mensais, pagando apenas R$ 29,90 pelo Ad Tracker.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O Ad Tracker é compatível com LGPD?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim, o Ad Tracker é 100% compatível com LGPD, GDPR e outras regulamentações de privacidade. Não coletamos dados pessoais identificáveis, apenas comportamentos anônimos de navegação.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como instalar o Ad Tracker no meu site?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A instalação é simples: adicione uma linha de código JavaScript no seu site. O setup completo leva apenas 5 minutos e funciona com qualquer plataforma (WordPress, Shopify, etc.).",
                  },
                },
                {
                  "@type": "Question",
                  name: "Funciona com bloqueadores de anúncios?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim! Diferente do Facebook Pixel tradicional, o Ad Tracker funciona mesmo com AdBlock, uBlock Origin e outros bloqueadores ativos, garantindo captura de 94% das conversões.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Ad Tracker - Recuperação de Conversões Meta Ads",
              description:
                "Solução para recuperar 40% das conversões perdidas no Meta Ads. Funciona com bloqueadores e iOS 14.5+. Reduz CPA em 35% e aumenta ROAS em 45%.",
              brand: {
                "@type": "Brand",
                name: "Ad Tracker Brasil",
              },
              category: "Software de Marketing Digital",
              offers: [
                {
                  "@type": "Offer",
                  name: "Plano Starter",
                  price: "29.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/PreOrder",
                  priceValidUntil: "2024-12-31",
                },
                {
                  "@type": "Offer",
                  name: "Plano Professional",
                  price: "39.90",
                  priceCurrency: "BRL",
                  availability: "https://schema.org/PreOrder",
                  priceValidUntil: "2024-12-31",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* How-To Schema para instalação */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Como Recuperar Conversões Perdidas no Meta Ads",
              description:
                "Guia passo a passo para implementar rastreamento avançado e recuperar 40% das conversões perdidas",
              totalTime: "PT5M",
              supply: [
                {
                  "@type": "HowToSupply",
                  name: "Conta Ad Tracker",
                },
                {
                  "@type": "HowToSupply",
                  name: "Acesso ao site/loja",
                },
              ],
              tool: [
                {
                  "@type": "HowToTool",
                  name: "Ad Tracker Script",
                },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  name: "Cadastro no Ad Tracker",
                  text: "Crie sua conta e escolha o plano ideal",
                  url: "https://adtracker.com.br#interest-form",
                },
                {
                  "@type": "HowToStep",
                  name: "Instalação do Script",
                  text: "Adicione uma linha de código no seu site",
                  url: "https://adtracker.com.br#how-it-works",
                },
                {
                  "@type": "HowToStep",
                  name: "Configuração Meta",
                  text: "Conecte com sua conta Meta Ads",
                  url: "https://adtracker.com.br#features",
                },
                {
                  "@type": "HowToStep",
                  name: "Monitoramento",
                  text: "Acompanhe a recuperação das conversões no dashboard",
                  url: "https://adtracker.com.br#demo",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
