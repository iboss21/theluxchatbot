import { type NextRequest, NextResponse } from "next/server"
import { generateEmbeddings } from "@/src/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const { text, provider, model } = await request.json()

    // Call the server-side function
    const result = await generateEmbeddings(text, provider, model)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in embeddings API route:", error)
    return NextResponse.json(
      Array(384)
        .fill(0)
        .map(() => Math.random() - 0.5),
      { status: 500 },
    )
  }
}

