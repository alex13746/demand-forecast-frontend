import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Cloud } from "lucide-react"

const factors = [
  {
    label: "Сезонный рост",
    impact: "+15%",
    positive: true,
    icon: TrendingUp,
    description: "Повышенный спрос на крупы в весенний период",
  },
  {
    label: "Акция конкурентов",
    impact: "-5%",
    positive: false,
    icon: TrendingDown,
    description: "Магазин «Пятёрочка» снизил цену на 12%",
  },
  {
    label: "Погода: Дождь",
    impact: "+2%",
    positive: true,
    icon: Cloud,
    description: "В дождливую погоду покупают больше круп",
  },
]

export function FactorAnalysis() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Факторы влияния на прогноз</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Почему AI предсказывает такой спрос</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {factors.map((factor, index) => {
            const Icon = factor.icon
            return (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted/30">
                <div
                  className={`
                  p-2 rounded-lg
                  ${factor.positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}
                `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{factor.label}</h4>
                    <span
                      className={`
                      text-sm font-bold
                      ${factor.positive ? "text-emerald-600" : "text-red-600"}
                    `}
                    >
                      {factor.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{factor.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
