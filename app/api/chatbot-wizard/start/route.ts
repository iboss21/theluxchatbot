import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const sessionId = uuidv4()

    // Store the wizard session in the database
    await db.execute(
      `INSERT INTO wizard_sessions (id, user_id, step, data) 
       VALUES ($1, $2, $3, $4)`,
      [sessionId, userId, 1, JSON.stringify({})],
    )

    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error("Error starting chatbot wizard:", error)
    return NextResponse.json({ error: "Failed to start chatbot wizard" }, { status: 500 })
  }
}

