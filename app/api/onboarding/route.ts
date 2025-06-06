import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Mark onboarding as complete
    await db.execute(
      `INSERT INTO onboarding (user_id, completed, completed_at) 
       VALUES ($1, true, NOW()) 
       ON CONFLICT (user_id) 
       DO UPDATE SET completed = true, completed_at = NOW()`,
      [userId],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get onboarding status
    const onboardingResult = await db.query(
      `SELECT completed, completed_at 
       FROM onboarding 
       WHERE user_id = $1`,
      [userId],
    )

    if (onboardingResult.rows.length === 0) {
      return NextResponse.json({ completed: false })
    }

    return NextResponse.json({
      completed: onboardingResult.rows[0].completed,
      completedAt: onboardingResult.rows[0].completed_at,
    })
  } catch (error) {
    console.error("Error fetching onboarding status:", error)
    return NextResponse.json({ error: "Failed to fetch onboarding status" }, { status: 500 })
  }
}

