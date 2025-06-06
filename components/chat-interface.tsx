"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, Image, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ChatMessage } from "@/src/lib/ai-service"

interface ChatInterfaceProps {
  chatbotName: string
  chatbotAvatar?: string
  welcomeMessage: string
  primaryColor: string
  provider: string
  model: string
  systemPrompt: string
  temperature: number
  maxTokens: number
  enableVoice?: boolean
  enableImageGeneration?: boolean
}

export function ChatInterface({
  chatbotName,
  chatbotAvatar,
  welcomeMessage,
  primaryColor,
  provider,
  model,
  systemPrompt,
  temperature,
  maxTokens,
  enableVoice = false,
  enableImageGeneration = false,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: systemPrompt },
    { role: "assistant", content: welcomeMessage },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [imagePrompt, setImagePrompt] = useState("")
  const [showImagePrompt, setShowImagePrompt] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          model,
          messages: [...messages, userMessage].filter((msg) => msg.role !== "system"),
          temperature,
          maxTokens,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages((prev) => [...prev, data.message])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return

    const userMessage = { role: "user" as const, content: `Generate an image: ${imagePrompt}` }
    setMessages((prev) => [...prev, userMessage])
    setImagePrompt("")
    setShowImagePrompt(false)
    setIsGeneratingImage(true)

    try {
      const response = await fetch("/api/ai/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: provider === "xai" ? "openai" : provider, // XAI doesn't support image generation
          model: provider === "openai" ? "dall-e-3" : "stabilityai/stable-diffusion-xl-base-1.0",
          prompt: imagePrompt,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate image")

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `![Generated Image](${data.image})`,
        },
      ])
    } catch (error) {
      console.error("Error generating image:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error generating the image. Please try again later.",
        },
      ])
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setIsLoading(true)

        try {
          // Send audio to transcription API
          const formData = new FormData()
          formData.append("file", audioBlob, "audio.webm")
          formData.append("provider", provider === "xai" ? "openai" : provider) // XAI doesn't support speech-to-text

          const response = await fetch("/api/ai/transcribe", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) throw new Error("Failed to transcribe audio")

          const data = await response.json()
          setInput(data.text)
        } catch (error) {
          console.error("Error transcribing audio:", error)
        } finally {
          setIsLoading(false)
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <Card className="flex flex-col h-[600px] max-w-md mx-auto">
      <CardHeader
        className="flex flex-row items-center gap-3 p-3 border-b"
        style={{ backgroundColor: primaryColor, color: "#fff" }}
      >
        <Avatar>
          <AvatarImage src={chatbotAvatar} alt={chatbotName} />
          <AvatarFallback>{chatbotName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{chatbotName}</h3>
          <p className="text-xs opacity-80">
            Powered by {provider} {model.split("/").pop()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content.includes("![Generated Image]") ? (
                  <img
                    src={message.content.match(/$$([^)]+)$$/)?.[1] || "/placeholder.svg"}
                    alt="Generated"
                    className="rounded-md max-w-full"
                  />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}

        {isGeneratingImage && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted">
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                <span>Generating image...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {showImagePrompt && (
        <div className="p-3 border-t">
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="flex-1 min-h-[80px]"
            />
            <div className="flex flex-col gap-2">
              <Button size="icon" onClick={handleGenerateImage} disabled={isGeneratingImage || !imagePrompt.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => setShowImagePrompt(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <CardFooter className="p-3 border-t">
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isLoading}
            className="flex-1"
          />

          {enableVoice && (
            <Button
              size="icon"
              variant="outline"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              className={isRecording ? "bg-red-500 text-white hover:bg-red-600" : ""}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}

          {enableImageGeneration && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => setShowImagePrompt(!showImagePrompt)}
              disabled={isLoading}
            >
              <Image className="h-4 w-4" />
            </Button>
          )}

          <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

