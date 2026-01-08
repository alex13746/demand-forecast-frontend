import { Card, CardContent } from "@/components/ui/card"
import { Package, TrendingUp, Clock, Target } from "lucide-react"

const metrics = [
  {
    label: "Текущий остаток",
    value: "12 шт",
    icon: Package,
    color: "text-blue-600",
  },
  {
    label: "Прогноз на 30 дней",
    value: "124 600 ₽",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    label: "Хватит на",
    value: "2 дня",
    icon: Clock,
    color: "text-amber-600",
  },
  {
    label: "Точность модели",
    value: "94%",
    icon: Target,
    color: "text-violet-600",
  },
]

export function ProductMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border border-border h-full">
          <CardContent className="p-5 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
