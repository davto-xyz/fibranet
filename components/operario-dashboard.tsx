"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, RefreshCw, User, Info, Navigation, Home, History, Map } from "lucide-react"
import type { User as UserType, Task } from "@/types"
import TaskMap from "@/components/task-map"
import IncidentForm from "@/components/incident-form"
import TaskHistory from "@/components/task-history"
import TaskDetail from "@/components/task-detail"

interface OperarioDashboardProps {
  user: UserType
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
        title: "Instalación nueva - Residencial",
        address: "Calle Roble 45, Edificio Aurora, Apto 302",
        status: "in-progress",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.4168, lng: -3.7038 },
        startTime: new Date().toISOString(),
        endTime: null,
        incidents: [],
        customerName: "María Rodríguez",
        customerPhone: "+34 666 123 456",
        estimatedTime: "2h",
        priority: "high",
      },
      {
        id: "2",
        title: "Reparación - Comercial",
        address: "Av. Comercio 78, Local 12, Centro Empresarial",
        status: "pending",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.42, lng: -3.71 },
        startTime: null,
        endTime: null,
        incidents: [],
        customerName: "Cafetería El Despertar",
        customerPhone: "+34 666 789 012",
        estimatedTime: "1h 30m",
        priority: "medium",
      },
      {
        id: "3",
        title: "Mantenimiento - Residencial",
        address: "Calle Pino 12, Casa 4, Urbanización Los Pinos",
        status: "pending",
        assignedTo: user.id,
        scheduledDate: new Date().toISOString().split("T")[0],
        coordinates: { lat: 40.424, lng: -3.712 },
        startTime: null,
        endTime: null,
        incidents: [],
        customerName: "Juan Pérez",
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

  const getTaskTime = (task: Task) => {
    if (task.status === "in-progress") return "9:00 AM"
    if (task.id === "2") return "11:30 AM"
    if (task.id === "3") return "2:00 PM"
    return "9:00 AM"
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Pantalla Principal - Dashboard */}
        <TabsContent value="home" className="m-0">
          <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white px-4 py-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Bienvenido, {user.name}</h1>
                  <p className="text-gray-500 mt-1">
                    {new Date().toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>

            {/* Ubicación actual */}
            <div className="px-4 pb-4">
              <Card className="bg-gray-100">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tu ubicación actual</p>
                      <p className="font-medium text-gray-900">Av. Principal 123, Ciudad Central</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tareas de hoy */}
            <div className="px-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tareas de hoy ({todayTasks.length})</h2>
                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => setActiveTab("map")}>
                  <Map className="w-4 h-4 mr-1" />
                  Ver en mapa
                </Button>
              </div>

              {/* Lista de tareas */}
              <div className="space-y-4 pb-20">
                {todayTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      {/* Estado y hora */}
                      <div className="flex justify-between items-center mb-3">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.status === "in-progress"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.status === "in-progress" ? "En proceso" : "Pendiente"}
                        </div>
                        <span className="text-gray-500 text-sm">{getTaskTime(task)}</span>
                      </div>

                      {/* Título */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{task.title}</h3>

                      {/* Dirección */}
                      <div className="flex items-start mb-3">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{task.address}</span>
                      </div>

                      {/* Cliente */}
                      <div className="flex items-center mb-4">
                        <User className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{task.customerName}</span>
                      </div>

                      {/* Botones */}
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 p-0 h-auto font-medium"
                          onClick={() => {
                            setSelectedTask(task)
                            setShowTaskDetail(true)
                          }}
                        >
                          <Info className="w-4 h-4 mr-1" />
                          Detalles
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto font-medium">
                          <Navigation className="w-4 h-4 mr-1" />
                          Navegar
                        </Button>
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
          <TaskMap tasks={todayTasks} onBack={() => setActiveTab("home")} />
        </TabsContent>

        {/* Pantalla de Historial */}
        <TabsContent value="history" className="m-0">
          <TaskHistory tasks={tasks.filter((task) => task.assignedTo === user.id)} />
        </TabsContent>

        {/* Navegación inferior */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
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
          onCompleteTask={(completedTask) => {
            updateTask(completedTask)
            setShowTaskDetail(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}
