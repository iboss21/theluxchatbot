"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="container py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-lux-cyan via-white to-lux-purple bg-clip-text text-transparent">
              Premium Chatbots
            </span>
            <br />
            <span className="text-white">With a Touch of Luxe</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-md">
            Create stunning AI chatbots with our 21st.dev-inspired Glassmorphic UI. Deploy in minutes, scale to
            millions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>
        <div className="glass-card h-[500px] flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-sm text-white/70 ml-2">LuxBot Demo</div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center">
            <p className="text-white/70 text-center">Interactive chatbot demo will appear here</p>
          </div>
        </div>
      </div>
    </section>
  )
}

