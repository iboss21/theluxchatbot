import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { messageId, text } = await request.json()

    if (!messageId || !text) {
      return NextResponse.json({ error: "Message ID and text are required" }, { status: 400 })
    }

    // Call HuggingFace API for sentiment analysis
    // This is a simplified example - in a real app, you'd use the actual HuggingFace API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      },
    )

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`)
    }

    const result = await response.json()
    const sentiment = result[0]

    // Convert the result to our format
    const score =
      sentiment.label === "POSITIVE" ? Math.round(sentiment.score * 100) : Math.round((1 - sentiment.score) * 100)

    const label = sentiment.label.toLowerCase()

    // Store the sentiment analysis in the database
    await db.execute(
      `INSERT INTO analytics (message_id, sentiment_score, sentiment_label) 
       VALUES ($1, $2, $3)`,
      [messageId, score, label],
    )

    return NextResponse.json({ score, label })
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get sentiment data for a chatbot
    const sentiments = await db.query(
      `SELECT a.message_id, a.sentiment_score, a.sentiment_label, a.created_at
       FROM analytics a
       JOIN messages m ON a.message_id = m.id
       WHERE m.chatbot_id = $1
       ORDER BY a.created_at DESC`,
      [chatbotId],
    )

    return NextResponse.json({ messages: sentiments.rows })
  } catch (error) {
    console.error("Error fetching sentiment data:", error)
    return NextResponse.json({ error: "Failed to fetch sentiment data" }, { status: 500 })
  }
}

