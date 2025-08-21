import type { IUserRepository, IPasswordHasher } from "@/lib/auth/domain/ports"
import { DuplicateEmailError } from "@/lib/auth/domain/errors"
import { ok, err, type Result } from "@/lib/core/result"
import type { User } from "@/lib/auth/domain/user"

export interface RegisterUserInput {
  name?: string | null
  email: string
  password?: string | null
}

export async function registerUser(
  repo: IUserRepository,
  hasher: IPasswordHasher,
  input: RegisterUserInput,
): Promise<Result<User, Error>> {
  const existing = await repo.findByEmail(input.email)
  if (existing) return err(new DuplicateEmailError())

  const hashed = input.password ? await hasher.hash(input.password) : undefined
  const user = await repo.create({ name: input.name, email: input.email, hashedPassword: hashed })
  return ok(user)
}

