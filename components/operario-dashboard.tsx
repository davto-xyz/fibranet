"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, LogOut, Play, Square, Camera } from "lucide-react"
import type { User, Task } from "@/types"
import TaskMap from "@/components/task-map"
import IncidentForm from "@/components/incident-form"
import TaskHistory from "@/components/task-history"

interface OperarioDashboardProps {
  user: User
  onLogout: () => void
}

export default function OperarioDashboard({ user, onLogout }: OperarioDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState("tasks")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showIncidentForm, setShowIncidentForm] = useState(false)

  useEffect(() => {
    // Load mock tasks for operario
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Instalación Residencial",
        address: "Calle Mayor 123, Madrid",
        status: "pending",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.4168, lng: -3.7038 },
        startTime: null,
        endTime: null,
        incidents: [],
      },
      {
        id: "2",
        title: "Reparación de Fibra",
        address: "Avenida de la Paz 45, Madrid",
        status: "in-progress",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.42, lng: -3.71 },
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        endTime: null,
        incidents: [],
      },
      {
        id: "3",
        title: "Mantenimiento Preventivo",
        address: "Plaza España 10, Madrid",
        status: "pending",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.424, lng: -3.712 },
        startTime: null,
        endTime: null,
        incidents: [],
      },
    ]

    const savedTasks = localStorage.getItem("fibertech-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(mockTasks)
      localStorage.setItem("fibertech-tasks", JSON.stringify(mockTasks))
    }
  }, [user.id])

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    setTasks(updatedTasks)
    localStorage.setItem("fibertech-tasks", JSON.stringify(updatedTasks))
  }

  const startTask = (task: Task) => {
    const updatedTask = {
      ...task,
      status: "in-progress" as const,
      startTime: new Date().toISOString(),
    }
    updateTask(updatedTask)
  }

  const finishTask = (task: Task) => {
    const updatedTask = {
      ...task,
      status: "completed" as const,
      endTime: new Date().toISOString(),
    }
    updateTask(updatedTask)
    setSelectedTask(updatedTask)
    setShowIncidentForm(true)
  }

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

  const todayTasks = tasks.filter(
    (task) => task.assignedTo === user.id && task.scheduledDate === new Date().toISOString().split("T")[0],
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Bienvenido, {user.name}</h1>
              <p className="text-sm text-gray-500">Operario • {new Date().toLocaleDateString("es-ES")}</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tareas de Hoy</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {todayTasks.map((task) => (
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
                      <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.startTime ? (
                          <span>Iniciada: {new Date(task.startTime).toLocaleTimeString("es-ES")}</span>
                        ) : (
                          <span>No iniciada</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {task.status === "pending" && (
                          <Button onClick={() => startTask(task)} size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Iniciar
                          </Button>
                        )}
                        {task.status === "in-progress" && (
                          <Button onClick={() => finishTask(task)} size="sm" variant="outline">
                            <Square className="w-4 h-4 mr-1" />
                            Finalizar
                          </Button>
                        )}
                        {task.status === "completed" && (
                          <Button
                            onClick={() => {
                              setSelectedTask(task)
                              setShowIncidentForm(true)
                            }}
                            size="sm"
                            variant="outline"
                          >
                            <Camera className="w-4 h-4 mr-1" />
                            Ver Incidencias
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <TaskMap tasks={todayTasks} />
          </TabsContent>

          <TabsContent value="history">
            <TaskHistory tasks={tasks.filter((task) => task.assignedTo === user.id)} />
          </TabsContent>
        </Tabs>
      </div>

      {showIncidentForm && selectedTask && (
        <IncidentForm
          task={selectedTask}
          onClose={() => {
            setShowIncidentForm(false)
            setSelectedTask(null)
          }}
          onSave={(updatedTask) => {
            updateTask(updatedTask)
            setShowIncidentForm(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}
