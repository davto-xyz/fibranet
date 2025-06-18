"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X, Camera, Upload } from "lucide-react"
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

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Reporte de Incidencias</CardTitle>
              <CardDescription>{task.title}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Descripción de la incidencia</Label>
            <Textarea
              id="description"
              placeholder="Describe cualquier problema o observación durante la instalación..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="images">Imágenes (opcional)</Label>
            <div className="mt-2">
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("images")?.click()}
                className="w-full"
              >
                <Camera className="w-4 h-4 mr-2" />
                Subir Imágenes
              </Button>
            </div>
          </div>

          {images.length > 0 && (
            <div className="space-y-2">
              <Label>Imágenes seleccionadas:</Label>
              <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Incidencia ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show existing incidents */}
          {task.incidents.length > 0 && (
            <div className="space-y-2">
              <Label>Incidencias anteriores:</Label>
              {task.incidents.map((incident) => (
                <div key={incident.id} className="p-3 bg-gray-50 rounded border">
                  <p className="text-sm">{incident.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(incident.timestamp).toLocaleString("es-ES")}</p>
                  {incident.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      {incident.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Incidencia ${index + 1}`}
                          className="w-full h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {description.trim() ? "Cancelar" : "Cerrar"}
            </Button>
            {description.trim() && (
              <Button onClick={handleSave} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
