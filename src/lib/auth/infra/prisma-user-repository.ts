import { prisma } from "@/lib/prisma"
import type { IUserRepository } from "@/lib/auth/domain/ports"
import type { User } from "@/lib/auth/domain/user"
import type { User as PrismaUser } from "@prisma/client"

function toDomain(u: PrismaUser): User {
  return { id: u.id, name: u.name, email: u.email!, hashedPassword: u.hashedPassword, image: u.image }
}

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } })
    return u ? toDomain(u) : null
  }
  async create(data: { name?: string | null; email: string; hashedPassword?: string | null }): Promise<User> {
    const u = await prisma.user.create({ data })
    return toDomain(u)
  }
}

