"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi } from "lucide-react"
import type { User } from "@/types"

interface LoginPageProps {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock users for demonstration
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

    // Simulate API call
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">FiberTech</CardTitle>
          <CardDescription>Gestión de instalaciones de fibra óptica</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-medium mb-1">Usuarios de prueba:</p>
            <p>Operario: operario@fibertech.com / 123456</p>
            <p>Capataz: capataz@fibertech.com / 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
