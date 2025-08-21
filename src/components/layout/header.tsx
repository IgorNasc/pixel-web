"use client"

import { BarChart3, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants"
import { useMobileMenu } from "@/hooks/use-mobile-menu"
import type { ThemeClasses } from "@/lib/theme"
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

interface HeaderProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  themeClasses: ThemeClasses
}

export function Header({ isDarkMode, onToggleTheme, themeClasses }: HeaderProps) {
  const mobileMenu = useMobileMenu()
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <header
      className={`border-b ${themeClasses.border} ${themeClasses.bgPrimary}/95 backdrop-blur-sm sticky top-0 z-40`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className={`text-lg md:text-xl font-bold ${themeClasses.textPrimary}`}>{SITE_CONFIG.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${themeClasses.textSecondary} hover:${themeClasses.textPrimary} transition-colors text-sm lg:text-base`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Auth state */}
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
                <DropdownMenuLabel>
                  {user.name || user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/login">Entrar</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} p-2`}
            aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-sm" asChild>
            <Link href="#cadastro">Teste Grátis</Link>
          </Button>

          <MobileMenu
            isOpen={mobileMenu.isOpen}
            onToggle={mobileMenu.toggle}
            onClose={mobileMenu.close}
            themeClasses={themeClasses}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </header>
  )
}
