import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, action, points } = await request.json()

    if (!userId || !action || points === undefined) {
      return NextResponse.json({ error: "User ID, action, and points are required" }, { status: 400 })
    }

    // Get current points
    const userPointsResult = await db.query("SELECT * FROM points WHERE user_id = $1", [userId])

    const currentBalance = userPointsResult.rows.length > 0 ? userPointsResult.rows[0].balance : 0

    const newBalance = currentBalance + points

    // Create transaction record
    const transaction = {
      action,
      points,
      timestamp: new Date().toISOString(),
    }

    // Update or insert points
    if (userPointsResult.rows.length > 0) {
      // Get existing transactions
      let transactions = userPointsResult.rows[0].transactions_json

      // Parse if it's a string
      if (typeof transactions === "string") {
        transactions = JSON.parse(transactions)
      }

      // Add new transaction
      transactions.push(transaction)

      // Update record
      await db.execute(
        `UPDATE points 
         SET balance = $1, transactions_json = $2, updated_at = NOW() 
         WHERE user_id = $3`,
        [newBalance, JSON.stringify(transactions), userId],
      )
    } else {
      // Insert new record
      await db.execute(
        `INSERT INTO points (user_id, balance, transactions_json) 
         VALUES ($1, $2, $3)`,
        [userId, newBalance, JSON.stringify([transaction])],
      )
    }

    return NextResponse.json({ newBalance })
  } catch (error) {
    console.error("Error earning points:", error)
    return NextResponse.json({ error: "Failed to earn points" }, { status: 500 })
  }
}

