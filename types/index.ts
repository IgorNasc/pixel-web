export interface ThemeClasses {
  bgPrimary: string
  bgSecondary: string
  bgGradient: string
  bgCard: string
  bgInput: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  border: string
  borderCard: string
  borderInput: string
  bgSuccess: string
  bgError: string
  bgBlue: string
  hoverCard: string
  hoverBg: string
}

export interface PricingPlan {
  name: string
  price: string
  description: string
  badge: string
  isRecommended?: boolean
  features: string[]
}

export interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}

export interface ClientLogo {
  name: string
  logo: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FormData {
  fullName: string
  email: string
  company: string
  phone?: string
  website?: string
  terms: boolean
}

export interface SocialProof {
  sitesTracked: string
  text: string
  urgency: string
  authority: string
}
