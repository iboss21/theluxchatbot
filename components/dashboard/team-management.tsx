"use client"

import type React from "react"

import { useState } from "react"
import { UserPlus, MoreHorizontal, Mail, Lock, UserCheck } from "lucide-react"

export function TeamManagement() {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  const teamMembers = [
    {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatar: "JD",
      status: "active",
      lastActive: "Just now",
    },
    {
      id: "user2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Editor",
      avatar: "SJ",
      status: "active",
      lastActive: "5m ago",
    },
    {
      id: "user3",
      name: "Mike Chen",
      email: "mike@example.com",
      role: "Viewer",
      avatar: "MC",
      status: "offline",
      lastActive: "2h ago",
    },
    {
      id: "user4",
      name: "Lisa Brown",
      email: "lisa@example.com",
      role: "Editor",
      avatar: "LB",
      status: "away",
      lastActive: "1d ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating invite
    console.log(`Invited: ${inviteEmail}`)
    setInviteEmail("")
    setShowInviteForm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-white/70">Team Members ({teamMembers.length})</h3>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="text-xs flex items-center text-lux-cyan hover:underline"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          <span>Invite</span>
        </button>
      </div>

      {showInviteForm && (
        <form onSubmit={handleInvite} className="glass-card p-3">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-white/70" />
            <input
              type="email"
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="glass-input flex-1 text-sm py-1"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <select className="glass-input text-sm py-1 px-2">
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="px-3 py-1 text-xs bg-lux-cyan text-black rounded-md">
                Send
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
        {teamMembers.map((member) => (
          <div key={member.id} className="glass-card p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-lux-cyan/20 flex items-center justify-center mr-3 relative">
                <span className="text-xs font-medium">{member.avatar}</span>
                <span
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(member.status)}`}
                ></span>
              </div>
              <div>
                <div className="text-sm font-medium">{member.name}</div>
                <div className="text-xs text-white/50 flex items-center">
                  {member.role}
                  <span className="mx-1">•</span>
                  {member.lastActive}
                </div>
              </div>
            </div>
            <div className="relative">
              <button className="p-1 rounded-md hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4 text-white/70" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-3">
        <div className="flex items-start gap-3">
          <Lock className="h-4 w-4 text-lux-cyan flex-shrink-0 mt-0.5" />
          <div className="text-xs text-white/70 space-y-1">
            <div className="font-medium">Role permissions</div>
            <p>Admin: Full access to all features and settings</p>
            <p>Editor: Can create and modify chatbots and content</p>
            <p>Viewer: Can view analytics and chatbot performances</p>
          </div>
        </div>
      </div>

      <button className="w-full py-2 text-lux-cyan text-sm border border-lux-cyan/30 rounded-md hover:bg-lux-cyan/10 transition-colors flex items-center justify-center gap-1">
        <UserCheck className="h-4 w-4" />
        <span>Manage Team Permissions</span>
      </button>
    </div>
  )
}

