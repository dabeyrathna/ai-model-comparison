import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Note: You'll need to add ANTHROPIC_API_KEY to your environment variables
    const result = await generateText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      prompt,
      system:
        "You are a helpful AI assistant powered by Anthropic's Claude model. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("Anthropic generation error:", error)
    return Response.json({ error: "Failed to generate text with Anthropic" }, { status: 500 })
  }
}

