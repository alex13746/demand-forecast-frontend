import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricsCardsProps {
  riskOfStockout: string
  overstockValue: string
  forecastAccuracy: string
  urgentReorders: number
}

export function MetricsCards({ riskOfStockout, overstockValue, forecastAccuracy, urgentReorders }: MetricsCardsProps) {
  const metrics = [
    {
      label: "Риск упущенной выручки",
      value: riskOfStockout,
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      changeColor: "text-red-600",
    },
    {
      label: "Замороженный капитал",
      value: overstockValue,
      change: "-8%",
      trend: "down",
      icon: TrendingDown,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      changeColor: "text-emerald-600",
    },
    {
      label: "Точность прогноза",
      value: forecastAccuracy,
      change: "за 30 дней",
      trend: "neutral",
      icon: Target,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      changeColor: "text-muted-foreground",
    },
    {
      label: "Срочно к заказу",
      value: `${urgentReorders} SKU`,
      change: "требуют заказа",
      trend: "warning",
      icon: AlertCircle,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      changeColor: "text-muted-foreground",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {metric.label}
                </span>
                <div
                  className={cn("w-8 h-8 rounded-lg flex items-center justify-center", metric.iconBg, metric.iconColor)}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold text-foreground tracking-tight">{metric.value}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={cn("font-medium", metric.changeColor)}>{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
