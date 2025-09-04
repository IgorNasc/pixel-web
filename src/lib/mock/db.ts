"use client"

import type { Site, SiteInput } from "@/types/models"

const STORAGE_KEY = "mock_sites_v1"

// Memory fallback to keep SSR safe and provide a single source during a session
let memorySites: Site[] | null = null

function isBrowser() {
  return typeof window !== "undefined"
}

function readFromStorage(): Site[] {
  if (!isBrowser()) return memorySites ?? []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Site[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeToStorage(sites: Site[]) {
  memorySites = sites
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
  } catch {
    // no-op
  }
}

function ensureSeed() {
  const current = getSites()
  if (current.length === 0) {
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
    writeToStorage(seeded)
  }
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  // Fallback
  return "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function getSites(): Site[] {
  const sites = memorySites ?? readFromStorage()
  memorySites = sites
  return sites
}

export function createSite(input: SiteInput): Site {
  const site: Site = { id: cryptoRandomId(), ...input }
  const sites = getSites()
  const next = [site, ...sites]
  writeToStorage(next)
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
  if (updated) writeToStorage(next)
  return updated
}

export function deleteSite(id: string): boolean {
  const sites = getSites()
  const next = sites.filter((s) => s.id !== id)
  const changed = next.length !== sites.length
  if (changed) writeToStorage(next)
  return changed
}

export function countPixelsBySite(_siteId: string): number {
  // Placeholder for future implementation
  return 0
}

export function countWebhooksBySite(_siteId: string): number {
  // Placeholder for future implementation
  return 0
}

// Initialize with seed data client-side only
if (isBrowser()) {
  ensureSeed()
}

