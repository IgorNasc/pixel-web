import type { Pixel } from "@/types/models"
import {
  createPixel as dbCreatePixel,
  updatePixel as dbUpdatePixel,
  deletePixel as dbDeletePixel,
  countWebhooksByPixel,
  setDefaultPixel as dbSetDefaultPixel,
} from "@/lib/mock/db"

export async function Create(siteId: string, data: { pixelId: string; label?: string; token: string; isDefault?: boolean }): Promise<Pixel> {
  return dbCreatePixel(siteId, data)
}

export async function Update(id: string, data: { pixelId: string; label?: string; token: string; isDefault?: boolean }): Promise<Pixel> {
  const updated = dbUpdatePixel(id, data)
  if (!updated) throw new Error("Pixel not found")
  return updated
}

export interface DeletePixelResult {
  success: boolean
  webhooks: number
}

export async function deletePixelWithChecks(pixel: Pixel): Promise<DeletePixelResult> {
  const webhooks = countWebhooksByPixel(pixel.id)
  if (webhooks > 0) {
    return { success: false, webhooks }
  }
  const removed = dbDeletePixel(pixel.id)
  return { success: removed, webhooks }
}

export async function setDefault(siteId: string, pixelId: string): Promise<void> {
  dbSetDefaultPixel(siteId, pixelId)
}

export async function toggleActive(id: string, isActive: boolean): Promise<Pixel> {
  const updated = dbUpdatePixel(id, { isActive })
  if (!updated) throw new Error("Pixel not found")
  return updated
}

