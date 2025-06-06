import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, userId } = await request.json()

    if (!chatbotId || !userId) {
      return NextResponse.json({ error: "Chatbot ID and user ID are required" }, { status: 400 })
    }

    // Check if user has already voted
    const existingVote = await db.query(
      `SELECT * FROM votes 
       WHERE chatbot_id = $1 AND user_id = $2`,
      [chatbotId, userId],
    )

    if (existingVote.rows.length > 0) {
      return NextResponse.json({ error: "User has already voted for this chatbot" }, { status: 400 })
    }

    // Record vote
    await db.execute(
      `INSERT INTO votes (chatbot_id, user_id) 
       VALUES ($1, $2)`,
      [chatbotId, userId],
    )

    // Update spotlight
    await db.execute(
      `INSERT INTO spotlight (chatbot_id, votes) 
       VALUES ($1, 1) 
       ON CONFLICT (chatbot_id) 
       DO UPDATE SET votes = spotlight.votes + 1`,
      [chatbotId],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error voting for chatbot:", error)
    return NextResponse.json({ error: "Failed to vote for chatbot" }, { status: 500 })
  }
}

