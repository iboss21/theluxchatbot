import { faker } from "@faker-js/faker"

// Set a consistent seed for reproducible data
faker.seed(123)

// Types for our mock data
export interface ChatbotData {
  id: string
  name: string
  description: string
  style: string
  messages: number
  lastUpdated: string
  status: "active" | "inactive"
  config?: {
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
  }
}

export interface UserData {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "enterprise"
  avatar?: string
  createdAt: string
}

export interface AnalyticsData {
  summary: {
    totalInteractions: number
    interactionsChange: number
    activeUsers: number
    activeUsersChange: number
    conversionRate: number
    conversionRateChange: number
  }
  chatbotPerformance: Array<{
    id: string
    name: string
    interactions: number
    responseTime: number
    satisfactionRate: number
  }>
  interactionsOverTime: Array<{
    date: string
    count: number
  }>
  topQueries: Array<{
    query: string
    count: number
  }>
  userSentiment: {
    positive: number
    neutral: number
    negative: number
  }
}

// Generate chatbots
export const generateChatbots = (count = 5): ChatbotData[] => {
  const styles = ["Professional", "Casual", "Elegant", "Playful", "Minimalist"]
  const fontFamilies = [
    "Inter, sans-serif",
    "Poppins, sans-serif",
    "Playfair Display, serif",
    "Roboto, sans-serif",
    "Montserrat, sans-serif",
  ]

  return Array.from({ length: count }, (_, i) => {
    const isActive = Math.random() > 0.2
    return {
      id: `lux-${i + 1}`,
      name: faker.company.name() + " Bot",
      description: faker.company.catchPhrase(),
      style: styles[Math.floor(Math.random() * styles.length)],
      messages: faker.number.int({ min: 100, max: 5000 }),
      lastUpdated: faker.date.recent({ days: 30 }).toISOString(),
      status: isActive ? "active" : "inactive",
      config: {
        welcomeMessage: `Hello! I'm the ${faker.company.name()} assistant. How can I help you today?`,
        personality: {
          formality: faker.number.float({ min: 0.1, max: 1, precision: 0.1 }),
          friendliness: faker.number.float({ min: 0.1, max: 1, precision: 0.1 }),
          helpfulness: faker.number.float({ min: 0.1, max: 1, precision: 0.1 }),
        },
        appearance: {
          primaryColor: faker.color.rgb(),
          secondaryColor: faker.color.rgb(),
          fontFamily: fontFamilies[Math.floor(Math.random() * fontFamilies.length)],
          borderRadius: `${faker.number.int({ min: 4, max: 20 })}px`,
        },
      },
    }
  })
}

// Generate users
export const generateUsers = (count = 10): UserData[] => {
  const roles = ["user", "admin", "enterprise"] as const

  return Array.from({ length: count }, (_, i) => {
    const role = roles[Math.min(i % roles.length, roles.length - 1)]
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: role,
      avatar: faker.image.avatar(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    }
  })
}

// Generate analytics data
export const generateAnalytics = (): AnalyticsData => {
  const chatbots = generateChatbots(3)

  // Generate daily interaction data for the past 15 days
  const interactionsOverTime = Array.from({ length: 15 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (14 - i))
    return {
      date: date.toISOString().split("T")[0],
      count: faker.number.int({ min: 50, max: 150 }),
    }
  })

  // Calculate total interactions
  const totalInteractions = interactionsOverTime.reduce((sum, day) => sum + day.count, 0)

  // Generate chatbot performance data
  const chatbotPerformance = chatbots.map((bot) => ({
    id: bot.id,
    name: bot.name,
    interactions: faker.number.int({ min: 100, max: 2000 }),
    responseTime: faker.number.float({ min: 0.2, max: 2, precision: 0.1 }),
    satisfactionRate: faker.number.int({ min: 70, max: 98 }),
  }))

  // Generate top queries
  const topQueries = Array.from({ length: 5 }, () => ({
    query: faker.lorem.sentence({ min: 3, max: 8 }).replace(".", "?"),
    count: faker.number.int({ min: 10, max: 100 }),
  })).sort((a, b) => b.count - a.count)

  return {
    summary: {
      totalInteractions,
      interactionsChange: faker.number.float({ min: -15, max: 25, precision: 0.1 }),
      activeUsers: faker.number.int({ min: 100, max: 1000 }),
      activeUsersChange: faker.number.float({ min: -10, max: 30, precision: 0.1 }),
      conversionRate: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
      conversionRateChange: faker.number.float({ min: -5, max: 15, precision: 0.1 }),
    },
    chatbotPerformance,
    interactionsOverTime,
    topQueries,
    userSentiment: {
      positive: faker.number.int({ min: 50, max: 80 }),
      neutral: faker.number.int({ min: 10, max: 30 }),
      negative: faker.number.int({ min: 5, max: 20 }),
    },
  }
}

// Create fixed datasets for consistent UI
export const MOCK_CHATBOTS = generateChatbots(5)
export const MOCK_USERS = generateUsers(10)
export const MOCK_ANALYTICS = generateAnalytics()

// Current user (for authentication simulation)
export const CURRENT_USER: UserData = {
  id: "current-user-id",
  name: "Alex Johnson",
  email: "alex@thelux.app",
  role: "admin",
  avatar: "/placeholder.svg?height=40&width=40",
  createdAt: "2023-01-15T08:30:00.000Z",
}

