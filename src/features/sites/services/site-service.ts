import { Site, SiteInput } from "@/types/models"
import {
  countPixelsBySite,
  countWebhooksBySite,
  createSite,
  deleteSite,
  updateSite,
} from "@/lib/mock/db"

export async function Create(input: SiteInput): Promise<Site> {
  return createSite(input)
}

export async function Update(id: string, input: SiteInput): Promise<Site> {
  const updated = updateSite(id, input)
  if (!updated) throw new Error("Site not found")
  return updated
}

export interface DeleteSiteReturn {
  success: boolean
  pixels: number
  webhooks: number
}

export async function deleteSiteWithChecks(site: Site): Promise<DeleteSiteReturn> {
  const pixels = countPixelsBySite(site.id)
  const webhooks = countWebhooksBySite(site.id)

  if (pixels > 0 || webhooks > 0) {
    return { success: false, pixels, webhooks }
  }

  const removed = deleteSite(site.id)
  return { success: removed, pixels, webhooks }
}

