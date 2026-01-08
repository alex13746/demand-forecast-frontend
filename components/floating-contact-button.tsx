"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-all hover:scale-110 hover:bg-blue-700 lg:h-16 lg:w-16"
        aria-label="Связаться с нами"
      >
        {isOpen ? <X className="h-6 w-6 lg:h-7 lg:w-7" /> : <MessageCircle className="h-6 w-6 lg:h-7 lg:w-7" />}
      </button>

      {/* Contact options popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-72 rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <h3 className="text-lg font-semibold text-white">Свяжитесь с нами</h3>
            <p className="text-sm text-blue-100 mt-1">Выберите удобный способ</p>
          </div>

          <div className="p-2 space-y-2">
            <a
              href="https://t.me/demandai_support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Telegram</div>
                <div className="text-sm text-gray-500">Быстрый ответ</div>
              </div>
            </a>

            <a
              href="https://wa.me/79001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">WhatsApp</div>
                <div className="text-sm text-gray-500">Звонок или чат</div>
              </div>
            </a>

            <a
              href="https://vk.com/demandai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 12.3c.36.43.74.85 1.04 1.33.13.21.26.43.35.67.13.35.01.73-.28.75l-2.5.01c-.48.04-.87-.15-1.18-.49-.24-.26-.46-.53-.69-.8-.09-.11-.19-.21-.3-.29-.24-.18-.46-.13-.6.11-.14.24-.17.51-.19.78-.02.41-.16.52-.57.54-.87.03-1.7-.08-2.49-.46-.69-.33-1.23-.83-1.71-1.43-.93-1.16-1.64-2.45-2.26-3.8-.13-.28-.04-.43.25-.43l2.5-.01c.21 0 .35.11.43.31.24.58.54 1.13.92 1.64.1.13.2.27.33.37.15.11.27.08.35-.09.05-.11.08-.23.1-.35.05-.39.06-.78.03-1.17-.02-.25-.15-.42-.4-.47-.13-.03-.11-.08-.05-.16.11-.15.21-.25.41-.25h2.32c.2.04.24.13.27.33v2.53c-.01.06.03.25.14.29.09.03.15-.04.2-.11.24-.32.42-.68.59-1.04.29-.63.54-1.3.76-1.97.08-.24.21-.36.47-.35l2.68.01c.08 0 .16 0 .23.02.28.06.36.21.27.48-.14.42-.4.78-.66 1.13-.28.38-.58.75-.86 1.13-.25.34-.23.52.06.82z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">ВКонтакте</div>
                <div className="text-sm text-gray-500">Сообщество</div>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
