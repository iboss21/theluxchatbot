"use client"

import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import type { ReactNode } from "react"

interface AnalyticsCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: ReactNode
}

export function AnalyticsCard({ title, value, change, positive, icon }: AnalyticsCardProps) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white/70">{title}</h3>
        <div className="p-2 rounded-full bg-white/10">{icon}</div>
      </div>

      <div className="text-3xl font-bold mb-2">{value}</div>

      <div className={`flex items-center text-sm ${positive ? "text-green-400" : "text-red-400"}`}>
        {positive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
        <span>{change} from last month</span>
      </div>
    </motion.div>
  )
}

