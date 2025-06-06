"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Clock } from "lucide-react"

export default function ImplementationRoadmap() {
  const [activeTab, setActiveTab] = useState("phase1")

  const phases = [
    {
      id: "phase1",
      name: "Phase 1: Core Enhancements",
      description: "Essential features to improve the platform foundation",
      progress: 25,
      features: [
        { name: "Chatbot Creation Wizard", status: "in-progress" },
        { name: "Chatbot Versioning (Lux Snapshots)", status: "planned" },
        { name: "Enhanced Analytics Dashboard", status: "in-progress" },
        { name: "Sentiment Analysis", status: "planned" },
        { name: "User Feedback Loop", status: "planned" },
      ],
    },
    {
      id: "phase2",
      name: "Phase 2: User Experience & AI",
      description: "Improve user experience and AI capabilities",
      progress: 0,
      features: [
        { name: "Lux Voice 2.0", status: "planned" },
        { name: "Contextual Memory", status: "planned" },
        { name: "Intent Recognition", status: "planned" },
        { name: "Dark/Light Mode Toggle", status: "planned" },
        { name: "Notification Center", status: "planned" },
      ],
    },
    {
      id: "phase3",
      name: "Phase 3: Team & Security",
      description: "Collaboration and security features",
      progress: 0,
      features: [
        { name: "Role-Based Access Control", status: "planned" },
        { name: "Real-Time Collaboration", status: "planned" },
        { name: "Activity Log", status: "planned" },
        { name: "Two-Factor Authentication", status: "planned" },
        { name: "Security Dashboard", status: "planned" },
      ],
    },
    {
      id: "phase4",
      name: "Phase 4: Monetization & Growth",
      description: "Revenue generation and platform growth",
      progress: 0,
      features: [
        { name: "Lux Marketplace Expansion", status: "planned" },
        { name: "Dynamic Pricing Tiers", status: "planned" },
        { name: "Affiliate Program", status: "planned" },
        { name: "API Marketplace", status: "planned" },
        { name: "Custom Code Injection", status: "planned" },
      ],
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">LuxChat Implementation Roadmap</h1>
      <Tabs defaultValue="phase1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="text-sm">
              {phase.name.split(":")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id}>
            <Card>
              <CardHeader>
                <CardTitle>{phase.name}</CardTitle>
                <CardDescription>{phase.description}</CardDescription>
                <div className="mt-2">
                  <Progress value={phase.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">{phase.progress}% Complete</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {phase.features.map((feature) => (
                    <li key={feature.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(feature.status)}
                        <span>{feature.name}</span>
                      </div>
                      <Badge
                        variant={
                          feature.status === "completed"
                            ? "default"
                            : feature.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {feature.status === "completed"
                          ? "Completed"
                          : feature.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Implementation Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

