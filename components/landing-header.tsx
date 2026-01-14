"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">DemandAI</span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="#product" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Продукт
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Тарифы
          </Link>
          <Link href="#cases" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Кейсы
          </Link>
        </nav>

        <Link href="/dashboard">
          <Button variant="outline" className="text-sm font-medium bg-transparent">
            Перейти к системе
          </Button>
        </Link>
      </div>
    </header>
  )
}
