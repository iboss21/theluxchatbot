import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, url, events } = await request.json()

    if (!chatbotId || !url || !events || !Array.isArray(events)) {
      return NextResponse.json({ error: "Chatbot ID, URL, and events array are required" }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch (e) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
    }

    // Validate events
    const validEvents = ["new_message", "session_start", "session_end", "feedback"]
    const invalidEvents = events.filter((event) => !validEvents.includes(event))

    if (invalidEvents.length > 0) {
      return NextResponse.json({ error: `Invalid events: ${invalidEvents.join(", ")}` }, { status: 400 })
    }

    // Store webhook
    await db.execute(
      `INSERT INTO webhooks (chatbot_id, url, events) 
       VALUES ($1, $2, $3)`,
      [chatbotId, url, JSON.stringify(events)],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error adding webhook:", error)
    return NextResponse.json({ error: "Failed to add webhook" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get webhooks
    const webhooks = await db.query(
      `SELECT id, url, events, created_at 
       FROM webhooks 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    return NextResponse.json({ webhooks: webhooks.rows })
  } catch (error) {
    console.error("Error fetching webhooks:", error)
    return NextResponse.json({ error: "Failed to fetch webhooks" }, { status: 500 })
  }
}

