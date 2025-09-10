"use client"

import type { Site, SiteInput, Pixel, PixelInput, Webhook } from "@/types/models"

const STORAGE_SITES = "mock_sites_v1"
const STORAGE_PIXELS = "mock_pixels_v1"
const STORAGE_WEBHOOKS = "mock_webhooks_v1"

// Memory fallback to keep SSR safe and provide a single source during a session
let memorySites: Site[] | null = null
let memoryPixels: Pixel[] | null = null
let memoryWebhooks: Webhook[] | null = null

function isBrowser() {
  return typeof window !== "undefined"
}

function readSites(): Site[] {
  if (!isBrowser()) return memorySites ?? []
  try {
    const raw = window.localStorage.getItem(STORAGE_SITES)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Site[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeSites(sites: Site[]) {
  memorySites = sites
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_SITES, JSON.stringify(sites))
  } catch {
    // no-op
  }
}

function readPixels(): Pixel[] {
  if (!isBrowser()) return memoryPixels ?? []
  try {
    const raw = window.localStorage.getItem(STORAGE_PIXELS)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Pixel[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writePixels(pixels: Pixel[]) {
  memoryPixels = pixels
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_PIXELS, JSON.stringify(pixels))
  } catch {
    // no-op
  }
}

function readWebhooks(): Webhook[] {
  if (!isBrowser()) return memoryWebhooks ?? []
  try {
    const raw = window.localStorage.getItem(STORAGE_WEBHOOKS)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Webhook[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeWebhooks(webhooks: Webhook[]) {
  memoryWebhooks = webhooks
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_WEBHOOKS, JSON.stringify(webhooks))
  } catch {
    // no-op
  }
}

function ensureSeed() {
  const sites = getSites()
  if (sites.length === 0) {
    const seeded: Site[] = [
      {
        id: cryptoRandomId(),
        name: "Marketing Site",
        domain: "example.com",
        env: "production",
        timezone: "America/Sao_Paulo",
        currency: "BRL",
      },
      {
        id: cryptoRandomId(),
        name: "Staging Sandbox",
        domain: "staging.example.com",
        env: "staging",
        timezone: "America/Sao_Paulo",
        currency: "BRL",
      },
    ]
    writeSites(seeded)
  }
  ensureSeedPixels()
  ensureSeedWebhooks()
}

function ensureSeedPixels() {
  const sites = getSites()
  const pixels = getAllPixels()
  if (pixels.length > 0) return
  if (sites.length === 0) return
  const seeded: Pixel[] = []
  for (const site of sites) {
    const p1: Pixel = {
      id: cryptoRandomId(),
      siteId: site.id,
      pixelId: Math.floor(1_000_000_000 + Math.random() * 8_999_999_999).toString(),
      label: `${site.name} Main`,
      token: `TEST_TOKEN_${Math.random().toString(36).slice(2, 8)}`,
      isActive: true,
      isDefault: true,
    }
    const p2: Pixel = {
      id: cryptoRandomId(),
      siteId: site.id,
      pixelId: Math.floor(1_000_000_000 + Math.random() * 8_999_999_999).toString(),
      label: `${site.name} Backup`,
      token: `TEST_TOKEN_${Math.random().toString(36).slice(2, 8)}`,
      isActive: true,
      isDefault: false,
    }
    seeded.push(p1, p2)
  }
  writePixels(seeded)
}

function ensureSeedWebhooks() {
  const sites = getSites()
  const allWebhooks = getWebhooks()
  if (allWebhooks.length > 0) return
  if (sites.length === 0) return
  // Create at most 2 demo webhooks linking the default pixel of first sites
  const webhooks: Webhook[] = []
  for (let i = 0; i < Math.min(2, sites.length); i++) {
    const site = sites[i]
    const sitePixels = getPixelsBySite(site.id)
    const ready = sitePixels.find((p) => !!p.token) || sitePixels[0]
    if (!ready) continue
    const url = generateWebhookUrl(site.id)
    const secret = generateSecret(site.id)
    webhooks.push({
      id: cryptoRandomId(),
      siteId: site.id,
      pixelId: ready.id,
      source: (i % 2 === 0 ? "Payments" : "Email") as Webhook["source"],
      events: i % 2 === 0 ? ["order.paid", "refund.created"] : ["lead.created"],
      url,
      secret,
      enabled: true,
      lastDeliveryAt: new Date(Date.now() - (i + 1) * 3600_000).toISOString(),
    })
  }
  if (webhooks.length > 0) writeWebhooks(webhooks)
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  // Fallback
  return "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function getSites(): Site[] {
  const sites = memorySites ?? readSites()
  memorySites = sites
  return sites
}

export function createSite(input: SiteInput): Site {
  const site: Site = { id: cryptoRandomId(), ...input }
  const sites = getSites()
  const next = [site, ...sites]
  writeSites(next)
  return site
}

export function updateSite(id: string, patch: Partial<SiteInput>): Site | null {
  const sites = getSites()
  let updated: Site | null = null
  const next = sites.map((s) => {
    if (s.id === id) {
      updated = { ...s, ...patch }
      return updated
    }
    return s
  })
  if (updated) writeSites(next)
  return updated
}

export function deleteSite(id: string): boolean {
  const sites = getSites()
  const next = sites.filter((s) => s.id !== id)
  const changed = next.length !== sites.length
  if (changed) writeSites(next)
  return changed
}

export function countPixelsBySite(_siteId: string): number {
  const pixels = getAllPixels()
  return pixels.filter((p) => p.siteId === _siteId).length
}

export function countWebhooksBySite(_siteId: string): number {
  const list = getWebhooks()
  return list.filter((w) => w.siteId === _siteId).length
}

export function getPixelsBySite(siteId: string): Pixel[] {
  const all = getAllPixels()
  return all.filter((p) => p.siteId === siteId)
}

export function createPixel(siteId: string, input: PixelInput): Pixel {
  const all = getAllPixels()
  const pixel: Pixel = { id: cryptoRandomId(), siteId, ...input, isActive: (input as any).isActive ?? true }
  let next = [pixel, ...all]
  if (pixel.isDefault) {
    next = next.map((p) => (p.siteId === siteId ? { ...p, isDefault: p.id === pixel.id } : p))
  }
  writePixels(next)
  return pixel
}

export function updatePixel(id: string, patch: Partial<Omit<Pixel, "id" | "siteId">>): Pixel | null {
  const all = getAllPixels()
  let updated: Pixel | null = null
  let next = all.map((p) => {
    if (p.id === id) {
      updated = { ...p, ...patch }
      return updated
    }
    return p
  })
  if (updated?.isDefault) {
    next = next.map((p) => (p.siteId === updated!.siteId ? { ...p, isDefault: p.id === updated!.id } : p))
  }
  if (updated) writePixels(next)
  return updated
}

export function deletePixel(id: string): boolean {
  const all = getAllPixels()
  const next = all.filter((p) => p.id !== id)
  const changed = next.length !== all.length
  if (changed) writePixels(next)
  return changed
}

export function setDefaultPixel(siteId: string, pixelId: string): void {
  const all = getAllPixels()
  const next = all.map((p) => (p.siteId === siteId ? { ...p, isDefault: p.id === pixelId } : p))
  writePixels(next)
}

export function countWebhooksByPixel(_pixelId: string): number {
  const list = getWebhooks()
  return list.filter((w) => w.pixelId === _pixelId).length
}

function getAllPixels(): Pixel[] {
  const pixels = memoryPixels ?? readPixels()
  memoryPixels = pixels
  return pixels
}

function getAllWebhooks(): Webhook[] {
  const list = memoryWebhooks ?? readWebhooks()
  memoryWebhooks = list
  return list
}

export function getWebhooks(): Webhook[] {
  return getAllWebhooks()
}

export function getWebhooksBySite(siteId: string): Webhook[] {
  return getAllWebhooks().filter((w) => w.siteId === siteId)
}

export function getWebhooksByPixel(pixelId: string): Webhook[] {
  return getAllWebhooks().filter((w) => w.pixelId === pixelId)
}

export function createWebhook(input: Omit<Webhook, "id" | "lastDeliveryAt"> & { lastDeliveryAt?: string }): Webhook {
  const all = getAllWebhooks()
  const webhook: Webhook = { id: cryptoRandomId(), lastDeliveryAt: input.lastDeliveryAt, ...input }
  const next = [webhook, ...all]
  writeWebhooks(next)
  return webhook
}

export function updateWebhook(id: string, patch: Partial<Omit<Webhook, "id" | "siteId" | "pixelId" | "url" | "secret"> & { secret?: string; url?: string }>): Webhook | null {
  const all = getAllWebhooks()
  let updated: Webhook | null = null
  const next = all.map((w) => {
    if (w.id === id) {
      updated = { ...w, ...patch }
      return updated
    }
    return w
  })
  if (updated) writeWebhooks(next)
  return updated
}

export function deleteWebhook(id: string): boolean {
  const all = getAllWebhooks()
  const next = all.filter((w) => w.id !== id)
  const changed = next.length !== all.length
  if (changed) writeWebhooks(next)
  return changed
}

export function generateWebhookUrl(siteId: string): string {
  const short = siteId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "site"
  return `https://hooks.local/api/webhooks/${short}`
}

export function generateSecret(seed?: string): string {
  const base = (seed ?? Math.random().toString(36).slice(2)) + Date.now().toString(36)
  const salt = Math.random().toString(36).slice(2, 10)
  return `whsec_${btoa(base).replace(/[^a-zA-Z0-9]/g, "").slice(0, 16)}${salt}`
}

// Initialize with seed data client-side only
if (isBrowser()) {
  ensureSeed()
}
