"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Eraser, Brain } from "lucide-react"
import ChatInput from "@/components/chat-input"
import ModelPanel from "@/components/model-panel"
import SinglePanelView from "@/components/single-panel-view"

interface Message {
  role: 'user' | 'assistant'
  content: string
  panelId?: 'A' | 'B' | 'C'
}

const COMPARE_SINGLE = 0
const COMPARE_DOUBLE = 1
const COMPARE_TRIPLE = 2

export default function AIPlayground() {
  const [compareCount, setCompareCount] = useState(COMPARE_SINGLE)
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [responses, setResponses] = useState<{
    A: string | null
    B: string | null
    C: string | null
  }>({
    A: null,
    B: null,
    C: null,
  })
  const [prompt, setPrompt] = useState("")

  // Handle generating responses
  const handleSubmit = async (input: string) => {
    if (!input) return
    setPrompt(input)
    setIsGenerating(true)

    // Add user message to history
    const userMessage: Message = {
      role: 'user',
      content: input
    }
    setMessages(prev => [...prev, userMessage])

    try {
      // Generate responses based on how many panels are visible
      const panelsToGenerate = compareCount === COMPARE_SINGLE ? 1 : compareCount === COMPARE_DOUBLE ? 2 : 3

      const fetchPromises = []
      for (let i = 0; i < panelsToGenerate; i++) {
        fetchPromises.push(
          fetch("/api/generate/openai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input }),
          }),
        )
      }

      const results = await Promise.all(fetchPromises)
      const dataPromises = results.map((res) => res.json())
      const data = await Promise.all(dataPromises)

      // Update responses
      const newResponses = { ...responses }
      if (panelsToGenerate >= 1) {
        newResponses.A = data[0].text
        setMessages(prev => [...prev, { role: 'assistant', content: data[0].text, panelId: 'A' }])
      }
      if (panelsToGenerate >= 2) {
        newResponses.B = data[1].text
        setMessages(prev => [...prev, { role: 'assistant', content: data[1].text, panelId: 'B' }])
      }
      if (panelsToGenerate >= 3) {
        newResponses.C = data[2].text
        setMessages(prev => [...prev, { role: 'assistant', content: data[2].text, panelId: 'C' }])
      }

      setResponses(newResponses)
    } catch (error) {
      console.error("Error generating responses:", error)
      // Provide user feedback in the UI
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle clearing all chat content
  const handleClearChat = () => {
    setResponses({
      A: null,
      B: null,
      C: null,
    })
    setPrompt("")
    setMessages([])
  }

  // Handle compare button click
  const handleCompareClick = () => {
    setCompareCount((prev) => (prev >= COMPARE_TRIPLE ? COMPARE_SINGLE : prev + 1))
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0D0D0D]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-[#1A1A1A] shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-white font-semibold text-lg">
            <span className="flex items-center justify-center h-6 w-6 mr-2 bg-blue-600 rounded-sm">
              <Brain className="h-4 w-4 text-white" />
            </span>
            <span className="text-gray-400">AI-CCORE</span>
            <span className="mx-0.5 text-gray-600"></span>
            <span>Playground</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleCompareClick} className="text-gray-400 hover:text-white">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            {compareCount === COMPARE_SINGLE ? "Compare" : compareCount === COMPARE_DOUBLE ? "Compare (3)" : "Single View"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handleClearChat}
          >
            <Eraser className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {compareCount === COMPARE_SINGLE ? (
          <SinglePanelView
            className="overflow-auto flex-1"
            response={responses.A}
            isGenerating={isGenerating}
            prompt={prompt}
            onSubmit={handleSubmit}
            messages={messages}
          />
        ) : (
          <>
            <div className={`grid ${compareCount === COMPARE_DOUBLE ? "grid-cols-2" : "grid-cols-3"} gap-0 h-[calc(100vh-180px)] overflow-hidden`}>
              <ModelPanel
                panelId="A"
                className="overflow-auto"
                response={responses.A}
                isGenerating={isGenerating}
                prompt={prompt}
                showResponseArea={true}
                messages={messages.filter(m => !m.panelId || m.panelId === 'A')}
              />

              <ModelPanel
                panelId="B"
                className="overflow-auto"
                response={responses.B}
                isGenerating={isGenerating}
                prompt={prompt}
                showResponseArea={true}
                messages={messages.filter(m => !m.panelId || m.panelId === 'B')}
              />

              {compareCount >= COMPARE_TRIPLE && (
                <ModelPanel
                  panelId="C"
                  className="overflow-auto"
                  response={responses.C}
                  isGenerating={isGenerating}
                  prompt={prompt}
                  showResponseArea={true}
                  messages={messages.filter(m => !m.panelId || m.panelId === 'C')}
                />
              )}
            </div>
          </>
        )}

        {/* Chat input - only shown in compare mode */}
        {compareCount > COMPARE_SINGLE && (
          <div className="shrink-0 p-4 border-t border-[#1A1A1A]">
            <ChatInput onSubmit={handleSubmit} isGenerating={isGenerating} />
          </div>
        )}
      </div>
    </div>
  )
}

