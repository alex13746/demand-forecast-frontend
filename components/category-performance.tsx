"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const categories = [
  { name: "Электроника", value: 12500000, target: 15000000, percent: 83 },
  { name: "Одежда и обувь", value: 8900000, target: 10000000, percent: 89 },
  { name: "Продукты питания", value: 15200000, target: 14000000, percent: 109 },
  { name: "Бытовая техника", value: 6700000, target: 8000000, percent: 84 },
  { name: "Товары для дома", value: 4300000, target: 5000000, percent: 86 },
  { name: "Косметика", value: 3800000, target: 4000000, percent: 95 },
]

const formatCurrency = (value: number) => {
  return (
    value
      .toLocaleString("ru-RU", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/,/g, " ") + " ₽"
  )
}

export function CategoryPerformance() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Категории товаров</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Выполнение плана продаж</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{category.name}</span>
              <span
                className={
                  category.percent >= 100
                    ? "text-emerald-600 font-semibold"
                    : category.percent >= 90
                      ? "text-amber-600 font-semibold"
                      : "text-muted-foreground font-semibold"
                }
              >
                {category.percent}%
              </span>
            </div>
            <Progress value={Math.min(category.percent, 100)} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(category.value)}</span>
              <span>из {formatCurrency(category.target)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
