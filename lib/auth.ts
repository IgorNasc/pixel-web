import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/lib/auth/infra/prisma-user-repository"
import { BcryptPasswordHasher } from "@/lib/auth/infra/bcrypt-password-hasher"
import { verifyCredentials } from "@/lib/auth/application/verify-credentials"
import type { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const repo = new PrismaUserRepository()
        const hasher = new BcryptPasswordHasher()
        const result = await verifyCredentials(repo, hasher, {
          email: credentials.email,
          password: credentials.password,
        })
        if (!result.ok) return null
        const user = result.value
        return { id: user.id, name: user.name || user.email || "User", email: user.email || undefined }
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      // Persist user id on the token after first login
      if (user) {
        ;(token as JWT).userId = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        const userId = (token as JWT).userId
        if (userId) session.user.id = userId
      }
      return session
    },
  },
}
