"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const systemFields = [
  { id: "sku", label: "Артикул / SKU", required: true },
  { id: "name", label: "Наименование", required: true },
  { id: "date", label: "Дата продажи", required: true },
  { id: "price", label: "Цена продажи", required: true },
  { id: "stock", label: "Остаток", required: false },
]

const fileColumns = ["Код товара", "Название", "Дата", "Сумма", "Количество на складе", "Категория", "Поставщик"]

export function DataMappingTable() {
  const [mappings, setMappings] = useState<Record<string, string>>({})

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-1">Проверка столбцов</h2>
      <p className="text-sm text-muted-foreground mb-4">Сопоставьте столбцы из вашего файла с полями системы</p>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Поле системы</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Столбец из файла</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Обязательное</th>
            </tr>
          </thead>
          <tbody>
            {systemFields.map((field, index) => (
              <tr key={field.id} className={index !== systemFields.length - 1 ? "border-b border-border" : ""}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{field.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={mappings[field.id] || ""}
                    onValueChange={(value) => setMappings({ ...mappings, [field.id]: value })}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Выберите столбец из файла..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fileColumns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  {field.required ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">
                      Да
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Нет</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="outline">Отмена</Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Продолжить →</Button>
      </div>
    </div>
  )
}
