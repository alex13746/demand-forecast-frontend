"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine,
  Line,
  ComposedChart,
} from "recharts"

const data = [
  { date: "01.05", historical: 42, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "03.05", historical: 45, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "05.05", historical: 48, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "07.05", historical: 52, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "09.05", historical: 68, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "11.05", historical: 72, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "13.05", historical: 65, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "15.05", historical: 58, forecast: null, forecastLower: null, forecastUpper: null },
  { date: "17.05", historical: null, forecast: 55, forecastLower: 50, forecastUpper: 60 },
  { date: "19.05", historical: null, forecast: 58, forecastLower: 52, forecastUpper: 64 },
  { date: "21.05", historical: null, forecast: 62, forecastLower: 55, forecastUpper: 69 },
  { date: "23.05", historical: null, forecast: 68, forecastLower: 60, forecastUpper: 76, event: "Начало поста" },
  { date: "25.05", historical: null, forecast: 75, forecastLower: 66, forecastUpper: 84 },
  { date: "27.05", historical: null, forecast: 78, forecastLower: 69, forecastUpper: 87 },
  { date: "29.05", historical: null, forecast: 82, forecastLower: 72, forecastUpper: 92 },
  { date: "31.05", historical: null, forecast: 85, forecastLower: 75, forecastUpper: 95 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = data.find((d) => d.date === label)
    const isHistorical = dataPoint?.historical !== null

    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {isHistorical ? (
          <p className="text-sm font-semibold text-foreground">Продажи: {dataPoint?.historical} шт/день</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-accent">Прогноз: {dataPoint?.forecast} шт/день</p>
            <p className="text-xs text-muted-foreground mt-1">
              Диапазон: {dataPoint?.forecastLower}–{dataPoint?.forecastUpper} шт
            </p>
          </>
        )}
        {dataPoint?.event && <p className="text-xs text-violet-600 mt-1 font-medium">🔔 {dataPoint.event}</p>}
      </div>
    )
  }
  return null
}

export function ProductForecastChart() {
  const eventIndex = data.findIndex((d) => d.event)

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">Прогноз спроса на 30 дней</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">История продаж и AI-прогноз с доверительным интервалом</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="confidenceInterval" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              label={{
                value: "шт/день",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconType="line"
              formatter={(value) => {
                if (value === "historical") return "Исторические продажи"
                if (value === "forecast") return "Прогноз AI"
                if (value === "forecastUpper") return "Доверительный интервал"
                return value
              }}
            />

            {/* Event marker for holidays */}
            {eventIndex >= 0 && (
              <ReferenceLine
                x={data[eventIndex].date}
                stroke="hsl(var(--chart-5))"
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{
                  value: "Начало поста",
                  position: "top",
                  fill: "hsl(var(--chart-5))",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            )}

            {/* Confidence interval area */}
            <Area
              type="monotone"
              dataKey="forecastUpper"
              stroke="none"
              fill="url(#confidenceInterval)"
              name="forecastUpper"
            />
            <Area type="monotone" dataKey="forecastLower" stroke="none" fill="hsl(var(--background))" />

            {/* Historical sales - solid line */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              name="historical"
            />

            {/* Forecast - dashed line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
              name="forecast"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
