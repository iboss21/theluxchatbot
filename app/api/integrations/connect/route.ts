import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, apiName, token } = await request.json()

    if (!userId || !apiName) {
      return NextResponse.json({ error: "User ID and API name are required" }, { status: 400 })
    }

    // Store integration
    await db.execute(
      `INSERT INTO integrations (user_id, api_name, token) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id, api_name) 
       DO UPDATE SET token = $3`,
      [userId, apiName, token || null],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error connecting integration:", error)
    return NextResponse.json({ error: "Failed to connect integration" }, { status: 500 })
  }
}

