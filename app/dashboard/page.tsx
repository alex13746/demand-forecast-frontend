"use client"

import { MetricsCards } from "@/components/metrics-cards"
import { ForecastChart } from "@/components/forecast-chart"
import { ProductsTable } from "@/components/products-table"
import { RecentAlerts } from "@/components/recent-alerts"
import { Sidebar } from "@/components/sidebar"
import { PurchaseRecommendations } from "@/components/purchase-recommendations"
import { DashboardHeader } from "@/components/dashboard-header"
import { useEffect, useState } from "react"
import { api, type DashboardData } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      const username = "testuser"

      console.log("[v0] Loading dashboard for user:", username)
      const dashboardData = await api.getDashboard(username)
      console.log("[v0] Dashboard data loaded:", dashboardData)
      setData(dashboardData)
    } catch (err) {
      console.error("[v0] Dashboard error:", err)
      const errorMessage = err instanceof Error ? err.message : "Не удалось загрузить данные"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-60">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 px-4 lg:px-8 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Сводка</h1>
              <p className="text-sm text-muted-foreground">Обзор ключевых показателей и рекомендации</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadDashboard}
              disabled={loading}
              className="gap-2 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Обновить
            </Button>
          </div>

          {loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
              <Skeleton className="h-96" />
              <Skeleton className="h-64" />
            </>
          )}

          {error && !loading && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ошибка загрузки данных</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>{error}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={loadDashboard}>
                    Попробовать снова
                  </Button>
                  <Link href="/import">
                    <Button variant="outline" size="sm">
                      Загрузить данные
                    </Button>
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {data && !loading && (
            <>
              <MetricsCards
                riskOfStockout={data.risk_of_stockout}
                overstockValue={data.overstock_value}
                forecastAccuracy={data.forecast_accuracy}
                urgentReorders={data.urgent_reorders}
              />

              <ForecastChart data={data.forecast_data} />

              {data.recommendations.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Нет данных для рекомендаций</AlertTitle>
                  <AlertDescription className="flex flex-col gap-2">
                    <p>Пожалуйста, загрузите данные о продажах для получения рекомендаций к закупке.</p>
                    <Link href="/import">
                      <Button size="sm">Загрузить данные</Button>
                    </Link>
                  </AlertDescription>
                </Alert>
              ) : (
                <PurchaseRecommendations recommendations={data.recommendations} />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ProductsTable />
                </div>
                <div className="lg:col-span-1">
                  <RecentAlerts />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
