import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId } = await request.json()

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get recent sessions for this chatbot
    const sessions = await db.query(
      `SELECT * FROM sessions 
       WHERE chatbot_id = $1 
       AND updated_at > NOW() - INTERVAL '7 days'`,
      [chatbotId],
    )

    // Simple prediction logic - in a real app, you'd use more sophisticated ML
    let churnRisk = 10 // Default low risk
    let suggestion = "No action needed"

    if (sessions.rows.length > 0) {
      // Calculate average message count per session
      const totalMessages = sessions.rows.reduce((sum, session) => {
        const messages =
          typeof session.messages_json === "string" ? JSON.parse(session.messages_json) : session.messages_json
        return sum + messages.length
      }, 0)

      const avgMessages = totalMessages / sessions.rows.length

      // Simple rule-based prediction
      if (avgMessages < 3) {
        churnRisk = 70
        suggestion = "Users are leaving conversations early. Try more engaging welcome messages."
      } else if (avgMessages < 5) {
        churnRisk = 40
        suggestion = "Moderate engagement. Consider adding more interactive elements."
      } else if (sessions.rows.length < 3) {
        churnRisk = 30
        suggestion = "Low session count. Promote your chatbot more widely."
      }
    } else {
      churnRisk = 90
      suggestion = "No recent sessions. Your chatbot may need promotion or redesign."
    }

    // Store the prediction
    await db.execute(
      `INSERT INTO predictions (chatbot_id, churn_risk, suggestion) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (chatbot_id) 
       DO UPDATE SET churn_risk = $2, suggestion = $3, updated_at = NOW()`,
      [chatbotId, churnRisk, suggestion],
    )

    return NextResponse.json({ churnRisk, suggestion })
  } catch (error) {
    console.error("Error generating prediction:", error)
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get prediction for a chatbot
    const predictionResult = await db.query(
      `SELECT churn_risk, suggestion, updated_at 
       FROM predictions 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    if (predictionResult.rows.length === 0) {
      return NextResponse.json({
        churnRisk: null,
        suggestion: null,
        updatedAt: null,
      })
    }

    const prediction = predictionResult.rows[0]

    return NextResponse.json({
      churnRisk: prediction.churn_risk,
      suggestion: prediction.suggestion,
      updatedAt: prediction.updated_at,
    })
  } catch (error) {
    console.error("Error fetching prediction:", error)
    return NextResponse.json({ error: "Failed to fetch prediction" }, { status: 500 })
  }
}

