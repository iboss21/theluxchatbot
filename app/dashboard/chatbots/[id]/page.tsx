"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import ChatbotPreview from "@/components/dashboard/chatbot-preview"
import { AI_MODELS } from "@/src/lib/ai-service"
import { toast } from "@/components/ui/use-toast"
import EmbedCodeGenerator from "@/components/dashboard/embed-code-generator"
import EmbedAnalytics from "@/components/dashboard/embed-analytics"

export default function ChatbotEditor() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [chatbot, setChatbot] = useState({
    id: "",
    name: "My Chatbot",
    description: "",
    avatar: "",
    welcomeMessage: "Hello! How can I help you today?",
    provider: "openai",
    model: AI_MODELS.OPENAI.GPT_3_5,
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: "You are a helpful AI assistant.",
    theme: "dark",
    primaryColor: "#7C3AED",
    isPublic: true,
    enableVoice: false,
    enableImageGeneration: false,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        setError(null)

        if (id === "new") {
          setLoading(false)
          return
        }

        console.log(`Fetching chatbot with ID: ${id}`)
        const response = await fetch(`/api/chatbots/${id}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to fetch chatbot (Status: ${response.status})`)
        }

        const data = await response.json()
        console.log("Fetched chatbot data:", data)

        // Ensure all required fields are present
        const processedData = {
          ...chatbot, // Default values
          ...data, // Server data
          // Ensure these fields are always present
          welcomeMessage: data.welcomeMessage || chatbot.welcomeMessage,
          primaryColor: data.primaryColor || chatbot.primaryColor,
          theme: data.theme || chatbot.theme,
        }

        setChatbot(processedData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching chatbot:", error)
        setError(error instanceof Error ? error.message : "Failed to load chatbot data")
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load chatbot data",
          variant: "destructive",
        })

        // Still set loading to false so the UI isn't stuck
        setLoading(false)
      }
    }

    fetchChatbot()
  }, [id])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      const method = id === "new" ? "POST" : "PUT"
      const url = id === "new" ? "/api/chatbots" : `/api/chatbots/${id}`

      console.log("Saving chatbot with data:", chatbot)
      console.log("Using method:", method)
      console.log("Using URL:", url)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatbot),
      })

      const responseData = await response.json()
      console.log("Response from API:", responseData)

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save chatbot")
      }

      toast({
        title: "Success",
        description: "Chatbot saved successfully",
      })

      if (id === "new") {
        // Redirect to the chatbots page with a refresh parameter
        router.push(`/dashboard/chatbots?refresh=true`)
      } else {
        setChatbot(responseData)
      }
    } catch (error) {
      console.error("Error saving chatbot:", error)
      setError(error instanceof Error ? error.message : "Failed to save chatbot")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save chatbot",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setChatbot((prev) => ({ ...prev, [field]: value }))
  }

  // Update model options when provider changes
  useEffect(() => {
    if (chatbot.provider === "openai") {
      setChatbot((prev) => ({ ...prev, model: AI_MODELS.OPENAI.GPT_3_5 }))
    } else if (chatbot.provider === "huggingface") {
      setChatbot((prev) => ({ ...prev, model: AI_MODELS.HUGGINGFACE.CHAT.MISTRAL }))
    } else if (chatbot.provider === "xai") {
      setChatbot((prev) => ({ ...prev, model: AI_MODELS.XAI.CLAUDE_HAIKU }))
    }
  }, [chatbot.provider])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Create a preview-safe version of the chatbot data
  const previewData = {
    name: chatbot.name || "My Chatbot",
    welcomeMessage: chatbot.welcomeMessage || "Hello! How can I help you today?",
    config: {
      welcomeMessage: chatbot.welcomeMessage || "Hello! How can I help you today?",
      appearance: {
        primaryColor: chatbot.primaryColor || "#7C3AED",
        secondaryColor: "#6D28D9",
        fontFamily: "Inter, sans-serif",
        borderRadius: "0.5rem",
      },
    },
  }

  console.log("Preview data being passed to ChatbotPreview:", previewData)

  // Don't show embed analytics for new chatbots
  const showEmbedAnalytics = id !== "new"

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{id === "new" ? "Create New Chatbot" : "Edit Chatbot"}</h1>
        <Button onClick={() => router.push("/dashboard/chatbots")}>Back to Chatbots</Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="ai">AI Settings</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="embed">Embed</TabsTrigger>
              {showEmbedAnalytics && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Configure the basic details of your chatbot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={chatbot.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="My Awesome Chatbot"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={chatbot.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="A helpful assistant that..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      value={chatbot.avatar}
                      onChange={(e) => handleChange("avatar", e.target.value)}
                      placeholder="https://example.com/avatar.png"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={chatbot.welcomeMessage}
                      onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                      placeholder="Hello! How can I help you today?"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Settings</CardTitle>
                  <CardDescription>Configure the AI model and behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">AI Provider</Label>
                    <Select value={chatbot.provider} onValueChange={(value) => handleChange("provider", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="huggingface">Hugging Face</SelectItem>
                        <SelectItem value="xai">Anthropic (XAI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <Select value={chatbot.model} onValueChange={(value) => handleChange("model", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {chatbot.provider === "openai" && (
                          <>
                            <SelectItem value={AI_MODELS.OPENAI.GPT_4O}>GPT-4o (Most Capable)</SelectItem>
                            <SelectItem value={AI_MODELS.OPENAI.GPT_4}>GPT-4 Turbo</SelectItem>
                            <SelectItem value={AI_MODELS.OPENAI.GPT_3_5}>GPT-3.5 Turbo (Fastest)</SelectItem>
                          </>
                        )}

                        {chatbot.provider === "huggingface" && (
                          <>
                            <SelectItem value={AI_MODELS.HUGGINGFACE.CHAT.META_LLAMA}>Meta Llama 2 (7B)</SelectItem>
                            <SelectItem value={AI_MODELS.HUGGINGFACE.CHAT.MISTRAL}>Mistral (7B)</SelectItem>
                            <SelectItem value={AI_MODELS.HUGGINGFACE.CHAT.FALCON}>Falcon (7B)</SelectItem>
                            <SelectItem value={AI_MODELS.HUGGINGFACE.CHAT.GEMMA}>Google Gemma (7B)</SelectItem>
                          </>
                        )}

                        {chatbot.provider === "xai" && (
                          <>
                            <SelectItem value={AI_MODELS.XAI.CLAUDE_HAIKU}>Claude Haiku (Fast)</SelectItem>
                            <SelectItem value={AI_MODELS.XAI.CLAUDE_SONNET}>Claude Sonnet (Powerful)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature: {chatbot.temperature}</Label>
                    <div className="flex items-center space-x-2">
                      <span>0.1</span>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={chatbot.temperature}
                        onChange={(e) => handleChange("temperature", Number.parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span>1.0</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lower values make responses more deterministic, higher values make them more creative.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens: {chatbot.maxTokens}</Label>
                    <div className="flex items-center space-x-2">
                      <span>256</span>
                      <input
                        type="range"
                        min="256"
                        max="4096"
                        step="256"
                        value={chatbot.maxTokens}
                        onChange={(e) => handleChange("maxTokens", Number.parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span>4096</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum number of tokens to generate in the response.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={chatbot.systemPrompt}
                      onChange={(e) => handleChange("systemPrompt", e.target.value)}
                      placeholder="You are a helpful AI assistant."
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">Instructions that define how the AI should behave.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how your chatbot looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={chatbot.theme} onValueChange={(value) => handleChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={chatbot.primaryColor}
                        onChange={(e) => handleChange("primaryColor", e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={chatbot.primaryColor}
                        onChange={(e) => handleChange("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isPublic" className="block">
                        Public Access
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow anyone to use this chatbot</p>
                    </div>
                    <Switch
                      id="isPublic"
                      checked={chatbot.isPublic}
                      onCheckedChange={(checked) => handleChange("isPublic", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableVoice" className="block">
                        Voice Input/Output
                      </Label>
                      <p className="text-sm text-muted-foreground">Enable speech-to-text and text-to-speech</p>
                    </div>
                    <Switch
                      id="enableVoice"
                      checked={chatbot.enableVoice}
                      onCheckedChange={(checked) => handleChange("enableVoice", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableImageGeneration" className="block">
                        Image Generation
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow the chatbot to generate images</p>
                    </div>
                    <Switch
                      id="enableImageGeneration"
                      checked={chatbot.enableImageGeneration}
                      onCheckedChange={(checked) => handleChange("enableImageGeneration", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="embed" className="space-y-4">
              <EmbedCodeGenerator
                chatbotId={id === "new" ? "preview" : id}
                chatbotName={chatbot.name}
                primaryColor={chatbot.primaryColor}
                theme={chatbot.theme}
              />
            </TabsContent>

            {showEmbedAnalytics && (
              <TabsContent value="analytics" className="space-y-4">
                <EmbedAnalytics chatbotId={id} />
              </TabsContent>
            )}
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => router.push("/dashboard/chatbots")}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Saving...
                </>
              ) : (
                "Save Chatbot"
              )}
            </Button>
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your chatbot will look</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatbotPreview chatbot={previewData} />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" size="sm">
                Test Chatbot
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

