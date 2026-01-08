"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function CTAFooter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
  }

  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6 text-balance">
            Готовы оптимизировать закупки?
          </h2>
          <p className="text-lg text-white/90 mb-8 text-pretty">
            Присоединяйтесь к сотням компаний, которые уже используют AI для управления запасами. Начните бесплатно
            прямо сейчас
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white text-gray-900 placeholder:text-gray-500"
              required
            />
            <Button type="submit" size="lg" className="bg-white text-primary hover:bg-gray-100 font-medium px-8">
              Начать бесплатно
            </Button>
          </form>

          <p className="text-sm text-white/80 mt-6">
            14 дней бесплатно • Не требуется кредитная карта • Поддержка 24/7
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/80 text-sm">© 2025 DemandAI. Все права защищены.</div>
            <div className="flex gap-6 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
