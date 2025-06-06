import { type NextRequest, NextResponse } from "next/server"
import { generateChatCompletion, type ChatCompletionOptions } from "@/src/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const options: ChatCompletionOptions = await request.json()

    // Call the server-side function
    const result = await generateChatCompletion(options)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json(
      {
        message: {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      },
      { status: 500 },
    )
  }
}

