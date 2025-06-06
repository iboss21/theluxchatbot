"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default function EmbedPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string

  const theme = searchParams.get("theme") || "light"
  const primaryColor = searchParams.get("primaryColor") || "#7C3AED"

  const [chatbot, setChatbot] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch chatbot data
    fetch(`/api/chatbots/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load chatbot")
        return res.json()
      })
      .then((data) => {
        setChatbot(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching chatbot:", err)
        setError("Failed to load chatbot")
        setLoading(false)
      })
  }, [id])

  // Apply theme to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }

    // Set background color
    document.body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff"

    // Cleanup
    return () => {
      document.body.classList.remove("dark")
      document.body.style.backgroundColor = ""
    }
  }, [theme])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: primaryColor }}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4 text-center">
        <div>
          <p className="text-red-500 mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!chatbot) {
    return (
      <div className="flex items-center justify-center h-screen p-4 text-center">
        <div>
          <p className="mb-2">Chatbot not found</p>
          <p className="text-sm text-gray-500">The requested chatbot could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <ChatInterface
        chatbotName={chatbot.name}
        chatbotAvatar={chatbot.avatar}
        welcomeMessage={chatbot.welcomeMessage || "Hello! How can I help you today?"}
        primaryColor={chatbot.primaryColor || primaryColor}
        provider={chatbot.provider || "openai"}
        model={chatbot.model || "gpt-3.5-turbo"}
        systemPrompt={chatbot.systemPrompt || "You are a helpful AI assistant."}
        temperature={chatbot.temperature || 0.7}
        maxTokens={chatbot.maxTokens || 1024}
        enableVoice={chatbot.enableVoice || false}
        enableImageGeneration={chatbot.enableImageGeneration || false}
      />
    </div>
  )
}

