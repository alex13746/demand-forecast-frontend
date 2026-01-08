import { Sidebar } from "@/components/sidebar"
import { ProductHeader } from "@/components/product-header"
import { ProductForecastChart } from "@/components/product-forecast-chart"
import { FactorAnalysis } from "@/components/factor-analysis"
import { StockParameters } from "@/components/stock-parameters"
import { ProductStats } from "@/components/product-stats"

export default function ProductPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <ProductHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main content area - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <ProductForecastChart />
            <FactorAnalysis />
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            <StockParameters />
            <ProductStats />
          </div>
        </div>
      </main>
    </div>
  )
}
