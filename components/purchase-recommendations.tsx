"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { FileDown, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Recommendation } from "@/lib/api"

interface PurchaseRecommendationsProps {
  recommendations: Recommendation[]
}

export function PurchaseRecommendations({ recommendations }: PurchaseRecommendationsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [forecastVariant, setForecastVariant] = useState("optimal")

  const toggleSelectAll = () => {
    if (selectedItems.length === recommendations.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(recommendations.map((item) => String(item.product_id)))
    }
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const isAllSelected = selectedItems.length === recommendations.length && recommendations.length > 0
  const hasSelection = selectedItems.length > 0

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Рекомендации к закупке</CardTitle>

        <Tabs value={forecastVariant} onValueChange={setForecastVariant} className="mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="minimal" className="text-xs">
              Минимальный
            </TabsTrigger>
            <TabsTrigger value="optimal" className="text-xs">
              Оптимальный
            </TabsTrigger>
            <TabsTrigger value="maximal" className="text-xs">
              Максимальный
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 mt-4">
          <Button
            size="default"
            className="h-10 text-sm font-semibold bg-accent hover:bg-accent/90 text-white"
            disabled={!hasSelection}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Экспорт заказа в XLSX
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs bg-transparent" disabled={!hasSelection}>
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            Сформировать заказ из выбранного
          </Button>
          {hasSelection && (
            <span className="text-xs text-muted-foreground ml-2">
              Выбрано: {selectedItems.length} из {recommendations.length}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 w-12">
                <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} aria-label="Выбрать все" />
              </TableHead>
              <TableHead className="h-9 text-xs font-semibold">Товар</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Текущий остаток</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Хватит на</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Реком. заказ</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-right">Сумма</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((item) => {
              const itemId = String(item.product_id)
              const isUrgent = item.days_left <= 3
              const formattedCost = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              }).format(item.cost)

              return (
                <TableRow key={itemId} className="hover:bg-muted/50">
                  <TableCell className="py-3">
                    <Checkbox
                      checked={selectedItems.includes(itemId)}
                      onCheckedChange={() => toggleSelectItem(itemId)}
                      aria-label={`Выбрать ${item.name}`}
                    />
                  </TableCell>
                  <TableCell className="py-3">
                    <Link
                      href={`/products/${itemId}`}
                      className="font-medium text-xs text-accent hover:text-accent/80 hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 text-xs text-center text-muted-foreground">
                    {item.current_stock} шт
                  </TableCell>
                  <TableCell className="py-3 text-xs text-center">
                    <span className={isUrgent ? "text-red-600 font-medium" : "text-muted-foreground"}>
                      {item.days_left} {item.days_left === 1 ? "день" : item.days_left < 5 ? "дня" : "дней"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-xs text-center font-medium text-accent">
                    +{item.suggested_qty} шт
                  </TableCell>
                  <TableCell className="py-3 text-xs text-right font-medium text-foreground">{formattedCost}</TableCell>
                  <TableCell className="py-3 text-center">
                    <Badge variant={isUrgent ? "destructive" : "secondary"} className="text-xs font-medium">
                      {isUrgent ? "Срочно" : "Плановый"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
