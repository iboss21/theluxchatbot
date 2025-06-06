"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", content: "Hi there! I'm LuxBot. How can I assist you today?" },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    setChatHistory([...chatHistory, { role: "user", content: message }])

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Thanks for your message! I'm a demo of TheLux.app's premium chatbot platform. You can create your own AI chatbot with our easy-to-use tools.`,
        },
      ])
    }, 800)

    setMessage("")
  }

  return (
    <section className="container py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
            <Link href="/signup" className="glass-button inline-flex items-center">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#features" className="glass-button-secondary inline-flex items-center">
              Explore Features
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card h-[500px] flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="text-sm text-white/70 ml-2">LuxBot Demo</div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user" ? "bg-lux-cyan/20 text-white" : "bg-white/10 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="glass-input flex-1"
              />
              <button type="submit" className="glass-button">
                Send
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

