"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { BarChart3, DollarSign, Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Система прогнозирования спроса</h1>
          <p className="text-xl text-gray-600 mb-8">ML-алгоритмы для точных прогнозов продаж</p>

          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Начать бесплатно
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Точные прогнозы</h3>
            <p className="text-gray-600 text-sm">
              ML-алгоритмы анализируют исторические данные и предсказывают спрос с высокой точностью
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Экономия бюджета</h3>
            <p className="text-gray-600 text-sm">Сократите расходы на хранение и избежите потерь от дефицита товаров</p>
          </Card>

          <Card className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Оптимизация закупок</h3>
            <p className="text-gray-600 text-sm">Автоматические рекомендации по количеству и срокам заказа товаров</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
