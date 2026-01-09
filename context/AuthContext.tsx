"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { auth } from "@/lib/api"
import { useRouter } from "next/navigation"

// Интерфейсы
interface User {
  username: string
  storeName: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
  setUser: (user: User) => void
}

// Создание контекста с дефолтными значениями
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
  setUser: () => {},
})

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext)

// Provider компонент
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Проверка авторизации при монтировании
  useEffect(() => {
    const savedUser = auth.getUser()
    const isAuth = auth.isAuthenticated()

    if (savedUser && isAuth) {
      setUserState(savedUser)
    }

    setIsLoading(false)
  }, [])

  // Метод обновления пользователя
  const setUser = (user: User) => {
    setUserState(user)
  }

  // Метод выхода
  const logout = () => {
    auth.removeToken()
    setUserState(null)
    router.push("/login")
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
