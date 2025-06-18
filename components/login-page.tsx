"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wifi, Mail, Lock } from "lucide-react"
import type { User } from "@/types"

interface LoginPageProps {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const mockUsers = {
    "operario@fibertech.com": {
      id: "1",
      name: "Carlos",
      email: "operario@fibertech.com",
      role: "operario" as const,
    },
    "capataz@fibertech.com": {
      id: "2",
      name: "María González",
      email: "capataz@fibertech.com",
      role: "capataz" as const,
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const user = mockUsers[email as keyof typeof mockUsers]
      if (user && password === "123456") {
        onLogin(user)
      } else {
        alert("Credenciales incorrectas")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col justify-center px-8">
      <div className="mx-auto w-full max-w-sm">
        {/* Logo exacto del diseño */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <Wifi className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">FibraTech</h1>
          <p className="text-gray-500 text-sm">Plataforma para técnicos de instalación</p>
        </div>

        {/* Formulario exacto */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Botón de iniciar sesión */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          {/* Enlace de contraseña olvidada */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => alert("Funcionalidad no implementada")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        {/* Credenciales de prueba (solo para desarrollo) */}
        <div className="mt-8 p-4 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg border border-white border-opacity-50">
          <p className="text-xs text-blue-800 font-medium mb-2">Usuarios de prueba:</p>
          <p className="text-xs text-blue-700">operario@fibertech.com / 123456</p>
          <p className="text-xs text-blue-700">capataz@fibertech.com / 123456</p>
        </div>
      </div>
    </div>
  )
}
