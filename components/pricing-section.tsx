import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Старт",
      price: "15 000",
      description: "Для небольших магазинов",
      features: ["До 500 SKU", "Прогноз на 30 дней", "ABC-анализ", "Email поддержка"],
      popular: false,
    },
    {
      name: "Бизнес",
      price: "35 000",
      description: "Для растущих сетей",
      features: [
        "До 5 000 SKU",
        "Прогноз на 90 дней",
        "ABC + XYZ анализ",
        "Интеграция с 1С",
        "Telegram алерты",
        "Приоритетная поддержка",
      ],
      popular: true,
    },
    {
      name: "Энтерпрайз",
      price: "Индивидуально",
      description: "Для крупных сетей",
      features: [
        "Неограниченно SKU",
        "Прогноз на 365 дней",
        "Полная аналитика",
        "API интеграция",
        "Персональный менеджер",
        "SLA 99.9%",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Прозрачные тарифы</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите план, который подходит вашему бизнесу. Все тарифы включают 14 дней бесплатного использования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 shadow-lg ${
                plan.popular ? "border-primary scale-105 shadow-2xl" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  {plan.price === "Индивидуально" ? (
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">{plan.price} ₽</span>
                      <span className="text-gray-600">/мес</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/dashboard" className="block">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  {plan.price === "Индивидуально" ? "Связаться с нами" : "Попробовать бесплатно"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
