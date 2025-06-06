import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get top chatbots
    const chatbots = await db.query(
      `SELECT s.chatbot_id, s.votes, c.name, c.description
       FROM spotlight s
       JOIN chatbots c ON s.chatbot_id = c.id
       ORDER BY s.votes DESC
       LIMIT 10`,
    )

    return NextResponse.json({ chatbots: chatbots.rows })
  } catch (error) {
    console.error("Error fetching spotlight:", error)
    return NextResponse.json({ error: "Failed to fetch spotlight" }, { status: 500 })
  }
}

