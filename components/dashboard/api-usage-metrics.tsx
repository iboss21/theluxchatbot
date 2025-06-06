"use client"

import { useState } from "react"
import { Code, Copy, ExternalLink, Terminal, Webhook, Key } from "lucide-react"

export function APIUsageMetrics() {
  const [showKeys, setShowKeys] = useState(false)

  const usageData = {
    total: {
      requests: 125345,
      tokens: "4.5M",
      quota: "10M",
    },
    endpoints: [
      { name: "/chat/completions", requests: 92430, share: 73.7 },
      { name: "/embeddings", requests: 19250, share: 15.4 },
      { name: "/image/generation", requests: 8760, share: 7.0 },
      { name: "/audio/transcriptions", requests: 4905, share: 3.9 },
    ],
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <div className="glass-card p-3">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-sm font-medium">API Usage</div>
            <div className="text-xs text-white/50">This month</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{usageData.total.requests.toLocaleString()}</div>
            <div className="text-xs text-white/50">requests</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-white/70">
            <span className="text-lux-cyan font-medium">{usageData.total.tokens}</span> of {usageData.total.quota}{" "}
            tokens used
          </div>
          <div className="text-xs text-white/50">45% of quota</div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
          <div className="bg-lux-cyan h-1.5 rounded-full" style={{ width: "45%" }}></div>
        </div>
      </div>

      <div className="glass-card p-3 space-y-3">
        <div className="text-sm font-medium">Top Endpoints</div>

        {usageData.endpoints.map((endpoint, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-xs flex items-center">
                <Code className="h-3 w-3 mr-1 text-white/50" />
                <span className="text-white/70">{endpoint.name}</span>
              </div>
              <div className="text-xs text-white/50">{endpoint.requests.toLocaleString()} requests</div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1">
              <div className="bg-lux-cyan h-1 rounded-full" style={{ width: `${endpoint.share}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">API Keys</div>
          <button onClick={() => setShowKeys(!showKeys)} className="text-xs text-lux-cyan">
            {showKeys ? "Hide" : "Show"}
          </button>
        </div>

        <div className="p-2 bg-black/30 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <Key className="h-4 w-4 mr-2 text-white/50" />
            <code className="text-xs">
              {showKeys ? "lux_sk_4f3a2b1c0d9e8f7g6h5i4j3k2l1m" : "lux_sk_••••••••••••••••••••••••••••"}
            </code>
          </div>
          <button
            onClick={() => copyToClipboard("lux_sk_4f3a2b1c0d9e8f7g6h5i4j3k2l1m")}
            className="p-1 text-white/50 hover:text-white"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>

        <div className="flex justify-between mt-4 text-xs">
          <button className="text-lux-cyan flex items-center">
            <Key className="h-3 w-3 mr-1" />
            <span>Generate New Key</span>
          </button>
          <button className="text-white/50 hover:text-white flex items-center">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>Manage Keys</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/10 transition-colors">
          <Terminal className="h-4 w-4" />
          <span>API Docs</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/10 transition-colors">
          <Webhook className="h-4 w-4" />
          <span>Webhooks</span>
        </button>
      </div>
    </div>
  )
}

