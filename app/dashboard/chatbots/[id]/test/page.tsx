"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { toast } from "@/components/ui/use-toast"

export default function TestChatbotPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [chatbot, setChatbot] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const response = await fetch(`/api/chatbots/${id}`)
        if (!response.ok) throw new Error("Failed to fetch chatbot")

        const data = await response.json()
        setChatbot(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching chatbot:", error)
        toast({
          title: "Error",
          description: "Failed to load chatbot data",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchChatbot()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!chatbot) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chatbot Not Found</h1>
          <p className="mb-6">The chatbot you're looking for doesn't exist or has been deleted.</p>
          <Button onClick={() => router.push("/dashboard/chatbots")}>Back to Chatbots</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testing: {chatbot.name}</h1>
        <Button onClick={() => router.push(`/dashboard/chatbots/${id}`)}>Back to Editor</Button>
      </div>

      <div className="flex justify-center">
        <ChatInterface
          chatbotName={chatbot.name}
          chatbotAvatar={chatbot.avatar}
          welcomeMessage={chatbot.welcomeMessage}
          primaryColor={chatbot.primaryColor}
          provider={chatbot.provider}
          model={chatbot.model}
          systemPrompt={chatbot.systemPrompt}
          temperature={chatbot.temperature}
          maxTokens={chatbot.maxTokens}
          enableVoice={chatbot.enableVoice}
          enableImageGeneration={chatbot.enableImageGeneration}
        />
      </div>
    </div>
  )
}

