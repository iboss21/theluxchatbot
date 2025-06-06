import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  try {
    const { userId, chatbotId, message } = await request.json()

    if (!userId || !chatbotId || !message) {
      return NextResponse.json({ error: "User ID, chatbot ID, and message are required" }, { status: 400 })
    }

    // Get chatbot configuration
    const chatbotResult = await db.query("SELECT * FROM chatbots WHERE id = $1", [chatbotId])

    if (chatbotResult.rows.length === 0) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 })
    }

    const chatbot = chatbotResult.rows[0]

    // Get or create session
    const sessionResult = await db.query("SELECT * FROM sessions WHERE user_id = $1 AND chatbot_id = $2", [
      userId,
      chatbotId,
    ])

    let messages = []

    if (sessionResult.rows.length > 0) {
      // Existing session
      messages = sessionResult.rows[0].messages_json

      // Parse if it's a string
      if (typeof messages === "string") {
        messages = JSON.parse(messages)
      }
    }

    // Add user message to history
    messages.push({ role: "user", content: message })

    // Limit context window to last 10 messages
    if (messages.length > 10) {
      messages = messages.slice(-10)
    }

    // Get personality from chatbot
    const personality = chatbot.personality_json
    let systemPrompt = "You are a helpful chatbot."

    // Parse if it's a string
    if (typeof personality === "string") {
      const parsedPersonality = JSON.parse(personality)

      // Create system prompt based on personality
      if (parsedPersonality) {
        const witty = parsedPersonality.witty || 50
        const formal = parsedPersonality.formal || 50
        const friendly = parsedPersonality.friendly || 50

        systemPrompt = `You are a chatbot with the following personality traits:
- Witty: ${witty}% (${witty > 70 ? "very witty" : witty > 40 ? "moderately witty" : "not very witty"})
- Formal: ${formal}% (${formal > 70 ? "very formal" : formal > 40 ? "moderately formal" : "casual"})
- Friendly: ${friendly}% (${friendly > 70 ? "very friendly" : friendly > 40 ? "moderately friendly" : "reserved"})

Your purpose is to ${chatbot.purpose || "help users"}.`
      }
    }

    // Generate response with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    })

    const botMessage = completion.choices[0].message.content

    // Add bot message to history
    messages.push({ role: "assistant", content: botMessage })

    // Update or create session
    if (sessionResult.rows.length > 0) {
      await db.execute(
        `UPDATE sessions 
         SET messages_json = $1, updated_at = NOW() 
         WHERE user_id = $2 AND chatbot_id = $3`,
        [JSON.stringify(messages), userId, chatbotId],
      )
    } else {
      await db.execute(
        `INSERT INTO sessions (user_id, chatbot_id, messages_json) 
         VALUES ($1, $2, $3)`,
        [userId, chatbotId, JSON.stringify(messages)],
      )
    }

    return NextResponse.json({ response: botMessage })
  } catch (error) {
    console.error("Error processing message:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

