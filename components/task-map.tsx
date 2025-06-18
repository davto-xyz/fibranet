"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone } from "lucide-react"
import type { Task } from "@/types"

interface TaskMapProps {
  tasks: Task[]
}

export default function TaskMap({ tasks }: TaskMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500"
      case "in-progress":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 to-green-100">
        {/* Simulated map markers */}
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${30 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
          >
            <div
              className={`w-8 h-8 rounded-full ${getStatusColor(task.status)} border-3 border-white shadow-lg flex items-center justify-center`}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}

        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow text-xs text-gray-600">Mapa simulado</div>
      </div>

      {/* Task List */}
      <div className="bg-white max-h-80 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Próximas paradas</h3>
          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-1 ${getStatusColor(task.status)}`}></div>
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {task.address}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(task.priority || "medium")} variant="secondary">
                        {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navegar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
