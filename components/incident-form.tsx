"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Camera, Send } from "lucide-react"
import type { Task, Incident } from "@/types"

interface IncidentFormProps {
  task: Task
  onClose: () => void
  onSave: (task: Task) => void
}

export default function IncidentForm({ task, onClose, onSave }: IncidentFormProps) {
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([])

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

  const handleSave = () => {
    if (description.trim()) {
      const newIncident: Incident = {
        id: Date.now().toString(),
        description: description.trim(),
        images,
        timestamp: new Date().toISOString(),
      }

      const updatedTask = {
        ...task,
        incidents: [...task.incidents, newIncident],
      }

      onSave(updatedTask)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-0 mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Reporte de incidencia</h1>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 py-6">
        {/* Información de la tarea */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.address}</p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe la incidencia</label>
            <Textarea
              placeholder="Describe cualquier problema o observación durante la instalación..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adjuntar fotos (opcional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="mb-2"
              >
                <Camera className="w-4 h-4 mr-2" />
                Subir fotos
              </Button>
              <p className="text-xs text-gray-500">Puedes subir múltiples imágenes</p>
            </div>
          </div>

          {/* Imágenes seleccionadas */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Botón de envío fijo */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
          disabled={!description.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          Enviar reporte
        </Button>
      </div>
    </div>
  )
}
