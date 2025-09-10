"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { CalendarIcon, GitCompareIcon, GlobeIcon, MousePointerClick, ServerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { type AnalyticsFilters, type Site, type Pixel } from "@/types/analytics"

type RangeKey = "7d" | "30d" | "90d" | "custom"

export function FiltersBar({
  value,
  onChange,
  sites,
  pixels
}: {
  value: AnalyticsFilters
  onChange: (next: AnalyticsFilters) => void
  sites: Site[]
  pixels: Pixel[]
}) {
  const rangeKey: RangeKey = useMemo(() => {
    const diff = Math.ceil((value.range.to.getTime() - value.range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    if (diff === 7) return "7d"
    if (diff === 30) return "30d"
    if (diff === 90) return "90d"
    return "custom"
  }, [value.range])

  function setRangeKey(k: RangeKey) {
    const to = new Date()
    let from = new Date()
    if (k === "7d") from.setDate(to.getDate() - 6)
    else if (k === "30d") from.setDate(to.getDate() - 29)
    else if (k === "90d") from.setDate(to.getDate() - 89)
    else from = value.range.from
    onChange({ ...value, range: { from, to } })
  }

  function setRange(from: Date, to: Date) {
    onChange({ ...value, range: { from, to } })
  }

  return (
    <div className="w-full flex flex-col gap-3" aria-label="Analytics filters">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Tabs value={rangeKey} onValueChange={(v) => setRangeKey(v as RangeKey)}>
            <TabsList aria-label="Date range quick picks">
              <TabsTrigger value="7d">Last 7d</TabsTrigger>
              <TabsTrigger value="30d">Last 30d</TabsTrigger>
              <TabsTrigger value="90d">Last 90d</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
          </Tabs>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2" aria-label="Select custom date range">
                <CalendarIcon className="h-4 w-4" />
                {format(value.range.from, "MMM d, yyyy")} – {format(value.range.to, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2" align="start">
              <div className="grid grid-cols-1 gap-2">
                <Calendar
                  mode="range"
                  selected={{ from: value.range.from, to: value.range.to }}
                  onSelect={(r) => {
                    if (!r?.from || !r?.to) return
                    setRange(r.from, r.to)
                  }}
                  initialFocus
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2" aria-label="Compare period toggle">
            <GitCompareIcon className="h-4 w-4 text-muted-foreground" />
            <Switch checked={value.compare} onCheckedChange={(c) => onChange({ ...value, compare: c })} />
            <span className="text-sm text-muted-foreground">Compare</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Select value={value.siteId} onValueChange={(v) => onChange({ ...value, siteId: v })}>
          <SelectTrigger className="w-full sm:w-[240px]" aria-label="Select site">
            <GlobeIcon className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Site" />
          </SelectTrigger>
          <SelectContent>
            {sites.map((s) => (
              <SelectItem key={s.id} value={s.id} aria-label={s.name}>
                {s.name} {s.domain !== "*" ? `• ${s.domain}` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={value.pixelId} onValueChange={(v) => onChange({ ...value, pixelId: v })}>
          <SelectTrigger className="w-full sm:w-[220px]" aria-label="Select pixel">
            <MousePointerClick className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Pixel" />
          </SelectTrigger>
          <SelectContent>
            {pixels
              .filter((p) => value.siteId === "all" || p.siteId === value.siteId)
              .map((p) => (
                <SelectItem key={p.id} value={p.id} aria-label={p.pixelId}>
                  {p.pixelId} {p.label ? `• ${p.label}` : ""}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="hidden sm:block" />

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1"><ServerIcon className="h-3 w-3" /> Server-side</Badge>
        </div>
      </div>
    </div>
  )
}

