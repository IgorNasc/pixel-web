"use client"

import { useState } from "react"
import { X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ThemeClasses } from "@/lib/theme"

interface VideoModalProps {
  themeClasses: ThemeClasses
}

export function VideoModal({ themeClasses }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      {/* Video Thumbnail - Clickable */}
      <div
        className={`relative ${themeClasses.bgCard} rounded-lg overflow-hidden border ${themeClasses.borderCard} mb-8 md:mb-12 cursor-pointer group transition-all hover:shadow-lg`}
        onClick={openModal}
      >
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
          {/* Placeholder for actual video thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />

          {/* Video Preview Content */}
          <div className="text-center z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-blue-700 transition-colors shadow-lg">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
            </div>
            <p className={`${themeClasses.textSecondary} mb-3 md:mb-4 text-sm md:text-base font-medium`}>
              Veja como funciona na prática
            </p>
            <Badge
              className={`${themeClasses.bgBlue} text-blue-600 text-xs md:text-sm hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/50 dark:hover:text-blue-400`}
            >
              Demonstração • 3 min
            </Badge>
          </div>

          {/* Overlay hint */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">Clique para assistir</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal Content */}
          <div
            className={`relative ${themeClasses.bgCard} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border ${themeClasses.borderCard}`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${themeClasses.border}`}>
              <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>AdTracker - Demonstração</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg}`}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Video Container */}
            <div className="aspect-video bg-black flex items-center justify-center">
              {/* Placeholder for actual video */}
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <p className="text-lg mb-2">Vídeo de Demonstração</p>
                <p className="text-sm text-gray-300">Aqui será inserido o vídeo real do AdTracker em funcionamento</p>
                <div className="mt-4 text-xs text-gray-400">Formato sugerido: MP4, WebM ou embed do YouTube/Vimeo</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
