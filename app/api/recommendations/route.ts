import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId } = await request.json()

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get data for generating recommendations
    const dropOffsResult = await db.query(
      `SELECT COUNT(*) 
       FROM interactions 
       WHERE chatbot_id = $1 AND step = 1 AND completed = false`,
      [chatbotId],
    )

    const dropOffs = Number.parseInt(dropOffsResult.rows[0].count)

    // Generate recommendation based on data
    let suggestion = "No action needed"

    if (dropOffs > 20) {
      suggestion = "High drop-off rate after first message. Consider shortening your welcome message."
    } else if (dropOffs > 10) {
      suggestion = "Moderate drop-off rate. Try making your welcome message more engaging."
    }

    // Store recommendation
    await db.execute(
      `INSERT INTO recommendations (chatbot_id, suggestion) 
       VALUES ($1, $2)`,
      [chatbotId, suggestion],
    )

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error("Error generating recommendation:", error)
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get recommendations for a chatbot
    const recommendations = await db.query(
      `SELECT suggestion, timestamp 
       FROM recommendations 
       WHERE chatbot_id = $1 
       ORDER BY timestamp DESC 
       LIMIT 5`,
      [chatbotId],
    )

    return NextResponse.json({
      suggestions: recommendations.rows.map((r) => r.suggestion),
    })
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}

