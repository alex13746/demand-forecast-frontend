import { X, Check } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 text-balance">
            Почему ручное планирование больше не работает?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Переход от Excel к умной автоматизации — это не просто удобство, это конкурентное преимущество
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before - Problems */}
          <div className="bg-white rounded-2xl p-8 border-2 border-red-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">До</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Расчёты в Excel занимают часы",
                "Человеческие ошибки в формулах",
                "Невозможно учесть 50+ факторов",
                "Дефицит или затоваривание",
                "Потеря прибыли до 30%",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After - Solution */}
          <div className="bg-white rounded-2xl p-8 border-2 border-green-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">После</h3>
            </div>
            <ul className="space-y-4">
              {[
                "AI-прогноз за 3 секунды",
                "Точность расчётов 94%+",
                "Учёт сезонности, праздников, погоды",
                "Оптимальные запасы всегда",
                "Рост прибыли на 20%",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
