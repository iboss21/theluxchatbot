import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, type, message } = await request.json()

    if (!userId || !type || !message) {
      return NextResponse.json({ error: "User ID, type, and message are required" }, { status: 400 })
    }

    // Validate type
    if (!["system", "alert", "info"].includes(type)) {
      return NextResponse.json({ error: "Type must be system, alert, or info" }, { status: 400 })
    }

    // Store notification
    const notificationResult = await db.query(
      `INSERT INTO notifications (user_id, type, message) 
       VALUES ($1, $2, $3) 
       RETURNING id`,
      [userId, type, message],
    )

    const notificationId = notificationResult.rows[0].id

    return NextResponse.json({
      status: "ok",
      notificationId,
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get notifications
    const notifications = await db.query(
      `SELECT id, type, message, read, timestamp 
       FROM notifications 
       WHERE user_id = $1 
       ORDER BY timestamp DESC 
       LIMIT 20`,
      [userId],
    )

    return NextResponse.json({ notifications: notifications.rows })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

