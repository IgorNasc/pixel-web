export const SITE_CONFIG = {
  name: "AdTracker",
  email: "suporte@adtracker.com.br",
  url: "https://adtracker.com.br",
  description: "Rastreamento server-side que revoluciona seus anúncios pagos",
} as const

export const NAVIGATION_ITEMS = [
  { href: "/dashboard/sites", label: "Sites" },
  { href: "/dashboard/webhooks", label: "Webhooks" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#precos", label: "Preços" },
  { href: "#cadastro", label: "Cadastro" },
  { href: "#faq", label: "FAQ" },
] as const

export const FEATURES = [
  {
    icon: "BarChart3",
    title: "Analytics em Tempo Real",
    description:
      "Dashboard completo com métricas de conversão, ROI e performance de campanhas atualizadas em tempo real.",
  },
  {
    icon: "Smartphone",
    title: "Compatível com SPAs",
    description: "Funciona perfeitamente com React, Vue, Angular e outras Single Page Applications modernas.",
  },
  {
    icon: "Lock",
    title: "LGPD Compliant",
    description:
      "Totalmente adequado às leis de privacidade brasileiras e internacionais, sem comprometer a coleta de dados.",
  },
  {
    icon: "Globe",
    title: "Multi-Plataforma",
    description: "Integração nativa com Meta Ads, Google Ads, TikTok Ads, Pinterest e outras principais plataformas.",
  },
  {
    icon: "Clock",
    title: "Setup + Implementação",
    description:
      "Implementação em menos de 5 minutos com nossa equipe te ajudando no setup personalizado e suporte técnico especializado.",
  },
  {
    icon: "Users",
    title: "Suporte Premium",
    description: "Equipe técnica especializada disponível 24/7 para garantir que seus dados nunca parem de fluir.",
  },
] as const

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Ideal para começar e testar",
    badge: "Grátis",
    features: [
      "Até 1.000 eventos/mês",
      "Rastreamento básico",
      "Integração via JavaScript",
      "Meta Ads + Google Ads",
      "Suporte por email",
    ],
  },
  {
    name: "Starter",
    price: "29,90",
    description: "Perfeito para pequenos e-commerces",
    badge: "Mais Popular",
    features: [
      "Até 10.000 eventos/mês",
      "Integração Meta + Google Ads",
      "Dashboard básico",
      "Suporte por email",
      "7 dias grátis",
    ],
  },
  {
    name: "Pro",
    price: "39,90",
    description: "Para agências e grandes e-commerces",
    badge: "Recomendado",
    isRecommended: true,
    features: [
      "Eventos ilimitados",
      "Todas as integrações",
      "Dashboard avançado + API",
      "Suporte prioritário 24/7",
      "Setup personalizado",
    ],
  },
] as const

export const FAQ_ITEMS = [
  {
    question: "Como o rastreamento server-side funciona tecnicamente?",
    answer:
      "Nossa solução captura eventos diretamente no servidor através de webhooks e APIs. Quando um usuário interage com seu site, os dados são enviados para nossos servidores e depois repassados para as plataformas de anúncios via server-to-server API, ignorando completamente bloqueios do lado do cliente.",
  },
  {
    question: "É compatível com React, Vue e outras SPAs?",
    answer:
      "Sim! Nossa solução foi desenvolvida especificamente para funcionar com Single Page Applications. Oferecemos SDKs nativos para React, Vue, Angular e vanilla JavaScript, com suporte completo a roteamento client-side e estados de aplicação.",
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer:
      "A implementação básica leva menos de 5 minutos. Você adiciona nosso script, configura os eventos que deseja rastrear e conecta suas contas de anúncios. Nossa documentação inclui exemplos práticos para as principais plataformas.",
  },
  {
    question: "Os dados são seguros e LGPD compliant?",
    answer:
      "Absolutamente. Todos os dados são criptografados em trânsito e em repouso. Nossa infraestrutura é hospedada no Brasil, seguindo todas as diretrizes da LGPD. Não armazenamos dados pessoais desnecessários e oferecemos controles granulares de privacidade.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel de controle. Seus dados continuarão funcionando até o final do período pago, e oferecemos exportação completa dos seus dados históricos.",
  },
] as const

export const SOCIAL_PROOF = {
  sitesTracked: "1.200",
  text: "+500 sites rastreados com AdTracker",
  urgency: "Apenas 100 acessos gratuitos por mês",
  authority: "Aprovado por especialistas em Ads",
} as const

export const TESTIMONIALS = [
  {
    name: "Marcos Costa",
    role: "CEO, E-commerce Fashion Plus",
    avatar: "MC",
    rating: 5,
    text: "Depois de implementar o AdTracker, recuperamos 45% dos dados que estávamos perdendo. Nosso ROAS no Meta Ads melhorou 60% em apenas 2 semanas. É impressionante como funciona mesmo com adblockers ativos.",
  },
  {
    name: "Ana Silva",
    role: "Diretora de Marketing, TechStore",
    avatar: "AS",
    rating: 5,
    text: "Estava gastando R$ 15.000/mês em anúncios sem saber que 40% dos dados não chegavam até mim. Com o AdTracker, descobri onde estava perdendo dinheiro e aumentei meu ROI em 85%. Hoje não consigo trabalhar sem ele.",
  },
] as const

export const CLIENT_LOGOS = [
  { name: "TechCorp", logo: "TC" },
  { name: "DataFlow", logo: "DF" },
  { name: "AdMax Pro", logo: "AP" },
  { name: "Growth Labs", logo: "GL" },
  { name: "Digital Hub", logo: "DH" },
  { name: "Smart Analytics", logo: "SA" },
  { name: "Pixel Perfect", logo: "PP" },
  { name: "Conversion Co", logo: "CC" },
  { name: "ROI Masters", logo: "RM" },
  { name: "Track Solutions", logo: "TS" },
  { name: "Meta Boost", logo: "MB" },
  { name: "Ad Insights", logo: "AI" },
] as const
