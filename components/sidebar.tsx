"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, TrendingUp, ShoppingCart, Package, Upload, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  { label: "Сводка", icon: LayoutDashboard, href: "/dashboard", active: false },
  { label: "Прогнозы", icon: TrendingUp, href: "/forecasts", active: false },
  { label: "Закупки", icon: ShoppingCart, href: "/purchases", active: false },
  { label: "Склад", icon: Package, href: "/warehouse", active: false },
  { label: "Загрузка данных", icon: Upload, href: "/upload", active: false },
  { label: "Настройки", icon: Settings, href: "/settings", active: false },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      <aside className="hidden lg:flex w-60 h-screen border-r border-border bg-card flex-col fixed top-0">
        <div className="p-5 border-b border-border">
          <h1 className="text-lg font-semibold text-foreground">DemandAI</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Прогнозирование спроса</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link key={index} href={item.href}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sm h-10",
                    item.active && "bg-accent/10 text-accent-foreground font-medium",
                  )}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="text-xs text-muted-foreground mb-1">Организация</div>
          <div className="text-sm font-medium text-foreground">ООО «Ритейл Групп»</div>
        </div>
      </aside>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />

          {/* Sliding sidebar */}
          <aside className="lg:hidden fixed top-0 left-0 w-60 h-screen border-r border-border bg-card flex-col z-50 flex">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-foreground">DemandAI</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Прогнозирование спроса</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link key={index} href={item.href} onClick={onClose}>
                    <Button
                      variant={item.active ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-sm h-10",
                        item.active && "bg-accent/10 text-accent-foreground font-medium",
                      )}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>

            <div className="p-3 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">Организация</div>
              <div className="text-sm font-medium text-foreground">ООО «Ритейл Групп»</div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
