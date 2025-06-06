"use client"

import { useState } from "react"
import { FileText, Upload, RefreshCw, Search, Plus, Database, ExternalLink, AlertCircle, Globe } from "lucide-react"

export function KnowledgeBaseManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("documents")

  const documents = [
    { id: "doc1", name: "Product Manual", status: "indexed", size: "2.4 MB", updated: "2h ago" },
    { id: "doc2", name: "FAQ", status: "indexing", size: "1.1 MB", updated: "5h ago" },
    { id: "doc3", name: "Pricing Guide", status: "indexed", size: "0.8 MB", updated: "1d ago" },
    { id: "doc4", name: "API Documentation", status: "error", size: "3.5 MB", updated: "3d ago" },
  ]

  const sources = [
    { id: "src1", name: "Company Website", type: "website", status: "connected", count: 128 },
    { id: "src2", name: "Help Center", type: "website", status: "syncing", count: 64 },
    { id: "src3", name: "Product Database", type: "database", status: "connected", count: 256 },
  ]

  const filteredItems =
    activeTab === "documents"
      ? documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : sources.filter((src) => src.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "indexed":
      case "connected":
        return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
      case "indexing":
      case "syncing":
        return (
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Syncing
          </span>
        )
      case "error":
        return (
          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> Error
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="glass-input pl-10 w-full"
        />
      </div>

      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "documents" ? "text-lux-cyan border-b-2 border-lux-cyan" : "text-white/70 hover:text-white"
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab("sources")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "sources" ? "text-lux-cyan border-b-2 border-lux-cyan" : "text-white/70 hover:text-white"
          }`}
        >
          Sources
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="glass-card p-3 flex items-center justify-between">
              <div className="flex items-center">
                {activeTab === "documents" ? (
                  <FileText className="h-4 w-4 mr-2 text-white/70" />
                ) : item.type === "website" ? (
                  <Globe className="h-4 w-4 mr-2 text-white/70" />
                ) : (
                  <Database className="h-4 w-4 mr-2 text-white/70" />
                )}
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-white/50">
                    {activeTab === "documents"
                      ? `${(item as any).size} · ${(item as any).updated}`
                      : `${(item as any).count} entries`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge((item as any).status)}
                <button className="p-1 text-white/50 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-white/50 text-sm">No {activeTab} found matching your search</div>
        )}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/10 transition-colors">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm border border-lux-cyan/30 rounded-md text-lux-cyan hover:bg-lux-cyan/10 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Source</span>
        </button>
      </div>
    </div>
  )
}

