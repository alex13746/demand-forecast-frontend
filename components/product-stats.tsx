import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Уходимость",
    value: "4.5 шт/день",
    icon: Package,
    description: "Средняя скорость продаж за последние 30 дней",
  },
  {
    label: "Маржинальность",
    value: "22%",
    icon: TrendingUp,
    description: "Валовая прибыль от продажи товара",
  },
]

export function ProductStats() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Показатели товара</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground mt-0.5">{stat.value}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
