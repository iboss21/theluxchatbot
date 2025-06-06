"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MoreHorizontal, Edit, Trash, Copy, ExternalLink } from "lucide-react"

interface ChatbotCardProps {
  chatbot: {
    id: string
    name: string
    description: string
    style: string
    messages: number
    lastUpdated: string
    status: "active" | "inactive"
  }
}

export function ChatbotCard({ chatbot }: ChatbotCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.div className="glass-card overflow-hidden" whileHover={{ y: -5 }}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{chatbot.name}</h3>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded-md hover:bg-white/10">
              <MoreHorizontal className="h-5 w-5 text-white/70" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card p-1 z-10">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <Copy className="h-4 w-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Live</span>
                </button>
                <div className="border-t border-white/10 my-1"></div>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-white/70 mb-4">{chatbot.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-white/50">
            <span>{chatbot.messages} messages</span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              chatbot.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {chatbot.status === "active" ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-white/50">Updated {chatbot.lastUpdated}</div>
          <Link href={`/dashboard/chatbots/${chatbot.id}`} className="text-lux-cyan text-sm hover:underline">
            Manage
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

