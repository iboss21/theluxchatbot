import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { referrerId, newUserId, amount } = await request.json()

    if (!referrerId || !newUserId || amount === undefined) {
      return NextResponse.json({ error: "Referrer ID, new user ID, and amount are required" }, { status: 400 })
    }

    // Calculate commission (10% of amount)
    const commission = amount * 0.1

    // Get current earnings
    const affiliateResult = await db.query("SELECT * FROM affiliates WHERE user_id = $1", [referrerId])

    if (affiliateResult.rows.length === 0) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 })
    }

    const currentEarnings = affiliateResult.rows[0].earnings || 0
    const newEarnings = currentEarnings + commission

    // Update earnings
    await db.execute(
      `UPDATE affiliates 
       SET earnings = $1 
       WHERE user_id = $2`,
      [newEarnings, referrerId],
    )

    return NextResponse.json({ newEarnings })
  } catch (error) {
    console.error("Error processing affiliate commission:", error)
    return NextResponse.json({ error: "Failed to process affiliate commission" }, { status: 500 })
  }
}

