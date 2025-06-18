"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, LogOut, Play, CheckCircle2, Phone, Navigation, Home, History } from "lucide-react"
import type { User, Task } from "@/types"
import TaskMap from "@/components/task-map"
import IncidentForm from "@/components/incident-form"
import TaskHistory from "@/components/task-history"
import TaskDetail from "@/components/task-detail"

interface OperarioDashboardProps {
  user: User
  onLogout: () => void
}

export default function OperarioDashboard({ user, onLogout }: OperarioDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState("home")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showIncidentForm, setShowIncidentForm] = useState(false)
  const [showTaskDetail, setShowTaskDetail] = useState(false)

  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Instalación - Residencial",
        address: "Calle Mayor 123, Madrid",
        status: "pending",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.4168, lng: -3.7038 },
        startTime: null,
        endTime: null,
        incidents: [],
        customerName: "Juan García",
        customerPhone: "+34 666 123 456",
        estimatedTime: "2h",
        priority: "high",
      },
      {
        id: "2",
        title: "Reparación - Residencial",
        address: "Avenida de la Paz 45, Madrid",
        status: "in-progress",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.42, lng: -3.71 },
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        endTime: null,
        incidents: [],
        customerName: "Ana Martín",
        customerPhone: "+34 666 789 012",
        estimatedTime: "1h 30m",
        priority: "medium",
      },
      {
        id: "3",
        title: "Mantenimiento - Residencial",
        address: "Plaza España 10, Madrid",
        status: "completed",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.424, lng: -3.712 },
        startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        incidents: [],
        customerName: "Luis Rodríguez",
        customerPhone: "+34 666 345 678",
        estimatedTime: "45m",
        priority: "low",
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Pantalla Principal - Dashboard */}
        <TabsContent value="home" className="m-0">
          <div className="bg-white">
            {/* Header exacto del diseño */}
            <div className="px-4 py-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Bienvenido, {user.name}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-500">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tarjetas de estadísticas exactas */}
            <div className="px-4 py-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="text-center py-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
                    <div className="text-xs text-gray-600 mt-1">Pendientes</div>
                  </CardContent>
                </Card>
                <Card className="text-center py-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
                    <div className="text-xs text-gray-600 mt-1">En curso</div>
                  </CardContent>
                </Card>
                <Card className="text-center py-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
                    <div className="text-xs text-gray-600 mt-1">Completadas</div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de tareas exacta */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tareas de hoy ({todayTasks.length})</h2>
                {todayTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      {/* Indicador de estado */}
                      <div
                        className={`h-1 ${
                          task.status === "pending"
                            ? "bg-orange-500"
                            : task.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-green-500"
                        }`}
                      ></div>

                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                            <p className="text-xs text-gray-600 flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {task.address}
                            </p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === "pending"
                                ? "bg-orange-100 text-orange-800"
                                : task.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.status === "pending"
                              ? "Pendiente"
                              : task.status === "in-progress"
                                ? "En curso"
                                : "Completada"}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {task.estimatedTime}
                          </span>
                          <span>{task.customerName}</span>
                        </div>

                        {/* Botones de acción exactos */}
                        <div className="flex gap-2">
                          {task.status === "pending" && (
                            <>
                              <Button
                                onClick={() => startTask(task)}
                                size="sm"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 h-8 text-xs"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Iniciar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3"
                                onClick={() => {
                                  setSelectedTask(task)
                                  setShowTaskDetail(true)
                                }}
                              >
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-3">
                                <Navigation className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          {task.status === "in-progress" && (
                            <>
                              <Button
                                onClick={() => finishTask(task)}
                                size="sm"
                                variant="outline"
                                className="flex-1 h-8 text-xs"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Finalizar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3"
                                onClick={() => {
                                  setSelectedTask(task)
                                  setShowTaskDetail(true)
                                }}
                              >
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
                              className="flex-1 h-8 text-xs"
                            >
                              Ver detalles
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Pantalla de Mapa */}
        <TabsContent value="map" className="m-0">
          <TaskMap tasks={todayTasks} />
        </TabsContent>

        {/* Pantalla de Historial */}
        <TabsContent value="history" className="m-0">
          <TaskHistory tasks={tasks.filter((task) => task.assignedTo === user.id)} />
        </TabsContent>

        {/* Navegación inferior exacta */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent rounded-none">
            <TabsTrigger
              value="home"
              className="flex flex-col gap-1 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-400"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Inicio</span>
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="flex flex-col gap-1 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-400"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-xs">Mapa</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex flex-col gap-1 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-400"
            >
              <History className="w-5 h-5" />
              <span className="text-xs">Historial</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Modales */}
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

      {showTaskDetail && selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => {
            setShowTaskDetail(false)
            setSelectedTask(null)
          }}
          onStartTask={() => {
            startTask(selectedTask)
            setShowTaskDetail(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}
