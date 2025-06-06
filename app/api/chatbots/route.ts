import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for chatbots (in a real app, this would be a database)
const chatbots = [
  {
    id: "lux-1",
    name: "Crystal Luxe",
    description: "Professional customer support chatbot",
    style: "Professional",
    messages: 1243,
    lastUpdated: "2023-03-15T10:30:00Z",
    status: "active",
    welcomeMessage: "Hello! How can I assist you today?",
    primaryColor: "#00FFFF",
    secondaryColor: "#FFFFFF",
    fontFamily: "Inter, sans-serif",
    borderRadius: "12px",
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: "You are a helpful AI assistant.",
    theme: "dark",
    isPublic: true,
    enableVoice: false,
    enableImageGeneration: false,
  },
  {
    id: "lux-2",
    name: "Neon Pulse",
    description: "Casual conversational assistant",
    style: "Casual",
    messages: 856,
    lastUpdated: "2023-03-10T14:45:00Z",
    status: "active",
    welcomeMessage: "Hey there! What's up?",
    primaryColor: "#FF00FF",
    secondaryColor: "#00FFFF",
    fontFamily: "Poppins, sans-serif",
    borderRadius: "20px",
    provider: "openai",
    model: "gpt-4",
    temperature: 0.9,
    maxTokens: 2048,
    systemPrompt: "You are a friendly and casual AI assistant.",
    theme: "dark",
    isPublic: true,
    enableVoice: true,
    enableImageGeneration: true,
  },
  {
    id: "lux-3",
    name: "Royal Aura",
    description: "Elegant product recommendation bot",
    style: "Elegant",
    messages: 421,
    lastUpdated: "2023-03-05T09:15:00Z",
    status: "inactive",
    welcomeMessage: "Welcome to our premium selection. How may I assist you today?",
    primaryColor: "#FFD700",
    secondaryColor: "#FFFFFF",
    fontFamily: "Playfair Display, serif",
    borderRadius: "8px",
    provider: "xai",
    model: "claude-haiku",
    temperature: 0.5,
    maxTokens: 1024,
    systemPrompt: "You are an elegant and sophisticated AI assistant specializing in product recommendations.",
    theme: "light",
    isPublic: false,
    enableVoice: false,
    enableImageGeneration: true,
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json(chatbots)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Chatbot name is required" }, { status: 400 })
    }

    // Create a new chatbot
    const newChatbot = {
      id: `lux-${Date.now()}`,
      name: body.name || "New Chatbot",
      description: body.description || "",
      style: body.style || "Professional",
      messages: 0,
      lastUpdated: new Date().toISOString(),
      status: "active",
      welcomeMessage: body.welcomeMessage || "Hello! How can I assist you today?",
      primaryColor: body.primaryColor || "#7C3AED",
      secondaryColor: body.secondaryColor || "#6D28D9",
      fontFamily: body.fontFamily || "Inter, sans-serif",
      borderRadius: body.borderRadius || "12px",
      provider: body.provider || "openai",
      model: body.model || "gpt-3.5-turbo",
      temperature: body.temperature || 0.7,
      maxTokens: body.maxTokens || 1024,
      systemPrompt: body.systemPrompt || "You are a helpful AI assistant.",
      theme: body.theme || "dark",
      isPublic: body.isPublic !== undefined ? body.isPublic : true,
      enableVoice: body.enableVoice !== undefined ? body.enableVoice : false,
      enableImageGeneration: body.enableImageGeneration !== undefined ? body.enableImageGeneration : false,
    }

    // Add the new chatbot to our list
    chatbots.push(newChatbot)

    return NextResponse.json(newChatbot)
  } catch (error) {
    console.error("Error creating chatbot:", error)
    return NextResponse.json({ error: "Failed to create chatbot" }, { status: 500 })
  }
}

