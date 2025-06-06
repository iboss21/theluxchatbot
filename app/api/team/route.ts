import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get all team members
    const team = await db.query(
      `SELECT user_id, email, role, status, invited_at 
       FROM team 
       ORDER BY invited_at DESC`,
    )

    return NextResponse.json({ team: team.rows })
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}

