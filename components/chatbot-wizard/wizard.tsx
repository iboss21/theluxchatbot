"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

interface WizardStep {
  title: string
  description: string
}

const WIZARD_STEPS: WizardStep[] = [
  {
    title: "Basic Information",
    description: "Set your chatbot name and purpose",
  },
  {
    title: "Style & Personality",
    description: "Define how your chatbot communicates",
  },
  {
    title: "Platforms",
    description: "Choose where your chatbot will be deployed",
  },
  {
    title: "Review",
    description: "Review and create your chatbot",
  },
]

export function ChatbotWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [sessionId, setSessionId] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    style: "casual",
    personality: {
      witty: 50,
      formal: 50,
      friendly: 50,
    },
    platforms: [],
  })

  const startWizard = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/chatbot-wizard/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "current-user-id" }), // Replace with actual user ID
      })

      if (!response.ok) throw new Error("Failed to start wizard")

      const data = await response.json()
      setSessionId(data.sessionId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the wizard. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNext = async () => {
    try {
      setLoading(true)

      // If first step and no session ID, start the wizard
      if (currentStep === 0 && !sessionId) {
        await startWizard()
      }

      // Save current step data
      const response = await fetch("/api/chatbot-wizard/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          step: currentStep,
          data: formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to save step data")

      // Move to next step
      setCurrentStep((prev) => prev + 1)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to proceed to the next step. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const handleComplete = async () => {
    try {
      setLoading(true)

      // Complete the wizard
      const response = await fetch("/api/chatbot-wizard/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) throw new Error("Failed to complete wizard")

      const data = await response.json()

      toast({
        title: "Success",
        description: "Your chatbot has been created successfully!",
      })

      // Redirect to the chatbot page
      router.push(`/dashboard/chatbots/${data.chatbotId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create chatbot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePersonalityChange = (trait: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value,
      },
    }))
  }

  const handlePlatformToggle = (platform: string) => {
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Chatbot Name</Label>
              <Input
                id="name"
                placeholder="e.g., Support Assistant"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Chatbot Purpose</Label>
              <Textarea
                id="purpose"
                placeholder="e.g., To provide customer support for our product"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="style">Communication Style</Label>
              <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Personality Traits</Label>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Witty</span>
                  <span>{formData.personality.witty}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.personality.witty}
                  onChange={(e) => handlePersonalityChange("witty", Number.parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Formal</span>
                  <span>{formData.personality.formal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.personality.formal}
                  onChange={(e) => handlePersonalityChange("formal", Number.parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Friendly</span>
                  <span>{formData.personality.friendly}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.personality.friendly}
                  onChange={(e) => handlePersonalityChange("friendly", Number.parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <Label>Target Platforms</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Website", "Mobile App", "Facebook", "WhatsApp", "Slack", "Discord"].map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={platform}
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                  />
                  <Label htmlFor={platform}>{platform}</Label>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review Your Chatbot</h3>

            <div className="space-y-2">
              <p className="font-medium">Name:</p>
              <p>{formData.name}</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Purpose:</p>
              <p>{formData.purpose}</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Style:</p>
              <p className="capitalize">{formData.style}</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Personality:</p>
              <ul className="list-disc pl-5">
                <li>Witty: {formData.personality.witty}%</li>
                <li>Formal: {formData.personality.formal}%</li>
                <li>Friendly: {formData.personality.friendly}%</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Platforms:</p>
              {formData.platforms.length > 0 ? (
                <ul className="list-disc pl-5">
                  {formData.platforms.map((platform) => (
                    <li key={platform}>{platform}</li>
                  ))}
                </ul>
              ) : (
                <p>No platforms selected</p>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Chatbot</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-8">
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid grid-cols-4">
              {WIZARD_STEPS.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  disabled={true}
                  className={currentStep >= index ? "text-primary" : ""}
                >
                  Step {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4">
              <h2 className="text-xl font-bold">{WIZARD_STEPS[currentStep].title}</h2>
              <p className="text-muted-foreground">{WIZARD_STEPS[currentStep].description}</p>
            </div>
          </Tabs>
        </div>

        {renderStepContent()}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || loading}>
          Back
        </Button>

        {currentStep < WIZARD_STEPS.length - 1 ? (
          <Button onClick={handleNext} disabled={loading}>
            {loading ? "Loading..." : "Next"}
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={loading}>
            {loading ? "Creating..." : "Create Chatbot"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

