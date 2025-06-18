"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem("pwa-install-dismissed", "true")
  }

  // Don't show if already dismissed or if running in standalone mode
  if (
    !showInstallPrompt ||
    localStorage.getItem("pwa-install-dismissed") === "true" ||
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Instalar FiberTech</h3>
          <p className="text-xs opacity-90">Instala la app para una mejor experiencia</p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            onClick={handleInstall}
            size="sm"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Download className="w-4 h-4 mr-1" />
            Instalar
          </Button>
          <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-white hover:bg-blue-700">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
