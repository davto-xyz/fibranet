export interface User {
  id: string
  name: string
  email: string
  role: "operario" | "capataz"
}

export interface Incident {
  id: string
  description: string
  images: string[]
  timestamp: string
}

export interface Task {
  id: string
  title: string
  address: string
  status: "pending" | "in-progress" | "completed"
  assignedTo: string
  assignedToName?: string
  scheduledDate: string
  coordinates: {
    lat: number
    lng: number
  }
  startTime: string | null
  endTime: string | null
  incidents: Incident[]
  priority?: "high" | "medium" | "low"
  estimatedDuration?: string
  customerName?: string
  customerPhone?: string
}
