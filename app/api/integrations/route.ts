import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get integrations
    const integrations = await db.query(
      `SELECT api_name, created_at 
       FROM integrations 
       WHERE user_id = $1`,
      [userId],
    )

    return NextResponse.json({ integrations: integrations.rows })
  } catch (error) {
    console.error("Error fetching integrations:", error)
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 })
  }
}

