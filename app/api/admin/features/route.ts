import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, enabled, userId } = await request.json()

    if (!name || enabled === undefined) {
      return NextResponse.json({ error: "Feature name and enabled status are required" }, { status: 400 })
    }

    // Toggle feature
    if (userId) {
      // User-specific toggle
      await db.execute(
        `INSERT INTO features (name, enabled, user_id) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (name, user_id) 
         DO UPDATE SET enabled = $2`,
        [name, enabled, userId],
      )
    } else {
      // Global toggle
      await db.execute(
        `INSERT INTO features (name, enabled) 
         VALUES ($1, $2) 
         ON CONFLICT (name) 
         DO UPDATE SET enabled = $2`,
        [name, enabled],
      )
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error toggling feature:", error)
    return NextResponse.json({ error: "Failed to toggle feature" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Get all features
    const features = await db.query(
      `SELECT name, enabled, user_id, created_at 
       FROM features 
       ORDER BY name, user_id`,
    )

    return NextResponse.json({ features: features.rows })
  } catch (error) {
    console.error("Error fetching features:", error)
    return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 })
  }
}

