"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Users, Clock, CheckCircle, AlertTriangle, LogOut, Eye } from "lucide-react"
import type { User, Task } from "@/types"
import TaskMap from "@/components/task-map"
import TaskDetailModal from "@/components/task-detail-modal"

interface CapatazDashboardProps {
  user: User
  onLogout: () => void
}

export default function CapatazDashboard({ user, onLogout }: CapatazDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)

  useEffect(() => {
    // Load all tasks
    const savedTasks = localStorage.getItem("fibertech-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      // Create mock tasks for all operarios
      const mockTasks: Task[] = [
        {
          id: "1",
          title: "Instalación Residencial",
          address: "Calle Mayor 123, Madrid",
          status: "completed",
          assignedTo: "1",
          assignedToName: "Juan Pérez",
          scheduledDate: new Date().toISOString().split("T")[0],
          coordinates: { lat: 40.4168, lng: -3.7038 },
          startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          incidents: [
            {
              id: "1",
              description: "Cable dañado en la entrada del edificio",
              images: [],
              timestamp: new Date().toISOString(),
            },
          ],
        },
        {
          id: "2",
          title: "Reparación de Fibra",
          address: "Avenida de la Paz 45, Madrid",
          status: "in-progress",
          assignedTo: "1",
          assignedToName: "Juan Pérez",
          scheduledDate: new Date().toISOString().split("T")[0],
          coordinates: { lat: 40.42, lng: -3.71 },
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          endTime: null,
          incidents: [],
        },
        {
          id: "3",
          title: "Instalación Comercial",
          address: "Calle Serrano 88, Madrid",
          status: "pending",
          assignedTo: "3",
          assignedToName: "Carlos Ruiz",
          scheduledDate: new Date().toISOString().split("T")[0],
          coordinates: { lat: 40.424, lng: -3.712 },
          startTime: null,
          endTime: null,
          incidents: [],
        },
      ]
      setTasks(mockTasks)
      localStorage.setItem("fibertech-tasks", JSON.stringify(mockTasks))
    }
  }, [])

  useEffect(() => {
    let filtered = tasks.filter((task) => task.scheduledDate === selectedDate)

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    setFilteredTasks(filtered)
  }, [tasks, selectedDate, statusFilter])

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

  const getTaskStats = () => {
    const todayTasks = tasks.filter((task) => task.scheduledDate === selectedDate)
    return {
      total: todayTasks.length,
      pending: todayTasks.filter((task) => task.status === "pending").length,
      inProgress: todayTasks.filter((task) => task.status === "in-progress").length,
      completed: todayTasks.filter((task) => task.status === "completed").length,
    }
  }

  const stats = getTaskStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor centrado para desktop */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Panel - {user.name}</h1>
                <p className="text-sm text-gray-500">Capataz • {new Date().toLocaleDateString("es-ES")}</p>
              </div>
              <Button variant="outline" onClick={onLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Curso</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Gestión de Tareas</TabsTrigger>
              <TabsTrigger value="map">Mapa General</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in-progress">En curso</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tasks List */}
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.address}</CardDescription>
                          <p className="text-sm text-gray-600 mt-1">
                            Asignado a: {task.assignedToName || "Sin asignar"}
                          </p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {task.startTime && <p>Inicio: {new Date(task.startTime).toLocaleTimeString("es-ES")}</p>}
                          {task.endTime && <p>Fin: {new Date(task.endTime).toLocaleTimeString("es-ES")}</p>}
                          {task.incidents.length > 0 && (
                            <p className="text-orange-600">{task.incidents.length} incidencia(s) reportada(s)</p>
                          )}
                        </div>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <TaskMap tasks={filteredTasks} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modales mantienen su comportamiento actual */}
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
