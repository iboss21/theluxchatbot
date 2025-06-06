"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, ChevronDown, Menu, X } from "lucide-react"

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white/70 hover:text-white">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden md:flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input type="text" placeholder="Search..." className="glass-input pl-10 w-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-white/70 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-lux-cyan text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative">
            <button className="flex items-center gap-2 text-white/70 hover:text-white">
              <div className="h-8 w-8 rounded-full bg-lux-cyan/20 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="hidden md:inline-block">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <input type="text" placeholder="Search..." className="glass-input pl-10 w-full" />
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="block p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/chatbots"
                className="block p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chatbots
              </Link>
              <Link
                href="/dashboard/analytics"
                className="block p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className="block p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

