"use client"

import { Button } from "@/components/ui/button"
import { Loader2, X, Copy, Save } from "lucide-react"

interface ModelSelectorProps {
  model: {
    id: string
    name: string
    letter: string
  }
  isSelected: boolean
  onSelect: () => void
  response: string | null
  isGenerating: boolean
  prompt: string
}

export default function ModelSelector({
  model,
  isSelected,
  onSelect,
  response,
  isGenerating,
  prompt,
}: ModelSelectorProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-[#1A1A1A]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center bg-[#1A1A1A] rounded text-sm font-medium">
            {model.letter}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelect}
            className={`text-sm ${isSelected ? "text-white" : "text-gray-400"}`}
          >
            {model.name}
          </Button>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto bg-[#0D0D0D]">
        {/* System Message */}
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">System message</div>
          <div className="p-3 bg-[#1A1A1A] rounded-lg text-sm text-gray-300">You are a helpful assistant...</div>
        </div>

        {/* Messages */}
        {prompt && (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-400">User</div>
              <div className="text-sm text-white">{prompt}</div>
            </div>

            {isSelected && (
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Assistant</div>
                {isGenerating ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                ) : response ? (
                  <div className="text-sm text-white whitespace-pre-wrap">{response}</div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

