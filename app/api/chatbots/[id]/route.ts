import { type NextRequest, NextResponse } from "next/server"

// Mock database of chatbots
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

// Function to dynamically generate a chatbot for any ID
function generateChatbotForId(id: string) {
  return {
    id,
    name: `Chatbot ${id}`,
    description: "Auto-generated chatbot",
    style: "Professional",
    messages: 0,
    lastUpdated: new Date().toISOString(),
    status: "active",
    welcomeMessage: "Hello! How can I assist you today?",
    primaryColor: "#7C3AED",
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
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // First, try to find the chatbot in our predefined list
    let chatbot = chatbots.find((bot) => bot.id === id)

    // If not found, generate a chatbot for this ID
    // This ensures we always return something for any ID
    if (!chatbot) {
      console.log(`Chatbot with ID ${id} not found in predefined list, generating one`)
      chatbot = generateChatbotForId(id)
    }

    return NextResponse.json(chatbot)
  } catch (error) {
    console.error(`Error fetching chatbot with ID ${id}:`, error)
    return NextResponse.json({ error: "Failed to fetch chatbot" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // In a real app, you would update your database
    // For now, we'll just return the updated chatbot
    const updatedChatbot = {
      id,
      name: body.name || "",
      description: body.description || "",
      style: body.style || "Professional",
      messages: body.messages || 0,
      lastUpdated: new Date().toISOString(),
      status: body.status || "active",
      welcomeMessage: body.welcomeMessage || "Hello! How can I assist you today?",
      primaryColor: body.primaryColor || "#00FFFF",
      secondaryColor: body.secondaryColor || "#FFFFFF",
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

    return NextResponse.json(updatedChatbot)
  } catch (error) {
    console.error("Error updating chatbot:", error)
    return NextResponse.json({ error: "Failed to update chatbot" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // In a real app, you would delete from your database
    // For now, we'll just return a success message
    return NextResponse.json({ message: `Chatbot ${id} deleted successfully` })
  } catch (error) {
    console.error(`Error deleting chatbot with ID ${id}:`, error)
    return NextResponse.json({ error: "Failed to delete chatbot" }, { status: 500 })
  }
}

