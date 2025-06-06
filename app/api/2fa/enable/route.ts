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
    console.log("[2FA Enable] Build-time detected, returning placeholder response")
    return NextResponse.json({
      status: "ok",
      message: "Build-time placeholder response",
      secret: "DUMMY_SECRET_FOR_BUILD",
      otpauth: "otpauth://totp/LuxChat:user?secret=DUMMY_SECRET_FOR_BUILD&issuer=LuxChat",
    })
  }

  try {
    const { userId, method } = await request.json()

    if (!userId || !method) {
      return NextResponse.json({ error: "User ID and method are required" }, { status: 400 })
    }

    // Validate method
    if (!["app", "sms", "email"].includes(method)) {
      return NextResponse.json({ error: "Method must be app, sms, or email" }, { status: 400 })
    }

    // Generate a secret
    const secret = authenticator.generateSecret()

    try {
      // Store the secret - only in non-build environments
      const sql = getSql()
      await sql`
        UPDATE users 
        SET two_factor_enabled = true, two_factor_secret = ${secret} 
        WHERE id = ${userId}
      `
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Database operation failed" }, { status: 500 })
    }

    // For app method, return the secret for QR code generation
    if (method === "app") {
      return NextResponse.json({
        status: "ok",
        secret,
        otpauth: authenticator.keyuri(userId, "LuxChat", secret),
      })
    }

    // For SMS or email, generate a code
    const code = authenticator.generate(secret)

    // In a real app, you would send the code via SMS or email
    // For this example, we'll just return it
    return NextResponse.json({ status: "ok", code })
  } catch (error) {
    console.error("Error enabling 2FA:", error)
    return NextResponse.json({ error: "Failed to enable 2FA" }, { status: 500 })
  }
}

