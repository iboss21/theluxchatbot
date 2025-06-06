import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { activeHours, fallbackMessage } = await request.json()

    if (!activeHours) {
      return NextResponse.json({ error: "Active hours are required" }, { status: 400 })
    }

    // Create or update schedule
    await db.execute(
      `INSERT INTO schedules (chatbot_id, active_hours_json, fallback_message) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (chatbot_id) 
       DO UPDATE SET active_hours_json = $2, fallback_message = $3`,
      [id, JSON.stringify(activeHours), fallbackMessage || null],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error setting schedule:", error)
    return NextResponse.json({ error: "Failed to set schedule" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get schedule
    const scheduleResult = await db.query(
      `SELECT active_hours_json, fallback_message 
       FROM schedules 
       WHERE chatbot_id = $1`,
      [id],
    )

    if (scheduleResult.rows.length === 0) {
      return NextResponse.json({
        activeHours: {},
        fallbackMessage: null,
      })
    }

    const schedule = scheduleResult.rows[0]

    return NextResponse.json({
      activeHours: schedule.active_hours_json,
      fallbackMessage: schedule.fallback_message,
    })
  } catch (error) {
    console.error("Error fetching schedule:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}

