export interface User {
  id: string
  name?: string | null
  email: string
  hashedPassword?: string | null
  image?: string | null
}

