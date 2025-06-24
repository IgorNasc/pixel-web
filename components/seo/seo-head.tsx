import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}

export default function SEOHead({
  title = "Ad Tracker - Analytics Sem Cookies para Meta Ads | Rastreamento 94% Preciso",
  description = "Revolucione seus anúncios Meta com rastreamento sem cookies. 94% de precisão, contorna bloqueadores, aumenta ROAS em 45%. Solução brasileira com conformidade LGPD.",
  keywords = [],
  image = "/og-image.jpg",
  url = "https://adtracker.com.br",
  type = "website",
}: SEOHeadProps) {
  const defaultKeywords = [
    "meta ads brasil",
    "facebook ads rastreamento",
    "instagram ads analytics",
    "pixel facebook alternativa",
    "conversões sem cookies",
    "ROAS otimização",
    "marketing digital brasil",
    "performance marketing",
    "media buyer ferramentas",
    "ads manager analytics",
    "tracking server side",
    "LGPD compliance ads",
    "iOS 14.5 solução",
    "bloqueador anúncios contorno",
    "attribution modeling brasil",
  ]

  const allKeywords = [...defaultKeywords, ...keywords]

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Ad Tracker Brasil" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@adtrackerbrasil" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="geo.region" content="BR" />
      <meta name="geo.country" content="Brazil" />
      <meta name="target_country" content="BR" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Hreflang for Portuguese Brazil */}
      <link rel="alternate" hrefLang="pt-BR" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Head>
  )
}
