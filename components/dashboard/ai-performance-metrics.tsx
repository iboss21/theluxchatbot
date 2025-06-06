"use client"

import { useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { LineChart, Clock, ZapOff, Activity } from "lucide-react"

export function AIPerformanceMetrics() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o")

  const models = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-3", name: "Claude 3" },
    { id: "mixtral", name: "Mixtral" },
    { id: "custom", name: "Custom Model" },
  ]

  const metrics = {
    "gpt-4o": {
      latency: 87,
      uptime: 99.9,
      quality: 95,
      tokens: "3.2M",
    },
    "claude-3": {
      latency: 92,
      uptime: 99.7,
      quality: 93,
      tokens: "2.8M",
    },
    mixtral: {
      latency: 95,
      uptime: 99.5,
      quality: 89,
      tokens: "1.9M",
    },
    custom: {
      latency: 78,
      uptime: 98.8,
      quality: 91,
      tokens: "0.5M",
    },
  }

  const currentMetrics = metrics[selectedModel as keyof typeof metrics]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
              selectedModel === model.id ? "bg-lux-cyan text-black" : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <div className="flex flex-col items-center">
            <div className="text-white/70 text-sm mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Response Latency
            </div>
            <div className="w-20 h-20">
              <CircularProgressbar
                value={currentMetrics.latency}
                text={`${currentMetrics.latency}%`}
                styles={buildStyles({
                  pathColor: `rgba(0, 255, 255, ${currentMetrics.latency / 100})`,
                  textColor: "#ffffff",
                  trailColor: "rgba(255, 255, 255, 0.1)",
                })}
              />
            </div>
            <div className="text-xs text-white/50 mt-2">Optimal</div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex flex-col items-center">
            <div className="text-white/70 text-sm mb-2 flex items-center">
              <ZapOff className="h-4 w-4 mr-1" />
              System Uptime
            </div>
            <div className="w-20 h-20">
              <CircularProgressbar
                value={currentMetrics.uptime}
                text={`${currentMetrics.uptime}%`}
                styles={buildStyles({
                  pathColor: "#00ffff",
                  textColor: "#ffffff",
                  trailColor: "rgba(255, 255, 255, 0.1)",
                })}
              />
            </div>
            <div className="text-xs text-white/50 mt-2">Last 30 days</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/70 text-sm flex items-center">
            <Activity className="h-4 w-4 mr-1" />
            Response Quality
          </div>
          <div className="text-sm font-medium">{currentMetrics.quality}%</div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-lux-cyan h-2 rounded-full" style={{ width: `${currentMetrics.quality}%` }}></div>
        </div>
        <div className="text-xs text-white/50 mt-1">Based on user feedback and evaluations</div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-white/70 text-sm flex items-center">
            <LineChart className="h-4 w-4 mr-1" />
            Token Usage
          </div>
          <div className="text-sm font-medium">{currentMetrics.tokens}</div>
        </div>
        <div className="flex justify-between text-xs text-white/50">
          <span>This month</span>
          <span>65% of plan</span>
        </div>
      </div>

      <button className="w-full py-2 mt-2 text-lux-cyan text-sm border border-lux-cyan/30 rounded-md hover:bg-lux-cyan/10 transition-colors">
        View Full Performance Report
      </button>
    </div>
  )
}

