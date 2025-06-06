import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, interactions } = await request.json()

    if (!userId || interactions === undefined) {
      return NextResponse.json({ error: "User ID and interactions are required" }, { status: 400 })
    }

    // Get user's current usage
    const usageResult = await db.query("SELECT * FROM usage WHERE user_id = $1", [userId])

    // Get user's plan
    const userResult = await db.query("SELECT plan FROM users WHERE id = $1", [userId])

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const plan = userResult.rows[0].plan || "free"

    // Determine usage limit based on plan
    let limit = 500 // Default for free plan

    if (plan === "pro") {
      limit = 50000
    } else if (plan === "enterprise") {
      limit = 500000
    }

    // Calculate current usage and overage
    let currentUsage = interactions
    let overageFee = 0

    if (usageResult.rows.length > 0) {
      currentUsage += usageResult.rows[0].interactions
      overageFee = usageResult.rows[0].overage_fee
    }

    // Calculate new overage if applicable
    if (currentUsage > limit) {
      const overage = currentUsage - limit
      overageFee += overage * 0.01 // $0.01 per interaction over limit
    }

    // Update or insert usage
    if (usageResult.rows.length > 0) {
      await db.execute(
        `UPDATE usage 
         SET interactions = $1, overage_fee = $2, updated_at = NOW() 
         WHERE user_id = $3`,
        [currentUsage, overageFee, userId],
      )
    } else {
      await db.execute(
        `INSERT INTO usage (user_id, interactions, overage_fee) 
         VALUES ($1, $2, $3)`,
        [userId, currentUsage, overageFee],
      )
    }

    return NextResponse.json({
      status: "ok",
      currentUsage,
      limit,
      overageFee,
    })
  } catch (error) {
    console.error("Error tracking usage:", error)
    return NextResponse.json({ error: "Failed to track usage" }, { status: 500 })
  }
}

