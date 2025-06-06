"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Button } from "@/components/ui/button"
import { Bot, BarChart3, Users, MessageSquare, Settings, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Simplified dashboard that doesn't rely on complex context
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [chatbots, setChatbots] = useState([])

  // Simple authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("lux_token")
        if (!token) {
          // Redirect to login using window.location for a full page refresh
          window.location.href = "/login"
          return
        }

        // For demo purposes, create a mock user
        setUser({
          name: "Demo User",
          email: "demo@example.com",
          role: "admin",
        })

        // Mock chatbots data
        setChatbots([
          {
            id: "lux-1",
            name: "Crystal Luxe",
            description: "Professional customer support chatbot",
            style: "Professional",
            messages: 1243,
            lastUpdated: new Date().toISOString(),
            status: "active",
          },
          {
            id: "lux-2",
            name: "Neon Pulse",
            description: "Casual conversational assistant",
            style: "Casual",
            messages: 856,
            lastUpdated: new Date().toISOString(),
            status: "active",
          },
          {
            id: "lux-3",
            name: "Royal Aura",
            description: "Elegant product recommendation bot",
            style: "Elegant",
            messages: 421,
            lastUpdated: new Date().toISOString(),
            status: "inactive",
          },
        ])
      } catch (error) {
        console.error("Auth check failed:", error)
        // Clear token and redirect to login
        localStorage.removeItem("lux_token")
        // Redirect to login using window.location for a full page refresh
        window.location.href = "/login"
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={() => (window.location.href = "/dashboard/chatbots/new")}
          className="bg-gradient-to-r from-cyan-500 to-purple-500"
        >
          Create New Chatbot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<MessageSquare className="h-4 w-4" />}
          title="Active Chatbots"
          description={`You have ${chatbots.filter((b) => b.status === "active").length} active chatbots serving your customers.`}
          onClick={() => (window.location.href = "/dashboard/chatbots")}
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<BarChart3 className="h-4 w-4" />}
          title="Analytics Overview"
          description="View your chatbot performance metrics and insights."
          onClick={() => (window.location.href = "/dashboard/analytics")}
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Users className="h-4 w-4" />}
          title="User Engagement"
          description="Monitor user satisfaction and engagement metrics."
          onClick={() => (window.location.href = "/dashboard/analytics")}
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Bot className="h-4 w-4" />}
          title="AI Performance"
          description="Your AI models are performing at optimal levels with minimal latency."
          onClick={() => (window.location.href = "/dashboard/chatbots")}
        />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Settings className="h-4 w-4" />}
          title="System Status"
          description="All systems operational. Last update: 5 minutes ago."
          onClick={() => (window.location.href = "/dashboard/settings")}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Chatbots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chatbots.slice(0, 3).map((bot) => (
            <Link
              key={bot.id}
              href={`/dashboard/chatbots/${bot.id}`}
              className="backdrop-blur-md bg-card/30 border border-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{bot.name}</h3>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    bot.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {bot.status === "active" ? "Active" : "Inactive"}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">{bot.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{bot.messages} messages</span>
                <span className="text-sm text-muted-foreground">
                  Updated {new Date(bot.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {chatbots.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => (window.location.href = "/dashboard/chatbots")}>
              View All Chatbots
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  onClick?: () => void
}

const GridItem = ({ area, icon, title, description, onClick }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none cursor-pointer", area)} onClick={onClick}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

