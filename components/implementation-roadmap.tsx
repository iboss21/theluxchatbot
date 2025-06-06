"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { implementationPlan } from "../implementation-plan"

export function ImplementationRoadmap() {
  const [activeTab, setActiveTab] = useState("phase1")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">LuxChat Implementation Roadmap</CardTitle>
        <CardDescription>Track the progress of our comprehensive feature implementation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phase1" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="phase1">Core Chatbot Management</TabsTrigger>
            <TabsTrigger value="phase2">AI & User Experience</TabsTrigger>
            <TabsTrigger value="phase3">Team & Security</TabsTrigger>
            <TabsTrigger value="phase4">Monetization & Growth</TabsTrigger>
          </TabsList>

          {Object.entries(implementationPlan).map(([phaseKey, phase]) => (
            <TabsContent key={phaseKey} value={phaseKey} className="space-y-4">
              <div className="grid gap-4">
                {phase.features.map((feature, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <div className="mr-4 mt-1">{getStatusIcon(feature.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{feature.name}</h3>
                            <Badge variant={feature.status === "completed" ? "default" : "outline"}>
                              {feature.status === "completed"
                                ? "Completed"
                                : feature.status === "in-progress"
                                  ? "In Progress"
                                  : "Planned"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                          {feature.apis && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground font-medium">API Endpoints:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {feature.apis.map((api, apiIndex) => (
                                  <Badge key={apiIndex} variant="secondary" className="text-xs">
                                    {api}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

