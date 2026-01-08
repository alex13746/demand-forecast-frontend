"use client"

import { Sidebar } from "@/components/sidebar"
import { UploadZone } from "@/components/upload-zone"
import { IntegrationCards } from "@/components/integration-cards"
import { DataMappingTable } from "@/components/data-mapping-table"
import { ImportStepper } from "@/components/import-stepper"
import { DashboardHeader } from "@/components/dashboard-header"
import { useState } from "react"

export default function ImportPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-60">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 px-4 lg:px-8 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Импорт данных</h1>
            <p className="text-sm text-muted-foreground">Загрузите данные из 1С, Excel или подключите систему учета</p>
          </div>

          <ImportStepper currentStep={1} />

          <UploadZone />

          <IntegrationCards />

          <DataMappingTable />
        </main>
      </div>
    </div>
  )
}
