"use client"

import { useState } from "react"
import { Users, UserPlus, Filter, Save } from "lucide-react"

export function UserSegmentation() {
  const [activeSegment, setActiveSegment] = useState("all")
  const [showNewSegment, setShowNewSegment] = useState(false)

  const segments = [
    { id: "all", name: "All Users", count: 2456 },
    { id: "active", name: "Active Users", count: 1823 },
    { id: "new", name: "New This Month", count: 347 },
    { id: "high-value", name: "High-Value", count: 512 },
    { id: "at-risk", name: "At Risk", count: 128 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white/70">User Segments</h3>
        <button
          onClick={() => setShowNewSegment(!showNewSegment)}
          className="text-xs flex items-center text-lux-cyan hover:underline"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          <span>Create Segment</span>
        </button>
      </div>

      {showNewSegment && (
        <div className="glass-card p-3 space-y-3">
          <input type="text" placeholder="Segment name" className="glass-input w-full text-sm" />

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-white/70" />
            <select className="glass-input flex-1 text-sm">
              <option value="">Select a condition</option>
              <option value="active">Active in last</option>
              <option value="messages">Message count</option>
              <option value="conversion">Conversion rate</option>
              <option value="location">Location</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button className="text-xs text-lux-cyan flex items-center">
              <Filter className="h-3 w-3 mr-1" />
              <span>Add filter</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setShowNewSegment(false)}
                className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-md"
              >
                Cancel
              </button>
              <button className="px-3 py-1 text-xs bg-lux-cyan text-black rounded-md flex items-center">
                <Save className="h-3 w-3 mr-1" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {segments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => setActiveSegment(segment.id)}
            className={`w-full glass-card p-3 flex items-center justify-between text-left ${
              activeSegment === segment.id ? "border border-lux-cyan/50" : ""
            }`}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-white/70" />
              <div>
                <div className="text-sm font-medium">{segment.name}</div>
              </div>
            </div>
            <div className="text-xs px-2 py-0.5 rounded-full bg-white/10">{segment.count.toLocaleString()}</div>
          </button>
        ))}
      </div>

      <div className="glass-card p-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white/5 rounded-md">
            <div className="text-xs text-white/50">Avg. Session Time</div>
            <div className="text-lg font-semibold mt-1">4m 32s</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-md">
            <div className="text-xs text-white/50">Conversion Rate</div>
            <div className="text-lg font-semibold mt-1">23.5%</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-md">
            <div className="text-xs text-white/50">Retention Rate</div>
            <div className="text-lg font-semibold mt-1">68%</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-md">
            <div className="text-xs text-white/50">Satisfaction</div>
            <div className="text-lg font-semibold mt-1">4.7/5</div>
          </div>
        </div>
      </div>

      <button className="w-full py-2 text-white/70 text-sm bg-white/10 rounded-md hover:bg-white/20 transition-colors">
        View Segment Analytics
      </button>
    </div>
  )
}

