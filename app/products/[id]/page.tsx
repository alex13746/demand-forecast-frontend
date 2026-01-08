"use client"

import { Sidebar } from "@/components/sidebar"
import { ProductDetailHeader } from "@/components/product-detail-header"
import { ProductMetrics } from "@/components/product-metrics"
import { ProductForecastChart } from "@/components/product-forecast-chart"
import { ForecastFactors } from "@/components/forecast-factors"
import { MovementHistory } from "@/components/movement-history"
import { StockSettings } from "@/components/stock-settings"
import { DashboardHeader } from "@/components/dashboard-header"
import { useState } from "react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { id } = params

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-60">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <ProductDetailHeader productId={id} />

          <div className="mt-6">
            <ProductMetrics />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left column: Graph and History Table */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="h-full">
                <ProductForecastChart />
              </div>

              <div className="h-full">
                <MovementHistory />
              </div>
            </div>

            {/* Right column: Factors and Settings */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-6">
              <div className="h-full">
                <ForecastFactors />
              </div>

              <div className="h-full">
                <StockSettings />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
