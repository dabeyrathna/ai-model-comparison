import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Note: You'll need to add GOOGLE_API_KEY to your environment variables
    const result = await generateText({
      model: google("gemini-1.5-pro"),
      prompt,
      system:
        "You are a helpful AI assistant powered by Google's Gemini model. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("Gemini generation error:", error)
    return Response.json({ error: "Failed to generate text with Gemini" }, { status: 500 })
  }
}

