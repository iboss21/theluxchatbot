import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { chatbotId, event, data } = await request.json()

    if (!chatbotId || !event || !data) {
      return NextResponse.json({ error: "Chatbot ID, event, and data are required" }, { status: 400 })
    }

    // Get webhooks for this chatbot and event
    const webhooks = await db.query(
      `SELECT url, events 
       FROM webhooks 
       WHERE chatbot_id = $1`,
      [chatbotId],
    )

    // Filter webhooks that listen for this event
    const matchingWebhooks = webhooks.rows.filter((webhook) => {
      const events = typeof webhook.events === "string" ? JSON.parse(webhook.events) : webhook.events

      return events.includes(event)
    })

    // Trigger webhooks
    const results = await Promise.allSettled(
      matchingWebhooks.map(async (webhook) => {
        const response = await fetch(webhook.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event, data }),
        })

        return {
          url: webhook.url,
          status: response.status,
          ok: response.ok,
        }
      }),
    )

    return NextResponse.json({
      status: "ok",
      triggered: matchingWebhooks.length,
      results: results.map((result) => (result.status === "fulfilled" ? result.value : { error: result.reason })),
    })
  } catch (error) {
    console.error("Error triggering webhooks:", error)
    return NextResponse.json({ error: "Failed to trigger webhooks" }, { status: 500 })
  }
}

