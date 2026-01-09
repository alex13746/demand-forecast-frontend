export const API_BASE_URL = "https://demand-forecast-backend-xonj.onrender.com"
const isBrowser = typeof window !== "undefined"

// TypeScript interfaces for API responses
export interface ForecastDataPoint {
  date: string
  forecast: number
  actual?: number
}

export interface Recommendation {
  product_id: string | number
  name: string
  sku?: string
  current_stock: number
  days_left: number
  suggested_qty: number
  cost: number
}

export interface DashboardData {
  risk_of_stockout: string
  overstock_value: string
  forecast_accuracy: string
  urgent_reorders: number
  forecast_data: ForecastDataPoint[]
  recommendations: Recommendation[]
}

export interface StockInfo {
  will_end_at: string
  safety_stock_days: number
  lead_time_days: number
  suggested_order: number
}

export interface ProductDetail {
  product_id: string | number
  product_name: string
  sku: string
  current_stock: number
  unit_price: number
  forecast_30_days: Array<{
    date: string
    yhat: number
    yhat_lower: number
    yhat_upper: number
  }>
  factors: string[]
  accuracy: string
  stock_info: StockInfo
}

export interface Product {
  product_id: string | number
  name: string
  sku: string
  category?: string
  stock: number
  forecast_7_days?: number
  abc_group?: "A" | "B" | "C"
  data_quality?: number
}

export const auth = {
  getToken(): string | null {
    if (!isBrowser) return null
    return localStorage.getItem("token")
  },

  setToken(token: string): void {
    if (!isBrowser) return
    localStorage.setItem("token", token)
  },

  removeToken(): void {
    if (!isBrowser) return
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("store_name")
  },

  getUser(): { username: string; storeName: string } | null {
    if (!isBrowser) return null
    const username = localStorage.getItem("username")
    const storeName = localStorage.getItem("store_name")
    if (!username || !storeName) return null
    return { username, storeName }
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}

// API client object
export const api = {
  async register(username: string, email: string, password: string, storeName: string) {
    try {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("store_name", storeName)

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Registration failed")
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Registration error:", error)
      throw error
    }
  },

  async login(username: string, password: string) {
    try {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Login failed")
      }

      const data = await response.json()

      // Сохраняем токен и данные пользователя
      if (data.access_token) {
        auth.setToken(data.access_token)
      }
      if (isBrowser) {
        localStorage.setItem("username", username)
        if (data.store_name) {
          localStorage.setItem("store_name", data.store_name)
        }
      }

      return data
    } catch (error) {
      console.error("[API] Login error:", error)
      throw error
    }
  },

  logout(): void {
    auth.removeToken()
  },

  async uploadSales(file: File, separator: string, username: string) {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("separator", separator)
      formData.append("username", username)

      const response = await fetch(`${API_BASE_URL}/upload-sales`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "File upload failed")
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Upload sales error:", error)
      throw error
    }
  },

  async getDashboard(username: string): Promise<DashboardData> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Failed to fetch dashboard data")
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Get dashboard error:", error)
      throw error
    }
  },

  async getProducts(username: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Failed to fetch products")
      }

      const data = await response.json()
      return data.products || []
    } catch (error) {
      console.error("[API] Get products error:", error)
      throw error
    }
  },

  async getProduct(productId: string | number, username: string): Promise<ProductDetail> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${productId}?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Failed to fetch product details")
      }

      return await response.json()
    } catch (error) {
      console.error("[API] Get product error:", error)
      throw error
    }
  },

  async exportExcel(username: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/export-excel?username=${encodeURIComponent(username)}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to export Excel file")
      }

      const blob = await response.blob()
      if (!isBrowser) return

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `forecast_${new Date().toISOString()}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[API] Export Excel error:", error)
      throw error
    }
  },
}
