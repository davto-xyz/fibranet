"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft, Menu, Phone } from "lucide-react"
import type { Task } from "@/types"

interface TaskMapProps {
  tasks: Task[]
}

export default function TaskMap({ tasks }: TaskMapProps) {
  const nextTask = tasks.find((task) => task.status === "pending") || tasks[0]

  return (
    <div className="h-screen bg-gray-300">
      {/* Contenedor centrado para desktop */}
      <div className="max-w-md mx-auto h-full flex flex-col bg-gray-300 relative overflow-hidden shadow-lg">
        {/* Header del mapa */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="p-0" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-semibold">Puntos de instalación</h1>
                <Button variant="ghost" size="sm" className="p-0">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área del mapa simulado más realista */}
        <div className="flex-1 relative bg-gray-300">
          {/* Calles simuladas */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800">
            {/* Calles principales horizontales */}
            <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="4" opacity="0.8" />
            <line x1="0" y1="250" x2="400" y2="250" stroke="white" strokeWidth="3" opacity="0.7" />
            <line x1="0" y1="350" x2="400" y2="350" stroke="white" strokeWidth="4" opacity="0.8" />
            <line x1="0" y1="450" x2="400" y2="450" stroke="white" strokeWidth="3" opacity="0.7" />
            <line x1="0" y1="550" x2="400" y2="550" stroke="white" strokeWidth="4" opacity="0.8" />
            <line x1="0" y1="650" x2="400" y2="650" stroke="white" strokeWidth="3" opacity="0.7" />

            {/* Calles verticales */}
            <line x1="80" y1="0" x2="80" y2="800" stroke="white" strokeWidth="3" opacity="0.7" />
            <line x1="150" y1="0" x2="150" y2="800" stroke="white" strokeWidth="4" opacity="0.8" />
            <line x1="220" y1="0" x2="220" y2="800" stroke="white" strokeWidth="3" opacity="0.7" />
            <line x1="290" y1="0" x2="290" y2="800" stroke="white" strokeWidth="4" opacity="0.8" />
            <line x1="360" y1="0" x2="360" y2="800" stroke="white" strokeWidth="3" opacity="0.7" />

            {/* Calles diagonales */}
            <line x1="0" y1="200" x2="200" y2="400" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="200" y1="100" x2="400" y2="300" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="100" y1="500" x2="300" y2="700" stroke="white" strokeWidth="2" opacity="0.6" />
          </svg>

          {/* Marcadores de ubicación */}
          <div className="absolute top-32 left-16">
            <div className="w-8 h-10 relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>

          <div className="absolute top-48 right-20">
            <div className="w-8 h-10 relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>

          <div className="absolute top-80 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-10 relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>

          <div className="absolute bottom-80 left-8">
            <div className="w-8 h-10 relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>

          <div className="absolute bottom-60 right-12">
            <div className="w-8 h-10 relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>

          {/* Líneas de ruta */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 80 150 Q 150 200 200 320" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 200 320 Q 250 400 150 500" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.8" />
          </svg>
        </div>

        {/* Tarjeta de próxima parada */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="shadow-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Próxima parada</h3>
                <span className="text-gray-500 text-sm">2.3 km</span>
              </div>

              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {nextTask?.address || "Calle Roble 45, Edificio Aurora, Apto 302"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {nextTask?.customerName || "María Rodríguez"} - {nextTask?.title || "Instalación nueva"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium">
                  Iniciar navegación
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
