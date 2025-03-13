import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ModelResponseProps {
  modelName: string
  response: string | null
  isLoading: boolean
  darkMode?: boolean
}

export default function ModelResponse({ modelName, response, isLoading, darkMode = false }: ModelResponseProps) {
  const cardClasses = darkMode ? "h-full bg-[#1A1A1A] border-[#333333]" : "h-full"

  const loaderClasses = darkMode ? "h-8 w-8 animate-spin text-[#10A37F]" : "h-8 w-8 animate-spin text-primary"

  const emptyStateClasses = darkMode ? "text-gray-500" : "text-muted-foreground"

  return (
    <Card className={cardClasses}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{modelName}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className={loaderClasses} />
          </div>
        ) : response ? (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className={emptyStateClasses}>Response will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

