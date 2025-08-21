import { z } from "zod"

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  email: z.string().email("Email inválido").min(5, "Email muito curto").max(100, "Email muito longo"),

  company: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa muito longo"),

  phone: z
    .string()
    .regex(
      /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
      "Telefone inválido"
    )
    .optional()
    .or(z.literal("")),

  website: z.string().url("URL inválida").optional().or(z.literal("")),

  terms: z.boolean().refine((val) => val, "Você deve aceitar os termos"),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
