"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Clock, User, AlertTriangle } from "lucide-react"
import type { Task } from "@/types"

interface TaskDetailModalProps {
  task: Task
  onClose: () => void
}

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "in-progress":
        return "En curso"
      case "completed":
        return "Completada"
      default:
        return status
    }
  }

  const calculateDuration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "N/A"
    const start = new Date(startTime)
    const end = new Date(endTime)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${diffHours}h ${diffMinutes}m`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{task.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {task.address}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Task Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center">
                <User className="w-4 h-4 mr-2" />
                Información del Técnico
              </h3>
              <p className="text-sm text-gray-600">Asignado a: {task.assignedToName || "Sin asignar"}</p>
              <p className="text-sm text-gray-600">
                Fecha programada: {new Date(task.scheduledDate).toLocaleDateString("es-ES")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Tiempos de Ejecución
              </h3>
              {task.startTime ? (
                <p className="text-sm text-gray-600">Inicio: {new Date(task.startTime).toLocaleString("es-ES")}</p>
              ) : (
                <p className="text-sm text-gray-500">No iniciada</p>
              )}

              {task.endTime ? (
                <p className="text-sm text-gray-600">Fin: {new Date(task.endTime).toLocaleString("es-ES")}</p>
              ) : (
                <p className="text-sm text-gray-500">No finalizada</p>
              )}

              {task.startTime && task.endTime && (
                <p className="text-sm font-medium text-blue-600">
                  Duración total: {calculateDuration(task.startTime, task.endTime)}
                </p>
              )}
            </div>
          </div>

          {/* Incidents */}
          {task.incidents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Incidencias Reportadas ({task.incidents.length})
              </h3>

              {task.incidents.map((incident) => (
                <div key={incident.id} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-orange-800">Incidencia #{incident.id}</p>
                    <p className="text-xs text-orange-600">{new Date(incident.timestamp).toLocaleString("es-ES")}</p>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{incident.description}</p>

                  {incident.images.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Imágenes adjuntas ({incident.images.length}):</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {incident.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Incidencia ${index + 1}`}
                            className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                            onClick={() => window.open(image, "_blank")}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {task.incidents.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No se han reportado incidencias para esta tarea.</p>
            </div>
          )}

          {/* Location */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Ubicación
            </h3>
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <p className="text-sm text-gray-600">Mapa simulado - {task.address}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
