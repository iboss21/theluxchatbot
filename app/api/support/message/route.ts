import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json()

    if (!userId || !message) {
      return NextResponse.json({ error: "User ID and message are required" }, { status: 400 })
    }

    // Get or create support chat
    const chatResult = await db.query("SELECT * FROM support_chats WHERE user_id = $1", [userId])

    let messages = []

    if (chatResult.rows.length > 0) {
      // Existing chat
      messages = chatResult.rows[0].messages_json

      // Parse if it's a string
      if (typeof messages === "string") {
        messages = JSON.parse(messages)
      }
    }

    // Add user message to history
    messages.push({ role: "user", content: message })

    // Generate response with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a support chatbot for LuxChat, a SaaS chatbot platform.
          
Help users with their questions about the platform. If you can't answer a question or if the user seems frustrated, suggest escalating to a human support agent by including the phrase "I'll escalate this to our support team" in your response.

Common issues:
- Billing: Direct users to the billing page at /dashboard/billing
- Account: Help with account settings at /dashboard/settings
- Chatbots: Assist with chatbot creation and management
- API: Provide basic guidance on API usage`,
        },
        ...messages,
      ],
    })

    const botMessage = completion.choices[0].message.content

    // Add bot message to history
    messages.push({ role: "assistant", content: botMessage })

    // Update or create support chat
    if (chatResult.rows.length > 0) {
      await db.execute(
        `UPDATE support_chats 
         SET messages_json = $1, updated_at = NOW() 
         WHERE user_id = $2`,
        [JSON.stringify(messages), userId],
      )
    } else {
      await db.execute(
        `INSERT INTO support_chats (user_id, messages_json) 
         VALUES ($1, $2)`,
        [userId, JSON.stringify(messages)],
      )
    }

    // Check if escalation is needed
    const needsEscalation = botMessage.includes("escalate")

    if (needsEscalation) {
      // In a real app, you would notify support staff
      // For this example, we'll just update the chat status
      await db.execute(
        `UPDATE support_chats 
         SET status = 'escalated' 
         WHERE user_id = $1`,
        [userId],
      )
    }

    return NextResponse.json({
      response: botMessage,
      escalated: needsEscalation,
    })
  } catch (error) {
    console.error("Error processing support message:", error)
    return NextResponse.json({ error: "Failed to process support message" }, { status: 500 })
  }
}

