import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json()
    const modelName = model.split('/')[1] || 'claude-3-sonnet' // Default to claude-3-sonnet if not specified

    const api_key = process.env.ANTHROPIC_API_KEY;
    console.log("API Key:", api_key);

    const result = await generateText({
      model: anthropic(modelName, { apiKey:  api_key}),
      prompt,
      system:
        "You are a helpful AI assistant powered by Anthropic's Claude. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("Anthropic generation error:", error)
    return Response.json({ error: "Failed to generate text with Anthropic" }, { status: 500 })
  }
}

