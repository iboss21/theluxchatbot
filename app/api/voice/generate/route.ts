import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, text } = await request.json()

    if (!chatbotId || !text) {
      return NextResponse.json({ error: "Chatbot ID and text are required" }, { status: 400 })
    }

    // Get voice settings
    const settingsResult = await db.query(
      `SELECT language, pitch, speed, emotion, custom_voice_id 
       FROM voice_settings 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    const settings =
      settingsResult.rows.length > 0
        ? settingsResult.rows[0]
        : {
            language: "English",
            pitch: 50,
            speed: 1.0,
            emotion: "Neutral",
            custom_voice_id: null,
          }

    // Call ElevenLabs API for text-to-speech
    // This is a simplified example - in a real app, you'd use the actual ElevenLabs API
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ELEVENLABS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice_id: settings.custom_voice_id || "default",
        language: settings.language,
        pitch: settings.pitch / 50, // Convert to ElevenLabs scale
        speed: settings.speed,
      }),
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    // Get audio as buffer
    const audioBuffer = await response.arrayBuffer()

    // Return audio
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mp3",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating voice:", error)
    return NextResponse.json({ error: "Failed to generate voice" }, { status: 500 })
  }
}

