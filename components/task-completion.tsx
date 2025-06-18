"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, ImageIcon, Plus, Send } from "lucide-react"
import type { Task } from "@/types"

interface TaskCompletionProps {
  task: Task
  onClose: () => void
  onComplete: (task: Task) => void
}

export default function TaskCompletion({ task, onClose, onComplete }: TaskCompletionProps) {
  const [hasIncident, setHasIncident] = useState(false)
  const [incidentDescription, setIncidentDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [signature, setSignature] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleComplete = () => {
    const completedTask = {
      ...task,
      status: "completed" as const,
      endTime: new Date().toISOString(),
    }

    if (hasIncident && incidentDescription.trim()) {
      const newIncident = {
        id: Date.now().toString(),
        description: incidentDescription.trim(),
        images,
        timestamp: new Date().toISOString(),
      }
      completedTask.incidents = [...task.incidents, newIncident]
    }

    onComplete(completedTask)
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50">
      {/* Contenedor centrado para desktop */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header azul */}
        <div className="bg-blue-600 text-white">
          <div className="px-4 py-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white p-0 mr-4 hover:bg-blue-700">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-medium">Finalizar tarea</h1>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="px-4 py-6 space-y-6 bg-gray-100">
          <Card>
            <CardContent className="p-6">
              {/* Título */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Instalación completada</h2>

              {/* Tiempos */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hora de inicio</p>
                    <p className="text-base font-medium text-gray-900">9:15 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hora de fin</p>
                    <p className="text-base font-medium text-gray-900">10:42 AM</p>
                  </div>
                </div>
              </div>

              {/* Pregunta sobre incidencias */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Hubo alguna incidencia?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={!hasIncident ? "default" : "outline"}
                    onClick={() => setHasIncident(false)}
                    className={`h-12 text-base font-medium ${
                      !hasIncident
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    No
                  </Button>
                  <Button
                    variant={hasIncident ? "default" : "outline"}
                    onClick={() => setHasIncident(true)}
                    className={`h-12 text-base font-medium ${
                      hasIncident
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Sí
                  </Button>
                </div>
              </div>

              {/* Descripción de incidencia */}
              {hasIncident && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Describe la incidencia</h3>
                  <Textarea
                    placeholder="Escribe los detalles de la incidencia..."
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                    rows={4}
                    className="w-full text-base"
                  />
                </div>
              )}

              {/* Añadir imágenes */}
              {hasIncident && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Añadir imágenes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {images.length > 0 && (
                      <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <img
                          src={images[0] || "/placeholder.svg"}
                          alt="Imagen de incidencia"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {images.length === 0 && (
                      <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        className="w-full h-full"
                      >
                        <Plus className="w-8 h-8 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Firma del cliente */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Firma del cliente</h3>
                <div className="aspect-[3/2] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-500 text-center">Toca para que el cliente firme</p>
                </div>
              </div>

              {/* Botón de envío */}
              <Button
                onClick={handleComplete}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base"
                disabled={hasIncident && !incidentDescription.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar parte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
