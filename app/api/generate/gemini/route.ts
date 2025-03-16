import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json()
    const modelName = model.split('/')[1] || 'gemini-1.5-pro' // Default to gemini-1.5-pro if not specified

    const result = await generateText({
      model: google(modelName),
      prompt,
      system:
        "You are a helpful AI assistant powered by Google's Gemini model. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("Gemini generation error:", error)
    return Response.json({ error: "Failed to generate text with Gemini" }, { status: 500 })
}