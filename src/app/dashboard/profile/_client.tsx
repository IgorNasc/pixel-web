"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import {
  Form as RHFForm,
  FormField as RHFFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PRICING_PLANS } from "@/lib/constants"
import { CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as React from "react"

const profileSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  companyName: z.string().min(2, "Informe o nome da empresa"),
  phone: z
    .string()
    .min(7, "Informe um telefone válido")
    .regex(/^[+]?[\d\s().-]{7,}$/, "Informe um telefone válido"),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function ProfileClient() {
  const { isDarkMode, toggleTheme, themeClasses, mounted } = useTheme()
  const { data: session } = useSession()

  const [planOpen, setPlanOpen] = React.useState(false)

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        companyName: "",
        phone: "",
      })
    }
  }, [session, form])

  if (!mounted) return null

  const onSubmit = (values: ProfileValues) => {
    console.log("Profile form submit", values)
  }

  const currentPlan = PRICING_PLANS[0]
  const rawAddons = (session?.user as any)?.addons as any[] | undefined
  const addons: { name: string; description?: string }[] = Array.isArray(rawAddons)
    ? rawAddons
        .map((a) => (typeof a === "string" ? { name: a } : a))
        .filter((a): a is { name: string; description?: string } => !!a && typeof a.name === "string" && a.name.length > 0)
    : []
  const rawPayments = (session?.user as any)?.payments as any[] | undefined
  const payments: { id?: string; date?: string; amount?: number; status?: string; invoiceUrl?: string }[] = Array.isArray(rawPayments)
    ? rawPayments.map((p) => (typeof p === "object" ? p : {}))
    : []

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-10 md:py-16 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Perfil</h1>
          <p className="text-sm text-muted-foreground">Gerencie suas informações e acompanhe seu plano.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Coluna 1: Plano atual + histórico de pagamentos */}
          <div className="space-y-6">
            <Card className={themeClasses.bgCard}>
              <CardHeader>
                <CardTitle>Seu plano</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold">{currentPlan.name}</div>
                    <div className="text-sm text-muted-foreground">Ideal para começar e testar</div>
                  </div>
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">Ativo</Badge>
                </div>
                <div className="text-3xl font-bold">
                  R$ {currentPlan.price}
                  <span className="text-sm text-muted-foreground font-normal">/mês</span>
                </div>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  {currentPlan.features.slice(0, 4).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                {addons.length > 0 && (
                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium mb-2">Add-ons</div>
                    <ul className="space-y-1">
                      {addons.map((a, i) => (
                        <li key={`${a.name}-${i}`} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>
                            <span className="font-medium">{a.name}</span>
                            {a.description ? <span className="text-muted-foreground"> — {a.description}</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-2">
                <Button type="button" onClick={() => setPlanOpen(true)}>Ver planos</Button>
                </div>
              </CardContent>
            </Card>

            <Card className={themeClasses.bgCard}>
              <CardHeader>
                <CardTitle>Histórico de pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-sm text-muted-foreground">Nenhum pagamento encontrado.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Recibo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((p, i) => {
                          const dateStr = p.date ? new Date(p.date).toLocaleDateString() : "—"
                          const amountStr = typeof p.amount === "number" ? `R$ ${p.amount.toFixed(2)}` : "—"
                          const status = (p.status ?? "").toLowerCase()
                          return (
                            <TableRow key={p.id ?? i}>
                              <TableCell>{dateStr}</TableCell>
                              <TableCell>{amountStr}</TableCell>
                              <TableCell>
                                {status === "paid" ? (
                                  <Badge variant="success" className="bg-green-600 hover:bg-green-600">Pago</Badge>
                                ) : status === "pending" ? (
                                  <Badge variant="secondary">Pendente</Badge>
                                ) : status === "failed" ? (
                                  <Badge variant="destructive">Falhou</Badge>
                                ) : (
                                  <Badge variant="secondary">—</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {p.invoiceUrl ? (
                                  <Button asChild size="sm" variant="outline">
                                    <Link href={p.invoiceUrl} target="_blank" rel="noreferrer">Ver</Link>
                                  </Button>
                                ) : (
                                  <span className="text-muted-foreground text-sm">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Formulário de perfil */}
          <RHFForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <RHFFormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <RHFFormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <RHFFormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" autoComplete="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <RHFFormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+55 11 99999-9999" autoComplete="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </RHFForm>
        </div>
      </main>
      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Alterar plano</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING_PLANS.map((plan) => {
              const priceToNumber = (p: string) => parseFloat(p.replace(".", "").replace(",", ".")) || 0
              const isCurrent = plan.name === currentPlan.name
              const isUpgrade = priceToNumber(plan.price) > priceToNumber(currentPlan.price)
              const cta = isCurrent ? "Atual" : isUpgrade ? "Fazer upgrade" : "Fazer downgrade"
              return (
                <Card key={plan.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold">R$ {plan.price}<span className="text-sm text-muted-foreground font-normal">/mês</span></div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="text-sm space-y-1 mb-4 list-disc pl-5">
                      {plan.features.slice(0, 4).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Button disabled={isCurrent} className="w-full" onClick={() => setPlanOpen(false)}>
                        {cta}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
