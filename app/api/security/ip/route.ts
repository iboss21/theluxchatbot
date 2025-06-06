import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { ip, action } = await request.json()

    if (!ip || !action) {
      return NextResponse.json({ error: "IP and action are required" }, { status: 400 })
    }

    // Validate action
    if (!["whitelist", "blacklist"].includes(action)) {
      return NextResponse.json({ error: "Action must be whitelist or blacklist" }, { status: 400 })
    }

    // Store IP rule
    await db.execute(
      `INSERT INTO ip_rules (ip, action) 
       VALUES ($1, $2) 
       ON CONFLICT (ip) 
       DO UPDATE SET action = $2`,
      [ip, action],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error setting IP rule:", error)
    return NextResponse.json({ error: "Failed to set IP rule" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Get IP rules
    const rules = await db.query(
      `SELECT ip, action, created_at 
       FROM ip_rules 
       ORDER BY created_at DESC`,
    )

    return NextResponse.json({ rules: rules.rows })
  } catch (error) {
    console.error("Error fetching IP rules:", error)
    return NextResponse.json({ error: "Failed to fetch IP rules" }, { status: 500 })
  }
}

