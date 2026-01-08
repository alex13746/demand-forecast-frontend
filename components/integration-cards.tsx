"use client"

import { Database, Package, Code } from "lucide-react"
import { Card } from "@/components/ui/card"

const integrations = [
  {
    id: "1c",
    icon: Database,
    label: "Подключить 1С:Предприятие",
    description: "Автоматическая синхронизация",
  },
  {
    id: "moysklad",
    icon: Package,
    label: "МойСклад",
    description: "Прямая интеграция",
  },
  {
    id: "api",
    icon: Code,
    label: "Загрузка по API",
    description: "Для разработчиков",
  },
]

export function IntegrationCards() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Быстрая интеграция</h2>
      <p className="text-sm text-muted-foreground mb-4">Подключите систему учета для автоматической загрузки данных</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon
          return (
            <Card
              key={integration.id}
              className="p-5 cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{integration.label}</h3>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
