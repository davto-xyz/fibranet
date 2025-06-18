"use client"

import { useState, useEffect } from "react"
import LoginPage from "@/components/login-page"
import OperarioDashboard from "@/components/operario-dashboard"
import CapatazDashboard from "@/components/capataz-dashboard"
import type { User } from "@/types"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("fibertech-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem("fibertech-user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("fibertech-user")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === "operario" ? (
        <OperarioDashboard user={user} onLogout={handleLogout} />
      ) : (
        <CapatazDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}
