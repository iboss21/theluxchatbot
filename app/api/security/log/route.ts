import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { type, ip } = await request.json()

    if (!type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 })
    }

    // Store security log
    await db.execute(
      `INSERT INTO security_logs (type, ip) 
       VALUES ($1, $2)`,
      [type, ip || null],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error logging security event:", error)
    return NextResponse.json({ error: "Failed to log security event" }, { status: 500 })
  }
}

