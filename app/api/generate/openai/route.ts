import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json()
    console.log("Received model:", model)
    const modelName = model.split('/')[1] || 'gpt-4' // Default to gpt-4 if not specified

    const result = await generateText({
      model: openai(modelName),
      prompt,
      system:
        "You are a helpful AI assistant powered by OpenAI. Provide clear, concise, and accurate responses.",
    })

    return Response.json({ text: result.text })
  } catch (error) {
    console.error("OpenAI generation error:", error)
    return Response.json({ error: "Failed to generate text with OpenAI" }, { status: 500 })
  }
}

