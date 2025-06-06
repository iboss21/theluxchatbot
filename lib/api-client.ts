import { toast } from "@/components/ui/use-toast"

// Base API URL - would be set from environment variables in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.thelux.app"

// Types
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  tier: "free" | "professional" | "enterprise"
  avatar?: string
  createdAt: string
  lastActive?: string
}

export interface Chatbot {
  id: string
  name: string
  description: string
  style: string
  messages: number
  lastUpdated: string
  status: "active" | "inactive" | "archived"
  config: {
    welcomeMessage: string
    personality: {
      formality: number
      friendliness: number
      helpfulness: number
    }
    appearance: {
      primaryColor: string
      secondaryColor: string
      fontFamily: string
      borderRadius: string
    }
    aiModel?: string
    maxTokens?: number
    temperature?: number
  }
}

export interface TeamMember extends User {
  invitedBy?: string
  invitedAt?: string
  lastActive?: string
}

export interface Invitation {
  id: string
  email: string
  role: "admin" | "editor" | "viewer"
  tier: "free" | "professional" | "enterprise"
  invitedBy: string
  invitedAt: string
  status: "pending" | "accepted" | "expired"
}

export interface AnalyticsSummary {
  totalInteractions: number
  interactionsChange: number
  activeUsers: number
  activeUsersChange: number
  conversionRate: number
  conversionRateChange: number
}

export interface ChatbotPerformance {
  id: string
  name: string
  interactions: number
  responseTime: number
  satisfactionRate: number
}

export interface Analytics {
  summary: AnalyticsSummary
  chatbotPerformance: ChatbotPerformance[]
  interactionsOverTime: { date: string; count: number }[]
  topQueries: { query: string; count: number }[]
  userSentiment: { positive: number; neutral: number; negative: number }
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

// API client with error handling
class ApiClient {
  private token: string | null = null

  constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("lux_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("lux_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("lux_token")
    }
  }

  private async request<T>(endpoint: string, method = "GET", data?: any): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      })

      // Check if the response is empty
      const text = await response.text()
      let responseData: any = {}

      if (text) {
        try {
          responseData = JSON.parse(text)
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
          return {
            error: "Invalid response format",
            status: response.status,
          }
        }
      } else {
        // Handle empty response
        responseData = { success: response.ok }
      }

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          this.clearToken()
          // Redirect to login if not already there
          if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
            window.location.href = "/login"
          }
        }

        // Show error toast for other errors
        toast({
          title: "Error",
          description: responseData.message || "An error occurred",
          variant: "destructive",
        })

        return {
          error: responseData.message || "An error occurred",
          status: response.status,
        }
      }

      return {
        data: responseData,
        status: response.status,
      }
    } catch (error) {
      console.error("API request failed:", error)

      toast({
        title: "Connection Error",
        description: "Failed to connect to the server. Please check your internet connection.",
        variant: "destructive",
      })

      return {
        error: "Network error. Please check your connection.",
        status: 0,
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>("/auth/login", "POST", { email, password })

    if (response.data?.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await this.request<{ success: boolean }>("/auth/logout", "POST")
      this.clearToken()
      return response
    } catch (error) {
      console.error("Logout error:", error)
      // Always clear token even if API call fails
      this.clearToken()
      return {
        data: { success: true },
        status: 200,
      }
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/me")
  }

  // Chatbot endpoints
  async getChatbots(): Promise<ApiResponse<Chatbot[]>> {
    return this.request<Chatbot[]>("/chatbots")
  }

  async getChatbot(id: string): Promise<ApiResponse<Chatbot>> {
    return this.request<Chatbot>(`/chatbots/${id}`)
  }

  async createChatbot(data: Partial<Chatbot>): Promise<ApiResponse<Chatbot>> {
    return this.request<Chatbot>("/chatbots", "POST", data)
  }

  async updateChatbot(id: string, data: Partial<Chatbot>): Promise<ApiResponse<Chatbot>> {
    return this.request<Chatbot>(`/chatbots/${id}`, "PUT", data)
  }

  async deleteChatbot(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/chatbots/${id}`, "DELETE")
  }

  // Team management endpoints
  async getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
    return this.request<TeamMember[]>("/team")
  }

  async inviteTeamMember(email: string, role: string, tier: string): Promise<ApiResponse<Invitation>> {
    return this.request<Invitation>("/team/invite", "POST", { email, role, tier })
  }

  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<ApiResponse<TeamMember>> {
    return this.request<TeamMember>(`/team/${id}`, "PUT", data)
  }

  async removeTeamMember(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/team/${id}`, "DELETE")
  }

  async getPendingInvitations(): Promise<ApiResponse<Invitation[]>> {
    return this.request<Invitation[]>("/team/invitations")
  }

  async cancelInvitation(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/team/invitations/${id}`, "DELETE")
  }

  // Analytics endpoints
  async getAnalytics(): Promise<ApiResponse<Analytics>> {
    return this.request<Analytics>("/analytics")
  }

  async getChatbotAnalytics(id: string): Promise<ApiResponse<ChatbotPerformance>> {
    return this.request<ChatbotPerformance>(`/analytics/chatbots/${id}`)
  }

  // User management (admin only)
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/admin/users")
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/admin/users/${id}`, "PUT", data)
  }

  async deleteUser(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/admin/users/${id}`, "DELETE")
  }
}

// Export a singleton instance
export const apiClient = new ApiClient()

