"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, AlertTriangle, Eye } from "lucide-react"
import type { Task } from "@/types"
import { useState } from "react"
import TaskDetailModal from "@/components/task-detail-modal"

interface TaskHistoryProps {
  tasks: Task[]
}

export default function TaskHistory({ tasks }: TaskHistoryProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)

  const completedTasks = tasks
    .filter((task) => task.status === "completed")
    .sort((a, b) => new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime())

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

  const calculateDuration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "N/A"
    const start = new Date(startTime)
    const end = new Date(endTime)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${diffHours}h ${diffMinutes}m`
  }

  if (completedTasks.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No hay tareas completadas aún.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Historial de Tareas Completadas</h2>
        <Badge variant="outline">{completedTasks.length} tareas</Badge>
      </div>

      <div className="grid gap-4">
        {completedTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {task.address}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(task.status)}>Completada</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Fecha: {new Date(task.scheduledDate).toLocaleDateString("es-ES")}</span>
                </div>

                {task.startTime && task.endTime && (
                  <div className="text-sm text-gray-600">
                    <p>Inicio: {new Date(task.startTime).toLocaleTimeString("es-ES")}</p>
                    <p>Fin: {new Date(task.endTime).toLocaleTimeString("es-ES")}</p>
                    <p>Duración: {calculateDuration(task.startTime, task.endTime)}</p>
                  </div>
                )}

                {task.incidents.length > 0 && (
                  <div className="flex items-center text-sm text-orange-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>{task.incidents.length} incidencia(s) reportada(s)</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => {
                      setSelectedTask(task)
                      setShowTaskDetail(true)
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showTaskDetail && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => {
            setShowTaskDetail(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}
