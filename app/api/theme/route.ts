import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, theme } = await request.json()

    if (!userId || !theme) {
      return NextResponse.json({ error: "User ID and theme are required" }, { status: 400 })
    }

    // Validate theme
    if (!["light", "dark", "system"].includes(theme)) {
      return NextResponse.json({ error: "Theme must be light, dark, or system" }, { status: 400 })
    }

    // Update user theme
    await db.execute(
      `UPDATE users 
       SET theme = $1 
       WHERE id = $2`,
      [theme, userId],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error updating theme:", error)
    return NextResponse.json({ error: "Failed to update theme" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user theme
    const userResult = await db.query("SELECT theme FROM users WHERE id = $1", [userId])

    if (userResult.rows.length === 0) {
      return NextResponse.json({ theme: "dark" })
    }

    return NextResponse.json({ theme: userResult.rows[0].theme })
  } catch (error) {
    console.error("Error fetching theme:", error)
    return NextResponse.json({ error: "Failed to fetch theme" }, { status: 500 })
  }
}

