import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, Gift, CloudRain } from "lucide-react"

const factors = [
  {
    icon: TrendingUp,
    title: "Растущий тренд",
    description: "+12%",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Calendar,
    title: "Сезонность месяца",
    description: "Высокая",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Gift,
    title: "Предстоящий праздник",
    description: "8 марта",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: CloudRain,
    title: "Погодные условия",
    description: "Снижение температуры",
    color: "text-amber-600 bg-amber-50",
  },
]

export function ForecastFactors() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Почему такой прогноз?</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Факторы, влияющие на спрос</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factors.map((factor, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
              <div className={`p-2.5 rounded-lg ${factor.color}`}>
                <factor.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">{factor.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
