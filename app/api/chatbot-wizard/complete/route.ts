import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Get the session data
    const sessionResult = await db.query("SELECT * FROM wizard_sessions WHERE id = $1", [sessionId])

    if (!sessionResult.rows.length) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    const session = sessionResult.rows[0]
    const { user_id, data } = session
    const parsedData = typeof data === "string" ? JSON.parse(data) : data

    const { name, purpose, style, personality, platforms } = parsedData

    // Create the chatbot
    const chatbotResult = await db.query(
      `INSERT INTO chatbots (
        user_id, name, purpose, style, 
        personality_json, platforms_json, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id`,
      [user_id, name, purpose, style, JSON.stringify(personality || {}), JSON.stringify(platforms || [])],
    )

    const chatbotId = chatbotResult.rows[0].id

    // Clean up the wizard session
    await db.execute("DELETE FROM wizard_sessions WHERE id = $1", [sessionId])

    return NextResponse.json({ chatbotId })
  } catch (error) {
    console.error("Error completing chatbot wizard:", error)
    return NextResponse.json({ error: "Failed to complete wizard" }, { status: 500 })
  }
}

