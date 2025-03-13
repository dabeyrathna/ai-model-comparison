import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const result = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are a helpful AI assistant powered by OpenAI's GPT-4o model. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("OpenAI generation error:", error)
    return Response.json({ error: "Failed to generate text with OpenAI" }, { status: 500 })
  }
}

