"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const CHATBOT_STYLES = [
  { id: "crystal-luxe", name: "Crystal Luxe", description: "Elegant and transparent design with subtle glow effects" },
  { id: "neon-pulse", name: "Neon Pulse", description: "Vibrant neon accents with dark background for high contrast" },
  { id: "minimal-zen", name: "Minimal Zen", description: "Clean, minimalist design with ample whitespace" },
  { id: "cyber-tech", name: "Cyber Tech", description: "Futuristic tech-inspired design with angular elements" },
]

const PLATFORMS = [
  { id: "web", name: "Website" },
  { id: "instagram", name: "Instagram" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "tiktok", name: "TikTok" },
  { id: "threads", name: "Threads" },
]

export default function ChatbotWizard({ userId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    style: "",
    personality: {
      witty: 50,
      formal: 50,
      friendly: 50,
    },
    platforms: ["web"],
  })

  const startWizard = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/chatbot-wizard/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) throw new Error("Failed to start wizard")

      const data = await response.json()
      setSessionId(data.sessionId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the chatbot wizard",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateStep = async (nextStep) => {
    try {
      setLoading(true)

      // Save current step data
      const response = await fetch("/api/chatbot-wizard/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          step,
          data: formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to update step")

      setStep(nextStep)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your progress",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const completeWizard = async () => {
    try {
      setLoading(true)

      // Save final step data
      await fetch("/api/chatbot-wizard/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          step,
          data: formData,
        }),
      })

      // Complete the wizard
      const response = await fetch("/api/chatbot-wizard/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) throw new Error("Failed to create chatbot")

      const { chatbotId } = await response.json()

      toast({
        title: "Success!",
        description: "Your chatbot has been created",
      })

      // Redirect to the new chatbot
      router.push(`/dashboard/chatbots/${chatbotId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create your chatbot",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePersonalityChange = (trait, value) => {
    setFormData((prev) => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value,
      },
    }))
  }

  const handlePlatformToggle = (platform) => {
    setFormData((prev) => {
      const platforms = [...prev.platforms]

      if (platforms.includes(platform)) {
        return {
          ...prev,
          platforms: platforms.filter((p) => p !== platform),
        }
      } else {
        return {
          ...prev,
          platforms: [...platforms, platform],
        }
      }
    })
  }

  // Start the wizard when component mounts
  if (!sessionId && !loading) {
    startWizard()
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Chatbot</CardTitle>
        <CardDescription>Complete this wizard to create your new LuxChat chatbot</CardDescription>
        <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Step {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}% Complete</span>
        </div>
      </CardHeader>

      <CardContent>
        {loading && !sessionId ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Initializing wizard...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Chatbot Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Crystal Support Assistant"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select a purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="product-recommendations">Product Recommendations</SelectItem>
                      <SelectItem value="faq">FAQ Assistant</SelectItem>
                      <SelectItem value="personal-assistant">Personal Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Select a Lux Signature Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  {CHATBOT_STYLES.map((style) => (
                    <div
                      key={style.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.style === style.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleInputChange("style", style.id)}
                    >
                      <h4 className="font-medium">{style.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Define Personality</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust the sliders to define your chatbot's personality traits
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="witty">Witty</Label>
                      <span className="text-sm text-muted-foreground">{formData.personality.witty}%</span>
                    </div>
                    <input
                      id="witty"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.personality.witty}
                      onChange={(e) => handlePersonalityChange("witty", Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Serious</span>
                      <span>Humorous</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="formal">Formal</Label>
                      <span className="text-sm text-muted-foreground">{formData.personality.formal}%</span>
                    </div>
                    <input
                      id="formal"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.personality.formal}
                      onChange={(e) => handlePersonalityChange("formal", Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Casual</span>
                      <span>Professional</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="friendly">Friendly</Label>
                      <span className="text-sm text-muted-foreground">{formData.personality.friendly}%</span>
                    </div>
                    <input
                      id="friendly"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.personality.friendly}
                      onChange={(e) => handlePersonalityChange("friendly", Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Reserved</span>
                      <span>Warm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sample Responses</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Greeting: </span>
                      {formData.personality.friendly > 70
                        ? "Hey there! 👋 I'm so excited to help you today!"
                        : formData.personality.formal > 70
                          ? "Welcome. How may I assist you today?"
                          : "Hi! How can I help you?"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Error: </span>
                      {formData.personality.witty > 70
                        ? "Oops! Looks like I tripped over a digital banana peel. Let's try again!"
                        : formData.personality.formal > 70
                          ? "I apologize, but I encountered an error. Please try again."
                          : "Sorry, something went wrong. Let's try again."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Platform Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Select the platforms where you want to deploy your chatbot
                </p>

                <div className="space-y-3">
                  {PLATFORMS.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform.id}
                        checked={formData.platforms.includes(platform.id)}
                        onCheckedChange={() => handlePlatformToggle(platform.id)}
                      />
                      <Label htmlFor={platform.id}>{platform.name}</Label>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Integration Notes</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Website integration requires adding a code snippet to your site</li>
                    <li>Instagram integration works via direct messages</li>
                    <li>WhatsApp integration requires a business account</li>
                    <li>TikTok and Threads integrations are in beta</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Review and Deploy</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Name</h4>
                      <p className="text-sm">{formData.name || "Not specified"}</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Purpose</h4>
                      <p className="text-sm">
                        {formData.purpose === "customer-support"
                          ? "Customer Support"
                          : formData.purpose === "lead-generation"
                            ? "Lead Generation"
                            : formData.purpose === "product-recommendations"
                              ? "Product Recommendations"
                              : formData.purpose === "faq"
                                ? "FAQ Assistant"
                                : formData.purpose === "personal-assistant"
                                  ? "Personal Assistant"
                                  : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Style</h4>
                      <p className="text-sm">
                        {CHATBOT_STYLES.find((s) => s.id === formData.style)?.name || "Not selected"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Platforms</h4>
                      <p className="text-sm">
                        {formData.platforms.length > 0
                          ? formData.platforms
                              .map((p) => PLATFORMS.find((platform) => platform.id === p)?.name)
                              .join(", ")
                          : "None selected"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Personality</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Witty: {formData.personality.witty}%</div>
                      <div>Formal: {formData.personality.formal}%</div>
                      <div>Friendly: {formData.personality.friendly}%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Ready to Deploy</h4>
                  <p className="text-sm">
                    Your chatbot will be deployed to Vercel's edge network for optimal performance. You can make changes
                    to your chatbot at any time after deployment.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={loading}>
            Previous
          </Button>
        ) : (
          <Button variant="outline" onClick={() => router.push("/dashboard/chatbots")} disabled={loading}>
            Cancel
          </Button>
        )}

        {step < 5 ? (
          <Button
            onClick={() => updateStep(step + 1)}
            disabled={loading || (step === 1 && (!formData.name || !formData.purpose))}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Next"
            )}
          </Button>
        ) : (
          <Button onClick={completeWizard} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Chatbot"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

