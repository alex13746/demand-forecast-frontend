"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance">
                Зарабатывайте больше, закупая точно
              </h1>
              <p className="text-lg text-gray-600 text-pretty max-w-xl">
                AI-платформа для прогнозирования спроса, которая помогает российскому ритейлу избежать дефицита и
                затоваривания
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  Начать бесплатно
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base font-medium bg-transparent"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Смотреть демо
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>14 дней бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Без кредитной карты</span>
              </div>
            </div>
          </div>

          {/* Right side - Dashboard preview */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white p-4 shadow-2xl border border-gray-200">
              <img
                src="/modern-dashboard-with-forecast-chart-and-metrics.jpg"
                alt="Dashboard preview"
                className="rounded-lg w-full"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer rounded-lg"
              >
                <div className="rounded-full bg-white/90 p-6 shadow-2xl transition-all group-hover:scale-110 group-hover:bg-white">
                  <Play className="h-12 w-12 text-blue-600 fill-blue-600" />
                </div>
              </button>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Точность прогноза</div>
                    <div className="text-2xl font-bold text-green-600">94.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-white/10 p-8 inline-block">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <p className="text-white text-xl font-medium">Live Demo Video</p>
                <p className="text-gray-400 text-sm">Демонстрационное видео будет здесь</p>
              </div>
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
