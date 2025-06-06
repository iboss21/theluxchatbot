import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params
    const { action } = await request.json()

    if (!action) {
      return NextResponse.json({ error: "Action is required" }, { status: 400 })
    }

    // Validate action
    if (!["suspend", "activate", "upgrade", "downgrade"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Perform action
    switch (action) {
      case "suspend":
        await db.execute(
          `UPDATE users 
           SET status = 'suspended' 
           WHERE id = $1`,
          [userId],
        )
        break

      case "activate":
        await db.execute(
          `UPDATE users 
           SET status = 'active' 
           WHERE id = $1`,
          [userId],
        )
        break

      case "upgrade":
        await db.execute(
          `UPDATE users 
           SET plan = 'pro' 
           WHERE id = $1`,
          [userId],
        )
        break

      case "downgrade":
        await db.execute(
          `UPDATE users 
           SET plan = 'free' 
           WHERE id = $1`,
          [userId],
        )
        break
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error performing admin action:", error)
    return NextResponse.json({ error: "Failed to perform admin action" }, { status: 500 })
  }
}

