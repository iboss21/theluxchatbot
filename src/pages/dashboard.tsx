"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Dashboard() {
  const [chatbots] = useState([
    { id: "lux-1", name: "Crystal Luxe", style: "Professional", messages: 1243 },
    { id: "lux-2", name: "Neon Pulse", style: "Casual", messages: 856 },
    { id: "lux-3", name: "Royal Aura", style: "Elegant", messages: 421 },
  ])

  return (
    <div className="min-h-screen bg-lux-dark">
      <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-lux-cyan">The</span>LUX.app
          </h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-lux-cyan">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Your Lux Chatbots</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((bot) => (
            <motion.div
              key={bot.id}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{bot.name}</h3>
                <p className="text-white/70">{bot.style} Style</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-white/50">{bot.messages} messages</span>
                  <button className="bg-lux-cyan/80 hover:bg-lux-cyan text-black font-medium px-3 py-1 rounded-lg text-sm transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 border-dashed rounded-xl flex items-center justify-center p-6 hover:bg-white/10 transition-all cursor-pointer"
            whileHover={{ y: -5 }}
          >
            <div className="text-center">
              <div className="text-lux-cyan text-4xl mb-2">+</div>
              <p className="text-white/70">Create New Chatbot</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Lux Insights</h2>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <p className="text-white/70 text-center">Analytics visualization will appear here</p>
          </div>
        </div>
      </main>
    </div>
  )
}

