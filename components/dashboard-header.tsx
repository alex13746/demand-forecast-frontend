"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Settings, ChevronDown, Menu } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products/1?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 lg:gap-8">
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={onMenuClick}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ПС</span>
              </div>
              <span className="font-semibold text-foreground">Прогноз Спроса</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-foreground">
                Обзор
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Прогнозы
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Аналитика
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Отчёты
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Поиск товаров, категорий..."
                className="w-[300px] pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-medium">АИ</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
