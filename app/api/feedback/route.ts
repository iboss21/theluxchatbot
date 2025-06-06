import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, userId, rating } = await request.json()

    if (!chatbotId || !userId || !rating) {
      return NextResponse.json({ error: "Chatbot ID, user ID, and rating are required" }, { status: 400 })
    }

    // Validate rating
    if (!["positive", "neutral", "negative"].includes(rating)) {
      return NextResponse.json({ error: "Rating must be positive, neutral, or negative" }, { status: 400 })
    }

    // Store feedback
    await db.execute(
      `INSERT INTO feedback (chatbot_id, user_id, rating) 
       VALUES ($1, $2, $3)`,
      [chatbotId, userId, rating],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get feedback for a chatbot
    const feedback = await db.query(
      `SELECT user_id, rating, timestamp 
       FROM feedback 
       WHERE chatbot_id = $1 
       ORDER BY timestamp DESC`,
      [chatbotId],
    )

    return NextResponse.json({ feedback: feedback.rows })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}

