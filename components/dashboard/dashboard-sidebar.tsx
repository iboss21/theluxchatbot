"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  Zap,
  HelpCircle,
  LogOut,
  Globe,
  FileText,
} from "lucide-react"
import { Database } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Advanced",
      href: "/dashboard/advanced",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "Chatbots",
      href: "/dashboard/chatbots",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Integrations",
      href: "/dashboard/integrations",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      name: "Webhooks",
      href: "/dashboard/webhooks",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Logs",
      href: "/dashboard/logs",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Database",
      href: "/dashboard/database",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside
      className={`bg-black/30 backdrop-blur-md border-r border-white/10 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          {!collapsed && (
            <span className="text-xl font-bold">
              <span className="text-lux-cyan">The</span>LUX.app
            </span>
          )}
          {collapsed && <span className="text-xl font-bold text-lux-cyan">L</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:text-white">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-lux-cyan/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-0 right-0 px-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/support"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              {!collapsed && <span>Help & Support</span>}
            </Link>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

