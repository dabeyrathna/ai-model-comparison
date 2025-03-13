import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, X, Copy, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  // Define the Message interface here
}

interface ModelPanelProps {
  className?: string
  panelId: 'A' | 'B' | 'C'
  response: string | null
  isGenerating: boolean
  prompt: string
  showResponseArea: boolean
  messages: Message[]
}

const ModelPanel: React.FC<ModelPanelProps> = ({
  className,
  panelId,
  response,
  isGenerating,
  prompt,
  showResponseArea,
  messages,
}) => {
  const getPanelColor = (id: string) => {
    switch (id) {
      case "A":
        return "bg-[#423F33]"
      case "B":
        return "bg-[#2D3047]"
      case "C":
        return "bg-[#3D2E4F]"
      default:
        return "bg-[#423F33]"
    }
  }

  const bgColor = getPanelColor(panelId)

  return (
    <div className={`h-full flex flex-col border-r border-[#1A1A1A] ${className}`}>
      {/* Panel header */}
      <div className="flex items-center justify-between p-2 border-b border-[#1A1A1A]">
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 flex items-center justify-center ${bgColor} rounded text-sm font-medium`}>
            {panelId}
          </div>
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

      {/* Panel content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* System Message */}
        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-2">System message</div>
          <Textarea
            placeholder="You are a helpful assistant..."
            className="min-h-[100px] bg-[#1A1A1A] border-[#333333] resize-none text-sm"
            defaultValue="You are a helpful assistant..."
          />
        </div>

        {/* Messages */}
        {(prompt || showResponseArea) && (
          <div className="space-y-6">
            {prompt && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">User</div>
                <div className="text-sm text-white">{prompt}</div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm text-gray-400">Assistant</div>
              {isGenerating ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                </div>
              ) : response ? (
                <div className="text-sm text-white whitespace-pre-wrap">{response}</div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  {prompt ? "Response will appear here..." : "Enter a message to see a response"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelPanel

