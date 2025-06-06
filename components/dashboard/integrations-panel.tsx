"use client"

import { useState } from "react"
import { Check, ExternalLink, PlusCircle, Zap } from "lucide-react"

export function IntegrationsPanel() {
  const [showCategories, setShowCategories] = useState(false)

  const integrations = [
    { id: "slack", name: "Slack", category: "messaging", connected: true, icon: "💬" },
    { id: "zapier", name: "Zapier", category: "automation", connected: true, icon: "⚡" },
    { id: "salesforce", name: "Salesforce", category: "crm", connected: false, icon: "☁️" },
    { id: "zendesk", name: "Zendesk", category: "support", connected: false, icon: "🎧" },
    { id: "stripe", name: "Stripe", category: "payments", connected: true, icon: "💳" },
    { id: "shopify", name: "Shopify", category: "ecommerce", connected: false, icon: "🛒" },
  ]

  const categories = [
    { id: "all", name: "All" },
    { id: "messaging", name: "Messaging" },
    { id: "crm", name: "CRM" },
    { id: "automation", name: "Automation" },
    { id: "analytics", name: "Analytics" },
    { id: "ecommerce", name: "E-commerce" },
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations
      : integrations.filter((integration) => integration.category === selectedCategory)

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowCategories(!showCategories)}
        className="w-full flex items-center justify-between py-2 px-3 text-sm bg-white/10 rounded-md text-white/80 hover:bg-white/20 transition-colors"
      >
        <span>{categories.find((c) => c.id === selectedCategory)?.name || "All Categories"}</span>
        <span>{showCategories ? "▲" : "▼"}</span>
      </button>

      {showCategories && (
        <div className="glass-card p-2 mt-1 absolute z-10 w-full max-w-[calc(100%-3rem)]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setShowCategories(false)
              }}
              className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-white/10 text-white/80"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="glass-card p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center mr-3 text-lg">
                {integration.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{integration.name}</div>
                <div className="text-xs text-white/50 capitalize">{integration.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {integration.connected ? (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Connected
                </span>
              ) : (
                <button className="px-2 py-0.5 bg-lux-cyan/20 text-lux-cyan rounded-full text-xs">Connect</button>
              )}
              <button className="p-1 text-white/50 hover:text-white">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-1 py-2 text-sm bg-lux-cyan/10 border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/20 transition-colors">
        <PlusCircle className="h-4 w-4" />
        <span>Add New Integration</span>
      </button>

      <div className="text-center mt-4">
        <div className="text-sm text-white/50">Need a custom integration?</div>
        <button className="mt-1 text-lux-cyan text-xs flex items-center gap-1 mx-auto hover:underline">
          <Zap className="h-3 w-3" />
          <span>Contact our development team</span>
        </button>
      </div>
    </div>
  )
}

