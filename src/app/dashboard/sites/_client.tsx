"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { MoreHorizontal, Plus, ExternalLink, Pencil, Trash2, Search, Copy } from "lucide-react"
import { SiteForm } from "@/components/sites/SiteForm"
import type { Site, SiteInput } from "@/types/models"
import { getSites, createSite, updateSite, deleteSite, countPixelsBySite, countWebhooksBySite } from "@/lib/mock/db"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"

export default function SitesClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  const router = useRouter()
  const { toast } = useToast()
  const [sites, setSites] = React.useState<Site[] | null>(null)
  const [q, setQ] = React.useState("")
  const [env, setEnv] = React.useState<"all" | "production" | "staging">("all")
  const [commandOpen, setCommandOpen] = React.useState(false)

  const [formOpen, setFormOpen] = React.useState(false)
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create")
  const [editing, setEditing] = React.useState<Site | undefined>(undefined)

  const [guard, setGuard] = React.useState<{ open: boolean; site?: Site; pixels: number; webhooks: number }>({ open: false, pixels: 0, webhooks: 0 })

  React.useEffect(() => {
    setSites(getSites())
  }, [])

  const filtered = React.useMemo(() => {
    const list = sites ?? []
    const byEnv = env === "all" ? list : list.filter((s) => s.env === env)
    const term = q.trim().toLowerCase()
    if (!term) return byEnv
    return byEnv.filter((s) => s.name.toLowerCase().includes(term) || s.domain.toLowerCase().includes(term))
  }, [sites, q, env])

  function openCreate() {
    setFormMode("create")
    setEditing(undefined)
    setFormOpen(true)
  }
  function openEdit(site: Site) {
    setFormMode("edit")
    setEditing(site)
    setFormOpen(true)
  }

  async function handleCreate(input: SiteInput) {
    const created = createSite(input)
    setSites((prev) => [created, ...(prev ?? [])])
  }

  async function handleUpdate(input: SiteInput) {
    if (!editing) return
    const updated = updateSite(editing.id, input)
    if (updated) setSites((prev) => (prev ?? []).map((s) => (s.id === updated!.id ? updated! : s)))
  }

  function tryDelete(site: Site) {
    const pixels = countPixelsBySite(site.id)
    const webhooks = countWebhooksBySite(site.id)
    if (pixels > 0 || webhooks > 0) {
      setGuard({ open: true, site, pixels, webhooks })
      return
    }
    const ok = window.confirm(`Delete site "${site.name}"?`)
    if (!ok) return
    const success = deleteSite(site.id)
    if (success) {
      setSites((prev) => (prev ?? []).filter((s) => s.id !== site.id))
      toast({ title: "Site deleted" })
    }
  }

  function copy(text: string) {
    try {
      navigator.clipboard?.writeText(text)
      toast({ title: "Copied", description: text })
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      toast({ title: "Copied", description: text })
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sites</h1>
            <p className="text-sm text-muted-foreground">Manage domains and environments for your pixels and webhooks.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setCommandOpen(true)} aria-label="Search sites">
              <Search className="h-4 w-4" /> Search
            </Button>
            <Button className="gap-2" onClick={openCreate} aria-label="Create new site">
              <Plus className="h-4 w-4" /> New Site
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <Input placeholder="Search by name or domain" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter text" />
          </div>
          <div className="flex items-center gap-2">
            <Select value={env} onValueChange={(v: any) => setEnv(v)}>
              <SelectTrigger className="w-40" aria-label="Filter by environment">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All envs</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sites === null ? (
          <div className="mt-8 text-sm text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="mt-8">
            <Card>
              <CardContent className="py-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="text-lg font-medium">No sites found</div>
                <p className="text-sm text-muted-foreground">Create your first site to start adding pixels and integrations.</p>
                <Button className="mt-2" onClick={openCreate}>New Site</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mt-6 hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[320px]">Name</TableHead>
                    <TableHead>Env</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>#Pixels</TableHead>
                    <TableHead>Last event</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((site) => {
                    const pixels = countPixelsBySite(site.id)
                    return (
                      <TableRow key={site.id} className="group">
                        <TableCell>
                          <div className="font-medium">{site.name}</div>
                          <div className="text-xs text-muted-foreground">{site.domain}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={site.env === "production" ? "default" : "secondary"}>{site.env === "production" ? "Production" : "Staging"}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">Not set up</span>
                        </TableCell>
                        <TableCell>{pixels}</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/sites/${site.id}/pixels`} className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Open</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEdit(site)} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copy(site.domain)} className="flex items-center gap-2"><Copy className="h-4 w-4" /> Copy domain</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => tryDelete(site)} className="text-red-600 focus:text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              {filtered.map((site) => {
                const pixels = countPixelsBySite(site.id)
                return (
                  <Card key={site.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-medium">{site.name}</div>
                          <div className="text-xs text-muted-foreground">{site.domain}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/sites/${site.id}/pixels`} className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Open</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEdit(site)} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copy(site.domain)} className="flex items-center gap-2"><Copy className="h-4 w-4" /> Copy domain</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => tryDelete(site)} className="text-red-600 focus:text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant={site.env === "production" ? "default" : "secondary"}>{site.env === "production" ? "Production" : "Staging"}</Badge>
                          <span className="text-muted-foreground">Not set up</span>
                        </div>
                        <div className="text-muted-foreground">{pixels} pixels</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <Command>
            <CommandInput placeholder="Search sites..." value={q} onValueChange={setQ} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Sites">
                {filtered.map((s) => (
                  <CommandItem key={s.id} onSelect={() => { setCommandOpen(false); router.push(`/dashboard/sites/${s.id}/pixels`) }}>
                    {s.name} <span className="ml-2 text-muted-foreground">({s.domain})</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>

        <SiteForm
          open={formOpen}
          mode={formMode}
          site={editing}
          onOpenChange={setFormOpen}
          onSubmit={formMode === "create" ? handleCreate : handleUpdate}
        />

        <AlertDialog open={guard.open} onOpenChange={(open) => setGuard((g) => ({ ...g, open }))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cannot delete this site</AlertDialogTitle>
              <AlertDialogDescription>
                This site has {guard.pixels} pixels and {guard.webhooks} webhooks associated. Remove them first to delete the site.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/pixels` : "#"}>View Pixels</Link>
              </AlertDialogAction>
              <AlertDialogAction asChild>
                <Link href={guard.site ? `/dashboard/sites/${guard.site.id}/webhooks` : "#"}>View Webhooks</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}

