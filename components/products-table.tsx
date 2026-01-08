import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import Link from "next/link"

const products = [
  {
    id: "1",
    sku: "SKU-2847",
    name: "Смартфон Samsung Galaxy S24",
    category: "Электроника",
    group: "A",
    forecast: 450000,
    actual: 423000,
    accuracy: 94,
    dataQuality: 98,
    status: "ok",
  },
  {
    id: "2",
    sku: "SKU-1923",
    name: "Кроссовки Nike Air Max",
    category: "Одежда",
    group: "A",
    forecast: 125000,
    actual: 138000,
    accuracy: 90,
    dataQuality: 95,
    status: "ok",
  },
  {
    id: "3",
    sku: "SKU-4562",
    name: 'Молоко "Простоквашино" 3.2%',
    category: "Продукты",
    group: "B",
    forecast: 78000,
    actual: 54000,
    accuracy: 69,
    dataQuality: 72,
    status: "warning",
  },
  {
    id: "4",
    sku: "SKU-7891",
    name: "Ноутбук ASUS VivoBook",
    category: "Электроника",
    group: "A",
    forecast: 890000,
    actual: 912000,
    accuracy: 98,
    dataQuality: 99,
    status: "ok",
  },
  {
    id: "5",
    sku: "SKU-3345",
    name: "Пылесос Dyson V15",
    category: "Бытовая техника",
    group: "B",
    forecast: 345000,
    actual: 289000,
    accuracy: 84,
    dataQuality: 88,
    status: "attention",
  },
  {
    id: "6",
    sku: "SKU-5678",
    name: "Крем для лица L'Oreal",
    category: "Косметика",
    group: "C",
    forecast: 67000,
    actual: 71000,
    accuracy: 94,
    dataQuality: 85,
    status: "ok",
  },
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

const getGroupColor = (group: string) => {
  switch (group) {
    case "A":
      return "bg-emerald-100 text-emerald-700 border-emerald-200"
    case "B":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "C":
      return "bg-slate-100 text-slate-700 border-slate-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getDataQualityColor = (quality: number) => {
  if (quality >= 90) return "bg-emerald-500"
  if (quality >= 75) return "bg-amber-500"
  return "bg-red-500"
}

export function ProductsTable() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Аналитика и ABC</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder="Поиск по SKU или названию..." className="w-[240px] pl-8 h-8 text-xs" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 text-xs font-semibold">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs -ml-2">
                  SKU
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="h-9 text-xs font-semibold">Товар</TableHead>
              <TableHead className="h-9 text-xs font-semibold">Категория</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Группа</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-right">Прогноз</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-right">Факт</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Точность</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Качество данных</TableHead>
              <TableHead className="h-9 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="py-3 text-xs font-mono text-muted-foreground">{product.sku}</TableCell>
                <TableCell className="py-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-xs text-accent hover:text-accent/80 hover:underline transition-colors"
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="py-3 text-xs text-muted-foreground">{product.category}</TableCell>
                <TableCell className="py-3 text-center">
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-bold w-8 justify-center", getGroupColor(product.group))}
                  >
                    {product.group}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-xs text-right font-medium text-foreground">
                  {formatCurrency(product.forecast)}
                </TableCell>
                <TableCell className="py-3 text-xs text-right font-medium text-foreground">
                  {formatCurrency(product.actual)}
                </TableCell>
                <TableCell className="py-3 text-center">
                  <Badge
                    variant={
                      product.status === "ok" ? "default" : product.status === "warning" ? "destructive" : "secondary"
                    }
                    className="text-xs font-semibold"
                  >
                    {product.accuracy}%
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all", getDataQualityColor(product.dataQuality))}
                        style={{ width: `${product.dataQuality}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                      {product.dataQuality}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
