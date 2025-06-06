"use client"

import { useState } from "react"
import { Sparkles, Settings, Save } from "lucide-react"

export function ModelSettings() {
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [activeModel, setActiveModel] = useState("gpt-4o")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const models = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-3.5", name: "GPT-3.5 Turbo" },
    { id: "claude-3", name: "Claude 3" },
    { id: "custom", name: "Custom" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs text-white/70 block">AI Model</label>
        <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
                activeModel === model.id ? "bg-lux-cyan text-black" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-white/70">Temperature</label>
          <span className="text-xs">{temperature.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
          className="w-full accent-lux-cyan"
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-white/70">Max Tokens</label>
          <span className="text-xs">{maxTokens}</span>
        </div>
        <input
          type="range"
          min="256"
          max="4096"
          step="128"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number.parseInt(e.target.value))}
          className="w-full accent-lux-cyan"
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>Shorter</span>
          <span>Longer</span>
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-center gap-1 py-1.5 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors"
      >
        <Settings className="h-3 w-3" />
        <span>{showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings"}</span>
      </button>

      {showAdvanced && (
        <div className="space-y-3">
          <div className="glass-card p-3 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/70">Top P</label>
              <span className="text-xs">0.9</span>
            </div>
            <input type="range" min="0.1" max="1" step="0.1" defaultValue="0.9" className="w-full accent-lux-cyan" />

            <div className="flex justify-between items-center mt-3">
              <label className="text-xs text-white/70">Frequency Penalty</label>
              <span className="text-xs">0.2</span>
            </div>
            <input type="range" min="0" max="2" step="0.1" defaultValue="0.2" className="w-full accent-lux-cyan" />

            <div className="flex justify-between items-center mt-3">
              <label className="text-xs text-white/70">Presence Penalty</label>
              <span className="text-xs">0.1</span>
            </div>
            <input type="range" min="0" max="2" step="0.1" defaultValue="0.1" className="w-full accent-lux-cyan" />
          </div>

          <div className="glass-card p-3">
            <label className="text-xs text-white/70 block mb-2">System Message</label>
            <textarea
              className="glass-input w-full text-xs h-20 resize-none"
              defaultValue="You are a friendly, helpful assistant designed to provide accurate and concise information."
            ></textarea>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/10 transition-colors">
          <Sparkles className="h-4 w-4" />
          <span>Test</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm bg-lux-cyan text-black rounded-md hover:bg-lux-cyan/80 transition-colors">
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  )
}

