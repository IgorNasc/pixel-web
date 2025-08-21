import { hash as bcryptHash, compare as bcryptCompare } from "bcryptjs"
import type { IPasswordHasher } from "@/lib/auth/domain/ports"

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(plain: string): Promise<string> {
    return bcryptHash(plain, 10)
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcryptCompare(plain, hash)
  }
}

