"use client"

import { BarChart3, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { ThemeClasses } from "@/lib/theme"
import { SITE_CONFIG } from "@/lib/constants"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  themeClasses: ThemeClasses
}

export function DashboardHeader({ isDarkMode, onToggleTheme, themeClasses }: DashboardHeaderProps) {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <header className={`border-b ${themeClasses.border} ${themeClasses.bgPrimary}/95 backdrop-blur-sm sticky top-0 z-40`}>
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo (left) */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className={`text-lg md:text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
        </Link>

        {/* Minimal Navigation (center) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className={`${themeClasses.textSecondary} hover:${themeClasses.textPrimary} transition-colors text-sm lg:text-base`}>
            Home
          </Link>
        </nav>

        {/* Right: theme + user */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} p-2`}
            aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {status === "authenticated" && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={(user as any).image || undefined} alt={user.name || user.email || "User"} />
                    <AvatarFallback>
                      {(user.name || user.email || "U").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
