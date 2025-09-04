export type Site = {
  id: string
  name: string
  domain: string
  env: "production" | "staging"
  timezone: string
  currency: string
}

export type SiteInput = Omit<Site, "id">

