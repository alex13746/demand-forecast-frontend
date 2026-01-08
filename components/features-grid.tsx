import { Brain, FileSpreadsheet, BarChart3, Bell } from "lucide-react"

export function FeaturesGrid() {
  const features = [
    {
      icon: Brain,
      title: "Точный прогноз AI",
      description:
        "Машинное обучение учитывает более 50 факторов: сезонность, праздники, погоду, акции и исторические данные",
    },
    {
      icon: FileSpreadsheet,
      title: "Автоматический заказ",
      description: "Экспорт готового заказа поставщику в XLSX за 1 клик. Интеграция с 1С:Предприятие и МойСклад",
    },
    {
      icon: BarChart3,
      title: "ABC-анализ",
      description: "Автоматическое выделение самых прибыльных товаров и рекомендации по оптимизации ассортимента",
    },
    {
      icon: Bell,
      title: "Алерты о дефиците",
      description: "Умные уведомления в Telegram и Email о скором дефиците или избыточных остатках товаров",
    },
  ]

  return (
    <section id="product" className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Всё для управления спросом</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Полный набор инструментов для точного планирования закупок
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
