import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import * as crypto from "crypto"
import { sign } from "jsonwebtoken"

// Improved error handling and connection management
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Special case for demo account
    if (email === "demo@thelux.app" && password === "demo123") {
      const demoUser = {
        id: "demo-user-id",
        email: "demo@thelux.app",
        name: "Demo User",
        role: "admin",
        tier: "pro",
        permissions: ["view_analytics", "manage_chatbots", "access_features"],
        isSuperAdmin: false,
        hasUnlimitedAccess: true,
        createdAt: new Date().toISOString(),
      }

      const token = sign(
        {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          tier: demoUser.tier,
          permissions: demoUser.permissions,
        },
        process.env.JWT_SECRET || "thelux-jwt-secret",
        { expiresIn: "7d" },
      )

      return NextResponse.json({
        success: true,
        data: {
          user: demoUser,
          token,
        },
      })
    }

    // Connect to database with error handling
    let sql
    try {
      sql = neon(process.env.DATABASE_URL || "")
    } catch (dbConnectError) {
      console.error("Database connection error:", dbConnectError)
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Check if users table exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          tier VARCHAR(50) NOT NULL DEFAULT 'free',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP WITH TIME ZONE,
          is_email_verified BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          login_count INTEGER DEFAULT 0
        )
      `
    } catch (tableError) {
      console.error("Error checking/creating users table:", tableError)
      // Continue anyway, table might already exist
    }

    // Get user from database
    let user
    try {
      const result = await sql`SELECT * FROM users WHERE email = ${email}`
      if (result.length === 0) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
      user = result[0]
    } catch (queryError) {
      console.error("Error querying user:", queryError)
      return NextResponse.json({ error: "Failed to retrieve user information" }, { status: 500 })
    }

    // Verify password
    try {
      const hash = crypto.pbkdf2Sync(password, user.password_salt, 1000, 64, "sha512").toString("hex")

      if (hash !== user.password_hash) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
    } catch (passwordError) {
      console.error("Error verifying password:", passwordError)
      return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
    }

    // Update last login time
    try {
      await sql`
        UPDATE users 
        SET last_login = NOW(), login_count = login_count + 1 
        WHERE id = ${user.id}
      `
    } catch (updateError) {
      console.error("Error updating last login:", updateError)
      // Continue anyway, this is not critical
    }

    // Get user permissions
    let permissions = []
    try {
      const permissionsResult = await sql`
        SELECT permission FROM user_permissions WHERE user_id = ${user.id}
      `
      permissions = permissionsResult.map((row) => row.permission)
    } catch (permissionsError) {
      console.error("Error fetching permissions:", permissionsError)
      // Continue anyway, permissions might not be set up yet
    }

    // Create JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        tier: user.tier,
        permissions,
      },
      process.env.JWT_SECRET || "thelux-jwt-secret",
      { expiresIn: "7d" },
    )

    // Prepare user data to return (omit sensitive fields)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tier: user.tier,
      permissions,
      isSuperAdmin: user.role === "super_admin",
      hasUnlimitedAccess: user.tier === "unlimited" || user.role === "super_admin",
      createdAt: user.created_at,
    }

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
        token,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

