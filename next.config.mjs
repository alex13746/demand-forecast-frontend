/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript - игнорировать ошибки при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Оптимизация изображений - отключена для совместимости
  images: {
    unoptimized: true,
  },
  
  // Вывод - standalone для меньшего размера
  output: 'standalone',
  
  // Настройка путей для работы на любом хостинге
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  
  // Отключение telemetry Next.js
  telemetry: {
    disabled: true,
  },
  
  // Компрессия
  compress: true,
  
  // Переменные окружения (доступны в клиенте)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://demand-forecast-backend-xonj.onrender.com',
  },
}

export default nextConfig
