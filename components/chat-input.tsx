"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowUp, Mic, RotateCcw } from "lucide-react"

interface ChatInputProps {
  onSubmit: (input: string) => void
  isGenerating: boolean
}

export default function ChatInput({ onSubmit, isGenerating }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D] to-transparent pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end bg-[#1A1A1A] rounded-lg border border-[#333333] focus-within:border-[#666666] transition-colors">
          <textarea
            ref={textareaRef}
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
  )
}

