import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, action } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: "User ID and action are required" }, { status: 400 })
    }

    // Store log
    await db.execute(
      `INSERT INTO logs (user_id, action) 
       VALUES ($1, $2)`,
      [userId, action],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error logging action:", error)
    return NextResponse.json({ error: "Failed to log action" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Get logs
    const logs = await db.query(
      `SELECT user_id, action, timestamp 
       FROM logs 
       ORDER BY timestamp DESC 
       LIMIT 100`,
    )

    return NextResponse.json({ logs: logs.rows })
  } catch (error) {
    console.error("Error fetching logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}

