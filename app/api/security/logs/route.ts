import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get security logs
    const logs = await db.query(
      `SELECT type, ip, timestamp 
       FROM security_logs 
       ORDER BY timestamp DESC 
       LIMIT 100`,
    )

    return NextResponse.json({ logs: logs.rows })
  } catch (error) {
    console.error("Error fetching security logs:", error)
    return NextResponse.json({ error: "Failed to fetch security logs" }, { status: 500 })
  }
}

