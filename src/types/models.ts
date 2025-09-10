export type Site = {
  id: string
  name: string
  domain: string
}

export type SiteInput = Omit<Site, "id">

export type Pixel = {
  id: string
  siteId: string
  pixelId: string
  label?: string
  token: string
  isActive?: boolean
  isDefault?: boolean
}

export type PixelInput = Omit<Pixel, "id" | "siteId"> & { siteId?: never }

export type Webhook = {
  id: string
  siteId: string
  pixelId: string
  source: "Hotmart" | "Shopify" | "Woo" | "Payments" | "Email" | "Custom"
  events: string[]
  url: string
  secret: string
  enabled: boolean
  lastDeliveryAt?: string
}
