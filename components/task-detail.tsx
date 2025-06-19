"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, User, Phone, Settings, Info, Clock, Edit } from "lucide-react"
import type { Task } from "@/types"
import TaskCompletion from "./task-completion"

interface TaskDetailProps {
  task: Task
  onClose: () => void
  onStartTask: () => void
  onCompleteTask?: (task: Task) => void
}

export default function TaskDetail({ task, onClose, onStartTask, onCompleteTask }: TaskDetailProps) {
  const [showCompletion, setShowCompletion] = useState(false)
  const isInProgress = task.status === "in-progress"
  const isPending = task.status === "pending"

  const handleCompleteTask = (completedTask: Task) => {
    if (onCompleteTask) {
      onCompleteTask(completedTask)
    }
    setShowCompletion(false)
    onClose()
  }

  if (showCompletion) {
    return <TaskCompletion task={task} onClose={() => setShowCompletion(false)} onComplete={handleCompleteTask} />
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex justify-center items-start overflow-hidden">
      {/* Contenedor centrado para desktop */}
      <div className="w-full max-w-md h-full bg-white shadow-lg overflow-y-auto">
        {/* Header azul */}
        <div className="bg-blue-600 text-white">
          <div className="px-4 py-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white p-0 mr-4 hover:bg-blue-700">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-medium">Detalles de la tarea</h1>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="px-4 py-6 space-y-6 bg-gray-100">
          {/* Tarjeta principal de información */}
          <Card>
            <CardContent className="p-6">
              {/* Estado y hora */}
              <div className="flex justify-between items-center mb-6">
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  En proceso
                </div>
                <span className="text-gray-500 text-lg">9:00 AM</span>
              </div>

              {/* Título */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Instalación nueva - Residencial</h2>

              {/* Información detallada */}
              <div className="space-y-4">
                {/* Dirección */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dirección</p>
                    <p className="text-base font-medium text-gray-900">Calle Roble 45, Edificio Aurora, Apto 302</p>
                  </div>
                </div>

                {/* Cliente */}
                <div className="flex items-start">
                  <User className="w-5 h-5 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Cliente</p>
                    <p className="text-base font-medium text-gray-900">María Rodríguez</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                    <p className="text-base font-medium text-gray-900">+34 612 345 678</p>
                  </div>
                </div>

                {/* Tipo de trabajo */}
                <div className="flex items-start">
                  <Settings className="w-5 h-5 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tipo de trabajo</p>
                    <p className="text-base font-medium text-gray-900">Instalación de fibra óptica 300Mbps</p>
                  </div>
                </div>

                {/* Notas */}
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Notas</p>
                    <p className="text-base text-gray-900">
                      Cliente solicita instalación en sala de estar. Acceso al edificio con código 4578. Contactar antes
                      de llegar.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado de la tarea */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado de la tarea</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hora de inicio</p>
                    <p className="text-base font-medium text-gray-900">9:15 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hora de fin</p>
                    <p className="text-base font-medium text-gray-500">Pendiente</p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3 mt-8">
                <Button
                  onClick={() => setShowCompletion(true)}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base"
                >
                  ✓ Finalizar tarea
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-blue-600 border-blue-600 hover:bg-blue-50 font-medium text-base"
                >
                  🗺 Ver en mapa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Material utilizado */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Material utilizado</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                    <span className="text-base text-gray-900">Router Wi-Fi</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-base font-medium text-gray-900 mr-2">1</span>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                    <span className="text-base text-gray-900">Cable fibra (metros)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-base font-medium text-gray-900 mr-2">15</span>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
