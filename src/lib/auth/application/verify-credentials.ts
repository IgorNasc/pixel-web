import type { IUserRepository, IPasswordHasher } from "@/lib/auth/domain/ports"
import { InvalidCredentialsError } from "@/lib/auth/domain/errors"
import { ok, err, type Result } from "@/lib/core/result"
import type { User } from "@/lib/auth/domain/user"

export interface VerifyCredentialsInput {
  email: string
  password: string
}

export async function verifyCredentials(
  repo: IUserRepository,
  hasher: IPasswordHasher,
  input: VerifyCredentialsInput,
): Promise<Result<User, Error>> {
  const user = await repo.findByEmail(input.email)
  if (!user || !user.hashedPassword) return err(new InvalidCredentialsError())

  const valid = await hasher.compare(input.password, user.hashedPassword)
  if (!valid) return err(new InvalidCredentialsError())

  return ok(user)
}

