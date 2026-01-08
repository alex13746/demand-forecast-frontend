import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, FileX, CloudRain } from "lucide-react"
import { cn } from "@/lib/utils"

const anomalies = [
  {
    type: "critical",
    title: "Ошибка в Excel (нулевые цены)",
    description: "Обнаружено 47 строк с нулевыми ценами в файле выгрузки",
    source: 'Файл: "Продажи_март_2024.xlsx"',
    time: "15 мин назад",
    icon: FileX,
    actionText: "Проверить файл",
  },
  {
    type: "warning",
    title: "Аномальный рост спроса",
    description: 'Спрос на "Молоко Домик в Деревне" вырос на 340% за 3 дня',
    source: "Категория: Молочные продукты",
    time: "1 час назад",
    icon: TrendingUp,
    actionText: "Анализировать причину",
  },
  {
    type: "info",
    title: "Влияние погоды",
    description: "Прогноз дождей на выходные повлияет на спрос в категории «Зонты»",
    source: "Прогноз на 23-25 марта",
    time: "2 часа назад",
    icon: CloudRain,
    actionText: "Скорректировать заказ",
  },
  {
    type: "critical",
    title: "Критическое отклонение прогноза",
    description: 'Точность прогноза для "Пылесос Dyson V15" упала до 69%',
    source: "SKU-3345",
    time: "3 часа назад",
    icon: AlertTriangle,
    actionText: "Переобучить модель",
  },
]

export function RecentAlerts() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Аномалии и предупреждения</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Требующие внимания</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {anomalies.map((anomaly, index) => {
          const Icon = anomaly.icon
          return (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border transition-colors",
                anomaly.type === "critical" && "bg-red-50/50 border-red-200",
                anomaly.type === "warning" && "bg-amber-50/50 border-amber-200",
                anomaly.type === "info" && "bg-blue-50/50 border-blue-200",
              )}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    anomaly.type === "critical" && "bg-red-100 text-red-600",
                    anomaly.type === "warning" && "bg-amber-100 text-amber-600",
                    anomaly.type === "info" && "bg-blue-100 text-blue-600",
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-foreground leading-tight">{anomaly.title}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{anomaly.time}</span>
                  </div>
                  <p className="text-xs text-foreground mb-2 leading-relaxed">{anomaly.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground font-mono">{anomaly.source}</span>
                    <button
                      className={cn(
                        "text-xs font-medium hover:underline",
                        anomaly.type === "critical" && "text-red-600",
                        anomaly.type === "warning" && "text-amber-600",
                        anomaly.type === "info" && "text-blue-600",
                      )}
                    >
                      {anomaly.actionText} →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
