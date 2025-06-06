"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShapeHero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[60%] h-[800px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[60%] h-[800px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Animated shapes */}
      <motion.div
        className="absolute top-1/4 right-[15%] h-16 w-16 rounded-lg bg-primary/30"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[15%] h-24 w-24 rounded-full border-4 border-primary/30"
        initial={{ y: 0 }}
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-[20%] h-12 w-12 rounded-lg bg-primary/20"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              <span>Introducing TheLux.app</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
              Premium Chatbots with a <span className="text-primary">Touch of Luxe</span>
            </h1>

            <p className="mb-8 max-w-[600px] text-muted-foreground text-lg md:text-xl">
              Create stunning AI chatbots with our 21st.dev-inspired Glassmorphic UI. Deploy in minutes, scale to
              millions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>

          {/* Right column - Interactive demo */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="relative">
              {/* Frame with geometric elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full border-2 border-primary/30" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full border-2 border-primary/30" />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 h-16 w-16 rounded-lg bg-primary/20"
                  animate={{ rotate: [0, 180, 0] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-1/4 left-1/4 h-20 w-20 border-2 border-primary/30"
                  style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                  animate={{
                    borderRadius: [
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                      "70% 30% 50% 50% / 30% 60% 40% 70%",
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>

              {/* Chat interface */}
              <motion.div
                className="glass-card relative z-10 overflow-hidden rounded-xl border border-border/40 bg-card/80 p-6 backdrop-blur-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-primary" />
                    <h3 className="font-medium">LuxBot</h3>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/20 p-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                      Hi there! I'm LuxBot. How can I assist you today?
                    </div>
                  </div>

                  <motion.div
                    className="flex items-start justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                  >
                    <div className="rounded-lg rounded-tr-none bg-primary p-3 text-sm text-primary-foreground">
                      Can you help me create a custom chatbot for my business?
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.5 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mr-2 rounded-full bg-primary/20 p-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                      With TheLux.app, you can create a custom chatbot in minutes. Our platform offers AI personality
                      customization, stunning UI templates, and enterprise-grade security.
                    </div>
                  </motion.div>
                </div>

                <div className="flex items-center gap-2 border-t border-border/40 pt-4">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-background/50 rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button size="icon" className="rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

