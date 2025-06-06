import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, feature, cost } = await request.json()

    if (!userId || !feature || cost === undefined) {
      return NextResponse.json({ error: "User ID, feature, and cost are required" }, { status: 400 })
    }

    // Get current points
    const userPointsResult = await db.query("SELECT * FROM points WHERE user_id = $1", [userId])

    if (userPointsResult.rows.length === 0) {
      return NextResponse.json({ error: "User has no points" }, { status: 400 })
    }

    const currentBalance = userPointsResult.rows[0].balance

    // Check if user has enough points
    if (currentBalance < cost) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 })
    }

    const newBalance = currentBalance - cost

    // Create transaction record
    const transaction = {
      action: `redeem_${feature}`,
      points: -cost,
      timestamp: new Date().toISOString(),
    }

    // Get existing transactions
    let transactions = userPointsResult.rows[0].transactions_json

    // Parse if it's a string
    if (typeof transactions === "string") {
      transactions = JSON.parse(transactions)
    }

    // Add new transaction
    transactions.push(transaction)

    // Update points
    await db.execute(
      `UPDATE points 
       SET balance = $1, transactions_json = $2, updated_at = NOW() 
       WHERE user_id = $3`,
      [newBalance, JSON.stringify(transactions), userId],
    )

    // Add feature to user
    await db.execute(
      `INSERT INTO user_features (user_id, feature) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, feature) 
       DO UPDATE SET activated_at = NOW()`,
      [userId, feature],
    )

    return NextResponse.json({ status: "ok", newBalance })
  } catch (error) {
    console.error("Error redeeming points:", error)
    return NextResponse.json({ error: "Failed to redeem points" }, { status: 500 })
  }
}

