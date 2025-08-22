import { z } from "zod"

export const metaSchema = z.object({
  pixelId: z
    .string()
    .min(1, "Obrigatório")
    .regex(/^\d+$/, "Somente números"),
  serverAccessToken: z.string().min(10, "Informe um token válido"),
})

export type MetaValues = z.infer<typeof metaSchema>
