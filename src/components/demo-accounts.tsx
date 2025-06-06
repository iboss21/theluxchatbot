"use client"

import { useState } from "react"
import { Check, Copy, ShieldAlert, User, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface AccountCredential {
  email: string
  password: string
  role: string
  description: string
  features: string[]
}

export function DemoAccounts() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("user")

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const accounts: Record<string, AccountCredential> = {
    user: {
      email: "user@thelux.demo",
      password: "demo1234",
      role: "Regular User",
      description: "Access to basic chatbot creation and customization features",
      features: ["Create up to 3 chatbots", "Basic customization options", "Standard analytics", "Community support"],
    },
    admin: {
      email: "admin@thelux.demo",
      password: "admin1234",
      role: "Administrator",
      description: "Full access to all platform features and management tools",
      features: [
        "Unlimited chatbots",
        "Advanced customization",
        "Full analytics suite",
        "User management",
        "System configuration",
        "Priority support",
      ],
    },
    enterprise: {
      email: "enterprise@thelux.demo",
      password: "enterprise1234",
      role: "Enterprise Client",
      description: "Enterprise-level features with team collaboration",
      features: [
        "Unlimited chatbots",
        "White-label options",
        "Team collaboration tools",
        "Advanced security controls",
        "Custom integrations",
        "Dedicated support",
      ],
    },
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-2">
          TheLux.app Demo Accounts
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Use these credentials to explore different user experiences on the platform
        </p>
      </div>

      <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Regular User</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Administrator</span>
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Enterprise</span>
          </TabsTrigger>
        </TabsList>

        {Object.entries(accounts).map(([key, account]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl relative overflow-hidden">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {key === "user" && <User className="h-5 w-5 text-cyan-500" />}
                  {key === "admin" && <ShieldAlert className="h-5 w-5 text-purple-500" />}
                  {key === "enterprise" && <Users className="h-5 w-5 text-amber-500" />}
                  {account.role}
                </CardTitle>
                <CardDescription>{account.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Login Credentials</div>
                  <div className="bg-black/20 p-4 rounded-md space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <div className="font-mono">{account.email}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(account.email, `${key}-email`)}
                      >
                        {copied === `${key}-email` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-muted-foreground">Password:</span>
                        <div className="font-mono">{account.password}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(account.password, `${key}-password`)}
                      >
                        {copied === `${key}-password` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Features & Permissions</div>
                  <ul className="bg-black/20 p-4 rounded-md space-y-1">
                    {account.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login with this account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 p-4 bg-black/20 rounded-md text-center">
        <p className="text-amber-400 flex items-center justify-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          <span>These are demo accounts only. Data may be reset periodically.</span>
        </p>
      </div>
    </div>
  )
}

