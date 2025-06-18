"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wifi } from "lucide-react"
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
      name: "Juan Pérez",
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
        alert("Credenciales incorrectas. Use:\noperario@fibertech.com / 123456\ncapataz@fibertech.com / 123456")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FiberTech</h1>
            <p className="text-gray-600 text-sm mt-1">Gestión de instalaciones</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 font-medium mb-2">Usuarios de prueba:</p>
            <p className="text-xs text-blue-700">Operario: operario@fibertech.com / 123456</p>
            <p className="text-xs text-blue-700">Capataz: capataz@fibertech.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}
