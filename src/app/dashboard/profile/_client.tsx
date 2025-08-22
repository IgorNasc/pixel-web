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

  // Populate defaults from session once loaded
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
    // No API call yet; just log for now
    // eslint-disable-next-line no-console
    console.log("Profile form submit", values)
  }

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} themeClasses={themeClasses} />
      <main id="main-content" className="container mx-auto px-4 py-10 md:py-16 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Editar perfil</h1>

        <RHFForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-xl">
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

            <div className="flex gap-3">
              <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </RHFForm>
      </main>
      <Footer themeClasses={themeClasses} />
    </div>
  )
}
