"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, ArrowLeft } from "lucide-react"
import type { Task } from "@/types"

interface TaskMapProps {
  tasks: Task[]
}

export default function TaskMap({ tasks }: TaskMapProps) {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header del mapa */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-3 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Puntos de instalación</h1>
        </div>
      </div>

      {/* Área del mapa simulado */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-green-50">
        {/* Marcadores simulados exactos del diseño */}
        <div className="absolute top-20 left-8">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-12">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-12">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-8">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Líneas de ruta simuladas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 100 Q 200 150 300 200 T 350 300"
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Lista de próximas paradas exacta */}
      <div className="bg-white border-t border-gray-200">
        <div className="px-4 py-4">
          <h3 className="font-semibold text-gray-900 mb-3">Próximas paradas</h3>
          <div className="space-y-3">
            {tasks.slice(0, 2).map((task, index) => (
              <Card key={task.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className={`h-1 ${
                      task.status === "pending"
                        ? "bg-orange-500"
                        : task.status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  ></div>

                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{task.title}</h4>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {task.address}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">{index === 0 ? "Siguiente" : "Después"}</div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 h-8 text-xs">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navegar
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-3">
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
