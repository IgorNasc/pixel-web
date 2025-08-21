import type { User } from "./user"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: { name?: string | null; email: string; hashedPassword?: string | null }): Promise<User>
}

export interface IPasswordHasher {
  hash(plain: string): Promise<string>
  compare(plain: string, hash: string): Promise<boolean>
}

