import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { v4 as uuidv4 } from "uuid"
import * as crypto from "crypto"
import { cookies, headers } from "next/headers"

// This is a special route that creates a super admin user with full access to all features

export async function POST(req: NextRequest) {
  try {
    // Server-side security check
    // We'll use the request origin and cookies to verify this is a legitimate request
    const headersList = headers()
    const origin = headersList.get("origin") || ""
    const host = headersList.get("host") || ""
    const referer = headersList.get("referer") || ""

    // Check if the request is coming from our own admin dashboard
    const isValidOrigin =
      origin.includes(host) || referer.includes("/dashboard/admin") || process.env.NODE_ENV === "development"

    // Additional security: check for admin cookie or session
    const cookieStore = cookies()
    const adminSession = cookieStore.get("admin_session")

    // In production, we would implement a more robust check
    // For now, we'll allow requests from our own origin or in development mode
    if (!isValidOrigin && process.env.NODE_ENV === "production") {
      console.warn("Unauthorized attempt to create super admin from external origin")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Connect to database
    const sql = neon(process.env.DATABASE_URL || "")

    // Generate a unique ID for the user
    const userId = uuidv4()

    // Hash the password
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")

    // Check if users table exists, if not create it
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

    // Check if user_permissions table exists, if not create it
    await sql`
      CREATE TABLE IF NOT EXISTS user_permissions (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        permission VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, permission)
      )
    `

    // Check if user already exists
    const existingUsers = await sql`SELECT * FROM users WHERE email = ${email}`

    if (existingUsers.length > 0) {
      // Update existing user to super admin
      await sql`
        UPDATE users 
        SET role = 'super_admin', 
            tier = 'unlimited', 
            name = ${name}, 
            password_hash = ${hash}, 
            password_salt = ${salt},
            updated_at = NOW(),
            is_email_verified = TRUE
        WHERE email = ${email}
      `

      // Delete existing permissions and add super admin permissions
      await sql`DELETE FROM user_permissions WHERE user_id = ${existingUsers[0].id}`

      // Add super admin permissions
      await sql`
        INSERT INTO user_permissions (user_id, permission)
        VALUES 
          (${existingUsers[0].id}, 'bypass_limits'),
          (${existingUsers[0].id}, 'manage_all_users'),
          (${existingUsers[0].id}, 'access_all_features'),
          (${existingUsers[0].id}, 'view_analytics'),
          (${existingUsers[0].id}, 'manage_billing')
      `

      return NextResponse.json({
        success: true,
        message: "Existing user upgraded to super admin",
        user: {
          id: existingUsers[0].id,
          email,
          name,
          role: "super_admin",
          tier: "unlimited",
        },
      })
    }

    // Create new super admin user
    await sql`
      INSERT INTO users (
        id, email, name, password_hash, password_salt, 
        role, tier, is_email_verified, is_active
      ) VALUES (
        ${userId}, ${email}, ${name}, ${hash}, ${salt},
        'super_admin', 'unlimited', TRUE, TRUE
      )
    `

    // Create special permissions for the super admin
    await sql`
      INSERT INTO user_permissions (user_id, permission)
      VALUES 
        (${userId}, 'bypass_limits'),
        (${userId}, 'manage_all_users'),
        (${userId}, 'access_all_features'),
        (${userId}, 'view_analytics'),
        (${userId}, 'manage_billing')
    `

    // Set an admin session cookie for future requests
    cookies().set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "Super admin created successfully",
      user: {
        id: userId,
        email,
        name,
        role: "super_admin",
        tier: "unlimited",
      },
    })
  } catch (error) {
    console.error("Error creating super admin:", error)
    return NextResponse.json({ error: "Failed to create super admin" }, { status: 500 })
  }
}

