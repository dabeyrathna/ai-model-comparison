"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowUp, Mic, RotateCcw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SinglePanelViewProps {
  response: string | null
  isGenerating: boolean
  prompt: string
  onSubmit: (input: string) => void
  messages: Array<{ role: 'user' | 'assistant', content: string }>
}

export default function SinglePanelView({ response, isGenerating, prompt, onSubmit, messages }: SinglePanelViewProps) {
  const [systemMessage, setSystemMessage] = useState("You are a helpful assistant...")
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input.trim() && !isGenerating) {
      onSubmit(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex-1 grid grid-cols-2 gap-0">
      {/* Left side - System message and configuration */}
      <div className="border-r border-[#1A1A1A]">
        <div className="flex items-center justify-between p-2 border-b border-[#1A1A1A]">
          <div className="flex items-center space-x-2">
            <Select defaultValue="gpt-4o">
              <SelectTrigger className="w-[180px] h-8 bg-transparent border-0 text-sm focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333333]">
                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                <SelectItem value="gpt-4">gpt-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-400 mb-2">System message</div>
          <Textarea
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            placeholder="You are a helpful assistant..."
            className="min-h-[300px] bg-[#1A1A1A] border-[#333333] resize-none text-sm"
          />

          {/* Model configuration */}
          <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#333333]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Temperature</div>
                <input
                  type="number"
                  defaultValue="1.0"
                  className="w-full bg-[#2A2A2A] border border-[#333333] rounded px-2 py-1 text-sm text-white"
                />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Max tokens</div>
                <input
                  type="number"
                  defaultValue="2048"
                  className="w-full bg-[#2A2A2A] border border-[#333333] rounded px-2 py-1 text-sm text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Chat interface */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4">
          {messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm text-gray-400">
                    {message.role === 'user' ? 'User' : 'Assistant'}
                  </div>
                  <div className="text-sm text-white bg-[#1A1A1A] p-3 rounded-md">
                    {message.content}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Assistant</div>
                  <div className="flex items-center justify-center py-8 bg-[#1A1A1A] rounded-md">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Your conversation will appear here
            </div>
          )}
        </div>

        {/* Chat input integrated in the right panel */}
        <div className="p-4 border-t border-[#1A1A1A]">
          <div className="relative flex items-end bg-[#1A1A1A] rounded-lg border border-[#333333] focus-within:border-[#666666] transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter user message..."
              className="flex-1 max-h-[200px] p-3 pr-20 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none text-white placeholder-gray-500 text-sm"
              style={{ minHeight: "44px" }}
            />
            <div className="absolute bottom-1.5 right-2 flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!input.trim() || isGenerating}
                className="h-8 w-8 bg-[#10A37F] hover:bg-[#0D8A6C] disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

