import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 })
    }

    // Validate role
    if (!["admin", "editor", "viewer"].includes(role.toLowerCase())) {
      return NextResponse.json({ error: "Role must be admin, editor, or viewer" }, { status: 400 })
    }

    // Generate a unique user ID for the invitation
    const userId = `invite_${Math.random().toString(36).substring(2, 15)}`

    // Store the invitation
    await db.execute(
      `INSERT INTO team (user_id, email, role, status) 
       VALUES ($1, $2, $3, $4)`,
      [userId, email, role.toLowerCase(), "pending"],
    )

    // In a real app, you would send an email here
    // For this example, we'll just log it
    console.log(`Invitation sent to ${email} for role ${role}`)

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error inviting team member:", error)
    return NextResponse.json({ error: "Failed to invite team member" }, { status: 500 })
  }
}

