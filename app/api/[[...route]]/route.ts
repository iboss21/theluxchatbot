import { type NextRequest, NextResponse } from "next/server"
import { faker } from "@faker-js/faker"

// Set a consistent seed for reproducible data
faker.seed(123)

// Mock database
const db = {
  users: [
    {
      id: "user-1",
      name: "Admin User",
      email: "admin@thelux.app",
      password: "admin1234", // In a real app, this would be hashed
      role: "admin",
      tier: "enterprise",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-01-15T08:30:00.000Z",
      lastActive: "2023-03-28T14:22:00.000Z",
    },
    {
      id: "user-2",
      name: "Editor User",
      email: "editor@thelux.app",
      password: "editor1234",
      role: "editor",
      tier: "professional",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-02-10T10:15:00.000Z",
      lastActive: "2023-03-27T09:45:00.000Z",
    },
    {
      id: "user-3",
      name: "Viewer User",
      email: "viewer@thelux.app",
      password: "viewer1234",
      role: "viewer",
      tier: "free",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-03-05T14:20:00.000Z",
      lastActive: "2023-03-25T16:30:00.000Z",
    },
  ],
  chatbots: [
    {
      id: "lux-1",
      name: "Crystal Luxe",
      description: "Professional customer support chatbot",
      style: "Professional",
      messages: 1243,
      lastUpdated: "2023-03-15T10:30:00.000Z",
      status: "active",
      config: {
        welcomeMessage: "Hello! How can I assist you today?",
        personality: {
          formality: 0.8,
          friendliness: 0.6,
          helpfulness: 0.9,
        },
        appearance: {
          primaryColor: "#00FFFF",
          secondaryColor: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          borderRadius: "12px",
        },
        aiModel: "gpt-4",
        maxTokens: 2048,
        temperature: 0.7,
      },
    },
    {
      id: "lux-2",
      name: "Neon Pulse",
      description: "Casual conversational assistant",
      style: "Casual",
      messages: 856,
      lastUpdated: "2023-03-10T14:45:00.000Z",
      status: "active",
      config: {
        welcomeMessage: "Hey there! What's up?",
        personality: {
          formality: 0.3,
          friendliness: 0.9,
          helpfulness: 0.7,
        },
        appearance: {
          primaryColor: "#FF00FF",
          secondaryColor: "#00FFFF",
          fontFamily: "Poppins, sans-serif",
          borderRadius: "20px",
        },
        aiModel: "gpt-3.5-turbo",
        maxTokens: 1024,
        temperature: 0.9,
      },
    },
    {
      id: "lux-3",
      name: "Royal Aura",
      description: "Elegant product recommendation bot",
      style: "Elegant",
      messages: 421,
      lastUpdated: "2023-03-05T09:15:00.000Z",
      status: "inactive",
      config: {
        welcomeMessage: "Welcome to our premium selection. How may I assist you today?",
        personality: {
          formality: 0.9,
          friendliness: 0.5,
          helpfulness: 0.8,
        },
        appearance: {
          primaryColor: "#FFD700",
          secondaryColor: "#FFFFFF",
          fontFamily: "Playfair Display, serif",
          borderRadius: "8px",
        },
        aiModel: "gpt-4",
        maxTokens: 2048,
        temperature: 0.5,
      },
    },
  ],
  invitations: [
    {
      id: "inv-1",
      email: "pending@example.com",
      role: "editor",
      tier: "professional",
      invitedBy: "user-1",
      invitedAt: "2023-03-20T11:30:00.000Z",
      status: "pending",
    },
  ],
  analytics: {
    summary: {
      totalInteractions: 2520,
      interactionsChange: 12.5,
      activeUsers: 487,
      activeUsersChange: 8.2,
      conversionRate: 3.8,
      conversionRateChange: -0.5,
    },
    chatbotPerformance: [
      {
        id: "lux-1",
        name: "Crystal Luxe",
        interactions: 1243,
        responseTime: 0.8,
        satisfactionRate: 92,
      },
      {
        id: "lux-2",
        name: "Neon Pulse",
        interactions: 856,
        responseTime: 0.6,
        satisfactionRate: 88,
      },
      {
        id: "lux-3",
        name: "Royal Aura",
        interactions: 421,
        responseTime: 0.9,
        satisfactionRate: 95,
      },
    ],
    interactionsOverTime: [
      { date: "2023-03-01", count: 78 },
      { date: "2023-03-02", count: 82 },
      { date: "2023-03-03", count: 91 },
      { date: "2023-03-04", count: 65 },
      { date: "2023-03-05", count: 59 },
      { date: "2023-03-06", count: 85 },
      { date: "2023-03-07", count: 93 },
      { date: "2023-03-08", count: 102 },
      { date: "2023-03-09", count: 110 },
      { date: "2023-03-10", count: 105 },
      { date: "2023-03-11", count: 98 },
      { date: "2023-03-12", count: 87 },
      { date: "2023-03-13", count: 92 },
      { date: "2023-03-14", count: 109 },
      { date: "2023-03-15", count: 115 },
    ],
    topQueries: [
      { query: "How do I reset my password?", count: 87 },
      { query: "What are your pricing plans?", count: 64 },
      { query: "How do I contact support?", count: 52 },
      { query: "Do you offer refunds?", count: 43 },
      { query: "How to upgrade my plan?", count: 38 },
    ],
    userSentiment: {
      positive: 68,
      neutral: 24,
      negative: 8,
    },
  },
}

// Helper to verify token (in a real app, this would validate JWT)
function verifyToken(token: string | null) {
  if (!token) return null

  // For demo, just check if token exists
  return token ? { id: "user-1", role: "admin" } : null
}

// Helper to get token from request
function getTokenFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.split(" ")[1]
}

// Route handler
export async function GET(req: NextRequest, { params }: { params: { route?: string[] } }) {
  const route = params.route || []
  const path = `/${route.join("/")}`

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Auth check for protected routes
  const token = getTokenFromRequest(req)
  const user = verifyToken(token)

  if (path !== "/auth/login" && !path.startsWith("/auth/register") && !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Auth endpoints
  if (path === "/auth/login") {
    return NextResponse.json(
      {
        user: { ...db.users[0], password: undefined },
        token: "mock-jwt-token",
      },
      { status: 200 },
    )
  }

  if (path === "/auth/logout") {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  if (path === "/auth/me") {
    return NextResponse.json({ ...db.users[0], password: undefined }, { status: 200 })
  }

  // Chatbot endpoints
  if (path === "/chatbots") {
    return NextResponse.json(db.chatbots, { status: 200 })
  }

  if (path.match(/^\/chatbots\/[\w-]+$/)) {
    const id = path.split("/")[2]
    const chatbot = db.chatbots.find((c) => c.id === id)

    if (!chatbot) {
      return NextResponse.json({ message: "Chatbot not found" }, { status: 404 })
    }

    return NextResponse.json(chatbot, { status: 200 })
  }

  // Team endpoints
  if (path === "/team") {
    return NextResponse.json(
      db.users.map((u) => ({ ...u, password: undefined })),
      { status: 200 },
    )
  }

  if (path === "/team/invitations") {
    return NextResponse.json(db.invitations, { status: 200 })
  }

  // Analytics endpoints
  if (path === "/analytics") {
    return NextResponse.json(db.analytics, { status: 200 })
  }

  if (path.match(/^\/analytics\/chatbots\/[\w-]+$/)) {
    const id = path.split("/")[3]
    const performance = db.analytics.chatbotPerformance.find((c) => c.id === id)

    if (!performance) {
      return NextResponse.json({ message: "Chatbot analytics not found" }, { status: 404 })
    }

    return NextResponse.json(performance, { status: 200 })
  }

  // Admin endpoints
  if (path === "/admin/users" && user?.role === "admin") {
    return NextResponse.json(
      db.users.map((u) => ({ ...u, password: undefined })),
      { status: 200 },
    )
  }

  // Fallback for unknown routes
  return NextResponse.json({ message: "Endpoint not found" }, { status: 404 })
}

export async function POST(req: NextRequest, { params }: { params: { route?: string[] } }) {
  const route = params.route || []
  const path = `/${route.join("/")}`

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Parse the request body safely
    let body = {}
    try {
      const text = await req.text()
      if (text) {
        body = JSON.parse(text)
      }
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 })
    }

    // Auth endpoints
    if (path === "/auth/login") {
      const { email, password } = body as any
      const user = db.users.find((u) => u.email === email && u.password === password)

      if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
      }

      return NextResponse.json(
        {
          user: { ...user, password: undefined },
          token: "mock-jwt-token",
        },
        { status: 200 },
      )
    }

    if (path === "/auth/logout") {
      // No need to check token for logout
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Auth check for protected routes
    const token = getTokenFromRequest(req)
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Chatbot endpoints
    if (path === "/chatbots") {
      const newChatbot = {
        id: `lux-${Date.now()}`,
        name: (body as any).name || "New Chatbot",
        description: (body as any).description || "A new chatbot",
        style: (body as any).style || "Professional",
        messages: 0,
        lastUpdated: new Date().toISOString(),
        status: "active",
        config: (body as any).config || {
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
          aiModel: "gpt-3.5-turbo",
          maxTokens: 1024,
          temperature: 0.7,
        },
      }

      db.chatbots.push(newChatbot)

      return NextResponse.json(newChatbot, { status: 201 })
    }

    // Team endpoints
    if (path === "/team/invite" && user.role === "admin") {
      const { email, role, tier } = body as any

      if (!email || !role || !tier) {
        return NextResponse.json({ message: "Email, role, and tier are required" }, { status: 400 })
      }

      const newInvitation = {
        id: `inv-${Date.now()}`,
        email,
        role,
        tier,
        invitedBy: user.id,
        invitedAt: new Date().toISOString(),
        status: "pending",
      }

      db.invitations.push(newInvitation)

      return NextResponse.json(newInvitation, { status: 201 })
    }

    // Fallback for unknown routes
    return NextResponse.json({ message: "Endpoint not found" }, { status: 404 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Server error processing request", error: String(error) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { route?: string[] } }) {
  const route = params.route || []
  const path = `/${route.join("/")}`

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Auth check for protected routes
  const token = getTokenFromRequest(req)
  const user = verifyToken(token)

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    // Parse the request body safely
    let body = {}
    try {
      const text = await req.text()
      if (text) {
        body = JSON.parse(text)
      }
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 })
    }

    // Chatbot endpoints
    if (path.match(/^\/chatbots\/[\w-]+$/)) {
      const id = path.split("/")[2]
      const chatbotIndex = db.chatbots.findIndex((c) => c.id === id)

      if (chatbotIndex === -1) {
        return NextResponse.json({ message: "Chatbot not found" }, { status: 404 })
      }

      const updatedChatbot = {
        ...db.chatbots[chatbotIndex],
        ...(body as any),
        lastUpdated: new Date().toISOString(),
      }

      db.chatbots[chatbotIndex] = updatedChatbot

      return NextResponse.json(updatedChatbot, { status: 200 })
    }

    // Team endpoints
    if (path.match(/^\/team\/[\w-]+$/) && user.role === "admin") {
      const id = path.split("/")[2]
      const userIndex = db.users.findIndex((u) => u.id === id)

      if (userIndex === -1) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      const updatedUser = {
        ...db.users[userIndex],
        ...(body as any),
        // Don't allow changing password through this endpoint
        password: db.users[userIndex].password,
      }

      db.users[userIndex] = updatedUser

      return NextResponse.json({ ...updatedUser, password: undefined }, { status: 200 })
    }

    // Admin endpoints
    if (path.match(/^\/admin\/users\/[\w-]+$/) && user.role === "admin") {
      const id = path.split("/")[3]
      const userIndex = db.users.findIndex((u) => u.id === id)

      if (userIndex === -1) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      const updatedUser = {
        ...db.users[userIndex],
        ...(body as any),
        // Don't allow changing password through this endpoint
        password: db.users[userIndex].password,
      }

      db.users[userIndex] = updatedUser

      return NextResponse.json({ ...updatedUser, password: undefined }, { status: 200 })
    }

    // Fallback for unknown routes
    return NextResponse.json({ message: "Endpoint not found" }, { status: 404 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Server error processing request", error: String(error) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { route?: string[] } }) {
  const route = params.route || []
  const path = `/${route.join("/")}`

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Auth check for protected routes
  const token = getTokenFromRequest(req)
  const user = verifyToken(token)

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Chatbot endpoints
  if (path.match(/^\/chatbots\/[\w-]+$/)) {
    const id = path.split("/")[2]
    const chatbotIndex = db.chatbots.findIndex((c) => c.id === id)

    if (chatbotIndex === -1) {
      return NextResponse.json({ message: "Chatbot not found" }, { status: 404 })
    }

    db.chatbots.splice(chatbotIndex, 1)

    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Team endpoints
  if (path.match(/^\/team\/[\w-]+$/) && user.role === "admin") {
    const id = path.split("/")[2]
    const userIndex = db.users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Don't allow deleting yourself
    if (id === user.id) {
      return NextResponse.json({ message: "Cannot delete your own account" }, { status: 400 })
    }

    db.users.splice(userIndex, 1)

    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Invitation endpoints
  if (path.match(/^\/team\/invitations\/[\w-]+$/) && user.role === "admin") {
    const id = path.split("/")[3]
    const invitationIndex = db.invitations.findIndex((i) => i.id === id)

    if (invitationIndex === -1) {
      return NextResponse.json({ message: "Invitation not found" }, { status: 404 })
    }

    db.invitations.splice(invitationIndex, 1)

    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Admin endpoints
  if (path.match(/^\/admin\/users\/[\w-]+$/) && user.role === "admin") {
    const id = path.split("/")[3]
    const userIndex = db.users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Don't allow deleting yourself
    if (id === user.id) {
      return NextResponse.json({ message: "Cannot delete your own account" }, { status: 400 })
    }

    db.users.splice(userIndex, 1)

    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Fallback for unknown routes
  return NextResponse.json({ message: "Endpoint not found" }, { status: 404 })
}

