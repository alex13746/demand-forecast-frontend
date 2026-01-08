"use client"

import { useState } from "react"
import { Upload, FileSpreadsheet } from "lucide-react"
import { cn } from "@/lib/utils"

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Загрузка файла</h2>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
        )}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
              isDragging ? "bg-primary/10" : "bg-muted",
            )}
          >
            <Upload
              className={cn("w-8 h-8 transition-colors", isDragging ? "text-primary" : "text-muted-foreground")}
            />
          </div>

          <div className="space-y-2">
            <p className="text-base font-medium text-foreground">Перетащите сюда выгрузку из 1С или Excel</p>
            <p className="text-sm text-muted-foreground">Поддерживаются форматы .csv, .xlsx, .xml</p>
          </div>

          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Выбрать файл
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <FileSpreadsheet className="w-4 h-4" />
        <span>Максимальный размер файла: 50 МБ</span>
      </div>
    </div>
  )
}
