import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Generate referral link
    const referralLink = `https://luxchat.app/ref/${userId}`

    // Store or update affiliate
    await db.execute(
      `INSERT INTO affiliates (user_id, referral_link) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id) 
       DO UPDATE SET referral_link = $2`,
      [userId, referralLink],
    )

    return NextResponse.json({ referralLink })
  } catch (error) {
    console.error("Error generating referral link:", error)
    return NextResponse.json({ error: "Failed to generate referral link" }, { status: 500 })
  }
}

