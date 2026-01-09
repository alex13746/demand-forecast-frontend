"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle, User, Mail, Store, Lock } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [storeName, setStoreName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    // Валидация полей
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !storeName.trim()) {
      setError("Заполните все поля")
      return
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Введите корректный email адрес")
      return
    }

    // Валидация пароля
    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await api.register(username, email, password, storeName)
      const loginResponse = await api.login(username, password)

      // Set user in AuthContext
      setUser({
        username: loginResponse.username,
        storeName: loginResponse.store_name,
      })

      setSuccess(true)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">DemandAI</span>
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Регистрация</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Регистрация успешна! Проверьте email. Переадресация...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">Название магазина *</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="storeName"
                  type="text"
                  autoComplete="organization"
                  placeholder="ООО 'Продукты'"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || success}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || success}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Регистрация...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Успешно!
                </>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Войти
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white/80 p-6 shadow-sm">
          <h3 className="mb-4 text-center font-semibold text-gray-900">Что вы получите:</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-lg">📊</span>
              <span>Прогнозы продаж на основе ML</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📦</span>
              <span>Рекомендации по закупкам</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💰</span>
              <span>Оптимизация затрат на склад</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}
