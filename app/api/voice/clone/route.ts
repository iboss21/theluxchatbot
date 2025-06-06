import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, audioUrl } = await request.json()

    if (!chatbotId || !audioUrl) {
      return NextResponse.json({ error: "Chatbot ID and audio URL are required" }, { status: 400 })
    }

    // Call ElevenLabs API for voice cloning
    // This is a simplified example - in a real app, you'd use the actual ElevenLabs API
    const response = await fetch("https://api.elevenlabs.io/v1/voice-cloning", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ELEVENLABS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio_url: audioUrl }),
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    const result = await response.json()
    const voiceId = result.voice_id

    // Update voice settings with custom voice ID
    await db.execute(
      `UPDATE voice_settings 
       SET custom_voice_id = $1 
       WHERE chatbot_id = $2`,
      [voiceId, chatbotId],
    )

    return NextResponse.json({ customVoiceId: voiceId })
  } catch (error) {
    console.error("Error cloning voice:", error)
    return NextResponse.json({ error: "Failed to clone voice" }, { status: 500 })
  }
}

