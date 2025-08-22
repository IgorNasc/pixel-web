"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Key } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SecretInput } from "@/components/ui/secret-input"
import {
  Form as RHFForm,
  FormField as RHFFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { metaSchema, type MetaValues } from "@/features/integrations/keys/meta/meta-schema"

export function MetaKeysCard() {
  const form = useForm<MetaValues>({
    resolver: zodResolver(metaSchema),
    mode: "onChange",
    defaultValues: { pixelId: "", serverAccessToken: "" },
  })

  const configured = !!form.watch("pixelId") && !!form.watch("serverAccessToken")

  const onSubmit = (values: MetaValues) => {
    // placeholder: no API call yet
    // eslint-disable-next-line no-console
    console.log("save meta", values)
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <div>
            <CardTitle>Meta</CardTitle>
            <CardDescription>
              Use o ID do Pixel e o token de acesso do servidor para enviarmos eventos via Conversions API.
            </CardDescription>
          </div>
        </div>
        <Badge variant={configured ? "default" : "secondary"} className={configured ? "bg-green-600 text-white" : undefined}>
          {configured ? "Conectado" : "Não configurado"}
        </Badge>
      </CardHeader>

      <RHFForm {...form}>
        <CardContent className="grid gap-5">
          <RHFFormField
            control={form.control}
            name="pixelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID do Pixel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 123456789012345" inputMode="numeric" {...field} />
                </FormControl>
                <FormDescription>Eventos → Conjuntos de dados → selecione o Pixel → copie o ID.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <RHFFormField
            control={form.control}
            name="serverAccessToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token de acesso do servidor (Conversions API)</FormLabel>
                <FormControl>
                  <SecretInput placeholder="Ex.: EAAG..." {...field} />
                </FormControl>
                <FormDescription>
                  Gere no Events Manager → Configurações → Conversions API → Gerar token.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="gap-3">
          <Button onClick={form.handleSubmit(onSubmit)} disabled={!form.formState.isValid || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={form.formState.isSubmitting}>
            Limpar
          </Button>
        </CardFooter>
      </RHFForm>
    </Card>
  )
}
