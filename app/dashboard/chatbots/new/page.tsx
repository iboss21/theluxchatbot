"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function NewChatbotPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chatbot, setChatbot] = useState({
    name: "New Chatbot",
    description: "A helpful assistant for your customers",
    style: "Professional",
    status: "active",
    config: {
      welcomeMessage: "Hello! How can I assist you today?",
      personality: {
        formality: 0.7,
        friendliness: 0.8,
        helpfulness: 0.9,
      },
      appearance: {
        primaryColor: "#00FFFF",
        secondaryColor: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
        borderRadius: "12px",
      },
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setChatbot({
      ...chatbot,
      [field]: value,
    })
  }

  const handleConfigChange = (section: string, field: string, value: any) => {
    setChatbot({
      ...chatbot,
      config: {
        ...chatbot.config,
        [section]: {
          ...chatbot.config[section],
          [field]: value,
        },
      },
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to chatbots page
      window.location.href = "/dashboard/chatbots"
    } catch (error) {
      console.error("Failed to create chatbot:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chatbots" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create New Chatbot</h1>
            <p className="text-muted-foreground">Configure your chatbot settings and appearance</p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting} className="glass-button inline-flex items-center gap-2">
          <Save className="h-4 w-4" />
          <span>{isSubmitting ? "Creating..." : "Create Chatbot"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden mb-6">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Chatbot Name</label>
                  <Input
                    type="text"
                    value={chatbot.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="glass-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={chatbot.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="glass-input w-full h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Welcome Message</label>
                  <textarea
                    value={chatbot.config.welcomeMessage}
                    onChange={(e) => handleConfigChange("welcomeMessage", "", e.target.value)}
                    className="glass-input w-full h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      value={chatbot.config.appearance.primaryColor}
                      onChange={(e) => handleConfigChange("appearance", "primaryColor", e.target.value)}
                      className="h-10 w-10 rounded-md border-0 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={chatbot.config.appearance.primaryColor}
                      onChange={(e) => handleConfigChange("appearance", "primaryColor", e.target.value)}
                      className="glass-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card p-4">
            <h3 className="text-lg font-medium mb-4">Live Preview</h3>
            <div className="flex flex-col h-[400px]">
              <div
                className="flex items-center justify-between p-3 border-b border-white/10"
                style={{ backgroundColor: chatbot.config.appearance.primaryColor, color: "#000" }}
              >
                <div className="font-medium">{chatbot.name}</div>
                <div className="flex gap-2">
                  <button className="p-1 rounded-full hover:bg-black/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14L21 3"></path>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    </svg>
                  </button>
                  <button className="p-1 rounded-full hover:bg-black/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                <div className="flex items-start">
                  <div
                    className="max-w-[80%] p-2 rounded-lg"
                    style={{
                      backgroundColor: `${chatbot.config.appearance.primaryColor}20`,
                      color: chatbot.config.appearance.primaryColor,
                    }}
                  >
                    {chatbot.config.welcomeMessage}
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-white/10">
                <div className="flex gap-2">
                  <input type="text" placeholder="Type a message..." className="glass-input flex-1" />
                  <button
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: chatbot.config.appearance.primaryColor, color: "#000" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

