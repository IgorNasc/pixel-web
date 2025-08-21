import type { Metadata } from "next"

export const seoKeywords = [
  "rastreamento server-side",
  "server-side tracking",
  "pixel tracking sem cookies",
  "rastreamento sem adblocker",
  "Meta Ads server-side",
  "Google Ads server-to-server",
  "iOS 14 tracking",
  "conversão sem cookies",
  "API server-to-server",
  "rastreamento LGPD",
  "tracking SPA React",
  "pixel alternativo",
  "dados de conversão precisos",
  "ROI anúncios pagos",
  "otimização campanhas Meta",
  "analytics sem bloqueio",
  "rastreamento e-commerce",
  "dados primeiro partido",
  "first-party data",
  "cookieless tracking",
]

export const generateMetadata = (): Metadata => ({
  title: "AdTracker - Rastreamento Server-Side Sem Cookies | Recupere 40% dos Dados Perdidos",
  description:
    "Solução de rastreamento server-side que ignora adblockers e iOS 14+. Capture dados de conversão precisos sem cookies. Integração Meta Ads e Google Ads. Teste grátis 7 dias.",
  keywords: seoKeywords,
  authors: [{ name: "AdTracker", url: "https://adtracker.com.br" }],
  creator: "AdTracker",
  publisher: "AdTracker",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://adtracker.com.br",
    siteName: "AdTracker",
    title: "AdTracker - Rastreamento Server-Side Sem Cookies",
    description:
      "Recupere até 40% dos dados perdidos em seus anúncios com rastreamento server-side que ignora adblockers e políticas do iOS 14+.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AdTracker - Rastreamento Server-Side para Meta Ads e Google Ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdTracker - Rastreamento Server-Side Sem Cookies",
    description: "Recupere dados de conversão perdidos com rastreamento server-side. Ignora adblockers e iOS 14+.",
    images: ["/og-image.jpg"],
    creator: "@adtracker",
  },
  alternates: {
    canonical: "https://adtracker.com.br",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
})

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AdTracker",
  description: "Solução de rastreamento server-side para anúncios que ignora adblockers e políticas do iOS 14+",
  url: "https://adtracker.com.br",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "29.90",
    priceCurrency: "BRL",
    priceValidUntil: "2025-12-31",
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: "AdTracker",
    url: "https://adtracker.com.br",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-99999-9999",
      contactType: "customer service",
      email: "suporte@adtracker.com.br",
      availableLanguage: "Portuguese",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
  },
}
