"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/dashboard/sidebar"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Loader2,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { apiClient, type User } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/ui/logo"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists - use consistent key name
        const token = localStorage.getItem("lux_token")
        if (!token) {
          window.location.href = "/login"
          return
        }

        // Get current user
        const response = await apiClient.getCurrentUser()
        if (response.data) {
          setUser(response.data)
        } else {
          // If no user data, redirect to login
          localStorage.removeItem("lux_token")
          localStorage.removeItem("lux_user")
          deleteCookie("lux_token")
          window.location.href = "/login"
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        // Clear token and redirect to login
        localStorage.removeItem("lux_token")
        localStorage.removeItem("lux_user")
        deleteCookie("lux_token")
        window.location.href = "/login"
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Handle logout
  const handleLogout = async () => {
    if (isLoggingOut) return // Prevent multiple clicks

    setIsLoggingOut(true)
    try {
      await apiClient.logout()
      // Clear local storage and cookies
      localStorage.removeItem("lux_token")
      localStorage.removeItem("lux_user")
      deleteCookie("lux_token")

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })

      // Redirect to login page
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if API fails
      localStorage.removeItem("lux_token")
      localStorage.removeItem("lux_user")
      deleteCookie("lux_token")

      toast({
        title: "Logged out",
        description: "You have been logged out",
      })

      window.location.href = "/login"
    } finally {
      setIsLoggingOut(false)
    }
  }

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If no user after loading, redirect to login
  if (!user && !isLoading) {
    window.location.href = "/login"
    return null
  }

  // Base links for all users
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard
          className={`h-5 w-5 flex-shrink-0 ${pathname === "/dashboard" ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname === "/dashboard",
    },
    {
      label: "Chatbots",
      href: "/dashboard/chatbots",
      icon: (
        <MessageSquare
          className={`h-5 w-5 flex-shrink-0 ${pathname.startsWith("/dashboard/chatbots") ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname.startsWith("/dashboard/chatbots"),
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: (
        <BarChart3
          className={`h-5 w-5 flex-shrink-0 ${pathname.startsWith("/dashboard/analytics") ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname.startsWith("/dashboard/analytics"),
    },
    {
      label: "Team",
      href: "/dashboard/team",
      icon: (
        <Users
          className={`h-5 w-5 flex-shrink-0 ${pathname.startsWith("/dashboard/team") ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname.startsWith("/dashboard/team"),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <Settings
          className={`h-5 w-5 flex-shrink-0 ${pathname.startsWith("/dashboard/settings") ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname.startsWith("/dashboard/settings"),
    },
  ]

  // Add admin link for admin users
  if (user?.role === "admin") {
    links.push({
      label: "Admin",
      href: "/dashboard/admin",
      icon: (
        <ShieldAlert
          className={`h-5 w-5 flex-shrink-0 ${pathname.startsWith("/dashboard/admin") ? "text-cyan-400" : "text-neutral-400"}`}
        />
      ),
      active: pathname.startsWith("/dashboard/admin"),
    })
  }

  // Add logout link
  links.push({
    label: isLoggingOut ? "Logging out..." : "Logout",
    href: "#",
    icon: isLoggingOut ? (
      <Loader2 className="h-5 w-5 flex-shrink-0 text-neutral-400 animate-spin" />
    ) : (
      <LogOut className="h-5 w-5 flex-shrink-0 text-neutral-400" />
    ),
    onClick: handleLogout,
    disabled: isLoggingOut,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 relative">
            {/* Toggle button */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute -right-3 top-5 bg-black/90 border border-white/10 rounded-full p-1 z-10 hover:bg-black/70 transition-all duration-200"
            >
              {open ? (
                <ChevronLeft className="h-4 w-4 text-white/70" />
              ) : (
                <ChevronRight className="h-4 w-4 text-white/70" />
              )}
            </button>

            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex justify-center mb-8 mt-2">
                {open ? (
                  <Logo href="/dashboard" size="md" />
                ) : (
                  <div className="h-8 w-8 bg-cyan-400 rounded-md flex items-center justify-center">
                    <span className="text-black font-bold">L</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    open={open}
                    link={{
                      ...link,
                      icon: link.icon,
                    }}
                    className={`${link.active ? "bg-white/5" : ""} ${link.onClick ? "cursor-pointer" : ""} ${link.disabled ? "opacity-50 pointer-events-none" : ""}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                open={open}
                link={{
                  label: user?.name || "LuxChat User",
                  href: "/dashboard/settings",
                  icon: (
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-cyan-900/50 border border-cyan-400/30 flex items-center justify-center">
                      <span className="text-sm font-medium text-cyan-400">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "LC"}
                      </span>
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

