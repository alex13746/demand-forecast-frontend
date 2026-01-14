"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface PreviewRow {
  [key: string]: string
}

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [preview, setPreview] = useState<PreviewRow[]>([])
  const [initializing, setInitializing] = useState(true)
  const [username, setUsername] = useState<string>("testuser")

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Пытаемся войти с тестовым пользователем
        await api.login("testuser", "testpassword123")
        console.log("[v0] Test user logged in successfully")
      } catch (loginError) {
        console.log("[v0] Test user login failed, attempting registration...")

        try {
          // Если вход не удался, пробуем зарегистрировать
          await api.register("testuser", "test@example.com", "testpassword123", "Test Store")
          console.log("[v0] Test user registered successfully")

          // После регистрации входим
          await api.login("testuser", "testpassword123")
          console.log("[v0] Test user logged in after registration")
        } catch (registerError) {
          console.log("[v0] Test user already exists or registration failed, continuing...")
          // Пользователь уже существует или не удалось зарегистрировать - продолжаем работу
        }
      } finally {
        setInitializing(false)
      }
    }

    initializeUser()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] File input changed", e.target.files)

    const selectedFile = e.target.files?.[0]
    if (!selectedFile) {
      console.log("[v0] No file selected")
      return
    }

    console.log("[v0] File selected:", selectedFile.name, selectedFile.size, selectedFile.type)

    // Проверка что это CSV файл
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Пожалуйста, загрузите файл формата CSV")
      setFile(null)
      setPreview([])
      return
    }

    setFile(selectedFile)
    setError(null)

    // Чтение и парсинг первых 5 строк для превью
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())

      console.log("[v0] File parsed, lines:", lines.length)

      if (lines.length < 2) {
        setError("Файл должен содержать заголовки и хотя бы одну строку данных")
        return
      }

      const headers = lines[0].split(",").map((h) => h.trim())
      const previewData: PreviewRow[] = []

      // Парсим первые 5 строк (или меньше, если строк меньше)
      for (let i = 1; i < Math.min(6, lines.length); i++) {
        const values = lines[i].split(",").map((v) => v.trim())
        const row: PreviewRow = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })
        previewData.push(row)
      }

      setPreview(previewData)
      console.log("[v0] Preview data set:", previewData.length, "rows")
    }

    reader.onerror = () => {
      console.error("[v0] File reading error")
      setError("Ошибка при чтении файла")
    }

    reader.readAsText(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      console.log("[v0] Uploading file:", file.name)

      await api.uploadSales(file, ",", username)

      console.log("[v0] Upload successful")

      setSuccess(true)

      // Редирект через 2 секунды
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      console.error("[v0] Upload error:", err)
      setError(err.message || "Произошла ошибка при загрузке файла")
    } finally {
      setUploading(false)
    }
  }

  const handleSelectFile = () => {
    console.log("[v0] Select file button clicked")
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      console.log("[v0] Triggering file input click")
      fileInput.click()
    } else {
      console.error("[v0] File input not found")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    console.log("[v0] File dropped")
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const fakeEvent = {
        target: { files: [droppedFile] },
      } as React.ChangeEvent<HTMLInputElement>
      handleFileChange(fakeEvent)
    }
  }

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Инициализация системы...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Загрузка истории продаж</CardTitle>
          <CardDescription>Загрузите CSV файл с данными о продажах для построения прогноза</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Инструкция */}
          <Alert>
            <FileSpreadsheet className="h-4 w-4" />
            <AlertDescription>
              <strong>Требуемый формат:</strong> CSV файл должен содержать колонки: <code>date</code>,{" "}
              <code>product_id</code>, <code>quantity_sold</code>
            </AlertDescription>
          </Alert>

          {/* Пример формата */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Пример формата CSV:</p>
            <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
              {`date,product_id,quantity_sold
2024-01-01,SKU001,150
2024-01-02,SKU001,165
2024-01-03,SKU002,89`}
            </pre>
          </div>

          {/* Drag & Drop зона */}
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-foreground mb-4">
              {file ? (
                <span className="flex items-center justify-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                  {file.name}
                </span>
              ) : (
                "Перетащите CSV файл сюда"
              )}
            </p>

            <Button type="button" variant="outline" onClick={handleSelectFile} className="mx-auto bg-transparent">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Выбрать файл
            </Button>

            <input
              id="file-input"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Выбрать CSV файл"
            />
          </div>

          {/* Preview таблица */}
          {preview.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b">
                <p className="text-sm font-medium">Предпросмотр данных (первые 5 строк)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {Object.keys(preview[0]).map((header) => (
                        <th key={header} className="px-4 py-2 text-left font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index} className="border-t">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Сообщения об успехе */}
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Данные успешно загружены! Переход к прогнозам...
              </AlertDescription>
            </Alert>
          )}

          {/* Сообщения об ошибке */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Кнопка загрузки */}
          <Button onClick={handleUpload} disabled={!file || uploading || success} className="w-full" size="lg">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка данных...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Загрузить данные
              </>
            )}
          </Button>

          {/* Ссылка на дашборд */}
          <p className="text-center text-sm text-muted-foreground">
            Уже загрузили данные?{" "}
            <a href="/dashboard" className="text-primary hover:underline">
              Перейти к прогнозам
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
