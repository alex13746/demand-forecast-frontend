"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function StockParameters() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Параметры склада</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Настройте параметры для расчёта закупки</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="safety-stock" className="text-sm text-foreground">
            Страховой запас (дней)
          </Label>
          <Input id="safety-stock" type="number" defaultValue="7" className="h-10 border-border" />
          <p className="text-xs text-muted-foreground">Минимальный запас на случай задержки поставки</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-time" className="text-sm text-foreground">
            Срок поставки (дней)
          </Label>
          <Input id="lead-time" type="number" defaultValue="3" className="h-10 border-border" />
          <p className="text-xs text-muted-foreground">Время от заказа до поступления товара</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="moq" className="text-sm text-foreground">
            Минимальная партия (шт)
          </Label>
          <Input id="moq" type="number" defaultValue="50" className="h-10 border-border" />
          <p className="text-xs text-muted-foreground">Минимальный объём заказа у поставщика</p>
        </div>

        <Button className="w-full h-10 mt-4" size="default">
          <Save className="w-4 h-4 mr-2" />
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  )
}
