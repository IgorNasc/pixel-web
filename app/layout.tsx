import type React from "react"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ad Tracker - Analytics Sem Cookies para Meta Ads | Rastreamento 94% Preciso",
  description:
    "Revolucione seus anúncios Meta com rastreamento sem cookies. 94% de precisão, contorna bloqueadores, aumenta ROAS em 45%. Solução brasileira com conformidade LGPD. R$ 49,90/mês.",
  keywords: [
    "meta ads",
    "facebook ads",
    "instagram ads",
    "rastreamento sem cookies",
    "analytics sem cookies",
    "pixel facebook",
    "conversões meta",
    "ROAS",
    "marketing digital",
    "performance marketing",
    "media buyer",
    "ads manager",
    "otimização anúncios",
    "tracking conversões",
    "LGPD compliance",
    "iOS 14.5",
    "bloqueadores anúncios",
    "server side tracking",
    "attribution modeling",
    "marketing analytics brasil",
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
    title: "Ad Tracker - Analytics Sem Cookies para Meta Ads | Rastreamento 94% Preciso",
    description:
      "Revolucione seus anúncios Meta com rastreamento sem cookies. 94% de precisão, contorna bloqueadores, aumenta ROAS em 45%. Solução brasileira com conformidade LGPD.",
    siteName: "Ad Tracker Brasil",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ad Tracker - Analytics Sem Cookies para Meta Ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Tracker - Analytics Sem Cookies para Meta Ads",
    description:
      "94% de precisão no rastreamento, contorna bloqueadores, aumenta ROAS em 45%. Solução brasileira LGPD compliant.",
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

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Ad Tracker",
              description: "Plataforma de analytics sem cookies para Meta Ads com 94% de precisão no rastreamento",
              url: "https://adtracker.com.br",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "49.90",
                priceCurrency: "BRL",
                priceValidUntil: "2024-12-31",
                availability: "https://schema.org/PreOrder",
              },
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
                "Rastreamento sem cookies",
                "94% de precisão",
                "Conformidade LGPD",
                "Integração Meta Ads API",
                "Dashboard em tempo real",
                "Relatórios avançados",
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
              description: "Especialistas em analytics sem cookies para Meta Ads no Brasil",
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
              priceRange: "R$ 49,90/mês",
              serviceArea: {
                "@type": "Country",
                name: "Brasil",
              },
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "O que é rastreamento sem cookies?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "É uma tecnologia avançada que coleta dados de conversão sem depender de cookies de terceiros, garantindo 94% de precisão mesmo com bloqueadores ativos.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como o Ad Tracker melhora o ROAS?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Com dados mais precisos, o Meta Ads pode otimizar melhor suas campanhas, resultando em até 45% de aumento no ROAS.",
                  },
                },
                {
                  "@type": "Question",
                  name: "O Ad Tracker é compatível com LGPD?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim, nossa solução é 100% compatível com LGPD, GDPR e outras regulamentações de privacidade.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual o preço do Ad Tracker?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O preço especial de lançamento é R$ 49,90 por mês, com todos os recursos incluídos.",
                  },
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
