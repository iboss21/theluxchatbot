import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, layout } = await request.json()

    if (!userId || !layout) {
      return NextResponse.json({ error: "User ID and layout are required" }, { status: 400 })
    }

    // Save dashboard layout
    await db.execute(
      `INSERT INTO dashboards (user_id, layout_json) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id) 
       DO UPDATE SET layout_json = $2, updated_at = NOW()`,
      [userId, JSON.stringify(layout)],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error saving dashboard layout:", error)
    return NextResponse.json({ error: "Failed to save dashboard layout" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get dashboard layout
    const dashboardResult = await db.query(
      `SELECT layout_json, updated_at 
       FROM dashboards 
       WHERE user_id = $1`,
      [userId],
    )

    if (dashboardResult.rows.length === 0) {
      return NextResponse.json({
        layout: {},
        updatedAt: null,
      })
    }

    const dashboard = dashboardResult.rows[0]

    return NextResponse.json({
      layout: dashboard.layout_json,
      updatedAt: dashboard.updated_at,
    })
  } catch (error) {
    console.error("Error fetching dashboard layout:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard layout" }, { status: 500 })
  }
}

