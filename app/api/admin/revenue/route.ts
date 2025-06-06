import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { type, amount } = await request.json()

    if (!type || amount === undefined) {
      return NextResponse.json({ error: "Type and amount are required" }, { status: 400 })
    }

    // Validate type
    if (!["subscription", "marketplace", "overage"].includes(type)) {
      return NextResponse.json({ error: "Type must be subscription, marketplace, or overage" }, { status: 400 })
    }

    // Record revenue
    await db.execute(
      `INSERT INTO revenue (type, amount) 
       VALUES ($1, $2)`,
      [type, amount],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error recording revenue:", error)
    return NextResponse.json({ error: "Failed to record revenue" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Get revenue data
    const revenue = await db.query(
      `SELECT type, amount, timestamp 
       FROM revenue 
       ORDER BY timestamp DESC 
       LIMIT 100`,
    )

    // Calculate totals
    const totals = await db.query(
      `SELECT type, SUM(amount) as total 
       FROM revenue 
       GROUP BY type`,
    )

    return NextResponse.json({
      revenue: revenue.rows,
      totals: totals.rows,
    })
  } catch (error) {
    console.error("Error fetching revenue:", error)
    return NextResponse.json({ error: "Failed to fetch revenue" }, { status: 500 })
  }
}

