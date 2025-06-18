"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import type { Task } from "@/types"

interface TaskHistoryProps {
  tasks: Task[]
}

export default function TaskHistory({ tasks }: TaskHistoryProps) {
  const completedTasks = tasks
    .filter((task) => task.status === "completed")
    .sort((a, b) => new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime())

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor centrado para desktop */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="p-0 mr-3">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Historial</h1>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-4 py-6">
          {/* Estadísticas del historial */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="text-center py-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-blue-600">{completedTasks.length}</div>
                <div className="text-xs text-gray-600 mt-1">Tareas completadas</div>
              </CardContent>
            </Card>
            <Card className="text-center py-4">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-green-600">
                  {completedTasks.filter((t) => t.incidents.length === 0).length}
                </div>
                <div className="text-xs text-gray-600 mt-1">Sin incidencias</div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de tareas completadas */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tareas completadas</h2>

            {completedTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No hay tareas completadas aún</p>
              </div>
            ) : (
              completedTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-1 bg-green-500"></div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                          <p className="text-xs text-gray-600 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {task.address}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">{formatDate(task.scheduledDate)}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.estimatedTime}
                        </span>
                        <span>{task.customerName}</span>
                      </div>

                      {task.incidents.length > 0 && (
                        <div className="flex items-center text-xs text-orange-600 mt-2">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          <span>{task.incidents.length} incidencia(s) reportada(s)</span>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            Completada el {task.endTime ? new Date(task.endTime).toLocaleDateString("es-ES") : "N/A"}
                          </span>
                          <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
