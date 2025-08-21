import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { EmailTemplate } from "@/lib/email-template"
import { registrationSchema } from "@/lib/validations"

const resend = new Resend("re_VmT4QMEm_D2N9b9bZTE9YdYiSaiQExRak")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados com Zod
    const validatedData = registrationSchema.parse(body)

    const { fullName, email, company, phone, website } = validatedData

    // Enviar email para a equipe
    const { data, error } = await resend.emails.send({
      from: "AdTracker <noreply@adtracker.com.br>",
      to: ["suporte@adtracker.com.br"],
      subject: `🚀 Novo Cadastro: ${fullName} - ${company}`,
      react: EmailTemplate({
        fullName,
        email,
        company,
        phone,
        website,
      }),
    })

    if (error) {
      console.error("Erro ao enviar email:", error)
      return NextResponse.json({ success: false, error: "Erro ao enviar email" }, { status: 500 })
    }

    console.log("Email enviado com sucesso:", data)

    return NextResponse.json(
      {
        success: true,
        message: "Email enviado com sucesso",
        data: data,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro na API:", error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}
