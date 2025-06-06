import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, language, pitch, speed, emotion } = await request.json()

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Validate inputs
    if (pitch !== undefined && (pitch < 0 || pitch > 100)) {
      return NextResponse.json({ error: "Pitch must be between 0 and 100" }, { status: 400 })
    }

    if (speed !== undefined && (speed < 0.5 || speed > 2.0)) {
      return NextResponse.json({ error: "Speed must be between 0.5 and 2.0" }, { status: 400 })
    }

    // Create or update voice settings
    await db.execute(
      `INSERT INTO voice_settings (
        chatbot_id, language, pitch, speed, emotion
      ) VALUES ($1, $2, $3, $4, $5) 
      ON CONFLICT (chatbot_id) 
      DO UPDATE SET 
        language = COALESCE($2, voice_settings.language),
        pitch = COALESCE($3, voice_settings.pitch),
        speed = COALESCE($4, voice_settings.speed),
        emotion = COALESCE($5, voice_settings.emotion)`,
      [
        chatbotId,
        language || "English",
        pitch !== undefined ? pitch : 50,
        speed !== undefined ? speed : 1.0,
        emotion || "Neutral",
      ],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error updating voice settings:", error)
    return NextResponse.json({ error: "Failed to update voice settings" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get voice settings
    const settingsResult = await db.query(
      `SELECT language, pitch, speed, emotion, custom_voice_id 
       FROM voice_settings 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    if (settingsResult.rows.length === 0) {
      return NextResponse.json({
        language: "English",
        pitch: 50,
        speed: 1.0,
        emotion: "Neutral",
        customVoiceId: null,
      })
    }

    const settings = settingsResult.rows[0]

    return NextResponse.json({
      language: settings.language,
      pitch: settings.pitch,
      speed: settings.speed,
      emotion: settings.emotion,
      customVoiceId: settings.custom_voice_id,
    })
  } catch (error) {
    console.error("Error fetching voice settings:", error)
    return NextResponse.json({ error: "Failed to fetch voice settings" }, { status: 500 })
  }
}

