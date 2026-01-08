export function StatsBlock() {
  const stats = [
    {
      value: "+20%",
      label: "к прибыли",
      description: "за счёт точного планирования закупок",
    },
    {
      value: "-30%",
      label: "остатков",
      description: "сокращение избыточных запасов",
    },
    {
      value: "14 дней",
      label: "на внедрение",
      description: "быстрый старт без сложной интеграции",
    },
  ]

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
