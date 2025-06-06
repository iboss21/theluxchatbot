"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Send, Maximize2 } from "lucide-react"

// Simplify the props interface to accept any structure
interface ChatbotPreviewProps {
  chatbot?: any
}

export function ChatbotPreview({ chatbot }: ChatbotPreviewProps) {
  console.log("ChatbotPreview initial props:", JSON.stringify(chatbot, null, 2))

  // Initialize with default values
  const [messages, setMessages] = useState([{ role: "bot", content: "Hello! How can I assist you today?" }])
  const [inputMessage, setInputMessage] = useState("")
  const [expanded, setExpanded] = useState(false)

  // Safe default values
  const name = chatbot?.name || "My Chatbot"
  const primaryColor = chatbot?.primaryColor || "#00FFFF"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputMessage }])

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: "This is a preview of how your chatbot will respond." }])
    }, 800)

    setInputMessage("")
  }

  // Initialize chat with welcome message when component mounts or chatbot changes
  useEffect(() => {
    try {
      console.log("ChatbotPreview useEffect with chatbot:", JSON.stringify(chatbot, null, 2))

      // Get welcome message with fallbacks
      const welcomeMessage =
        chatbot?.welcomeMessage || chatbot?.config?.welcomeMessage || "Hello! How can I assist you today?"

      // Reset messages with welcome message
      setMessages([{ role: "bot", content: welcomeMessage }])
    } catch (error) {
      console.error("Error in ChatbotPreview useEffect:", error)
      // Keep default welcome message if there's an error
    }
  }, [chatbot])

  return (
    <div className={`flex flex-col ${expanded ? "h-[500px]" : "h-[400px]"}`}>
      <div
        className="flex items-center justify-between p-3 border-b border-white/10"
        style={{ backgroundColor: primaryColor, color: "#000" }}
      >
        <div className="font-medium">{name}</div>
        <div className="flex gap-2">
          <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-full hover:bg-black/10">
            <Maximize2 className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-black/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-2 rounded-lg ${msg.role === "user" ? "bg-white/10 text-white" : ""}`}
              style={
                msg.role === "bot"
                  ? {
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor,
                    }
                  : {}
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="glass-input flex-1"
          />
          <button type="submit" className="p-2 rounded-lg" style={{ backgroundColor: primaryColor, color: "#000" }}>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

