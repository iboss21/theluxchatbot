import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import DOMPurify from "isomorphic-dompurify"

export async function POST(request: Request) {
  try {
    const { chatbotId, codeType, code } = await request.json()

    if (!chatbotId || !codeType || !code) {
      return NextResponse.json({ error: "Chatbot ID, code type, and code are required" }, { status: 400 })
    }

    // Validate code type
    if (!["css", "js", "html"].includes(codeType)) {
      return NextResponse.json({ error: "Code type must be css, js, or html" }, { status: 400 })
    }

    // Sanitize code
    const sanitizedCode = DOMPurify.sanitize(code)

    // Store custom code
    await db.execute(
      `INSERT INTO custom_code (chatbot_id, code_type, code) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (chatbot_id, code_type) 
       DO UPDATE SET code = $3`,
      [chatbotId, codeType, sanitizedCode],
    )

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error saving custom code:", error)
    return NextResponse.json({ error: "Failed to save custom code" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatbotId = searchParams.get("chatbotId")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    // Get custom code
    const codeResult = await db.query(
      `SELECT code_type, code 
       FROM custom_code 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    // Format response
    const response = {
      css: "",
      js: "",
      html: "",
    }

    codeResult.rows.forEach((row) => {
      response[row.code_type] = row.code
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching custom code:", error)
    return NextResponse.json({ error: "Failed to fetch custom code" }, { status: 500 })
  }
}

