import { NextResponse } from "next/server"
import { z, ZodError } from "zod"
import { PrismaUserRepository } from "@/lib/auth/infra/prisma-user-repository"
import { BcryptPasswordHasher } from "@/lib/auth/infra/bcrypt-password-hasher"
import { registerUser } from "@/lib/auth/application/register-user"

const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(100),
})

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { name, email, password } = RegisterSchema.parse(body)

    const repo = new PrismaUserRepository()
    const hasher = new BcryptPasswordHasher()
    const result = await registerUser(repo, hasher, { name, email, password })
    if (!result.ok) {
      const msg = result.error.message || "Erro ao registrar"
      const status = msg.includes("cadastrado") ? 409 : 400
      return NextResponse.json({ error: msg }, { status })
    }

    return NextResponse.json({ success: true, userId: result.value.id }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 })
  }
}
