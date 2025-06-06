import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's data
    const chatbots = await db.query("SELECT * FROM chatbots WHERE user_id = $1", [userId])

    const messages = await db.query(
      `SELECT m.* 
       FROM messages m 
       JOIN chatbots c ON m.chatbot_id = c.id 
       WHERE c.user_id = $1`,
      [userId],
    )

    const sessions = await db.query("SELECT * FROM sessions WHERE user_id = $1", [userId])

    const feedback = await db.query("SELECT * FROM feedback WHERE user_id = $1", [userId])

    const points = await db.query("SELECT * FROM points WHERE user_id = $1", [userId])

    // Compile the data
    const data = {
      chatbots: chatbots.rows,
      messages: messages.rows,
      sessions: sessions.rows,
      feedback: feedback.rows,
      points: points.rows,
    }

    // Return as JSON file
    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename="luxchat-export-${userId}.json"`,
      },
    })
  } catch (error) {
    console.error("Error exporting data:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}

