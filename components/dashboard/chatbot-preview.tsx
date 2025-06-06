"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Mic, Image, X } from "lucide-react"

interface ChatbotPreviewProps {
  chatbot: {
    name: string
    welcomeMessage: string
    config?: {
      welcomeMessage?: string
      appearance?: {
        primaryColor?: string
        secondaryColor?: string
        fontFamily?: string
        borderRadius?: string
      }
    }
  }
}

export function ChatbotPreview({ chatbot }: ChatbotPreviewProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: chatbot.config?.welcomeMessage || chatbot.welcomeMessage, sender: "bot" },
  ])

  const primaryColor = chatbot.config?.appearance?.primaryColor || "#7C3AED"
  const borderRadius = chatbot.config?.appearance?.borderRadius || "0.5rem"

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }])

    // Clear input
    setMessage("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a preview of how your chatbot will respond to messages.", sender: "bot" },
      ])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-3 shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      style={{ borderRadius }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: primaryColor, color: "white" }}>
        <div className="font-medium">{chatbot.name}</div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[300px]">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
              style={msg.sender === "user" ? { backgroundColor: primaryColor } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" type="button">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" type="button">
            <Mic className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full rounded-full border border-gray-300 dark:border-gray-600 py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add default export
export default ChatbotPreview

