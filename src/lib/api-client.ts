// Default API URL with fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
  tier: "free" | "pro" | "enterprise"
  createdAt: string
}

export interface Chatbot {
  id: string
  name: string
  description: string
  model: string
  avatar: string
  createdAt: string
  updatedAt: string
  status: "active" | "inactive" | "draft"
  messages: number
  owner: string
}

export interface LoginResponse {
  user: User
  token: string
}

// Mock data for development
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@luxchat.app",
    name: "Admin User",
    role: "admin",
    tier: "enterprise",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    email: "editor@luxchat.app",
    name: "Editor User",
    role: "editor",
    tier: "pro",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    email: "viewer@luxchat.app",
    name: "Viewer User",
    role: "viewer",
    tier: "free",
    createdAt: "2023-01-03T00:00:00.000Z",
  },
]

const MOCK_CHATBOTS: Chatbot[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    avatar: "/placeholder.svg?height=80&width=80",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-10T00:00:00.000Z",
    status: "active",
    messages: 1250,
    owner: "1",
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Helps with product recommendations and sales",
    model: "meta-llama/Llama-2-7b-chat-hf",
    avatar: "/placeholder.svg?height=80&width=80",
    createdAt: "2023-01-05T00:00:00.000Z",
    updatedAt: "2023-01-15T00:00:00.000Z",
    status: "active",
    messages: 890,
    owner: "1",
  },
  {
    id: "3",
    name: "Marketing Bot",
    description: "Generates marketing content and ideas",
    model: "tiiuae/falcon-7b-instruct",
    avatar: "/placeholder.svg?height=80&width=80",
    createdAt: "2023-01-10T00:00:00.000Z",
    updatedAt: "2023-01-20T00:00:00.000Z",
    status: "draft",
    messages: 340,
    owner: "2",
  },
]

// Helper function to simulate API calls
async function simulateApiCall<T>(data: T, error = false, delay = 500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error("API Error"))
      } else {
        resolve(data)
      }
    }, delay)
  })
}

// Helper function to get token consistently
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lux_token")
  }
  return null
}

// API Client
export const apiClient = {
  // Auth
  login: async (email: string, password: string): Promise<{ data?: LoginResponse; error?: string }> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          if (response.ok) {
            return { data: await response.json() }
          }
        } catch (error) {
          console.warn("API call failed, falling back to mock data")
        }
      }

      // Fallback to mock data
      console.warn("Using mock login data")

      // Demo credentials validation
      const demoCredentials = {
        "admin@luxchat.app": "admin1234",
        "editor@luxchat.app": "editor1234",
        "viewer@luxchat.app": "viewer1234",
      }

      // Check if email exists and password matches
      if (!demoCredentials[email]) {
        return { error: "User not found" }
      }

      if (demoCredentials[email] !== password) {
        return { error: "Invalid password" }
      }

      const mockUser = MOCK_USERS.find((u) => u.email === email)

      if (!mockUser) {
        return { error: "User not found" }
      }

      return {
        data: {
          user: mockUser,
          token: "mock-jwt-token",
        },
      }
    } catch (error) {
      console.error("Login error:", error)
      return { error: "An unexpected error occurred" }
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<{ data?: User; error?: string }> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          return { error: "No authentication token" }
        }

        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            return { data: await response.json() }
          }
        } catch (error) {
          console.warn("API call failed, falling back to mock data")
        }
      }

      // Fallback to mock data
      console.warn("Using mock user data")

      // Get stored user from localStorage
      const storedUser = localStorage.getItem("lux_user")
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          return { data: user }
        } catch (e) {
          console.error("Failed to parse stored user", e)
        }
      }

      // If no stored user, return the first mock user
      return { data: MOCK_USERS[0] }
    } catch (error) {
      console.error("Get current user error:", error)
      return { error: "Failed to get current user" }
    }
  },

  // Logout
  logout: async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (token) {
          try {
            const response = await fetch(`${API_URL}/auth/logout`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })

            if (response.ok) {
              // Clear local storage
              localStorage.removeItem("lux_token")
              localStorage.removeItem("lux_user")
              return { success: true }
            }
          } catch (error) {
            console.warn("API call failed, falling back to mock data")
          }
        }
      }

      // Fallback to mock data
      console.warn("Using mock logout")

      // Clear local storage
      localStorage.removeItem("lux_token")
      localStorage.removeItem("lux_user")

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      return { success: false, error: "Failed to logout" }
    }
  },

  // Chatbots
  getChatbots: async (): Promise<Chatbot[]> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/chatbots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock chatbot data")
      return simulateApiCall(MOCK_CHATBOTS)
    } catch (error) {
      console.error("Get chatbots error:", error)
      return simulateApiCall(MOCK_CHATBOTS)
    }
  },

  getChatbot: async (id: string): Promise<Chatbot> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/chatbots/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock chatbot data")
      const chatbot = MOCK_CHATBOTS.find((c) => c.id === id)
      if (!chatbot) {
        throw new Error("Chatbot not found")
      }
      return simulateApiCall(chatbot)
    } catch (error) {
      console.error("Get chatbot error:", error)
      const chatbot = MOCK_CHATBOTS.find((c) => c.id === id)
      if (!chatbot) {
        throw new Error("Chatbot not found")
      }
      return simulateApiCall(chatbot)
    }
  },

  createChatbot: async (data: Omit<Chatbot, "id" | "createdAt" | "updatedAt" | "messages">): Promise<Chatbot> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/chatbots`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock create chatbot")
      const newChatbot: Chatbot = {
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: 0,
        ...data,
      }
      return simulateApiCall(newChatbot)
    } catch (error) {
      console.error("Create chatbot error:", error)
      const newChatbot: Chatbot = {
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: 0,
        ...data,
      }
      return simulateApiCall(newChatbot)
    }
  },

  updateChatbot: async (id: string, data: Partial<Chatbot>): Promise<Chatbot> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/chatbots/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock update chatbot")
      const chatbot = MOCK_CHATBOTS.find((c) => c.id === id)
      if (!chatbot) {
        throw new Error("Chatbot not found")
      }
      const updatedChatbot = {
        ...chatbot,
        ...data,
        updatedAt: new Date().toISOString(),
      }
      return simulateApiCall(updatedChatbot)
    } catch (error) {
      console.error("Update chatbot error:", error)
      const chatbot = MOCK_CHATBOTS.find((c) => c.id === id)
      if (!chatbot) {
        throw new Error("Chatbot not found")
      }
      const updatedChatbot = {
        ...chatbot,
        ...data,
        updatedAt: new Date().toISOString(),
      }
      return simulateApiCall(updatedChatbot)
    }
  },

  deleteChatbot: async (id: string): Promise<void> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/chatbots/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          return
        }
      }

      // Fallback to mock data
      console.warn("Using mock delete chatbot")
      return simulateApiCall(undefined)
    } catch (error) {
      console.error("Delete chatbot error:", error)
      return simulateApiCall(undefined)
    }
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock user data")
      return simulateApiCall(MOCK_USERS)
    } catch (error) {
      console.error("Get users error:", error)
      return simulateApiCall(MOCK_USERS)
    }
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    try {
      // Try to use the real API if available
      if (typeof window !== "undefined" && API_URL !== "/api") {
        const token = getToken()
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${API_URL}/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to mock data
      console.warn("Using mock update user")
      const user = MOCK_USERS.find((u) => u.id === id)
      if (!user) {
        throw new Error("User not found")
      }
      const updatedUser = {
        ...user,
        ...data,
      }
      return simulateApiCall(updatedUser)
    } catch (error) {
      console.error("Update user error:", error)
      const user = MOCK_USERS.find((u) => u.id === id)
      if (!user) {
        throw new Error("User not found")
      }
      const updatedUser = {
        ...user,
        ...data,
      }
      return simulateApiCall(updatedUser)
    }
  },
}

