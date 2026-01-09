"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { LogOut, User, BarChart3 } from "lucide-react"

export function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Логотип */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">DemandAI</span>
        </Link>

        {/* Навигация и авторизация */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
            </div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm font-medium">
                  Панель управления
                </Button>
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{user?.username}</span>
                  <span className="text-xs text-muted-foreground">{user?.storeName}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={logout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Вход
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm font-medium">Регистрация</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
