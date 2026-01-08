import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProductDetailHeaderProps {
  productId: string
}

const productData: Record<
  string,
  { name: string; category: string; breadcrumb: string; group: string; price: string }
> = {
  "1": {
    name: "Молоко Домик в Деревне 3.2%",
    category: "Молочные продукты",
    breadcrumb: "Бакалея",
    group: "A",
    price: "89 ₽",
  },
  "2": {
    name: "Хлеб Бородинский нарезной",
    category: "Хлебобулочные изделия",
    breadcrumb: "Бакалея",
    group: "A",
    price: "43 ₽",
  },
  "3": {
    name: "Масло сливочное Крестьянское",
    category: "Молочные продукты",
    breadcrumb: "Бакалея",
    group: "B",
    price: "310 ₽",
  },
  "4": { name: "Яйца куриные С1, 10 шт", category: "Яйца", breadcrumb: "Бакалея", group: "A", price: "90 ₽" },
  "5": { name: "Сок Добрый апельсиновый 1л", category: "Напитки", breadcrumb: "Бакалея", group: "B", price: "89 ₽" },
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

export function ProductDetailHeader({ productId }: ProductDetailHeaderProps) {
  const product = productData[productId] || productData["1"]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-accent transition-colors">
          Товары
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>{product.breadcrumb}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          <Badge variant="outline" className={`text-sm font-bold ${getGroupColor(product.group)}`}>
            Группа {product.group}
          </Badge>
          <span className="text-xl font-semibold text-accent">{product.price}</span>
        </div>
      </div>
    </div>
  )
}
