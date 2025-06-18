"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, User, Phone, Settings, Info, Clock, Edit } from "lucide-react"
import type { Task } from "@/types"

interface TaskDetailProps {
  task: Task
  onClose: () => void
  onStartTask: () => void
}

export default function TaskDetail({ task, onClose, onStartTask }: TaskDetailProps) {
  const isInProgress = task.status === "in-progress"
  const isPending = task.status === "pending"

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      {/* Header azul exacto */}
      <div className="bg-white text-gray-900 border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 p-0 mr-3 hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium">Detalles de la tarea</h1>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 py-4 space-y-4">
        {/* Tarjeta principal de información */}
        <Card>
          <CardContent className="p-4">
            {/* Estado y hora */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-orange-600 font-medium">En progreso</span>
              </div>
              <span className="text-sm text-gray-500">9:00 AM</span>
            </div>

            {/* Título */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Instalación nueva - Residencial</h2>

            {/* Información detallada */}
            <div className="space-y-3">
              {/* Dirección */}
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Dirección</p>
                  <p className="text-sm text-gray-900">Calle Roble 45, Edificio Aurora, Apto 302</p>
                </div>
              </div>

              {/* Cliente */}
              <div className="flex items-start">
                <User className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cliente</p>
                  <p className="text-sm text-gray-900">María Rodríguez</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start">
                <Phone className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                  <p className="text-sm text-gray-900">+34 612 345 678</p>
                </div>
              </div>

              {/* Tipo de trabajo */}
              <div className="flex items-start">
                <Settings className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tipo de trabajo</p>
                  <p className="text-sm text-gray-900">Instalación de fibra óptica 300Mbps</p>
                </div>
              </div>

              {/* Notas */}
              <div className="flex items-start">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notas</p>
                  <p className="text-sm text-gray-900">
                    Cliente solicita instalación en sala de estar. Acceso al edificio con código 4578. Contactar antes
                    de llegar.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado de la tarea */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Estado de la tarea</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Hora de inicio</p>
                    <p className="text-sm font-medium text-gray-900">9:15 AM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Hora de fin</p>
                    <p className="text-sm font-medium text-gray-500">Pendiente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium">
            ✓ Finalizar tarea
          </Button>
          <Button variant="outline" className="w-full h-12 text-blue-600 border-blue-600 hover:bg-blue-50">
            🗺 Ver en mapa
          </Button>
        </div>

        {/* Material utilizado */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Material utilizado</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                    <span className="text-sm text-gray-900">Router Wi-Fi</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">1</span>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                    <span className="text-sm text-gray-900">Cable fibra (metros)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">15</span>
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
