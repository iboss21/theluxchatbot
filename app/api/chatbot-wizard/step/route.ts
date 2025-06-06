import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { sessionId, step, data } = await request.json()

    if (!sessionId || step === undefined || !data) {
      return NextResponse.json({ error: "Session ID, step, and data are required" }, { status: 400 })
    }

    // Validate the session exists
    const session = await db.query("SELECT * FROM wizard_sessions WHERE id = $1", [sessionId])

    if (!session.rows.length) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Update the wizard session with the new step data
    await db.execute(
      `UPDATE wizard_sessions 
       SET step = $1, data = $2 
       WHERE id = $3`,
      [step + 1, JSON.stringify(data), sessionId],
    )

    return NextResponse.json({ status: "ok", nextStep: step + 1 })
  } catch (error) {
    console.error("Error updating chatbot wizard step:", error)
    return NextResponse.json({ error: "Failed to update wizard step" }, { status: 500 })
  }
}

