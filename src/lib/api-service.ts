import {
  MOCK_CHATBOTS,
  MOCK_USERS,
  MOCK_ANALYTICS,
  type ChatbotData,
  type UserData,
  type AnalyticsData,
} from "./mock-data"

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API service
export const api = {
  // Chatbot endpoints
  chatbots: {
    getAll: async (): Promise<ChatbotData[]> => {
      await delay(800)
      return [...MOCK_CHATBOTS]
    },

    getById: async (id: string): Promise<ChatbotData | null> => {
      await delay(600)
      const chatbot = MOCK_CHATBOTS.find((bot) => bot.id === id)
      return chatbot ? { ...chatbot } : null
    },

    create: async (data: Partial<ChatbotData>): Promise<ChatbotData> => {
      await delay(1000)
      const newChatbot: ChatbotData = {
        id: `lux-${Date.now()}`,
        name: data.name || "New Chatbot",
        description: data.description || "A new chatbot",
        style: data.style || "Professional",
        messages: 0,
        lastUpdated: new Date().toISOString(),
        status: "active",
        config: data.config || {
          welcomeMessage: "Hello! How can I assist you today?",
          personality: {
            formality: 0.7,
            friendliness: 0.8,
            helpfulness: 0.9,
          },
          appearance: {
            primaryColor: "#00FFFF",
            secondaryColor: "#FFFFFF",
            fontFamily: "Inter, sans-serif",
            borderRadius: "12px",
          },
        },
      }

      return newChatbot
    },

    update: async (id: string, data: Partial<ChatbotData>): Promise<ChatbotData> => {
      await delay(800)
      const chatbot = MOCK_CHATBOTS.find((bot) => bot.id === id)

      if (!chatbot) {
        throw new Error("Chatbot not found")
      }

      const updatedChatbot = {
        ...chatbot,
        ...data,
        lastUpdated: new Date().toISOString(),
      }

      return updatedChatbot
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      await delay(700)
      return { success: true }
    },
  },

  // Analytics endpoints
  analytics: {
    getSummary: async (): Promise<AnalyticsData> => {
      await delay(1200)
      return { ...MOCK_ANALYTICS }
    },

    getChatbotPerformance: async (id: string): Promise<AnalyticsData["chatbotPerformance"][0] | null> => {
      await delay(700)
      const performance = MOCK_ANALYTICS.chatbotPerformance.find((bot) => bot.id === id)
      return performance ? { ...performance } : null
    },
  },

  // User endpoints
  users: {
    getAll: async (): Promise<UserData[]> => {
      await delay(900)
      return [...MOCK_USERS]
    },

    getById: async (id: string): Promise<UserData | null> => {
      await delay(500)
      const user = MOCK_USERS.find((u) => u.id === id)
      return user ? { ...user } : null
    },

    getCurrentUser: async (): Promise<UserData> => {
      await delay(300)
      return {
        id: "current-user-id",
        name: "Alex Johnson",
        email: "alex@thelux.app",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: "2023-01-15T08:30:00.000Z",
      }
    },
  },

  // Auth endpoints (mock)
  auth: {
    login: async (email: string, password: string): Promise<{ user: UserData; token: string }> => {
      await delay(1000)

      // Demo accounts
      const demoAccounts = [
        { email: "user@thelux.demo", password: "demo1234", role: "user" },
        { email: "admin@thelux.demo", password: "admin1234", role: "admin" },
        { email: "enterprise@thelux.demo", password: "enterprise1234", role: "enterprise" },
      ]

      const account = demoAccounts.find((acc) => acc.email === email && acc.password === password)

      if (!account) {
        throw new Error("Invalid credentials")
      }

      return {
        user: {
          id: `demo-${account.role}`,
          name: `Demo ${account.role.charAt(0).toUpperCase() + account.role.slice(1)}`,
          email: account.email,
          role: account.role as "user" | "admin" | "enterprise",
          createdAt: new Date().toISOString(),
        },
        token: "mock-jwt-token",
      }
    },

    logout: async (): Promise<{ success: boolean }> => {
      await delay(300)
      return { success: true }
    },
  },
}

