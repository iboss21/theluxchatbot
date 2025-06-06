import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { developerId, type, name, price } = await request.json()

    if (!developerId || !type || !name || price === undefined) {
      return NextResponse.json({ error: "Developer ID, type, name, and price are required" }, { status: 400 })
    }

    // Validate type
    if (!["plugin", "template", "model"].includes(type)) {
      return NextResponse.json({ error: "Type must be plugin, template, or model" }, { status: 400 })
    }

    // Validate price
    if (price < 0) {
      return NextResponse.json({ error: "Price must be non-negative" }, { status: 400 })
    }

    // Store marketplace item
    const itemResult = await db.query(
      `INSERT INTO marketplace_items (developer_id, type, name, price, status) 
       VALUES ($1, $2, $3, $4, 'pending') 
       RETURNING id`,
      [developerId, type, name, price],
    )

    const itemId = itemResult.rows[0].id

    return NextResponse.json({ itemId })
  } catch (error) {
    console.error("Error submitting marketplace item:", error)
    return NextResponse.json({ error: "Failed to submit marketplace item" }, { status: 500 })
  }
}

