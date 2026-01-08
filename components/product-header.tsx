import { ChevronRight, TrendingUp, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ProductHeader() {
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Каталог</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-foreground cursor-pointer">Бакалея</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Гречка Увелка, 800г</span>
      </nav>

      {/* Title and Tags */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-3">Гречка Увелка, 800г</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              Товар-локомотив
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 border-amber-500/20 font-medium">
              <Sun className="w-3 h-3 mr-1" />
              Высокая сезонность
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
