import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { messageId, text } = await request.json()

    if (!messageId || !text) {
      return NextResponse.json({ error: "Message ID and text are required" }, { status: 400 })
    }

    // Call HuggingFace API for intent recognition
    // This is a simplified example - in a real app, you'd use the actual HuggingFace API
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels: ["Question", "Complaint", "Purchase", "Greeting", "Farewell"],
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`)
    }

    const result = await response.json()

    // Get top intent
    const intent = result.labels[0]
    const confidence = result.scores[0]

    // Store intent in database
    await db.execute(
      `INSERT INTO intents (message_id, intent, confidence) 
       VALUES ($1, $2, $3)`,
      [messageId, intent, confidence],
    )

    return NextResponse.json({ intent, confidence })
  } catch (error) {
    console.error("Error detecting intent:", error)
    return NextResponse.json({ error: "Failed to detect intent" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get intents for a chatbot
    const intents = await db.query(
      `SELECT i.message_id, i.intent, i.confidence, i.created_at
       FROM intents i
       JOIN messages m ON i.message_id = m.id
       WHERE m.chatbot_id = $1
       ORDER BY i.created_at DESC`,
      [chatbotId],
    )

    return NextResponse.json({ intents: intents.rows })
  } catch (error) {
    console.error("Error fetching intents:", error)
    return NextResponse.json({ error: "Failed to fetch intents" }, { status: 500 })
  }
}

