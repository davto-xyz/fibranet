"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, LogOut, Play, Camera, Phone, Navigation, CheckCircle2 } from "lucide-react"
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
  const [activeTab, setActiveTab] = useState("home")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showIncidentForm, setShowIncidentForm] = useState(false)

  useEffect(() => {
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
        priority: "high",
        estimatedDuration: "2h",
        customerName: "Carlos Ruiz",
        customerPhone: "+34 666 123 456",
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
        priority: "medium",
        estimatedDuration: "1h 30m",
        customerName: "Ana García",
        customerPhone: "+34 666 789 012",
      },
      {
        id: "3",
        title: "Mantenimiento Preventivo",
        address: "Plaza España 10, Madrid",
        status: "completed",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.424, lng: -3.712 },
        startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        incidents: [],
        priority: "low",
        estimatedDuration: "45m",
        customerName: "Luis Martín",
        customerPhone: "+34 666 345 678",
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

  const todayTasks = tasks.filter(
    (task) => task.assignedTo === user.id && task.scheduledDate === new Date().toISOString().split("T")[0],
  )

  const stats = {
    pending: todayTasks.filter((t) => t.status === "pending").length,
    inProgress: todayTasks.filter((t) => t.status === "in-progress").length,
    completed: todayTasks.filter((t) => t.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Bienvenido, {user.name}</h1>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="px-4 py-4 space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                  <div className="text-xs text-orange-700">Pendientes</div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                  <div className="text-xs text-blue-700">En curso</div>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-xs text-green-700">Completadas</div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Tareas de hoy</h2>
              {todayTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-1 ${getStatusColor(task.status)}`}></div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {task.address}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(task.priority || "medium")} variant="secondary">
                          {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.estimatedDuration}
                        </span>
                        <span>{task.customerName}</span>
                      </div>

                      <div className="flex gap-2">
                        {task.status === "pending" && (
                          <>
                            <Button
                              onClick={() => startTask(task)}
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Iniciar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {task.status === "in-progress" && (
                          <>
                            <Button onClick={() => finishTask(task)} size="sm" variant="outline" className="flex-1">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Finalizar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {task.status === "completed" && (
                          <Button
                            onClick={() => {
                              setSelectedTask(task)
                              setShowIncidentForm(true)
                            }}
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Camera className="w-3 h-3 mr-1" />
                            Ver Detalles
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="p-0">
            <TaskMap tasks={todayTasks} />
          </TabsContent>

          <TabsContent value="history" className="px-4 py-4">
            <TaskHistory tasks={tasks.filter((task) => task.assignedTo === user.id)} />
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent">
              <TabsTrigger
                value="home"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <div className="w-5 h-5 rounded bg-current opacity-20"></div>
                <span className="text-xs">Inicio</span>
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-xs">Mapa</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex flex-col gap-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <Clock className="w-5 h-5" />
                <span className="text-xs">Historial</span>
              </TabsTrigger>
            </TabsList>
          </div>
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
