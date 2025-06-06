import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, itemId } = await request.json()

    if (!userId || !itemId) {
      return NextResponse.json({ error: "User ID and item ID are required" }, { status: 400 })
    }

    // Get item details
    const itemResult = await db.query(
      `SELECT * FROM marketplace_items 
       WHERE id = $1 AND status = 'approved'`,
      [itemId],
    )

    if (itemResult.rows.length === 0) {
      return NextResponse.json({ error: "Item not found or not approved" }, { status: 404 })
    }

    const item = itemResult.rows[0]

    // In a real app, you would process payment here
    // For this example, we'll just simulate a successful payment

    // Record the purchase
    await db.execute(
      `INSERT INTO user_items (user_id, item_id) 
       VALUES ($1, $2)`,
      [userId, itemId],
    )

    // Update developer earnings (80% of price)
    const commission = item.price * 0.2
    const developerEarnings = item.price - commission

    await db.execute(
      `UPDATE marketplace_items 
       SET developer_earnings = developer_earnings + $1 
       WHERE id = $2`,
      [developerEarnings, itemId],
    )

    // Record revenue
    await db.execute(
      `INSERT INTO revenue (type, amount) 
       VALUES ('marketplace', $1)`,
      [commission],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error purchasing item:", error)
    return NextResponse.json({ error: "Failed to purchase item" }, { status: 500 })
  }
}

