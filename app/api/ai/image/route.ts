import { type NextRequest, NextResponse } from "next/server"
import { generateImage, type ImageGenerationOptions } from "@/src/lib/ai-service"

export async function POST(request: NextRequest) {
  try {
    const options: ImageGenerationOptions = await request.json()

    // Call the server-side function
    const result = await generateImage(options)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in image API route:", error)
    return NextResponse.json(
      {
        image:
          "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='%23ccc'%3E%3Crect width='1024' height='1024' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='24' fill='%23666'%3EError generating image%3C/text%3E%3C/svg%3E",
      },
      { status: 500 },
    )
  }
}

