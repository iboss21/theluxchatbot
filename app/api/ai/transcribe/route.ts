import { type NextRequest, NextResponse } from "next/server"
import { transcribeSpeech } from "@/src/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob
    const provider = formData.get("provider") as string
    const model = formData.get("model") as string

    if (!file) {
      return NextResponse.json({ text: "No audio file provided" }, { status: 400 })
    }

    // Call the server-side function
    const result = await transcribeSpeech(file, provider, model)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in transcribe API route:", error)
    return NextResponse.json({ text: "Error transcribing speech. Please try again." }, { status: 500 })
  }
}

