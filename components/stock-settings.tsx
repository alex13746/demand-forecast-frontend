"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Info } from "lucide-react"
import { useState } from "react"

export function StockSettings() {
  const [leadTime, setLeadTime] = useState("7")
  const [safetyStock, setSafetyStock] = useState("5")

  return (
    <Card className="border border-border sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Настройки склада</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Параметры для расчета оптимального заказа</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="leadTime" className="text-sm font-medium text-foreground">
            Срок поставки (дней)
          </Label>
          <Input
            id="leadTime"
            type="number"
            value={leadTime}
            onChange={(e) => setLeadTime(e.target.value)}
            className="h-9 text-sm"
          />
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Время от заказа до получения товара на склад</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="safetyStock" className="text-sm font-medium text-foreground">
            Страховой запас (дней)
          </Label>
          <Input
            id="safetyStock"
            type="number"
            value={safetyStock}
            onChange={(e) => setSafetyStock(e.target.value)}
            className="h-9 text-sm"
          />
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Запас на случай задержки или скачка спроса</span>
          </p>
        </div>

        <Button className="w-full h-9 text-sm font-semibold bg-accent hover:bg-accent/90">
          <Calculator className="w-4 h-4 mr-2" />
          Пересчитать прогноз
        </Button>

        <div className="pt-4 border-t border-border space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Расчёт точки заказа</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Средний спрос в день:</span>
              <span className="font-medium text-foreground">45 шт</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Требуемый запас:</span>
              <span className="font-medium text-foreground">540 шт</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Заказать когда:</span>
              <span className="font-bold text-accent">≤ 315 шт</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
