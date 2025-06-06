import { NextResponse } from "next/server"
import { authenticator } from "otplib"

// Only import database in non-build environments
const isBuildTime = process.env.VERCEL_ENV === "build" || process.env.NODE_ENV === "production"
let getSql: any

if (!isBuildTime) {
  // Dynamic import to prevent build-time evaluation
  import("@/lib/db").then((module) => {
    getSql = module.getSql
  })
}

export async function POST(request: Request) {
  // During build time, return a dummy response
  if (isBuildTime) {
    console.log("[2FA Verify] Build-time detected, returning placeholder response")
    return NextResponse.json({
      status: "ok",
      message: "Build-time placeholder response",
    })
  }

  try {
    const { userId, token } = await request.json()

    if (!userId || !token) {
      return NextResponse.json({ error: "User ID and token are required" }, { status: 400 })
    }

    try {
      // Get the user's secret - only in non-build environments
      const sql = getSql()
      const result = await sql`
        SELECT two_factor_secret FROM users WHERE id = ${userId}
      `

      if (result.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const secret = result[0].two_factor_secret

      // Verify the token
      const isValid = authenticator.verify({ token, secret })

      if (!isValid) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 })
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Database operation failed" }, { status: 500 })
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error verifying 2FA:", error)
    return NextResponse.json({ error: "Failed to verify 2FA" }, { status: 500 })
  }
}

