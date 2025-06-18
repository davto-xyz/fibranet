"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import type { Task } from "@/types"

interface TaskMapProps {
  tasks: Task[]
}

export default function TaskMap({ tasks }: TaskMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Instalaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simulated Map */}
          <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Simulated map markers */}
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${40 + index * 10}%`,
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${getStatusColor(task.status)} border-2 border-white shadow-lg flex items-center justify-center`}
                  >
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
              <p className="text-xs text-gray-600">
                Mapa simulado - En producción se integraría con Google Maps o similar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List for Map */}
      <div className="grid gap-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="border-l-4"
            style={{ borderLeftColor: getStatusColor(task.status).replace("bg-", "#") }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {task.address}
                  </p>
                  {task.assignedToName && (
                    <p className="text-xs text-gray-500 mt-1">Asignado a: {task.assignedToName}</p>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(task.status).replace("bg-", "text-")} border-current`}
                >
                  {getStatusText(task.status)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
