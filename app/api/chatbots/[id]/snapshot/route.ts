import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { config } = await request.json()

    if (!config) {
      return NextResponse.json({ error: "Config is required" }, { status: 400 })
    }

    // Create a new snapshot
    const snapshotResult = await db.query(
      `INSERT INTO snapshots (chatbot_id, config_json) 
       VALUES ($1, $2) RETURNING id`,
      [id, JSON.stringify(config)],
    )

    const snapshotId = snapshotResult.rows[0].id

    // Check if we need to delete old snapshots (keep max 50)
    const countResult = await db.query("SELECT COUNT(*) FROM snapshots WHERE chatbot_id = $1", [id])

    const count = Number.parseInt(countResult.rows[0].count)

    if (count > 50) {
      // Delete the oldest snapshots
      await db.execute(
        `DELETE FROM snapshots 
         WHERE id IN (
           SELECT id FROM snapshots 
           WHERE chatbot_id = $1 
           ORDER BY timestamp ASC 
           LIMIT $2
         )`,
        [id, count - 50],
      )
    }

    return NextResponse.json({ snapshotId })
  } catch (error) {
    console.error("Error creating snapshot:", error)
    return NextResponse.json({ error: "Failed to create snapshot" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get all snapshots for this chatbot
    const snapshots = await db.query(
      `SELECT id, config_json, timestamp 
       FROM snapshots 
       WHERE chatbot_id = $1 
       ORDER BY timestamp DESC`,
      [id],
    )

    return NextResponse.json({ snapshots: snapshots.rows })
  } catch (error) {
    console.error("Error fetching snapshots:", error)
    return NextResponse.json({ error: "Failed to fetch snapshots" }, { status: 500 })
  }
}

