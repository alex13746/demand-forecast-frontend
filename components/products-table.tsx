"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useEffect, useState } from "react"
import { api, type Product } from "@/lib/api"

interface EnhancedProduct extends Product {
  status?: "critical" | "low" | "normal"
}

const formatNumber = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "0"
  return value.toLocaleString("ru-RU").replace(/,/g, " ")
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

const getStockStatus = (stock: number | undefined | null): "critical" | "low" | "normal" => {
  if (stock === undefined || stock === null) return "normal"
  if (stock < 10) return "critical"
  if (stock < 50) return "low"
  return "normal"
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "critical":
      return (
        <Badge variant="destructive" className="text-xs font-medium">
          Критический
        </Badge>
      )
    case "low":
      return (
        <Badge variant="secondary" className="text-xs font-medium bg-amber-100 text-amber-700 border-amber-200">
          Низкий
        </Badge>
      )
    case "normal":
      return (
        <Badge variant="default" className="text-xs font-medium bg-emerald-100 text-emerald-700 border-emerald-200">
          Норма
        </Badge>
      )
    default:
      return null
  }
}

export function ProductsTable() {
  const [products, setProducts] = useState<EnhancedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const username = "testuser"

        const productsData = await api.getProducts(username)

        const enhancedProducts = (productsData || []).map((product: Product) => ({
          ...product,
          stock: product.stock ?? 0,
          status: getStockStatus(product.stock),
        }))

        enhancedProducts.sort((a, b) => a.stock - b.stock)

        setProducts(enhancedProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить товары")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Аналитика и ABC</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Аналитика и ABC</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (products.length === 0) {
    return (
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Аналитика и ABC</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Нет данных о товарах. Загрузите CSV файл с историей продаж для начала работы.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Аналитика и ABC</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Поиск по SKU или названию..."
              className="w-[240px] pl-8 h-8 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 text-xs font-semibold">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs -ml-2">
                  Артикул
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="h-9 text-xs font-semibold">Название</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-right">Остаток (шт)</TableHead>
              <TableHead className="h-9 text-xs font-semibold text-center">Статус</TableHead>
              {products.some((p) => p.abc_group) && (
                <TableHead className="h-9 text-xs font-semibold text-center">Группа</TableHead>
              )}
              {products.some((p) => p.data_quality !== undefined) && (
                <TableHead className="h-9 text-xs font-semibold text-center">Качество данных</TableHead>
              )}
              <TableHead className="h-9 text-xs font-semibold">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.product_id} className="hover:bg-muted/50">
                <TableCell className="py-3 text-xs font-mono text-muted-foreground">{product.sku}</TableCell>
                <TableCell className="py-3">
                  <Link
                    href={`/products/${product.product_id}`}
                    className="font-medium text-xs text-accent hover:text-accent/80 hover:underline transition-colors"
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="py-3 text-xs text-right font-medium text-foreground">
                  {formatNumber(product.stock)}
                </TableCell>
                <TableCell className="py-3 text-center">{getStatusBadge(product.status || "normal")}</TableCell>
                {products.some((p) => p.abc_group) && (
                  <TableCell className="py-3 text-center">
                    {product.abc_group ? (
                      <Badge
                        variant="outline"
                        className={cn("text-xs font-bold w-8 justify-center", getGroupColor(product.abc_group))}
                      >
                        {product.abc_group}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                )}
                {products.some((p) => p.data_quality !== undefined) && (
                  <TableCell className="py-3">
                    {product.data_quality !== undefined ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full transition-all", getDataQualityColor(product.data_quality))}
                            style={{ width: `${product.data_quality}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                          {product.data_quality}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground text-center block">-</span>
                    )}
                  </TableCell>
                )}
                <TableCell className="py-3">
                  <Link href={`/products/${product.product_id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                      Детали
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProducts.length === 0 && searchQuery && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Ничего не найдено по запросу "{searchQuery}"
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Показано {filteredProducts.length} из {products.length} товаров
          </div>
        )}
      </CardContent>
    </Card>
  )
}
